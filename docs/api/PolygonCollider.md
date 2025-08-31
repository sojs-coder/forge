# PolygonCollider

**Extends:** [Collider](./Collider.md)

A `PolygonCollider` provides collision detection for objects with custom, complex shapes. It is defined by a list of vertices that form a convex polygon.

This collider is more computationally expensive than a `BoxCollider` but is essential for non-rectangular shapes, especially ones that can rotate.

## Constructor

`new PolygonCollider({ vertices })`

-   `vertices: Vector[]`
    An array of `Vector`s that define the shape of the polygon. The vertices should be defined in local space, relative to the `Transform`'s position (which acts as the center of the polygon).

## Properties

-   `localVertices: Vector[]`
    An array of `Vector`s that define the shape of the polygon in local space.

-   `worldVertices: Vector[]`
    An array of `Vector`s that define the shape of the polygon in world space.

-   `realWorldStart: Vector`
    The top-left corner of the axis-aligned bounding box (AABB) of the polygon in world coordinates.

-   `realWorldEnd: Vector`
    The bottom-right corner of the axis-aligned bounding box (AABB) of the polygon in world coordinates.

## Examples

### Creating a Triangular Collider

This example creates a `GameObject` shaped like a triangle.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { PolygonCollider } from './Parts/Children/PolygonCollider';
import { Vector } from './Math/Vector';

const triangleShip = new GameObject({ name: 'TriangleShip' });

// The vertices define the shape around the origin (0,0)
const triangleVertices = [
    new Vector(0, -20),  // Top point
    new Vector(-15, 20), // Bottom-left point
    new Vector(15, 20)   // Bottom-right point
];

triangleShip.addChildren(
    new Transform({
        position: new Vector(100, 100),
        rotation: Math.PI // Flipped upside down
    }),
    # PolygonCollider

**Extends:** [Collider](./Collider.md)

A `PolygonCollider` provides collision detection for objects with custom, complex shapes. It is defined by a list of vertices that form a convex polygon.

This collider is more computationally expensive than a `BoxCollider` but is essential for non-rectangular shapes, especially ones that can rotate.

## Constructor

`new PolygonCollider({ vertices, tag })`

-   `vertices: Vector[]`
    An array of `Vector`s that define the shape of the polygon. The vertices should be defined in local space, relative to the `Transform`'s position (which acts as the center of the polygon).

-   `tag?: string`
    An optional tag for the collider. Defaults to `"<Untagged>"`.

## Properties

-   `localVertices: Vector[]`
    An array of `Vector`s that define the shape of the polygon in local space.

-   `worldVertices: Vector[]`
    An array of `Vector`s that define the shape of the polygon in world space.

-   `realWorldStart: Vector`
    The top-left corner of the axis-aligned bounding box (AABB) of the polygon in world coordinates.

-   `realWorldEnd: Vector`
    The bottom-right corner of the axis-aligned bounding box (AABB) of the polygon in world coordinates.

## Examples

### Creating a Triangular Collider

This example creates a `GameObject` shaped like a triangle.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { PolygonCollider } from './Parts/Children/PolygonCollider';
import { Vector } from './Math/Vector';

const triangleShip = new GameObject({ name: 'TriangleShip' });

// The vertices define the shape around the origin (0,0)
const triangleVertices = [
    new Vector(0, -20),  // Top point
    new Vector(-15, 20), // Bottom-left point
    new Vector(15, 20)   // Bottom-right point
];

triangleShip.addChildren(
    new Transform({
        position: new Vector(100, 100),
        rotation: Math.PI // Flipped upside down
    }),
    new PolygonCollider({
        vertices: triangleVertices
    })
    // You would also add a custom renderer that draws a matching triangle
);

myGameplayLayer.addChild(triangleShip);
```

    // You would also add a custom renderer that draws a matching triangle
);

myGameplayLayer.addChild(triangleShip);
```