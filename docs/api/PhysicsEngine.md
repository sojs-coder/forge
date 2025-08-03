# PhysicsEngine

**Extends:** [Part](./Part.md)

The `PhysicsEngine` part is responsible for managing the physics simulation in your game. It uses the Matter.js library to create a realistic physics environment.

## Constructor

`new PhysicsEngine({ gravity })`

-   `gravity?: { x: number, y: number, scale: number }`
    The gravity vector for the physics world. Defaults to `{ x: 0, y: 1, scale: 0.001 }`.

## Properties

-   `engine: Engine`
    The Matter.js engine instance.

-   `world: World`
    The Matter.js world instance.

## How it Works

The `PhysicsEngine` is a scene-level component that manages the physics simulation. It should be added as a child of a `Scene`. Any `GameObject` in the scene that has a `PhysicsBody` component will be affected by the `PhysicsEngine`.

## Examples

### Creating a Physics World

This creates a physics world with custom gravity.

```javascript
import { Scene } from './Parts/Scene';
import { PhysicsEngine } from './Parts/PhysicsEngine';

const myScene = new Scene({ name: 'MyScene' });

const physicsEngine = new PhysicsEngine({
    gravity: { x: 0, y: 9.8, scale: 0.001 }
});

myScene.addChild(physicsEngine);
```