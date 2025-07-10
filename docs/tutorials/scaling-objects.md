# Making Objects Scale (Pulsate)

This tutorial will demonstrate how to make any `GameObject` continuously scale up and down (pulsate) using the `Scaler` component.

## 1. Set up your Scene and GameObject

First, ensure you have a `Game` and `Scene` set up. Then, create a `GameObject` that you want to scale. This `GameObject` will need a `Transform` for its scale property and a visual component (like `SpriteRender` or `ColorRender`) so you can see the scaling effect.

```javascript
import { Game } from './Parts/Game';
import { Scene } from './Parts/Scene';
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { Scaler } from './Parts/Scaler';
import { Vector } from './Math/Vector';

// 1. Create the Game instance (if you haven't already)
const myGame = new Game({
    name: 'ScalerDemo',
    canvas: 'game-canvas',
    width: 800,
    height: 600,
    devmode: true
});

// 2. Create a Scene
const mainScene = new Scene({ name: 'MainScene' });

// 3. Create a scaling GameObject
const pulsatingHeart = new GameObject({ name: 'PulsatingHeart' });
pulsatingHeart.addChildren(
    new Transform({ position: new Vector(400, 300) }), // Center the heart
    new SpriteRender({
        imageSource: './assets/heart.png', // Assuming you have a heart image
        width: 100,
        height: 100
    }),
    new Scaler({
        scaleSpeed: new Vector(0.01, 0.01), // Speed of scaling
        minScale: new Vector(0.8, 0.8),     // Minimum size (80%)
        maxScale: new Vector(1.2, 1.2)      // Maximum size (120%)
    }) // Add the Scaler component
);

// 4. Add the GameObject to the scene
mainScene.addChild(pulsatingHeart);

// 5. Add the scene to the game and start
myGame.addChild(mainScene);
myGame.start(mainScene);
```

## 2. Adjusting Scaling Behavior

The `Scaler` component offers properties to fine-tune the scaling effect:

-   `scaleSpeed`: Controls how fast the object scales up and down. You can set different speeds for X and Y axes.
-   `minScale`: Defines the smallest size the object will shrink to.
-   `maxScale`: Defines the largest size the object will grow to.

Experiment with these values to achieve different pulsating effects.