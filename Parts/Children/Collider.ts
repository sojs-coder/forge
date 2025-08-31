import { Vector } from "../../Math/Vector";
import type { Camera } from "../Camera";
import { Game } from "../Game";
import { Part } from "../Part";
import type { Layer } from "../Layer";
import { MultiPolygonCollider } from "./MultiPolygonCollider";
import type { Transform } from "./Transform";
import * as martinez from 'martinez-polygon-clipping';

/**        if (this.tag !== other.tag || other.tag == "<Untagged>" || this.tag == "<Untagged>") return;

        const thisTransform = this.sibling<Transform>("Transform");
        if (!thisTransform) {
            this.top?.warn(`Collider <${this.name}> has no Transform sibling, cannot merge.`);
            return;
        }

        // 1. Combine vertices from both colliders
        const allVertices = [...this.worldVertices, ...other.worldVertices];

        // 2. Compute the convex hull of the combined vertices using the Monotone Chain algorithm.
        // This is a robust way to find the union of two convex polygons.
        allVertices.sort((a, b) => {
            return a.x < b.x || (a.x == b.x && a.y < b.y) ? -1 : 1;
        });
        const cross = (o: Vector, a: Vector, b: Vector) => {
            return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
        };

        const lower: Vector[] = [];
        for (const p of allVertices) {
            while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
                lower.pop();
            }
            lower.push(p);
        }

        const upper: Vector[] = [];
        for (let i = allVertices.length - 1; i >= 0; i--) {
            const p = allVertices[i];
            while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
                upper.pop();
            }
            upper.push(p);
        }

        upper.pop();
        lower.pop();

        const hull = lower.concat(upper);

        if (hull.length < 3) {
            // The merged shape is not a valid polygon, so we inactivate the other collider
            // and leave this one as is. This might happen in degenerate cases.
            return;
        }

        // 3. Update the collider with the new shape
        const newLocalVertices = hull.map(v => v.subtract(thisTransform.worldPosition));
        this._updateVerticesAfterMerge(newLocalVertices);
        other.inactivate(); */

/** From martinez-polygon-clipping */
export type Position = number[]
export type Polygon = Position[]
export type MultiPolygon = Position[][]
export type Geometry = Polygon | MultiPolygon
export abstract class Collider extends Part {
    colliding: boolean = false;
    collidingWith: Set<Collider> = new Set();
    tag: string = "";
    radius: number;
    realWorldStart: Vector;
    realWorldEnd: Vector;
    vertices: Vector[];
    active: boolean = true;
    allowMerge: boolean;
    randomTestingColors: [number, number, number];
    constructor({ tag, allowMerge }: { tag?: string, allowMerge?: boolean }) {
        super({ name: "Collider" });
        this.type = "Collider";
        this.base = "Collider";
        this.tag = tag || "<Untagged>";
        this.radius = 0;
        this.realWorldStart = new Vector(0, 0);
        this.allowMerge = allowMerge !== undefined ? allowMerge : true;
        this.realWorldEnd = new Vector(0, 0);
        this.randomTestingColors = [
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255
        ];
        this.vertices = [];
    }

    setTag(tag: string) {
        this.tag = tag;
    }

    abstract override clone(memo?: Map<Part, Part>): this;

    onMount(parent: Part) {
        super.onMount(parent);
        const transform = this.sibling<Transform>("Transform");
        if (!transform) {
            this.top?.warn(
                `Collider <${this.name}> (${this.id}) does not have Transform sibling. Please ensure you add a Transform component.`
            );
            return;
        }
        this.updateCollider(transform);
    }

    abstract get worldVertices(): Vector[];

    abstract narrowPhaseCheck(other: Collider): boolean;

    abstract updateCollider(transform: Transform): void;

    abstract drawDebug(ctx: CanvasRenderingContext2D): void;

        abstract _updateVerticesAfterMerge(polygons: Vector[][]): void;

    onRegister(attribute: string, value: any) {
        super.onRegister(attribute, value);
        if (attribute === "layer") {
            value.flats.colliders.push(this);
        }
    }


    evaluateMerging() {
        const layer = this.registrations["layer"] as import("../Layer").Layer;
        if (!layer) return;

        const candidates = layer.spatialGrid.query(this);
        const fellowColliders: Collider[] = candidates.filter((c: Collider) => c.tag == this.tag && c.id !== this.id && c.allowMerge && c.active);

        if (fellowColliders.length == 0) return;

        for (const fellow of fellowColliders) {
            if (!fellow.sibling<Transform>("Transform")?.initialized) continue;

            // To avoid race conditions where both colliders try to merge with each other,
            // we establish a rule: the collider with the smaller ID merges the one with the larger ID.
            // This creates a deterministic merge order.
            if (this.id < fellow.id && this.checkCollision(fellow, true)) {
                this.mergeWith(fellow);
            }
        }
    }


    abstract getGeometry(): Polygon | MultiPolygon;

    mergeWith(other: Collider) {
        if (this.tag !== other.tag || other.tag == "<Untagged>" || this.tag == "<Untagged>") return;

        const thisTransform = this.sibling<Transform>("Transform");
        if (!thisTransform) {
            this.top?.warn(`Collider <${this.name}> has no Transform sibling, cannot merge.`);
            return;
        }

        const allPolygons: Polygon[] = []; // Polygon is Position[][]

        const g1 = this.getGeometry();
        if (this.type === 'MultiPolygonCollider') { // Using this.type to avoid instanceof and circular dependencies
            allPolygons.push(...(g1 as MultiPolygon));
        } else {
            allPolygons.push(g1 as Polygon);
        }

        const g2 = other.getGeometry();
        if (other.type === 'MultiPolygonCollider') { // Using other.type to avoid instanceof and circular dependencies
            allPolygons.push(...(g2 as MultiPolygon));
        } else {
            allPolygons.push(g2 as Polygon);
        }

        if (allPolygons.length === 0) return;

        const localPolygons: Vector[][] = allPolygons.map(polygon => {
            return polygon.map(([x, y]) => thisTransform.worldToLocal(new Vector(x, y)));
        });

        this._updateVerticesAfterMerge(localPolygons);
        other.inactivate();
    }
    onStart() {
        // if (this.allowMerge) {
        //     this.evaluateMerging();
        // }
    }
    inactivate() {
        this.active = false;
    }
    activate() {
        this.active = true;
    }
    act(delta: number): void {
        super.act(delta);
        if (!this.active) return;
        if (!this.registrations?.layer) {
            throw new Error(`Collider <${this.name}> (${this.id}) is not registered to a layer. Collisions will not be checked.`);
        }

        const transform = this.sibling<Transform>("Transform");
        if (!transform) return;

        this.updateCollider(transform);
        this.colliding = false;
        this.collidingWith.clear();


        const layer = this.registrations.layer as Layer;
        const candidates = layer.spatialGrid.query(this);

        for (const other of candidates) {
            if (other === this) continue;
            if (this.checkCollision(other)) {
                this.colliding = true;
                this.collidingWith.add(other);
            }
        }

        this.hoverbug = `${this.colliding ? "🟥" : "🟩"} - ${Array.from(this.collidingWith).map(o => o.name).join(", ")} objects`;

        // Debugging manually

        const fill = this.active;

        const ctx = this.top instanceof Game ? this.top.context : null;
        if (ctx) {
            ctx.beginPath();
            ctx.strokeStyle = `rgb(${this.randomTestingColors[0]}, ${this.randomTestingColors[1]}, ${this.randomTestingColors[2]})`;
            ctx.fillStyle = fill ? `rgba(${this.randomTestingColors[0]}, ${this.randomTestingColors[1]}, ${this.randomTestingColors[2]}, 0.5)` : "transparent";

            ctx.moveTo(this.worldVertices[0].x, this.worldVertices[0].y);
            for (const vertex of this.worldVertices) {
                ctx.lineTo(vertex.x, vertex.y);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }

        if (this.top instanceof Game && this.top.devmode) {
            const ctx = this.top.context;
            if (ctx) {
                this.drawDebug(ctx);
            }
        }
    }

    checkCollision(other: Collider, ignoreTags: boolean = false): boolean {
        const thisTransform = this.sibling<Transform>("Transform");
        const otherTransform = other.sibling<Transform>("Transform");

        if (!thisTransform || !otherTransform) {
            return false; // Cannot check collision without transforms
        }

        this.updateCollider(thisTransform);
        other.updateCollider(otherTransform);

        if (!ignoreTags && other.tag === this.tag && this.tag !== "<Untagged>") return false;

        if (
            this.realWorldEnd.x < other.realWorldStart.x ||
            this.realWorldStart.x > other.realWorldEnd.x ||
            this.realWorldEnd.y < other.realWorldStart.y ||
            this.realWorldStart.y > other.realWorldEnd.y
        ) {
            return false;
        }

        return this.narrowPhaseCheck(other);
    }

    isVisible(camera: Camera): boolean {
        if (!this.top) {
            throw new Error("Collider cannot calculate visibility without a 'top' (Game instance).");
        }

        const transform = this.sibling<Transform>("Transform");
        if (!transform) {
            return false;
        }
        this.updateCollider(transform);

        const { offset, scale } = camera.getViewMatrix();
        const cameraPos = offset.multiply(-1);

        const screenWidth = this.top.width;
        const screenHeight = this.top.height;

        const viewWidth = screenWidth / scale.x;
        const viewHeight = screenHeight / scale.y;

        const cameraVertices = [
            new Vector(cameraPos.x - viewWidth / 2, cameraPos.y - viewHeight / 2),
            new Vector(cameraPos.x + viewWidth / 2, cameraPos.y - viewHeight / 2),
            new Vector(cameraPos.x + viewWidth / 2, cameraPos.y + viewHeight / 2),
            new Vector(cameraPos.x - viewWidth / 2, cameraPos.y + viewHeight / 2)
        ];

        return this.checkVerticesAgainstVertices(this.worldVertices, cameraVertices);
    }

    protected checkVerticesAgainstVertices(vertices1: Vector[], vertices2: Vector[]): boolean {
        const axes1 = this.getAxes(vertices1);
        for (const axis of axes1) {
            const projection1 = this.project(vertices1, axis);
            const projection2 = this.project(vertices2, axis);

            if (!this.overlap(projection1, projection2)) {
                return false;
            }
        }

        const axes2 = this.getAxes(vertices2);
        for (const axis of axes2) {
            const projection1 = this.project(vertices1, axis);
            const projection2 = this.project(vertices2, axis);

            if (!this.overlap(projection1, projection2)) {
                return false;
            }
        }

        return true;
    }

    protected getAxes(vertices: Vector[]): Vector[] {
        const axes: Vector[] = [];
        for (let i = 0; i < vertices.length; i++) {
            const p1 = vertices[i];
            const p2 = vertices[i === vertices.length - 1 ? 0 : i + 1];
            const edge = p2.subtract(p1);
            const normal = new Vector(-edge.y, edge.x).normalize();
            axes.push(normal);
        }
        return axes;
    }

    protected project(vertices: Vector[], axis: Vector): { min: number, max: number } {
        let min = axis.dot(vertices[0]);
        let max = min;
        for (let i = 1; i < vertices.length; i++) {
            const p = axis.dot(vertices[i]);
            if (p < min) {
                min = p;
            } else if (p > max) {
                max = p;
            }
        }
        return { min, max };
    }

    protected overlap(proj1: { min: number, max: number }, proj2: { min: number, max: number }): boolean {
        return proj1.max >= proj2.min && proj2.max >= proj1.min;
    }

    protected _checkPolygonVsPolygon(vertices1: Vector[], vertices2: Vector[]): boolean {
        const axes1 = this.getAxes(vertices1);
        const axes2 = this.getAxes(vertices2);

        const axes = axes1.concat(axes2);

        for (const axis of axes) {
            const projection1 = this.project(vertices1, axis);
            const projection2 = this.project(vertices2, axis);

            if (!this.overlap(projection1, projection2)) {
                return false;
            }
        }
        return true;
    }
}