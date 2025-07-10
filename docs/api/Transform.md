# Transform

**Extends:** [Part](./Part.md)

The `Transform` is one of the most essential components. It defines the position, rotation, and scale of a `GameObject` within the game world. Every `GameObject` that needs to exist visually or physically in your scene must have a `Transform` component as a child.

Other components, like renderers and colliders, will look for a `Transform` as their sibling to know where to draw or position themselves.

## Properties

-   `position: Vector`
    The position of the `GameObject` relative to its parent's position. This is its *local* position.

-   `worldPosition: Vector`
    The final, absolute position of the `GameObject` in the game world. This value is automatically calculated by adding the `position` to the `worldPosition` of its parent. You typically read this value but don't set it directly.

-   `rotation: number`
    The rotation of the `GameObject` in radians, where 0 is no rotation.

-   `scale: Vector`
    The scale of the `GameObject`, where `new Vector(1, 1)` is the default, original size. `new Vector(2, 2)` would be double the size.

## Examples

### Creating a Transform

A `Transform` is almost always created as a child of a `GameObject`.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { Vector } from './Math/Vector';

const myObject = new GameObject({ name: 'MyObject' });

const myTransform = new Transform({
    position: new Vector(150, 250), // Initial position
    rotation: Math.PI / 4,          // 45 degrees
    scale: new Vector(1.5, 1.5)       // 1.5x size
});

myObject.addChild(myTransform);
```

### Using a Transform from another Part

A common pattern is for a custom script to get its `Transform` sibling and modify its properties.

```javascript
// Inside a custom Part, like a PlayerController
import { Part } from './Parts/Part';
import { Transform } from './Parts/Children/Transform';

class Mover extends Part {
    constructor() {
        super();
        this.name = 'Mover';
    }

    act() {
        // Get the Transform sibling
        const transform = this.sibling<Transform>('Transform');

        if (transform) {
            // Move the object to the right
            transform.position.x += 1;

            // Gently rotate the object
            transform.rotation += 0.01;
        }
    }
}

// Setup:
const movingObject = new GameObject({ name: 'MoverObject' });
movingObject.addChildren(
    new Transform(), // Add the transform
    new Mover()      // Add our custom script
);
```
