import { Vector } from "../../Math/Vector";
import type { Camera } from "../Camera";
import { Part } from "../Part";
import type { Transform } from "./Transform";

export class Collider extends Part {
    colliding: boolean = false;
    collidingWith: Set<Collider> = new Set(); // List of colliding parts
    constructor() {
        super({ name: "Collider" });
        this.type = "Collider";
        this.base = "Collider";
    }

    clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        const clonedCollider = new Collider();

        memo.set(this, clonedCollider);

        this._cloneProperties(clonedCollider, memo);

        // Reset properties that need re-initialization after construction
        clonedCollider.colliding = false;
        clonedCollider.collidingWith = new Set<Collider>();

        return clonedCollider as this;
    }

    onMount(parent: Part) {
        super.onMount(parent);
        if (!this.sibling("Transform")) {
            this.top?.warn(
                `Collider <${this.name}> (${this.id}) does not have Transform sibling. Please ensure you add a Transform component before adding a Collider. It will not technically effect functionality, but it is good practice.`
            );
            return;
        }
    }
    get vertices(): Vector[] {
        // Override in subclasses to provide collider-specific vertices
        return [];
    }

    onRegister(attribute: string, value: any) {
        super.onRegister(attribute, value);
        if (attribute === "layer") {
            value.flats.colliders.push(this);
        }
    }

    onUnregister(attribute: string, value: any) {
        super.onUnregister(attribute, value);
        if (attribute === "layer") {
            const list = value.flats.colliders;
            const index = list.indexOf(this);
            if (index !== -1) {
                list.splice(index, 1);
            }
        }
    }

    act(delta: number) {
        super.act(delta);
        if (!this.registrations?.layer) {
            throw new Error(`Collider <${this.name}> (${this.id}) is not registered to a layer. Collisions will not be checked. Collisions require layers.`)
        }
        this.hoverbug = `${this.colliding ? "🟥" : "🟩"} - ${Array.from(this.collidingWith).map(o => o.name).join(",")} objects`

    }

    isVisible(camera: Camera): boolean {
        if (!this.top) {
            throw new Error("Collider cannot calculate visibility without a 'top' (Game instance).");
        }

        // 1. Get camera's view boundaries in world space.
        const { offset, scale } = camera.getViewMatrix();
        // cameraPos is the world coordinate at the center of the camera's view.
        const cameraPos = offset.multiply(-1);

        const screenWidth = this.top.width;
        const screenHeight = this.top.height;

        // Calculate the width and height of the camera's view in world units.
        const viewWidth = screenWidth / scale.x;
        const viewHeight = screenHeight / scale.y;

        // 2. Get collider's AABB in world space.
        const vertices = this.vertices;
        if (vertices.length === 0) {
            return false; // No vertices means it has no shape to be visible.
        }

        const transform = this.sibling<Transform>("Transform");
        if (!transform) {
            throw new Error("Can not calculate visibility if transform sibling is not present");
        }

        const worldVertices = vertices.map(vertex => {
            return vertex.add(transform.position)
        });

        const cameraVertices = [
            new Vector(cameraPos.x - viewWidth / 2, cameraPos.y - viewHeight / 2),
            new Vector(cameraPos.x + viewWidth / 2, cameraPos.y - viewHeight / 2),
            new Vector(cameraPos.x + viewWidth / 2, cameraPos.y + viewHeight / 2),
            new Vector(cameraPos.x - viewWidth / 2, cameraPos.y + viewHeight / 2)
        ]


        return this.checkVerticesAgainstVertices(worldVertices, cameraVertices);
    }

    protected checkVerticesAgainstVertices(vertices1: Vector[], vertices2: Vector[]) {
        const axes1 = this.getAxes(vertices1);
        const axes2 = this.getAxes(vertices2);

        const axes = axes1.concat(axes2);

        for(const axis of axes) {
            const projection1 = this.project(vertices1, axis);
            const projection2 = this.project(vertices2, axis);

            if (!this.overlap(projection1, projection2)) {
                return false;
            }
        }
        
        return true;
    }
    // Helper to get axes (normals) of a polygon's edges
    protected getAxes(vertices: Vector[]): Vector[] {
        const axes: Vector[] = [];
        for (let i = 0; i < vertices.length; i++) {
            const p1 = vertices[i];
            const p2 = vertices[i === vertices.length - 1 ? 0 : i + 1];
            const edge = p2.subtract(p1);
            const normal = new Vector(-edge.y, edge.x).normalize(); // Perpendicular vector (normal)
            axes.push(normal);
        }
        return axes;
    }
    // Helper to project a polygon onto an axis
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
    // Helper to check if two projections overlap
    protected overlap(proj1: { min: number, max: number }, proj2: { min: number, max: number }): boolean {
        return proj1.max >= proj2.min && proj2.max >= proj1.min;
    }
}
