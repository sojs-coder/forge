# BoxCollider

**Extends:** [Collider](./Collider.md)

A `BoxCollider` is a rectangular-shaped collider. It's the most common and computationally cheapest type of collider, perfect for objects that are roughly box-shaped.

**Note:** Currently, `BoxCollider` does not support rotation. If its `Transform` is rotated, it will automatically convert itself into a `PolygonCollider` to maintain accurate collision detection.

## Properties

-   `start: Vector`
    The top-left corner of the collision box, relative to the `Transform`'s position.

-   `end: Vector`
    The bottom-right corner of the collision box, relative to the `Transform`'s position.

-   `width: number` & `height: number` (Constructor parameters)
    The dimensions of the collision box. The `start` and `end` vectors are calculated from these. For a `width` of 50 and `height` of 100, `start` would be `(-25, -50)` and `end` would be `(25, 50)`.

## Examples

### Creating a BoxCollider for a Player

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { BoxCollider } from './Parts/Children/BoxCollider';

const player = new GameObject({ name: 'Player' });

player.addChildren(
    new Transform({ /* ... */ }),
    new BoxCollider({
        width: 32,
        height: 48
    })
);

myGameplayLayer.addChild(player);
```

### Using a BoxCollider as a Trigger

A trigger is a collider that detects collisions but doesn't cause a physical response. You can use a `BoxCollider` to create a zone that triggers an event when the player enters it.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { BoxCollider } from './Parts/Children/BoxCollider';
import { Part } from './Parts/Part';

// A custom script for the trigger zone
class WinZone extends Part {
    constructor() { super(); this.name = 'WinZone'; }
    act() {
        const collider = this.sibling<BoxCollider>('BoxCollider');
        if (collider?.colliding) {
            for (const other of collider.collidingWith) {
                if (other.parent?.name === 'Player') {
                    console.log('You win!');
                    // (Load next level logic)
                }
            }
        }
    }
}


const winTrigger = new GameObject({ name: 'WinTrigger' });

winTrigger.addChildren(
    new Transform({ position: new Vector(750, 300) }),
    // Make the collider larger than the visual object (if any)
    new BoxCollider({ width: 50, height: 100 }),
    new WinZone() // Add our custom script
);

myGameplayLayer.addChild(winTrigger);
```
