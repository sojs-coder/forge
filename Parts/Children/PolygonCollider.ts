import { Vector } from "../../Math/Vector";
import { Part } from "../Part";
import { Collider } from "./Collider";
import type { Transform } from "./Transform";
import { Game } from "../Game";
import { BoxCollider } from "./BoxCollider"; // For collision with BoxCollider

export class PolygonCollider extends Collider {
    localVertices: Vector[];
    worldVertices: Vector[] = [];
    realWorldStart: Vector; // AABB of the polygon for broad-phase or debug
    realWorldEnd: Vector;   // AABB of the polygon for broad-phase or debug

    constructor({ vertices }: { vertices: Vector[] }) {
        super();
        this.name = "PolygonCollider";
        this.localVertices = vertices;
        this.realWorldStart = new Vector(0, 0); // Will be updated in act(), onMount()
        this.realWorldEnd = new Vector(0, 0);   // Will be updated in act(), onMount()
        this.type = "PolygonCollider";
    }

    onMount(parent: Part) {
        super.onMount(parent);

        if (!this.sibling("Transform")) {
            this.top?.warn(
                `PolygonCollider <${this.name}> (${this.id}) is not attached to a parent with a Transform component. Please ensure it is mounted to a GameObject with a Transform`
            );
            return;
        }
        this.updateWorldVertices();
    }
    get vertices(): Vector[] {
        return this.localVertices; // Return local vertices for consistency
    }
    act(delta: number) {
        super.act(delta);

        if (!this.sibling("Transform")) {
            this.top?.warn(
                `PolygonCollider <${this.name}> (${this.id}) is not attached to a parent with a Transform component. Skipping`
            );
            return;
        }

        this.updateWorldVertices();

        this.colliding = false;
        const layer = this.registrations?.layer as Part | undefined;
        const colliders = layer?.flats.colliders as Collider[] || [];
        this.collidingWith = new Set<Collider>(); // Reset collidingWith list for this frame
        for (const other of colliders) {
            if (other === this) continue;
            if (this.checkCollision(other)) {
                this.colliding = true;
                this.collidingWith.add(other);
            }
        }

        if (this.top instanceof Game && this.top.devmode) {
            const ctx = this.top.context;
            if (ctx) {
                ctx.save();
                ctx.strokeStyle = this.colliding ? "rgba(255, 0, 100, 0.8)" : "rgba(0, 255, 100, 0.8)";
                ctx.lineWidth = 1;

                ctx.beginPath();
                ctx.moveTo(this.worldVertices[0].x, this.worldVertices[0].y);
                for (let i = 1; i < this.worldVertices.length; i++) {
                    ctx.lineTo(this.worldVertices[i].x, this.worldVertices[i].y);
                }
                ctx.closePath();
                ctx.stroke();
                ctx.restore();
            }
        }
    }

    updateWorldVertices() {
        const transform = this.sibling<Transform>("Transform");
        if (!transform) {
            this.worldVertices = [];
            return;
        }

        const position = transform.worldPosition;
        const rotation = transform.rotation;
        const scale = transform.scale;

        this.worldVertices = this.localVertices.map(vertex => {
            // Apply scale
            let scaledVertex = vertex.multiply(scale);

            // Apply rotation around the origin (0,0) of the local space
            if (rotation !== 0) {
                const cos = Math.cos(rotation);
                const sin = Math.sin(rotation);
                scaledVertex = new Vector(
                    scaledVertex.x * cos - scaledVertex.y * sin,
                    scaledVertex.x * sin + scaledVertex.y * cos
                );
            }
            // Translate to world position (which is the center of the object)
            return position.add(scaledVertex);
        });

        // Update AABB for the polygon
        const xs = this.worldVertices.map(v => v.x);
        const ys = this.worldVertices.map(v => v.y);
        this.realWorldStart = new Vector(Math.min(...xs), Math.min(...ys));
        this.realWorldEnd = new Vector(Math.max(...xs), Math.max(...ys));
    }

    checkCollision(other: Collider): boolean {
        if (other instanceof BoxCollider) {
            return this.checkPolygonVsBox(this, other);
        } else if (other instanceof PolygonCollider) {
            return this.checkPolygonVsPolygon(this, other);
        }
        this.top?.warn("Collision checks are only supported between BoxColliders and PolygonColliders.");
        return false;
    }

    // SAT implementation for Polygon vs Polygon
    private checkPolygonVsPolygon(poly1: PolygonCollider, poly2: PolygonCollider): boolean {
        const axes1 = this.getAxes(poly1.worldVertices);
        const axes2 = this.getAxes(poly2.worldVertices);

        // Combine all axes
        const axes = axes1.concat(axes2);

        for (const axis of axes) {
            const projection1 = this.project(poly1.worldVertices, axis);
            const projection2 = this.project(poly2.worldVertices, axis);

            if (!this.overlap(projection1, projection2)) {
                return false; // Found a separating axis
            }
        }
        return true; // No separating axis found, polygons are colliding
    }

    // SAT implementation for Polygon vs Box
    private checkPolygonVsBox(poly: PolygonCollider, box: BoxCollider): boolean {
        // Treat the box as a polygon
        const boxVertices = box.rotatedCorners; // BoxCollider already calculates rotated corners

        const axes1 = this.getAxes(poly.worldVertices);
        const axes2 = this.getAxes(boxVertices); // Axes for the box (its normals)

        const axes = axes1.concat(axes2);

        for (const axis of axes) {
            const projection1 = this.project(poly.worldVertices, axis);
            const projection2 = this.project(boxVertices, axis);

            if (!this.overlap(projection1, projection2)) {
                return false; // Found a separating axis
            }
        }
        return true; // No separating axis found, they are colliding
    }


}