import { Vector } from "../../Math/Vector";
import type { Camera } from "../Camera";
import { Game } from "../Game";
import { Part } from "../Part";
import type { Transform } from "./Transform";

export abstract class Collider extends Part {
    colliding: boolean = false;
    collidingWith: Set<Collider> = new Set();
    tag: string = "";
    radius: number;
    realWorldStart: Vector;
    realWorldEnd: Vector;
    vertices: Vector[];

    constructor({ tag }: { tag?: string }) {
        super({ name: "Collider" });
        this.type = "Collider";
        this.base = "Collider";
        this.tag = tag || "<Untagged>";
        this.radius = 0;
        this.realWorldStart = new Vector(0, 0);
        this.realWorldEnd = new Vector(0, 0);
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

    onRegister(attribute: string, value: any) {
        super.onRegister(attribute, value);
        if (attribute === "layer") {
            value.flats.colliders.push(this);
        }
    }

    act(delta: number): void {
        super.act(delta);
        if (!this.registrations?.layer) {
            throw new Error(`Collider <${this.name}> (${this.id}) is not registered to a layer. Collisions will not be checked.`);
        }

        const transform = this.sibling<Transform>("Transform");
        if (!transform) return;

        this.updateCollider(transform);

        this.colliding = false;
        this.collidingWith.clear();

        const layer = this.registrations.layer as Part;
        const colliders = layer.flats.colliders as Collider[];
        for (const other of colliders) {
            if (other === this) continue;
            if (this.checkCollision(other)) {
                this.colliding = true;
                this.collidingWith.add(other);
            }
        }

        this.hoverbug = `${this.colliding ? "🟥" : "🟩"} - ${Array.from(this.collidingWith).map(o => o.name).join(", ")} objects`;

        if (this.top instanceof Game && this.top.devmode) {
            const ctx = this.top.context;
            if (ctx) {
                this.drawDebug(ctx);
            }
        }
    }

    checkCollision(other: Collider): boolean {
        if (other.tag === this.tag && this.tag !== "<Untagged>") return false;

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
}
