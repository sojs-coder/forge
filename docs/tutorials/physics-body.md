# Integrating Physics with PhysicsBody

This tutorial will guide you through making your `GameObject`s interact with the Matter.js physics engine using the `PhysicsBody` component.

## 1. Set up your Scene with a PhysicsEngine

Before you can add physics bodies, your `Scene` needs a `PhysicsEngine` to manage the simulation.

```javascript
import { Game } from './Parts/Game';
import { Scene } from './Parts/Scene';
import { PhysicsEngine } from './Parts/PhysicsEngine';

// 1. Create the Game instance
const myGame = new Game({
    name: 'PhysicsBodyDemo',
    canvas: 'game-canvas',
    width: 800,
    height: 600,
    devmode: true
});

// 2. Create a Scene and add the PhysicsEngine
const mainScene = new Scene({ name: 'MainScene' });
mainScene.addChild(new PhysicsEngine());

// 3. Add the scene to the game and start
myGame.addChild(mainScene);
myGame.start(mainScene);
```

## 2. Creating Dynamic Physics Bodies

To make a `GameObject` a dynamic physics body (affected by gravity, collisions, etc.), add a `PhysicsBody` component to it. The `PhysicsBody` component requires either a `BoxCollider` or a `PolygonCollider` sibling to define its physical shape.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { ColorRender } from './Parts/Children/ColorRender';
import { BoxCollider } from './Parts/Children/BoxCollider';
import { PhysicsBody } from './Parts/PhysicsBody';
import { Vector } from './Math/Vector';

// Create a dynamic box that will fall
const fallingBox = new GameObject({ name: 'FallingBox' });
fallingBox.addChildren(
    new Transform({ position: new Vector(400, 100) }),
    new ColorRender({ width: 50, height: 50, color: 'blue' }),
    new BoxCollider({ width: 50, height: 50 }), // Defines the physical shape
    new PhysicsBody({ // Makes it a dynamic physics body
        density: 0.001, // How heavy it is
        friction: 0.1,  // How much it resists sliding
        restitution: 0.5 // How bouncy it is
    })
);
mainScene.addChild(fallingBox);
```

## 3. Creating Static Physics Bodies (Grounds, Walls)

Static bodies are unmoving objects that dynamic bodies can collide with. They are essential for creating grounds, walls, and other environmental elements.

```javascript
// Create a static ground
const ground = new GameObject({ name: 'Ground' });
ground.addChildren(
    new Transform({ position: new Vector(400, 550) }),
    new ColorRender({ width: 700, height: 20, color: 'green' }),
    new BoxCollider({ width: 700, height: 20 }),
    new PhysicsBody({ isStatic: true }) // Makes it a static physics body
);
mainScene.addChild(ground);

// Create a static wall
const wall = new GameObject({ name: 'Wall' });
wall.addChildren(
    new Transform({ position: new Vector(100, 400) }),
    new ColorRender({ width: 20, height: 300, color: 'gray' }),
    new BoxCollider({ width: 20, height: 300 }),
    new PhysicsBody({ isStatic: true })
);
mainScene.addChild(wall);
```

## 4. PhysicsBody Properties

-   **`isStatic: boolean`**: If `true`, the body will not be affected by forces (like gravity) and will not move. Defaults to `false`.
-   **`density: number`**: The density of the body. Higher density means more mass for the same volume. Defaults to `0.001`.
-   **`friction: number`**: The amount of friction applied to the body. Higher values make it harder to slide. Defaults to `0.1`.
-   **`restitution: number`**: The bounciness of the body. `0` means no bounce, `1` means perfect bounce. Defaults to `0`.

## 5. Synchronization

The `PhysicsBody` component automatically synchronizes the `GameObject`'s `Transform` (position and rotation) with the underlying Matter.js body. This means you should primarily control the position and rotation of physics-enabled `GameObject`s through the physics simulation rather than directly manipulating their `Transform` components after they are created.