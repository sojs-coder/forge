# Projectile

**Extends:** [Part](./Part.md)

The `Projectile` component is designed for objects that move in a straight line and can inflict damage upon collision. It's ideal for bullets, arrows, or any other one-shot moving attack.

## Properties

-   `speed: number`
    The speed at which the projectile travels per frame. Defaults to `10`.

-   `direction: Vector`
    A `Vector` representing the normalized direction of the projectile's movement. This vector should typically have a magnitude of 1 (e.g., `new Vector(1, 0)` for right, `new Vector(0, -1)` for up).

-   `damage: number`
    The amount of damage the projectile will inflict on a `GameObject` that has a `Health` component upon collision. Defaults to `10`.

## How it Works

The `Projectile` component requires a `Transform` sibling to control its position and a `Collider` sibling to detect collisions. When a collision occurs with another `GameObject` that has a `Health` component, the `Projectile` will call `takeDamage` on that `Health` component and then remove itself from the game.

## Examples

### Creating a Simple Bullet

This example shows how to create a bullet that flies to the right and damages enemies.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { BoxCollider } from './Parts/Children/BoxCollider';
import { Projectile } from './Parts/Projectile';
import { Vector } from './Math/Vector';

// Function to create a bullet GameObject
function createBullet(position: Vector, direction: Vector) {
    const bullet = new GameObject({ name: 'Bullet' });
    bullet.addChildren(
        new Transform({ position: position }),
        new SpriteRender({
            imageSource: './assets/bullet.png',
            width: 10,
            height: 5
        }),
        new BoxCollider({ width: 10, height: 5 }),
        new Projectile({
            direction: direction,
            speed: 15,
            damage: 20
        })
    );
    return bullet;
}

// Example usage (e.g., in a PlayerController when firing)
// myScene.addChild(createBullet(playerTransform.position, new Vector(1, 0)));
```