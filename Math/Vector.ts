export class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(other: number | Vector): Vector {
        if (other instanceof Vector) {
            return new Vector(this.x + other.x, this.y + other.y);
        }
        return new Vector(this.x + other, this.y + other);
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
    toString(): string {
        return `[${this.x}, ${this.y}]`;
    }
    normalize(): Vector {
        const len = this.length();
        if (len === 0) throw new Error("Cannot normalize zero-length vector");
        return new Vector(this.x / len, this.y / len);
    }
    dot(other: Vector): number {
        return this.x * other.x + this.y * other.y;
    }
    static From(scalar: number): Vector {
        return new Vector(scalar, scalar);
    }
}