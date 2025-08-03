# Vector

**Extends:** None

The `Vector` class is a fundamental utility for handling 2D mathematics in the Forge engine. It's used to represent positions, scales, velocities, and directions.

## Constructor

`new Vector(x, y)`

-   `x: number`
    The horizontal component of the vector.

-   `y: number`
    The vertical component of the vector.

## Properties

-   `x: number`
    The horizontal component of the vector.

-   `y: number`
    The vertical component of the vector.

## Methods

-   `distance(other: Vector): number`
    Calculates the Euclidean distance between this vector and another vector.

-   `add(other: number | Vector): Vector`
    Returns a new `Vector` that is the sum of this vector and another vector or a scalar.

-   `toObject(): { x: number, y: number }`
    Returns a plain JavaScript object representation of the vector.

-   `toArray(): [number, number]`
    Returns an array representation of the vector.

-   `subtract(other: number | Vector): Vector`
    Returns a new `Vector` that is the result of subtracting another vector or a scalar from this one.

-   `multiply(other: number | Vector): Vector`
    Returns a new `Vector` multiplied by a single number (scalar) or by another `Vector` (component-wise).

-   `divide(other: number | Vector): Vector`
    Returns a new `Vector` divided by a single number (scalar) or by another `Vector` (component-wise).

-   `length(): number`
    Calculates the length (magnitude) of the vector.

-   `toString(): string`
    Returns a string representation of the vector.

-   `normalize(): Vector`
    Returns a new `Vector` with the same direction but a magnitude of 1.

-   `dot(other: Vector): number`
    Calculates the dot product of this vector and another.

-   `clone(): Vector`
    Returns a new `Vector` that is a copy of this vector.

-   `set(...args: [number, number] | [Vector]): Vector`
    Sets the x and y components of the vector. Can take two numbers or another Vector.

-   `static From(scalar: number): Vector`
    Creates a new `Vector` with both x and y components set to the given scalar value.

## Examples

### Basic Vector Operations

```javascript
import { Vector } from './Math/Vector';

const pos1 = new Vector(10, 20);
const pos2 = new Vector(5, 15);

// Addition
const newPos = pos1.add(pos2); // Result: Vector(15, 35)

// Subtraction
const difference = pos1.subtract(pos2); // Result: Vector(5, 5)

// Scaling
const bigger = pos1.multiply(3); // Result: Vector(30, 60)

// Magnitude
const length = difference.length(); // Result: sqrt(5*5 + 5*5) = 7.07...

// Normalizing (getting a direction)
const direction = difference.normalize(); // Result: Vector(0.707, 0.707)
```

### Using Vectors for Movement

```javascript
// In a custom Part
import { Part } from './Parts/Part';
import { Transform } from './Parts/Children/Transform';
import { Vector } from './Math/Vector';

class Mover extends Part {
    constructor() {
        super();
        this.name = 'Mover';
        this.velocity = new Vector(2, 0); // Move 2 pixels right per frame
    }

    act() {
        const transform = this.sibling<Transform>('Transform');
        if (transform) {
            // Add the velocity to the current position
            transform.position = transform.position.add(this.velocity);
        }
    }
}
```