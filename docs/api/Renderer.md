# Renderer

**Extends:** [Part](./Part.md)

`Renderer` is an abstract base class for all components that draw something to the screen. You typically don't use `Renderer` directly, but rather one of its subclasses:

-   [SpriteRender](./SpriteRender.md)
-   [AnimatedSprite](./AnimatedSprite.md)
-   [ColorRender](./ColorRender.md)
-   [TextRender](./TextRender.md)
-   [Button](./Button.md)

All renderers require a [Transform](./Transform.md) component as a sibling to know where to draw.

## Properties

-   `width: number` & `height: number`
    The dimensions of the object to be rendered. When a renderer is added to a `GameObject`, it will also set the `superficialWidth` and `superficialHeight` of its parent `Part`.

-   `facing: Vector`
    Determines the flip direction of the render. It's a `Vector` where `x` and `y` can be `1` (normal) or `-1` (flipped). For example, `new Vector(-1, 1)` will flip the rendered image horizontally.

-   `disableAntiAliasing: boolean`
    If set to `true`, it will attempt to render the image without anti-aliasing, which can be desirable for a crisp, pixel-art look. Defaults to `false`.

## Examples

### Using `facing` to Flip a Sprite

This example shows how a `PlayerController` script could flip a `SpriteRender` based on the direction of movement.

```javascript
// In a custom Part like PlayerController
import { Part } from './Parts/Part';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';

class PlayerController extends Part {
    constructor() {
        super();
        this.name = 'PlayerController';
        this.speed = 0;
    }

    act() {
        const transform = this.sibling<Transform>('Transform');
        const renderer = this.sibling<SpriteRender>('SpriteRender');

        if (transform && renderer) {
            // Assume 'this.speed' is set by input handling
            transform.position.x += this.speed;

            if (this.speed > 0) {
                // Moving right, face right
                renderer.facing.x = 1;
            } else if (this.speed < 0) {
                // Moving left, face left (flip horizontally)
                renderer.facing.x = -1;
            }
        }
    }
}
```
