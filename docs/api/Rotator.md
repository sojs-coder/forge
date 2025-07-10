# Rotator

**Extends:** [Part](./Part.md)

The `Rotator` component makes a `GameObject` continuously rotate around its origin. It's useful for visual effects, spinning collectibles, or indicating active elements.

## Properties

-   `rotationSpeed: number`
    The speed of rotation in radians per frame. A positive value rotates clockwise, and a negative value rotates counter-clockwise. Defaults to `0.05`.

## How it Works

The `Rotator` component accesses the `Transform` sibling of its parent `GameObject` and continuously increments its `rotation` property by the `rotationSpeed` each frame.

## Examples

### Making a Coin Spin

This example shows how to make a coin sprite continuously spin.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { Rotator } from './Parts/Rotator';
import { Vector } from './Math/Vector';

const coin = new GameObject({ name: 'SpinningCoin' });

coin.addChildren(
    new Transform({ position: new Vector(400, 200) }),
    new SpriteRender({
        imageSource: './assets/coin.png',
        width: 32,
        height: 32
    }),
    new Rotator({ rotationSpeed: 0.1 }) // Spin faster
);

myLayer.addChild(coin);
```