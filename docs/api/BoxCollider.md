# BoxCollider

**Extends:** [Collider](./Collider.md)

A `BoxCollider` is a rectangular-shaped collider. It's the most common and computationally cheapest type of collider, perfect for objects that are roughly box-shaped.

## Constructor

`new BoxCollider({ width, height, tag })`

-   `width: number`
    The width of the collision box.

-   `height: number`
    The height of the collision box.

-   `tag?: string`
    An optional tag for the collider. Defaults to `"<Untagged>"`.

## Properties

-   `start: Vector`
    The starting point of the box, relative to the center of the object.

-   `end: Vector`
    The ending point of the box, relative to the center of the object.

-   `realWorldStart: Vector`
    The starting point of the box in world coordinates.

-   `realWorldEnd: Vector`
    The ending point of the box in world coordinates.

-   `rotatedCorners: Vector[]`
    An array of the four corners of the rotated box.

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