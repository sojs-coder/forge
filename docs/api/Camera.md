# Camera

**Extends:** [Part](./Part.md)

The `Camera` component controls the viewpoint of the scene. It allows you to pan, zoom, and follow objects by manipulating its own `Transform`.

When a `Camera` is added to a `Scene`, it automatically becomes the `activeCamera` for that scene. The engine then uses the camera's position and zoom to determine how to render the scene.

## Constructor

`new Camera({ name, zoom })`

-   `name: string`
    The name of the camera.

-   `zoom?: Vector`
    The zoom level of the camera. `new Vector(1, 1)` is the default (no zoom). `new Vector(2, 2)` makes everything appear twice as large (zoomed in), and `new Vector(0.5, 0.5)` makes everything appear half as large (zoomed out).

## Properties

-   `zoom: Vector`
    The zoom level of the camera. `new Vector(1, 1)` is the default (no zoom). `new Vector(2, 2)` makes everything appear twice as large (zoomed in), and `new Vector(0.5, 0.5)` makes everything appear half as large (zoomed out).

## Methods

-   `setActive()`
    Sets this camera as the active camera for the layer's parent (scene).

-   `getViewMatrix(): { offset: Vector; scale: Vector }`
    Returns the view matrix of the camera, which can be used in rendering contexts.

## How it Works

The `Camera` itself doesn't have a position. Instead, it **must** have a `Transform` component as a child. The `worldPosition` of this child `Transform` is what determines the camera's position in the world. To move the camera, you move its `Transform`.

## Examples

### Creating a Static Camera

This creates a camera that is centered on the world origin `(0, 0)`.

```javascript
import { Scene } from './Parts/Scene';
import { Camera } from './Parts/Camera';
import { Transform } from './Parts/Children/Transform';
import { Vector } from './Math/Vector';

const myScene = new Scene({ name: 'MyScene' });

const mainCamera = new Camera({
    name: 'MainCamera',
    zoom: new Vector(1.5, 1.5) // Zoomed in by 50%
});

// The camera's position is controlled by its Transform child
mainCamera.addChild(new Transform({
    position: new Vector(0, 0)
}));

// Add the camera anywhere in the scene hierarchy
myScene.addChild(mainCamera);
```

### Creating a Camera that Follows a Player

This is a very common use case. We use the `Follow` part to make the camera follow the player.

```javascript
import { Scene } from './Parts/Scene';
import { Camera } from './Parts/Camera';
import { Transform } from './Parts/Children/Transform';
import { Follow } from './Parts/Follow';
import { Vector } from './Math/Vector';
import { GameObject } from './Parts/GameObject';

// Assume 'player' is a GameObject that exists in the scene
declare const player: GameObject;

const myScene = new Scene({ name: 'MyScene' });

const mainCamera = new Camera({
    name: 'MainCamera',
});

// The camera's position is controlled by its Transform child
mainCamera.addChildren(
    new Transform(),
    new Follow({ target: player.child<Transform>('Transform') })
);

// Add the camera anywhere in the scene hierarchy
myScene.addChild(mainCamera);
```