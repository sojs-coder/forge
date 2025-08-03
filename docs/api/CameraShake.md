# CameraShake

**Extends:** [Part](./Part.md)

The `CameraShake` component provides a way to add a screen shake effect to your game, typically used for impacts, explosions, or other dramatic events. It works by temporarily offsetting the camera's position.

## Constructor

`new CameraShake({ intensity, duration })`

-   `intensity?: number`
    The maximum amount of pixels the camera will shake in any direction. Defaults to `5`.

-   `duration?: number`
    The duration of the shake effect in frames. Defaults to `60`.

## Properties

-   `intensity: number`
    The maximum amount of pixels the camera will shake in any direction.

-   `duration: number`
    The duration of the shake effect in frames.

-   `initialized: boolean`
    A boolean indicating whether the camera shake has been initialized.

## Methods

-   `shake()`
    Starts the camera shake effect.

## How it Works

`CameraShake` needs to be added to the same `GameObject` as your `Camera` component. It will then automatically find the `Camera` and its `Transform` to apply the shake effect. If the camera also has a `Follow` component, the shake will be applied as an `externalOffset` to the `Follow` component, ensuring smooth integration.

## Examples

### Adding Camera Shake to Your Game

```javascript
import { GameObject } from './Parts/GameObject';
import { Camera } from './Parts/Camera';
import { Transform } from './Parts/Children/Transform';
import { CameraShake } from './Parts/CameraShake';
import { Vector } from './Math/Vector';

// Assume you have a camera setup like this:
const mainCamera = new Camera({ name: 'MainCamera' });
mainCamera.addChild(new Transform({ position: new Vector(0, 0) }));

// Add the CameraShake component to the same GameObject as the Camera
mainCamera.addChild(new CameraShake({
    intensity: 10,
    duration: 30
}));

// To trigger the shake from another part (e.g., when the player takes damage):
// In your player's Health component or a custom script:

import { Part } from './Parts/Part';

class PlayerController extends Part {
    act() {
        // ... game logic ...
        if (playerTakesDamage) {
            const cameraShake = this.top?.currentScene?.activeCamera?.sibling<CameraShake>('CameraShake');
            if (cameraShake) {
                cameraShake.shake();
            }
        }
    }
}

// Add PlayerController to your player GameObject
player.addChild(new PlayerController());
```