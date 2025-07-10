# Implementing Camera Shake

This tutorial will show you how to add dynamic camera shake effects to your game using the `CameraShake` component. Camera shake is often used to emphasize events like explosions, impacts, or powerful actions.

## 1. Set up your Scene and CameraShake Component

First, ensure you have a `Game` and `Scene` set up, and that your `Scene` has an `activeCamera`. The `CameraShake` component should be added as a child to your `GameObject` that contains the `Camera`.

```javascript
import { Game } from './Parts/Game';
import { Scene } from './Parts/Scene';
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { Camera } from './Parts/Camera';
import { CameraShake } from './Parts/CameraShake';
import { Vector } from './Math/Vector';

// 1. Create the Game instance
const myGame = new Game({
    name: 'CameraShakeDemo',
    canvas: 'game-canvas',
    width: 800,
    height: 600,
    devmode: true
});

// 2. Create a Scene
const mainScene = new Scene({ name: 'MainScene' });

// 3. Create a Camera GameObject and add it to the scene
const mainCamera = new Camera({ name: 'MainCamera' });
mainCamera.addChildren(
    new Transform({ position: new Vector(400, 300) }), // Camera's initial position
    new CameraShake({ intensity: 10, duration: 30 }) // Add CameraShake to the camera
);
mainScene.addChild(mainCamera);

// 4. Add some objects to the scene to observe the shake effect
const box1 = new GameObject({ name: 'Box1' });
box1.addChildren(
    new Transform({ position: new Vector(200, 300) }),
    new ColorRender({ width: 50, height: 50, color: 'blue' })
);
mainScene.addChild(box1);

const box2 = new GameObject({ name: 'Box2' });
box2.addChildren(
    new Transform({ position: new Vector(600, 300) }),
    new ColorRender({ width: 50, height: 50, color: 'green' })
);
mainScene.addChild(box2);

// 5. Add the scene to the game and start
myGame.addChild(mainScene);
myGame.start(mainScene);
```

## 2. Triggering Camera Shake

To trigger the camera shake, you need to get a reference to the `CameraShake` component and call its `shake()` method. This is typically done in response to an event, such as a collision, an explosion, or a player action.

```javascript
import { Timer } from './Parts/Timer'; // For demonstration, we'll use a Timer

// ... (assuming mainScene and mainCamera are set up as above)

// Create a Timer to trigger the shake every few seconds
const shakeTimer = new GameObject({ name: 'ShakeTimer' });
shakeTimer.addChildren(
    new Timer({
        duration: 2000, // Shake every 2 seconds
        repeats: true,
        onComplete: () => {
            const cameraShake = mainCamera.sibling<CameraShake>('CameraShake');
            if (cameraShake) {
                cameraShake.shake();
                console.log('Camera Shaking!');
            }
        }
    })
);
mainScene.addChild(shakeTimer);

// Start the timer
shakeTimer.sibling<Timer>('Timer')?.start();
```

## 3. Customizing Camera Shake Properties

-   **`intensity: number`**: Controls the magnitude of the shake. Higher values result in a more violent shake. Defaults to `5`.
-   **`duration: number`**: The number of frames the shake effect will last. Defaults to `60` (1 second at 60 FPS).