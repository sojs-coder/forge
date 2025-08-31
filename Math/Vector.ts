import type { Point } from "./LineIntersections";

export class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    distance(other: Vector): number {
        return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
    }
    add(other: number | Vector): Vector {
        if (other instanceof Vector) {
            return new Vector(this.x + other.x, this.y + other.y);
        }
        return new Vector(this.x + other, this.y + other);
    }
    toObject(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }
    toArray(): [number, number] {
        return [this.x, this.y];
    }
    subtract(other: number | Vector): Vector {
        if (other instanceof Vector) {
            return new Vector(this.x - other.x, this.y - other.y);
        }
        return new Vector(this.x - other, this.y - other);
    }
    multiply(other: number | Vector): Vector {
        if (other instanceof Vector) {
            return new Vector(this.x * other.x, this.y * other.y);
        }
        return new Vector(this.x * other, this.y * other);
    }
    divide(other: number | Vector): Vector {
        if (other instanceof Vector) {
            if (other.x === 0 || other.y === 0) throw new Error("Cannot divide by zero");
            return new Vector(this.x / other.x, this.y / other.y);
        }
        if (other === 0) throw new Error("Cannot divide by zero");
        return new Vector(this.x / other, this.y / other);
    }
    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    magnitude(): number {
        return this.length();
    }
    equals(other: Vector): boolean {
        return this.x === other.x && this.y === other.y;
    }
    toString(): string {
        return `[${this.x}, ${this.y}]`;
    }
    normalize(): Vector {
        const len = this.length();
        if (len === 0) {
            return new Vector(0, 0);
        }
        return new Vector(this.x / len, this.y / len);
    }
    dot(other: Vector): number {
        return this.x * other.x + this.y * other.y;
    }
    clone(): Vector {
        return new Vector(this.x, this.y);
    }
    set(...args: [number, number] | [Vector]): Vector {
        if (args.length === 1 && args[0] instanceof Vector) {
            this.x = args[0].x;
            this.y = args[0].y;
        } else if (args.length === 2) {
            this.x = args[0];
            this.y = args[1];
        } else {
            throw new Error("Invalid arguments for set method");
        }
        return this;
    }
    addInPlace(other: Vector): Vector {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    static From(scalar: number | Point): Vector {
        if (typeof scalar === "number") {
            return new Vector(scalar, scalar);
        } else {
            return new Vector(scalar.x, scalar.y);
        }
    }
}