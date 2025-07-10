# Vector

**Extends:** None

The `Vector` class is a fundamental utility for handling 2D mathematics in the Forge engine. It's used to represent positions, scales, velocities, and directions.

## Properties

-   `x: number`
    The horizontal component of the vector.

-   `y: number`
    The vertical component of the vector.

## Methods

-   `add(other: Vector): Vector`
    Returns a new `Vector` that is the sum of this vector and another.

-   `subtract(other: Vector): Vector`
    Returns a new `Vector` that is the result of subtracting another vector from this one.

-   `multiply(scalar: number | Vector): Vector`
    Returns a new `Vector` multiplied by a single number (scalar) or by another `Vector` (component-wise).

-   `divide(scalar: number | Vector): Vector`
    Returns a new `Vector` divided by a single number (scalar) or by another `Vector` (component-wise).

-   `dot(other: Vector): number`
    Calculates the dot product of this vector and another.

-   `magnitude(): number`
    Calculates the length (magnitude) of the vector.

-   `normalize(): Vector`
    Returns a new `Vector` with the same direction but a magnitude of 1.

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
const length = difference.magnitude(); // Result: sqrt(5*5 + 5*5) = 7.07...

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
