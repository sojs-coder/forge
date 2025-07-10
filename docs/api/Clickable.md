# Clickable

**Extends:** [Part](./Part.md)

The `Clickable` component allows any `GameObject` to respond to mouse clicks and hovers. It provides callbacks for `onClick`, `onHover`, and `onUnhover` events.

## Properties

-   `onClick?: (event: MouseEvent, clicked: Part) => void`
    An optional callback function that is executed when the `GameObject` is clicked.

-   `onHover?: () => void`
    An optional callback function that is executed when the mouse cursor enters the `GameObject`'s area.

-   `onUnhover?: () => void`
    An optional callback function that is executed when the mouse cursor leaves the `GameObject`'s area.

## How it Works

For `Clickable` to function, the `Scene` it belongs to must have an `Input` component. The `Clickable` part automatically checks for and adds an `Input` component to its parent `Scene` if one doesn't already exist.

## Examples

### Making a Sprite Clickable

This example shows how to make a `SpriteRender` respond to clicks and change its appearance on hover.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { Clickable } from './Parts/Clickable';
import { Vector } from './Math/Vector';

const myClickableSprite = new GameObject({ name: 'MyButton' });

myClickableSprite.addChildren(
    new Transform({ position: new Vector(400, 300) }),
    new SpriteRender({
        imageSource: './assets/normal_button.png',
        width: 100,
        height: 50
    }),
    new Clickable({
        onClick: (event, clicked) => {
            console.log(`Clicked on ${clicked.name}!`);
            // Example: Play a sound or change scene
        },
        onHover: () => {
            const renderer = myClickableSprite.sibling<SpriteRender>('SpriteRender');
            if (renderer) {
                renderer.imageSource = './assets/hover_button.png';
            }
        },
        onUnhover: () => {
            const renderer = myClickableSprite.sibling<SpriteRender>('SpriteRender');
            if (renderer) {
                renderer.imageSource = './assets/normal_button.png';
            }
        }
    })
);

myScene.addChild(myClickableSprite);
```