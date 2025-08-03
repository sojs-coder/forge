# Collider

**Extends:** [Part](./Part.md)

`Collider` is an abstract base class for all collision detection components. It defines the common interface for checking collisions. You don't use `Collider` directly, but rather one of its subclasses:

-   [BoxCollider](./BoxCollider.md)
-   [PolygonCollider](./PolygonCollider.md)

Colliders work within a `Layer`. They will only detect collisions with other colliders on the same `Layer`.

## Constructor

`new Collider()`

## Properties

-   `colliding: boolean`
    Is `true` if the collider is currently overlapping with at least one other collider on the same layer. Otherwise, `false`.

-   `collidingWith: Set<Collider>`
    A `Set` containing references to all the other `Collider` components this one is currently overlapping with.

## Examples

### Checking for Collisions from another Part

This example shows a `Player` script checking if its `BoxCollider` sibling has hit something.

```javascript
// In a custom Part like PlayerController
import { Part } from './Parts/Part';
import { BoxCollider } from './Parts/Children/BoxCollider';
import { GameObject } from './Parts/GameObject';

class PlayerController extends Part {
    constructor() {
        super();
        this.name = 'PlayerController';
    }

    act() {
        const collider = this.sibling<BoxCollider>('BoxCollider');

        if (collider?.colliding) {
            console.log('Player is colliding!');

            // You can be more specific by checking what you collided with
            for (const other of collider.collidingWith) {
                // 'other.parent' is the GameObject of the thing you hit
                const otherObject = other.parent as GameObject;

                if (otherObject.name === 'Lava') {
                    console.log('Ouch! Stepped in lava!');
                    // (Game over logic here)
                } else if (otherObject.name.startsWith('Coin')) {
                    console.log('Picked up a coin!');
                    otherObject.destroy(); // Assuming a destroy method
                }
            }
        }
    }
}
```