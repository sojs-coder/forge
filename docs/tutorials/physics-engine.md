# Setting up the Physics Engine

This tutorial will guide you through setting up the `PhysicsEngine` in your game, which is essential for enabling realistic physics interactions for your `GameObject`s.

## 1. Add the PhysicsEngine to your Scene

The `PhysicsEngine` is a scene-level component. You should add it as a child to your `Scene`.

```javascript
import { Game } from './Parts/Game';
import { Scene } from './Parts/Scene';
import { PhysicsEngine } from './Parts/PhysicsEngine';

// 1. Create the Game instance
const myGame = new Game({
    name: 'PhysicsEngineSetup',
    canvas: 'game-canvas',
    width: 800,
    height: 600,
    devmode: true
});

// 2. Create a Scene
const mainScene = new Scene({ name: 'MainScene' });

// 3. Add the PhysicsEngine to the scene
mainScene.addChild(new PhysicsEngine({
    gravity: { x: 0, y: 1, scale: 0.001 } // Optional: customize gravity
}));

// 4. Add the scene to the game and start
myGame.addChild(mainScene);
myGame.start(mainScene);
```

## 2. Customizing Gravity

The `PhysicsEngine` constructor allows you to customize the gravity applied to all physics bodies in the scene.

-   `gravity: { x: number, y: number, scale: number }`
    -   `x`: The horizontal component of gravity.
    -   `y`: The vertical component of gravity.
    -   `scale`: A scaling factor for the gravity vector. This is important for controlling the strength of gravity in relation to your game's units.

## 3. Next Steps

Once your `PhysicsEngine` is set up, you can start adding `PhysicsBody` components to your `GameObject`s to make them interact with the physics world. Refer to the [PhysicsBody tutorial](./physics-body.md) for more details.