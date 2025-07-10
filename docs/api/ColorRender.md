# ColorRender

**Extends:** [Renderer](./Renderer.md)

The `ColorRender` component is a simple renderer that draws a solid-colored rectangle. It's useful for prototyping, creating simple UI elements, or for placeholder graphics.

## Properties

-   `color: string`
    The color of the rectangle. This can be any valid CSS color string, such as `"red"`, `"#FF0000"`, or `"rgba(255, 0, 0, 0.5)"`.

-   `width: number` & `height: number`
    The dimensions of the rectangle.

## Examples

### Creating a Simple Platform

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { ColorRender } from './Parts/Children/ColorRender';
import { Vector } from './Math/Vector';

const platform = new GameObject({ name: 'Platform' });

platform.addChildren(
    new Transform({
        position: new Vector(200, 500)
    }),
    new ColorRender({
        color: 'green',
        width: 200,
        height: 20
    })
);

myLayer.addChild(platform);
```

### Changing Color from another Part

You can dynamically change the color of the rectangle from another script.

```javascript
// In a custom Part
import { Part } from './Parts/Part';
import { ColorRender } from './Parts/Children/ColorRender';

class DamageFlash extends Part {
    constructor() {
        super();
        this.name = 'DamageFlash';
        this.flashTimer = 0;
        this.originalColor = 'blue';
    }

    takeHit() {
        const renderer = this.sibling<ColorRender>('ColorRender');
        if (renderer) {
            this.originalColor = renderer.color;
            renderer.color = 'red'; // Flash red
            this.flashTimer = 10; // For 10 frames
        }
    }

    act() {
        if (this.flashTimer > 0) {
            this.flashTimer--;
            if (this.flashTimer <= 0) {
                // Return to original color
                const renderer = this.sibling<ColorRender>('ColorRender');
                if (renderer) {
                    renderer.color = this.originalColor;
                }
            }
        }
    }
}
```
