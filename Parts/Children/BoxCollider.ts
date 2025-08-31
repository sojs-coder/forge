import { Vector } from "../../Math/Vector";
import { Game } from "../Game";
import { Part } from "../Part";
import { Collider } from "./Collider";
import { Transform } from "./Transform";
import { MultiPolygonCollider } from "./MultiPolygonCollider";
import { PolygonCollider } from "./PolygonCollider";
import type { Polygon } from "martinez-polygon-clipping";

export class BoxCollider extends Collider {
    start: Vector;
    end: Vector;
    rotatedCorners: Vector[] = [];
    width: number;
    height: number;

    private cachedAxes: Vector[] = [];
    private lastRotation: number = NaN;
    private lastScale: Vector = new Vector(NaN, NaN);

    constructor({ width, height, tag = "<Untagged>" }: { width: number; height: number; tag?: string }) {
        super({ tag, allowMerge: tag !== '<Untagged>' });
        this.name = "BoxCollider";
        this.width = width;
        this.height = height;
        this.start = new Vector(-width / 2, -height / 2);
        this.end = new Vector(width / 2, height / 2);
        this.radius = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
        this.type = "BoxCollider";

        for (let i = 0; i < 4; i++) {
            this.rotatedCorners.push(new Vector(0, 0));
            this.vertices.push(new Vector(0, 0));
        }
    }

    get worldVertices(): Vector[] {
        return this.rotatedCorners;
    }

    getGeometry(): Polygon {
        return [this.worldVertices.map(v => v.toArray())];
    }

    updateCollider(transform: Transform) {
        const cos = Math.cos(transform.rotation);
        const sin = Math.sin(transform.rotation);

        const halfW = (this.width * transform.scale.x) / 2;
        const halfH = (this.height * transform.scale.y) / 2;

        const localCorners = [
            new Vector(-halfW, -halfH),
            new Vector(halfW, -halfH),
            new Vector(halfW, halfH),
            new Vector(-halfW, halfH),
        ];

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        for (let i = 0; i < 4; i++) {
            const c = localCorners[i];
            const x = c.x * cos - c.y * sin + transform.worldPosition.x;
            const y = c.x * sin + c.y * cos + transform.worldPosition.y;

            this.rotatedCorners[i].set(x, y);
            this.vertices[i].set(x - transform.worldPosition.x, y - transform.worldPosition.y);
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }

        this.realWorldStart.set(minX, minY);
        this.realWorldEnd.set(maxX, maxY);

        if (transform.rotation !== this.lastRotation || !transform.scale.equals(this.lastScale)) {
            this.cachedAxes = this.getAxes(this.rotatedCorners);
            this.lastRotation = transform.rotation;
            this.lastScale = transform.scale.clone();
        }
    }

    narrowPhaseCheck(other: Collider): boolean {
        if (other instanceof BoxCollider) {
            return this.checkBoxVsBox(this, other);
        } else if (other instanceof PolygonCollider || other instanceof MultiPolygonCollider) {
            return other.narrowPhaseCheck(this);
        }

        this.top?.warn(`Collision with unsupported collider type: ${other.type}`);
        return false;
    }

    private checkBoxVsBox(box1: BoxCollider, box2: BoxCollider): boolean {
        const axes = box1.cachedAxes.concat(box2.cachedAxes);
        for (const axis of axes) {
            const proj1 = this.project(box1.rotatedCorners, axis);
            const proj2 = this.project(box2.rotatedCorners, axis);
            if (!this.overlap(proj1, proj2)) return false;
        }
        return true;
    }

    override _updateVerticesAfterMerge(polygons: Vector[][][]): void {
        const newCollider = new MultiPolygonCollider({ polygons, tag: this.tag });

        newCollider.active = this.active;
        newCollider.allowMerge = this.allowMerge;
        
        const parent = this.parent;
        if (parent) {
            parent.removeChild(this);
            parent.addChild(newCollider);
        }
    }

    act(delta: number) {
        super.act(delta);
    }

    drawDebug(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.strokeStyle = this.colliding ? "rgba(255,0,0,0.5)" : "rgba(0,255,0,0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.rotatedCorners[0].x, this.rotatedCorners[0].y);
        for (let i = 1; i < 4; i++) {
            ctx.lineTo(this.rotatedCorners[i].x, this.rotatedCorners[i].y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    override clone(memo = new Map()): this {
        if (memo.has(this)) return memo.get(this);

        const cloned = new BoxCollider({
            width: this.width,
            height: this.height,
            tag: this.tag,
        });
        memo.set(this, cloned);

        this._cloneProperties(cloned, memo);

        cloned.colliding = false;
        cloned.base = this.base;
        cloned.type = this.type;
        cloned.collidingWith = new Set<Collider>();

        return cloned as this;
    }
}
