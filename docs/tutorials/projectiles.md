# Creating and Firing Projectiles

This tutorial will guide you through creating and using the `Projectile` component for objects that move in a straight line and can inflict damage upon collision.

## 1. Set up your Scene and Projectile GameObject

First, ensure you have a `Game` and `Scene` set up. A `Projectile` typically needs a `Transform` for its position, a visual component (like `SpriteRender`), and a `BoxCollider` to detect hits.

```javascript
import { Game } from './Parts/Game';
import { Scene } from './Parts/Scene';
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { BoxCollider } from './Parts/Children/BoxCollider';
import { Projectile } from './Parts/Projectile';
import { Vector } from './Math/Vector';

// 1. Create the Game instance (if you haven't already)
const myGame = new Game({
    name: 'ProjectileDemo',
    canvas: 'game-canvas',
    width: 800,
    height: 600,
    devmode: true
});

// 2. Create a Scene
const mainScene = new Scene({ name: 'MainScene' });

// 3. Function to create a bullet (our projectile)
function createBullet(position: Vector, direction: Vector) {
    const bullet = new GameObject({ name: 'Bullet' });
    bullet.addChildren(
        new Transform({ position: position }),
        new SpriteRender({
            imageSource: './assets/bullet.png', // Assuming a bullet image
            width: 20,
            height: 10
        }),
        new BoxCollider({ width: 20, height: 10 }), // Collider for hit detection
        new Projectile({
            direction: direction.normalize(), // Ensure direction is a unit vector
            speed: 15,
            damage: 25 // Damage dealt on hit
        })
    );
    return bullet;
}

// 4. Example: Firing a bullet from the center of the screen
//    You would typically call this from a player's input handler or a spawner.
const initialBulletPosition = new Vector(400, 300);
const bulletDirection = new Vector(1, 0); // Firing right

const bullet = createBullet(initialBulletPosition, bulletDirection);
mainScene.addChild(bullet);

// 5. Add the scene to the game and start
myGame.addChild(mainScene);
myGame.start(mainScene);
```

## 2. Projectile Interaction with Health

For a `Projectile` to deal damage, the target `GameObject` must have a `Health` component. When the `Projectile`'s `Collider` detects a collision with an object that has a `Health` component, it will automatically call `takeDamage` on that component and then remove itself from the scene.

```javascript
import { Health } from './Parts/Health';

// ... (assuming you have an enemy GameObject)
const enemy = new GameObject({ name: 'Enemy' });
enemy.addChildren(
    // ... other components like Transform, SpriteRender, BoxCollider
    new Health({ maxHealth: 100 }) // Add a Health component to the enemy
);

mainScene.addChild(enemy);

// Now, when a bullet (Projectile) collides with this enemy, the enemy's health will decrease.
```

## 3. Customizing Projectile Behavior

-   **`speed`**: Adjust this property to make projectiles faster or slower.
-   **`direction`**: Change this `Vector` to control the trajectory of the projectile. Remember to normalize the vector if you are calculating it from two points.
-   **`damage`**: Set the amount of health the projectile will reduce from a `Health` component on impact.