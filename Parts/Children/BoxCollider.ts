import { drawBox } from "../../helpers";
import { Vector } from "../../Math/Vector";
import { Game } from "../Game";
import { Part } from "../Part";
import { Collider } from "./Collider";
import { Transform } from "./Transform";
import { PolygonCollider } from "./PolygonCollider";

export class BoxCollider extends Collider {
    start: Vector;
    end: Vector;
    realWorldStart: Vector;
    realWorldEnd: Vector;
    rotatedCorners: Vector[] = []; // Store the four corners of the rotated box
    constructor({ width, height }: { width: number, height: number }) {
        super();
        this.name = "BoxCollider";
        this.start = new Vector(-width / 2, -height / 2);
        this.end = new Vector(width / 2, height / 2);
        this.realWorldStart = this.start; // Will be updated in act(), onMount()
        this.realWorldEnd = this.end; // Will be updated in act(), onMount()
        this.type = "BoxCollider";
    }
    onMount(parent: Part) {
        super.onMount(parent);
        const transform = this.sibling<Transform>("Transform")
        if (!transform) {
            console.warn(
                `BoxCollider <${this.name}> (${this.id}) does not have Transform sibling. Skipping`
            );
            return;
        }

        // Initialize realWorldStart and realWorldEnd based on parent's Transform
        this.updateRotatedBounds(transform);


    }

    // Helper method to calculate rotated bounding box
    updateRotatedBounds(transform: Transform) {
        const scaledStart = this.start.multiply(transform.scale);
        const scaledEnd = this.end.multiply(transform.scale);

        // Calculate the center of the box (in local space)
        const center = new Vector(
            (scaledStart.x + scaledEnd.x) / 2,
            (scaledStart.y + scaledEnd.y) / 2
        );

        // Corners in local space (top-left, top-right, bottom-right, bottom-left)
        const corners = [
            scaledStart, // top-left
            new Vector(scaledEnd.x, scaledStart.y), // top-right
            scaledEnd, // bottom-right
            new Vector(scaledStart.x, scaledEnd.y), // bottom-left
        ];

        // Rotate each corner around the center, then translate to world position
        this.rotatedCorners = corners.map(corner => {
            const rel = corner.subtract(center);
            if (transform.rotation === 0) {
                return transform.worldPosition.add(corner);
            }
            const cos = Math.cos(transform.rotation);
            const sin = Math.sin(transform.rotation);
            const rotated = new Vector(
                rel.x * cos - rel.y * sin,
                rel.x * sin + rel.y * cos
            );

            return transform.worldPosition.add(rotated.add(center));
        });

        // Calculate axis-aligned bounding box from rotated corners
        const xs = this.rotatedCorners.map(corner => corner.x);
        const ys = this.rotatedCorners.map(corner => corner.y);

        this.realWorldStart = new Vector(Math.min(...xs), Math.min(...ys));
        this.realWorldEnd = new Vector(Math.max(...xs), Math.max(...ys));
    }


    checkCollision(other: Collider): boolean {

        if (other instanceof BoxCollider) {
            return !(
                this.realWorldEnd.x < other.realWorldStart.x || this.realWorldStart.x > other.realWorldEnd.x ||
                this.realWorldEnd.y < other.realWorldStart.y || this.realWorldStart.y > other.realWorldEnd.y
            );
        } else if (other instanceof PolygonCollider) {
            // Delegate to PolygonCollider's checkCollision method
            return other.checkCollision(this);
        }
        console.warn("Collision checks are only supported between BoxColliders and PolygonColliders.");
        return false;
    }
    get vertices(): Vector[] {
        const width = this.end.x - this.start.x;
        const height = this.end.y - this.start.y;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        const vertices = [
            new Vector(-halfWidth, -halfHeight),
            new Vector(halfWidth, -halfHeight),
            new Vector(halfWidth, halfHeight),
            new Vector(-halfWidth, halfHeight),
        ];
        return vertices;
    }
    act(delta: number) {
        super.act(delta); // Pass to children
        const transform = this.sibling<Transform>("Transform");
        if (!transform) {
            throw new Error(`BoxCollider <${this.name}> (${this.id}) does not have a Transform sibling. Ensure it is mounted to a GameObject with a Transform component.`);
        }

        if (transform.rotation !== 0) {
            // If rotated, replace with a PolygonCollider
            const vertices = this.vertices;

            const polygonCollider = new PolygonCollider({ vertices });
            this.parent?.addChild(polygonCollider);
            this.parent?.removeChild(this);
            return; // Stop further execution for this BoxCollider instance
        }
        this.updateRotatedBounds(transform);

        this.colliding = false;

        const layer = this.registrations?.layer as Part | undefined;
        const colliders = layer?.flats.colliders as Collider[] || [];
        this.collidingWith = new Set<Collider>();; // Reset collidingWith list for this frame
        for (const other of colliders) {
            if (other === this) continue;
            if (this.checkCollision(other)) {
                this.colliding = true;
                this.collidingWith.add(other);
            }
        }
        if (this.top instanceof Game && this.top.devmode) {
            if (transform.rotation === 0) {
                // Draw regular box if not rotated
                drawBox(
                    this.top.context,
                    this.realWorldStart.x,
                    this.realWorldStart.y,
                    this.realWorldEnd.x - this.realWorldStart.x,
                    this.realWorldEnd.y - this.realWorldStart.y,
                    this.colliding
                        ? "rgba(255, 0, 0, 0.5)"
                        : "rgba(0, 255, 0, 0.5)"
                );
            }
        }
    }
}
