# MultiPolygonCollider

**Extends:** [Collider](./Collider.md)

A `MultiPolygonCollider` is a collider that can be composed of multiple polygons. This is useful for creating complex shapes that are not possible with a single polygon, or for representing objects that have holes.

## Constructor

`new MultiPolygonCollider({ polygons, tag })`

-   `polygons: Vector[][]`
    An array of polygons, where each polygon is an array of `Vector`s.

-   `tag?: string`
    An optional tag for the collider. Defaults to `"<Untagged>"`.

## Properties

-   `polygons: Vector[][]`
    An array of polygons, where each polygon is an array of `Vector`s.

-   `_worldPolygons: Vector[][]`
    The polygons in world coordinates.

## Examples

### Creating a MultiPolygonCollider

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { MultiPolygonCollider } from './Parts/Children/MultiPolygonCollider';

const myObject = new GameObject({ name: 'MyObject' });

myObject.addChildren(
    new Transform({ /* ... */ }),
    new MultiPolygonCollider({
        polygons: [
            [
                new Vector(-50, -50),
                new Vector(50, -50),
                new Vector(50, 50),
                new Vector(-50, 50)
            ],
            [
                new Vector(-25, -25),
                new Vector(25, -25),
                new Vector(25, 25),
                new Vector(-25, 25)
            ]
        ]
    })
);

myGameplayLayer.addChild(myObject);
```
