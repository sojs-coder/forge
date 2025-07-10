# ParallaxLayer

**Extends:** [Layer](./Layer.md)

The `ParallaxLayer` is a specialized `Layer` that creates a parallax scrolling effect. Objects on a `ParallaxLayer` will move at a different speed relative to the camera's movement, creating an illusion of depth.

## Properties

-   `parallaxFactor: number`
    A value between `0` and `1` (inclusive) that determines how much the layer moves relative to the camera. Defaults to `0.5`.
    -   `0`: The layer does not move at all (e.g., distant background elements).
    -   `0.5`: The layer moves at half the camera's speed.
    -   `1`: The layer moves at the same speed as the camera (like a foreground layer).

## How it Works

When the `Scene`'s `activeCamera` moves, the `ParallaxLayer` adjusts the positions of its child `GameObject`s based on the `parallaxFactor`. This creates the visual effect where closer objects appear to move faster than more distant objects.

## Examples

### Creating a Parallax Background

```javascript
import { Game } from './Parts/Game';
import { Scene } from './Parts/Scene';
import { Camera } from './Parts/Camera';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { ParallaxLayer } from './Parts/ParallaxLayer';
import { GameObject } from './Parts/GameObject';
import { CharacterMovement } from './Parts/CharacterMovement';
import { Vector } from './Math/Vector';

// 1. Create the Game instance
const myGame = new Game({
    name: 'ParallaxDemo',
    canvas: 'game-canvas',
    width: 800,
    height: 600,
    devmode: true
});

// 2. Create a Scene
const mainScene = new Scene({ name: 'MainScene' });

// 3. Create a Camera and a movable player to control it
const mainCamera = new Camera({ name: 'MainCamera' });
const cameraGameObject = new GameObject({ name: 'CameraObject' });
cameraGameObject.addChildren(
    new Transform({ position: new Vector(400, 300) }),
    new CharacterMovement({ speed: 5 }) // Move the camera with WASD
);
mainCamera.addChild(cameraGameObject);
mainScene.addChild(mainCamera);

// 4. Create Parallax Layers

// Distant background (moves very little)
const backgroundLayer = new ParallaxLayer({ name: 'BackgroundLayer', parallaxFactor: 0.2 });
const distantMountains = new GameObject({ name: 'Mountains' });
distantMountains.addChildren(
    new Transform({ position: new Vector(400, 300) }),
    new SpriteRender({ imageSource: './assets/mountains.png', width: 800, height: 600 })
);
backgroundLayer.addChild(distantMountains);

// Mid-ground (moves moderately)
const midgroundLayer = new ParallaxLayer({ name: 'MidgroundLayer', parallaxFactor: 0.5 });
const trees = new GameObject({ name: 'Trees' });
trees.addChildren(
    new Transform({ position: new Vector(400, 300) }),
    new SpriteRender({ imageSource: './assets/trees.png', width: 800, height: 600 })
);
midgroundLayer.addChild(trees);

// Foreground (moves with the camera, or slightly less)
const foregroundLayer = new ParallaxLayer({ name: 'ForegroundLayer', parallaxFactor: 0.9 });
const bushes = new GameObject({ name: 'Bushes' });
bushes.addChildren(
    new Transform({ position: new Vector(400, 300) }),
    new SpriteRender({ imageSource: './assets/bushes.png', width: 800, height: 600 })
);
foregroundLayer.addChild(bushes);

// 5. Add layers to the scene in order (background first)
mainScene.addChildren(backgroundLayer, midgroundLayer, foregroundLayer);

// 6. Add the scene to the game and start
myGame.addChild(mainScene);
myGame.start(mainScene);
```

## 2. Important Considerations

-   **Camera Movement**: The parallax effect is driven by the movement of the `Scene`'s `activeCamera`. Ensure your camera is moving for the effect to be visible.
-   **Layer Order**: Add `ParallaxLayer`s to your `Scene` in order from most distant (`parallaxFactor` closer to 0) to closest (`parallaxFactor` closer to 1) to ensure correct rendering depth.
-   **GameObject Positions**: The `GameObject`s within a `ParallaxLayer` should generally be positioned relative to the center of your game world or the camera's starting position. The `ParallaxLayer` will then adjust their `Transform`s based on the camera's movement.