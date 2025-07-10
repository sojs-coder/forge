# AreaTrigger

**Extends:** [Part](./Part.md)

The `AreaTrigger` component is used to define a region in the game world that can detect when other colliders enter or exit it, without causing physical interactions. It's ideal for creating trigger zones for events like collecting items, entering new areas, or activating traps.

## Properties

-   `onEnter?: (other: Collider) => void`
    An optional callback function that is executed when another `Collider` enters the `AreaTrigger`'s region.

-   `onExit?: (other: Collider) => void`
    An optional callback function that is executed when another `Collider` exits the `AreaTrigger`'s region.

## How it Works

The `AreaTrigger` component requires a `Collider` sibling (e.g., `BoxCollider` or `PolygonCollider`) to define its shape and detect overlaps. It continuously monitors the `collidingWith` property of its `Collider` sibling to determine which other colliders are currently overlapping with it. It then compares this list to the colliders that were overlapping in the previous frame to trigger `onEnter` or `onExit` events.

**Note:** Due to the nature of collision detection and the `collidingWith` property being reset each frame, accurately identifying the `other` collider in the `onExit` callback can be challenging. For simple use cases, `onEnter` is more straightforward.

## Examples

### Creating a Collectible Item

This example shows how to use an `AreaTrigger` to make a coin collectible when the player enters its area.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { BoxCollider } from './Parts/Children/BoxCollider';
import { AreaTrigger } from './Parts/AreaTrigger';
import { Vector }./Math/Vector';

const coin = new GameObject({ name: 'Coin' });

coin.addChildren(
    new Transform({ position: new Vector(500, 400) }),
    new SpriteRender({
        imageSource: './assets/coin.png',
        width: 32,
        height: 32
    }),
    new BoxCollider({ width: 32, height: 32 }), // The trigger area
    new AreaTrigger({
        onEnter: (otherCollider) => {
            // Check if the entering collider belongs to the player
            if (otherCollider.parent?.name === 'Player') {
                console.log('Coin collected!');
                // Example: Play a sound, add to score, remove coin
                coin.parent?.removeChild(coin); // Remove the coin from its parent layer
            }
        }
    })
);

myLayer.addChild(coin);
```