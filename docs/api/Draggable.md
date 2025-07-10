# Draggable

**Extends:** [Part](./Part.md)

The `Draggable` component allows a `GameObject` to be moved around the screen by dragging it with the mouse. It works by updating the `Transform` component of its parent `GameObject` based on mouse input.

## Properties

None specific to `Draggable` beyond inherited `Part` properties.

## How it Works

For `Draggable` to function, the `Scene` it belongs to must have an `Input` component. The `Draggable` part automatically checks for and adds an `Input` component to its parent `Scene` if one doesn't already exist.

When the mouse button is pressed down on the `GameObject` (which must have a `Transform` and a `Renderer` or `Collider` to be detectable), the `Draggable` component calculates an offset from the mouse position to the `GameObject`'s position. As the mouse moves while dragging, the `GameObject`'s position is updated to maintain this offset, effectively making it follow the mouse.

## Examples

### Making a Sprite Draggable

This example shows how to make a simple sprite draggable on the screen.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { Draggable } from './Parts/Draggable';
import { Vector } from './Math/Vector';

const myDraggableSprite = new GameObject({ name: 'DraggableBox' });

myDraggableSprite.addChildren(
    new Transform({ position: new Vector(200, 200) }),
    new SpriteRender({
        imageSource: './assets/box.png',
        width: 50,
        height: 50
    }),
    new Draggable() // Add the Draggable component
);

myScene.addChild(myDraggableSprite);
```