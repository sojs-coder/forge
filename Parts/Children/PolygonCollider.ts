import { Vector } from "../../Math/Vector";
import { Part } from "../Part";
import { Collider } from "./Collider";
import type { Transform } from "./Transform";
import { Game } from "../Game";
import { BoxCollider } from "./BoxCollider";

export class PolygonCollider extends Collider {
    localVertices: Vector[];
    _worldVertices: Vector[] = [];

    constructor({ vertices, tag }: { vertices: Vector[], tag?: string }) {
        super({ tag: tag });
        this.name = "PolygonCollider";
        this.localVertices = vertices;
        this.vertices = vertices;
        let maxDist = 0;
        for (let i = 0; i < this.localVertices.length; i++) {
            for (let j = i + 1; j < this.localVertices.length; j++) {
                const dist = this.localVertices[i].distance(this.localVertices[j]);
                if (dist > maxDist) {
                    maxDist = dist;
                }
            }
        }
        this.radius = maxDist;

        this.type = "PolygonCollider";
    }

    get worldVertices(): Vector[] {
        return this._worldVertices;
    }

    act(delta: number) {
        super.act(delta);
    }

    updateCollider(transform: Transform) {
        const position = transform.worldPosition;
        const rotation = transform.rotation;
        const scale = transform.scale;

        this._worldVertices = this.localVertices.map(vertex => {
            let scaledVertex = vertex.multiply(scale);

            if (rotation !== 0) {
                const cos = Math.cos(rotation);
                const sin = Math.sin(rotation);
                scaledVertex = new Vector(
                    scaledVertex.x * cos - scaledVertex.y * sin,
                    scaledVertex.x * sin + scaledVertex.y * cos
                );
            }
            return position.add(scaledVertex);
        });

        const xs = this._worldVertices.map(v => v.x);
        const ys = this._worldVertices.map(v => v.y);
        this.realWorldStart.set(Math.min(...xs), Math.min(...ys));
        this.realWorldEnd.set(Math.max(...xs), Math.max(...ys));
    }

    narrowPhaseCheck(other: Collider): boolean {
        if (other instanceof BoxCollider) {
            return this.checkPolygonVsBox(this, other);
        } else if (other instanceof PolygonCollider) {
            return this.checkPolygonVsPolygon(this, other);
        }
        this.top?.warn("Collision checks are only supported between BoxColliders and PolygonColliders.");
        return false;
    }

    private checkPolygonVsPolygon(poly1: PolygonCollider, poly2: PolygonCollider): boolean {
        const axes1 = this.getAxes(poly1.worldVertices);
        const axes2 = this.getAxes(poly2.worldVertices);

        const axes = axes1.concat(axes2);

        for (const axis of axes) {
            const projection1 = this.project(poly1.worldVertices, axis);
            const projection2 = this.project(poly2.worldVertices, axis);

            if (!this.overlap(projection1, projection2)) {
                return false;
            }
        }
        return true;
    }

    private checkPolygonVsBox(poly: PolygonCollider, box: BoxCollider): boolean {
        const boxVertices = box.worldVertices;

        const axes1 = this.getAxes(poly.worldVertices);
        const axes2 = this.getAxes(boxVertices);

        const axes = axes1.concat(axes2);

        for (const axis of axes) {
            const projection1 = this.project(poly.worldVertices, axis);
            const projection2 = this.project(boxVertices, axis);

            if (!this.overlap(projection1, projection2)) {
                return false;
            }
        }
        return true;
    }

    drawDebug(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.strokeStyle = this.colliding ? "rgba(255, 0, 100, 0.8)" : "rgba(0, 255, 100, 0.8)";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(this._worldVertices[0].x, this._worldVertices[0].y);
        for (let i = 1; i < this._worldVertices.length; i++) {
            ctx.lineTo(this._worldVertices[i].x, this._worldVertices[i].y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    override clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        const clonedPolygonCollider = new PolygonCollider({
            vertices: this.localVertices.map(v => v.clone()),
            tag: this.tag
        });
        memo.set(this, clonedPolygonCollider);

        this._cloneProperties(clonedPolygonCollider, memo);

        clonedPolygonCollider.colliding = false;
        clonedPolygonCollider.base = this.base;
        clonedPolygonCollider.type = this.type;
        clonedPolygonCollider.collidingWith = new Set<Collider>();

        return clonedPolygonCollider as this;
    }
}