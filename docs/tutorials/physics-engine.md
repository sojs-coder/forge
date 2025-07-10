# Using the Physics Engine (Matter.js)

The Forge engine integrates with [Matter.js](https://brm.io/matter-js/), a 2D physics engine, to provide realistic physical interactions for your game objects. This tutorial will guide you through setting up the `PhysicsEngine` part and creating basic rigid bodies.

## 1. Add the PhysicsEngine to your Scene

To enable physics in your game, you need to add the `PhysicsEngine` part to your `Scene`. It acts as the central manager for all physics simulations within that scene.

```javascript
import { Scene } from './Parts/Scene';
import { PhysicsEngine } from './Parts/PhysicsEngine';

const myScene = new Scene({ name: 'PhysicsScene' });

myScene.addChild(new PhysicsEngine());

// Add this scene to your Game instance
myGame.addChild(myScene);
myGame.start(myScene);
```

## 2. Create a Physics Body

Matter.js works with `Body` objects. You'll typically create a `GameObject` and then add a `Transform` and a `BoxCollider` (or `PolygonCollider`) to it. The `PhysicsEngine` will then use these to create and manage the corresponding Matter.js `Body`.

For now, we'll create a simple rectangular body. In a future update, the engine will automatically create Matter.js bodies from `BoxCollider` and `PolygonCollider` components.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { ColorRender } from './Parts/Children/ColorRender';
import { BoxCollider } from './Parts/Children/BoxCollider';
import { Vector } from './Math/Vector';

// This is a placeholder for how you'd create a physics-enabled object.
// Full integration will come in a later update.

const box = new GameObject({ name: 'PhysicsBox' });
box.addChildren(
    new Transform({ position: new Vector(400, 100) }),
    new ColorRender({ width: 50, height: 50, color: 'blue' }),
    new BoxCollider({ width: 50, height: 50 })
);

myLayer.addChild(box);

// In your custom game logic, you would interact with Matter.js directly for now:
// const physicsEngine = myScene.sibling<PhysicsEngine>('PhysicsEngine');
// if (physicsEngine) {
//     const { Bodies } = Matter;
//     const rect = Bodies.rectangle(400, 100, 50, 50);
//     Matter.World.add(physicsEngine.world, rect);
//
//     // You would then need to synchronize the GameObject's Transform with the Matter.js body's position
//     // This synchronization will be handled automatically by the engine in a future update.
//     box.sibling<Transform>('Transform').position.x = rect.position.x;
//     box.sibling<Transform>('Transform').position.y = rect.position.y;
// }
```

## 3. Adding a Ground (Static Body)

Most physics simulations need a static body for objects to rest on.

```javascript
// Placeholder for static body creation
const ground = new GameObject({ name: 'Ground' });
ground.addChildren(
    new Transform({ position: new Vector(400, 550) }),
    new ColorRender({ width: 700, height: 20, color: 'green' }),
    new BoxCollider({ width: 700, height: 20 })
);
myLayer.addChild(ground);

// Similar to the dynamic body, you'd add a static Matter.js body:
// const staticRect = Bodies.rectangle(400, 550, 700, 20, { isStatic: true });
// Matter.World.add(physicsEngine.world, staticRect);
```

**Note:** The full integration of Matter.js, where `BoxCollider` and `PolygonCollider` automatically create and synchronize with Matter.js bodies, is a planned future enhancement. For now, you would need to manually create and update Matter.js bodies and synchronize their positions with your `GameObject`s' `Transform` components.