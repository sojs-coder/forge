# Making Objects Draggable

This tutorial will show you how to make any `GameObject` draggable using the `Draggable` component.

## 1. Set up your Scene and GameObject

First, ensure you have a `Game` and `Scene` set up. Then, create a `GameObject` that you want to make draggable. This `GameObject` will need a `Transform` for its position and a visual component (like `SpriteRender` or `ColorRender`) so you can see and interact with it.

```javascript
import { Game } from './Parts/Game';
import { Scene } from './Parts/Scene';
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { ColorRender } from './Parts/Children/ColorRender';
import { Draggable } from './Parts/Draggable';
import { Vector } from './Math/Vector';

// 1. Create the Game instance (if you haven't already)
const myGame = new Game({
    name: 'DraggableDemo',
    canvas: 'game-canvas',
    width: 800,
    height: 600,
    devmode: true
});

// 2. Create a Scene
const mainScene = new Scene({ name: 'MainScene' });

// 3. Create a draggable GameObject
const draggableBox = new GameObject({ name: 'DraggableBox' });
draggableBox.addChildren(
    new Transform({ position: new Vector(400, 300) }), // Initial position
    new ColorRender({ width: 100, height: 100, color: 'red' }), // Visual representation
    new Draggable() // Add the Draggable component
);

// 4. Add the GameObject to the scene
mainScene.addChild(draggableBox);

// 5. Add the scene to the game and start
myGame.addChild(mainScene);
myGame.start(mainScene);
```

## 2. How it Works

When you click and drag the red box, it will follow your mouse cursor. The `Draggable` component listens for mouse down, mouse up, and mouse move events. When you click on the object, it records the offset between the mouse position and the object's position. Then, as you drag, it continuously updates the object's `Transform` position to maintain that offset, making the object appear to stick to your cursor.

For `Draggable` to work, the `Scene` must have an `Input` component. The `Draggable` part automatically adds one if it's missing.