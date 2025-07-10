# Making Objects Rotate

This tutorial will demonstrate how to make any `GameObject` continuously rotate using the `Rotator` component.

## 1. Set up your Scene and GameObject

First, ensure you have a `Game` and `Scene` set up. Then, create a `GameObject` that you want to rotate. This `GameObject` will need a `Transform` for its rotation property and a visual component (like `SpriteRender` or `ColorRender`) so you can see the rotation effect.

```javascript
import { Game } from './Parts/Game';
import { Scene } from './Parts/Scene';
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { Rotator } from './Parts/Rotator';
import { Vector } from './Math/Vector';

// 1. Create the Game instance (if you haven't already)
const myGame = new Game({
    name: 'RotatorDemo',
    canvas: 'game-canvas',
    width: 800,
    height: 600,
    devmode: true
});

// 2. Create a Scene
const mainScene = new Scene({ name: 'MainScene' });

// 3. Create a rotating GameObject
const spinningGear = new GameObject({ name: 'SpinningGear' });
spinningGear.addChildren(
    new Transform({ position: new Vector(400, 300) }), // Center the gear
    new SpriteRender({
        imageSource: './assets/gear.png', // Assuming you have a gear image
        width: 100,
        height: 100
    }),
    new Rotator({ rotationSpeed: 0.05 }) // Add the Rotator component with a speed
);

// 4. Add the GameObject to the scene
mainScene.addChild(spinningGear);

// 5. Add the scene to the game and start
myGame.addChild(mainScene);
myGame.start(mainScene);
```

## 2. Adjusting Rotation Speed

The `rotationSpeed` property of the `Rotator` component controls how fast the object spins. A positive value will rotate it clockwise, and a negative value will rotate it counter-clockwise.

```javascript
// Example: Make it spin faster counter-clockwise
new Rotator({ rotationSpeed: -0.1 });
```