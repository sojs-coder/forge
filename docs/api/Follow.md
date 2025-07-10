# Following Other Objects

This tutorial will show you how to make a `GameObject` follow another `GameObject` or `Part` using the `Follow` component.

## 1. Set up your Scene and GameObjects

First, ensure you have a `Game` and `Scene` set up. Then, create two `GameObject`s: one that will be the `target` (the object to follow) and another that will have the `Follow` component.

```javascript
import { Game } from './Parts/Game';
import { Scene } from './Parts/Scene';
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { ColorRender } from './Parts/Children/ColorRender';
import { Follow } from './Parts/Follow';
import { CharacterMovement } from './Parts/CharacterMovement'; // For moving the target
import { Vector } from './Math/Vector';

// 1. Create the Game instance
const myGame = new Game({
    name: 'FollowDemo',
    canvas: 'game-canvas',
    width: 800,
    height: 600,
    devmode: true
});

// 2. Create a Scene
const mainScene = new Scene({ name: 'MainScene' });

// 3. Create the target GameObject (e.g., a player)
const player = new GameObject({ name: 'Player' });
player.addChildren(
    new Transform({ position: new Vector(400, 300) }),
    new ColorRender({ width: 50, height: 50, color: 'blue' }),
    new CharacterMovement({ speed: 5 }) // Make the player movable
);
mainScene.addChild(player);

// 4. Create the follower GameObject
const cameraFollower = new GameObject({ name: 'CameraFollower' });
cameraFollower.addChildren(
    new Transform({ position: new Vector(0, 0) }), // Initial position (will be overridden)
    new ColorRender({ width: 20, height: 20, color: 'red' }),
    new Follow({
        target: player, // The player GameObject is our target
        offset: new Vector(0, -50) // Follow 50 pixels above the player
    })
);
mainScene.addChild(cameraFollower);

// 5. Add the scene to the game and start
myGame.addChild(mainScene);
myGame.start(mainScene);
```

## 2. Customizing Follow Behavior

-   **`target: Part`**: This is the `Part` (typically a `GameObject`) that the current object will follow. It must have a `Transform` component.
-   **`offset: Vector`**: An optional `Vector` that specifies an offset from the target's position. This is useful for positioning the follower relative to the target (e.g., a camera slightly above the player, or a shadow slightly below).

## 3. Common Use Cases

-   **Camera Following**: Make the camera follow the player or another important object.
-   **Companion AI**: Create AI companions that follow the player.
-   **UI Elements**: Attach UI elements (like health bars or names) to follow characters in the game world.
-   **Chains/Tails**: Create segmented objects where each segment follows the previous one.