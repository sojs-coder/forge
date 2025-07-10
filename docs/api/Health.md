# Health

**Extends:** [Part](./Part.md)

The `Health` component manages the health points of a `GameObject`. It provides methods to take damage, heal, and a callback for when health reaches zero.

## Properties

-   `maxHealth: number`
    The maximum health points this object can have. Defaults to `100`.

-   `currentHealth: number`
    The current health points of the object. Initialized to `maxHealth`.

-   `onDeath?: () => void`
    An optional callback function that is executed when `currentHealth` drops to `0` or below.

## Methods

-   `takeDamage(amount: number)`
    Reduces the `currentHealth` by the specified `amount`. If `currentHealth` drops to `0` or below, `onDeath` is called.

-   `heal(amount: number)`
    Increases the `currentHealth` by the specified `amount`, up to `maxHealth`.

## Examples

### Creating an Enemy with Health

```javascript
import { GameObject } from './Parts/GameObject';
import { Health } from './Parts/Health';

const enemy = new GameObject({ name: 'Enemy' });
enemy.addChildren(
    // ... other components like Transform, SpriteRender
    new Health({
        maxHealth: 50,
        onDeath: () => {
            console.log('Enemy defeated!');
            enemy.parent?.removeChild(enemy); // Remove enemy from game
        }
    })
);

myScene.addChild(enemy);
```

### Taking Damage from a Projectile

(See [Projectile](api/Projectile.md) tutorial for full context)

```javascript
import { Projectile } from './Parts/Projectile';

// In a Projectile's act() method or collision handler:
const targetHealth = other.parent?.sibling<Health>('Health');
if (targetHealth) {
    targetHealth.takeDamage(this.damage);
}
```