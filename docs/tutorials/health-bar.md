# Displaying Health with a HealthBar

This tutorial will show you how to visualize the health of a `GameObject` using the `HealthBar` component.

## 1. Set up your Scene and GameObject with Health

First, ensure you have a `Game` and `Scene` set up. Then, create a `GameObject` that needs a health bar. This `GameObject` must have a `Health` component and a `Transform` component.

```javascript
import { Game } from './Parts/Game';
import { Scene } './Parts/Scene';
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { ColorRender } from './Parts/Children/ColorRender';
import { Health } from './Parts/Health';
import { HealthBar } from './Parts/HealthBar';
import { Vector } from './Math/Vector';

// 1. Create the Game instance
const myGame = new Game({
    name: 'HealthBarDemo',
    canvas: 'game-canvas',
    width: 800,
    height: 600,
    devmode: true
});

// 2. Create a Scene
const mainScene = new Scene({ name: 'MainScene' });

// 3. Create an enemy GameObject with Health and a HealthBar
const enemy = new GameObject({ name: 'Enemy' });
enemy.addChildren(
    new Transform({ position: new Vector(400, 300) }),
    new ColorRender({ width: 50, height: 50, color: 'darkgreen' }),
    new Health({ maxHealth: 100 }), // The Health component
    new HealthBar({ // The HealthBar component
        width: 60, // Width of the health bar
        height: 8, // Height of the health bar
        offsetHeight: 30, // Position the health bar 5 px above the enemey (30 px above the middle)
        color: 'lime', // Color of the health (e.g., green)
        backgroundColor: 'darkred' // Color of the empty health bar (e.g., red)
    })
);

// 4. Add the enemy to the scene
mainScene.addChild(enemy);

// 5. Simulate taking damage (e.g., with a Timer)
const damageTimer = new GameObject({ name: 'DamageTimer' });
damageTimer.addChildren(
    new Timer({
        duration: 1000, // Every 1 second
        repeats: true,
        onComplete: () => {
            const enemyHealth = enemy.sibling<Health>('Health');
            if (enemyHealth) {
                enemyHealth.takeDamage(10);
                console.log(`Enemy health: ${enemyHealth.currentHealth}`);
            }
        }
    })
);
mainScene.addChild(damageTimer);

// Start the damage timer
damageTimer.sibling<Timer>('Timer')?.start();

// 6. Add the scene to the game and start
myGame.addChild(mainScene);
myGame.start(mainScene);
```

## 2. Customizing the HealthBar

-   **`width`** and **`height`**: Control the dimensions of the health bar.
-   **`color`**: The color of the filled portion of the health bar, representing current health.
-   **`backgroundColor`**: The color of the empty portion of the health bar, representing lost health.

## 3. Positioning the HealthBar

The `HealthBar` component uses the `Transform` of its parent `GameObject` for positioning. If you want the health bar to appear above the enemy, you would typically adjust the `Transform` of the `HealthBar` itself (if it were a child of the enemy's `Transform`) or adjust the `Transform` of the `GameObject` containing both the enemy's visual and the health bar.

In the example above, the `HealthBar` is a sibling of the `ColorRender` and `Health` components. Its position is relative to the `GameObject`'s `Transform`. You might want to create a separate `GameObject` for the health bar and position it relative to the enemy, or adjust the `HealthBar`'s internal rendering offset if more complex positioning is needed.