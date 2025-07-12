# PhysicsEngine

**Extends:** [Part](./Part.md)

The `PhysicsEngine` part is responsible for managing the physics simulation in your game. It uses the Matter.js library to create a realistic physics environment.

## Properties

-   `gravity: Vector`
    The gravity vector for the physics world. Defaults to `{ x: 0, y: 1 }`.

## How it Works

The `PhysicsEngine` is a scene-level component that manages the physics simulation. It should be added as a child of a `Scene`. Any `GameObject` in the scene that has a `PhysicsBody` component will be affected by the `PhysicsEngine`.

## Examples

### Creating a Physics World

This creates a physics world with default gravity.

```javascript
import { Scene } from './Parts/Scene';
import { PhysicsEngine } from './Parts/PhysicsEngine';
import { Vector } from './Math/Vector';

const myScene = new Scene({ name: 'MyScene' });

const physicsEngine = new PhysicsEngine({
    gravity: new Vector(0, 9.8)
});

myScene.addChild(physicsEngine);
```