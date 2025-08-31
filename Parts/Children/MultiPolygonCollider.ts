import { Vector } from "../../Math/Vector";
import { Collider, type MultiPolygon } from "./Collider";
import type { Transform } from "./Transform";
import { unionPolygons } from "../../Math/PolygonUnion";


export class MultiPolygonCollider extends Collider {
    polygons: Vector[][];
    _worldPolygons: Vector[][] = [];
    unioned: Vector[][] = [];
    constructor({ polygons, tag = "<Untagged>" }: { polygons: Vector[][], tag?: string }) {
        super({ tag, allowMerge: tag !== '<Untagged>' });
        this.name = "MultiPolygonCollider";
        this.polygons = polygons;
        this.type = "MultiPolygonCollider";
        let maxDist = 0;
        const allVertices = polygons.flat();
        for (let i = 0; i < allVertices.length; i++) {
            for (let j = i + 1; j < allVertices.length; j++) {
                const dist = allVertices[i].distance(allVertices[j]);
                if (dist > maxDist) {
                    maxDist = dist;
                }
            }
        }
        this.radius = maxDist;
    }

    getGeometry(): MultiPolygon {
        return this._worldPolygons.map(polygon => {
            return polygon.map(v => v.toArray());
        });
    }

    get worldVertices(): Vector[] {
        const allVertices = this._worldPolygons.flat();
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

        return lower.concat(upper);
    }

    act(delta: number) {
        super.act(delta);
    }

    override _updateVerticesAfterMerge(polygons: Vector[][]): void {
        // console.log("Before merging: polygons.length", polygons.length);
        // const unionResult: Vector[][] = unionPolygons(polygons);
        // if (unionResult.length > 0) {
        //     this.polygons = unionResult;
        // } else {
        //     // Fallback: keep original polygons if union fails
        //     console.warn("Union failed, keeping original polygons");
        //     this.polygons = polygons;
        // }
        this.polygons = polygons;
    }

    updateCollider(transform: Transform) {
        const position = transform.worldPosition;
        const rotation = transform.rotation;
        const scale = transform.scale;

        this._worldPolygons = this.polygons.map(polygon => {
            return polygon.map(vertex => {
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
        });

        const allWorldVertices = this._worldPolygons.flat();
        const xs = allWorldVertices.map(v => v.x);
        const ys = allWorldVertices.map(v => v.y);
        this.realWorldStart.set(Math.min(...xs), Math.min(...ys));
        this.realWorldEnd.set(Math.max(...xs), Math.max(...ys));
    }

    narrowPhaseCheck(other: Collider): boolean {
        if (other instanceof MultiPolygonCollider) {
            for (const p1 of this._worldPolygons) {
                for (const p2 of other._worldPolygons) {
                    if (this._checkPolygonVsPolygon(p1, p2)) {
                        return true;
                    }
                }
            }
            return false;
        }

        for (const polygon of this._worldPolygons) {
            if (this._checkPolygonVsPolygon(polygon, other.worldVertices)) {
                return true;
            }
        }

        return false;
    }

    drawDebug(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.strokeStyle = this.colliding ? "rgba(255, 0, 100, 0.8)" : "rgba(0, 255, 100, 0.8)";
        ctx.lineWidth = 1;

        for (const polygon of this._worldPolygons) {
            ctx.beginPath();
            ctx.moveTo(polygon[0].x, polygon[0].y);
            for (let i = 1; i < polygon.length; i++) {
                ctx.lineTo(polygon[i].x, polygon[i].y);
            }
            ctx.closePath();
            ctx.stroke();
        }
        ctx.restore();
    }

    override clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        const clonedMultiPolygonCollider = new MultiPolygonCollider({
            polygons: this.polygons.map(p => p.map(v => v.clone())),
            tag: this.tag
        });
        memo.set(this, clonedMultiPolygonCollider);

        this._cloneProperties(clonedMultiPolygonCollider, memo);

        clonedMultiPolygonCollider.colliding = false;
        clonedMultiPolygonCollider.base = this.base;
        clonedMultiPolygonCollider.type = this.type;
        clonedMultiPolygonCollider.collidingWith = new Set<Collider>();

        return clonedMultiPolygonCollider as this;
    }
}
