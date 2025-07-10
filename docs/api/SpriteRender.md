# SpriteRender

**Extends:** [Renderer](./Renderer.md)

The `SpriteRender` component is used to draw a static (non-animated) image to the screen. It's one of the most common renderers you'll use.

## Properties

-   `imageSource: string | null`
    The file path to the image you want to display.

-   `image: any`
    The underlying `HTMLImageElement` object that is created from the `imageSource`.

-   `width: number` & `height: number`
    The dimensions to draw the image. This can be used to scale the image.

## Examples

### Creating a Sprite

This example creates a `GameObject` that displays a single sprite.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { Vector } from './Math/Vector';

const mySpriteObject = new GameObject({ name: 'MySprite' });

mySpriteObject.addChildren(
    new Transform({
        position: new Vector(300, 400)
    }),
    new SpriteRender({
        imageSource: './assets/my_character.png',
        width: 64,
        height: 64
    })
);

// Add the object to a layer in your scene
myLayer.addChild(mySpriteObject);
```

### Changing a Sprite from another Part

You can dynamically change the sprite being displayed by updating the `imageSource` property.

```javascript
// In a custom Part
import { Part } from './Parts/Part';
import { SpriteRender } from './Parts/Children/SpriteRender';

class PowerUp extends Part {
    constructor() {
        super();
        this.name = 'PowerUp';
    }

    activate() {
        const renderer = this.sibling<SpriteRender>('SpriteRender');
        if (renderer) {
            // Change the image when the power-up is activated
            renderer.imageSource = './assets/powered_up_character.png';
            // The SpriteRender will automatically load the new image
        }
    }
}
```
