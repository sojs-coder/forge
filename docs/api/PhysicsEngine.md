# PhysicsEngine

**Extends:** [Part](./Part.md)

The `PhysicsEngine` component is the central manager for the 2D physics simulation in your game, powered by [Matter.js](https://brm.io/matter-js/). You need to add one `PhysicsEngine` instance to your `Scene` to enable physics interactions for `GameObject`s within that scene.

## Properties

-   `engine: Matter.Engine`
    The underlying Matter.js `Engine` instance. You can access this directly for advanced Matter.js functionalities.

-   `world: Matter.World`
    The underlying Matter.js `World` instance, which contains all the physics bodies and constraints.

## How it Works

When added to a `Scene`, the `PhysicsEngine` component creates and continuously updates a Matter.js simulation. `GameObject`s that have a `PhysicsBody` component will automatically be added to this simulation, and their `Transform`s will be synchronized with their corresponding Matter.js bodies.

## Examples

### Setting up a Physics-Enabled Scene

```javascript
import { Scene } from './Parts/Scene';
import { PhysicsEngine } from './Parts/PhysicsEngine';

const myPhysicsScene = new Scene({ name: 'PhysicsScene' });

// Add the PhysicsEngine to your scene to enable physics
myPhysicsScene.addChild(new PhysicsEngine());

// Now you can add GameObjects with PhysicsBody components to this scene
// (See PhysicsBody tutorial for details)

myGame.addChild(myPhysicsScene);
myGame.start(myPhysicsScene);
```

## Important Notes

-   **One per Scene**: Typically, you will only need one `PhysicsEngine` per `Scene`.
-   **Synchronization**: The `PhysicsEngine` works in conjunction with the `PhysicsBody` component to keep your `GameObject`'s visual representation (`Transform`) in sync with its physical simulation (`Matter.Body`). You should generally avoid directly manipulating the `Transform` of a `GameObject` that has a `PhysicsBody` attached, as this can lead to desynchronization with the physics simulation.