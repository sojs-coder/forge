# Using Area Triggers

This tutorial will explain how to use the `AreaTrigger` component to define regions in your game world that react when other objects enter or exit them, without physical collision.

## 1. Set up your Scene and Trigger Area

First, ensure you have a `Game` and `Scene` set up. An `AreaTrigger` needs a `GameObject` with a `Transform` for its position and a `Collider` (e.g., `BoxCollider` or `PolygonCollider`) to define its shape and size.

```javascript
import { Game } from './Parts/Game';
import { Scene } from './Parts/Scene';
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { BoxCollider } from './Parts/Children/BoxCollider';
import { AreaTrigger } from './Parts/AreaTrigger';
import { Vector } from './Math/Vector';

// 1. Create the Game instance (if you haven't already)
const myGame = new Game({
    name: 'AreaTriggerDemo',
    canvas: 'game-canvas',
    width: 800,
    height: 600,
    devmode: true
});

// 2. Create a Scene
const mainScene = new Scene({ name: 'MainScene' });

// 3. Create the AreaTrigger GameObject
const winZone = new GameObject({ name: 'WinZone' });
winZone.addChildren(
    new Transform({ position: new Vector(700, 300) }), // Position of the trigger
    new BoxCollider({ width: 100, height: 200 }), // The shape of the trigger area
    new AreaTrigger({
        onEnter: (otherCollider) => {
            // This function is called when something enters the zone
            console.log(`Something entered the WinZone! It was: ${otherCollider.parent?.name}`);
            if (otherCollider.parent?.name === 'Player') {
                alert('You reached the Win Zone!');
                // Example: Load next level, show win screen, etc.
            }
        },
        onExit: (otherCollider) => {
            // This function is called when something leaves the zone
            console.log(`Something left the WinZone!`);
        }
    })
);

// 4. Create a simple player to move into the zone
const player = new GameObject({ name: 'Player' });
player.addChildren(
    new Transform({ position: new Vector(100, 300) }),
    new BoxCollider({ width: 50, height: 50 }),
    new ColorRender({ width: 50, height: 50, color: 'blue' }),
    // You would typically add CharacterMovement or other movement logic here
);

// 5. Add GameObjects to the scene
mainScene.addChild(winZone);
mainScene.addChild(player);

// 6. Add the scene to the game and start
myGame.addChild(mainScene);
myGame.start(mainScene);
```

## 2. Understanding `onEnter` and `onExit`

-   **`onEnter(otherCollider)`**: This callback is triggered once when a `Collider` first overlaps with the `AreaTrigger`'s `Collider`. The `otherCollider` parameter is a reference to the `Collider` that entered the trigger zone.
-   **`onExit(otherCollider)`**: This callback is triggered once when a `Collider` that was previously overlapping with the `AreaTrigger`'s `Collider` stops overlapping. Due to internal optimizations, the `otherCollider` parameter in `onExit` might not always be fully populated with the original `Collider` object. It's best used as a notification that something has left the area.

## 3. Common Use Cases

-   **Collectibles**: Trigger `onEnter` to pick up coins, power-ups, etc.
-   **Level Transitions**: Define trigger zones at the end of a level to load the next one.
-   **Traps/Hazards**: Activate damage or effects when the player enters a hazardous area.
-   **Dialogue Triggers**: Start conversations when the player enters a specific region.