# Scaler

**Extends:** [Part](./Part.md)

The `Scaler` component makes a `GameObject` continuously scale up and down between a minimum and maximum size. It's useful for pulsating effects, breathing animations, or indicating interactive elements.

## Properties

-   `scaleSpeed: Vector`
    The rate at which the object scales per frame. This is a `Vector` to allow for independent scaling speeds on the X and Y axes. Defaults to `new Vector(0.01, 0.01)`.

-   `minScale: Vector`
    The minimum scale the object will shrink to. Defaults to `new Vector(0.5, 0.5)`.

-   `maxScale: Vector`
    The maximum scale the object will grow to. Defaults to `new Vector(1.5, 1.5)`.

## How it Works

The `Scaler` component accesses the `Transform` sibling of its parent `GameObject` and continuously adjusts its `scale` property each frame. When the object reaches its `maxScale`, it reverses direction and scales down to `minScale`, and vice-versa.

## Examples

### Creating a Pulsating Heart

This example shows how to make a heart sprite pulsate in size.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { Scaler } from './Parts/Scaler';
import { Vector } from './Math/Vector';

const heart = new GameObject({ name: 'PulsatingHeart' });

heart.addChildren(
    new Transform({ position: new Vector(400, 300) }),
    new SpriteRender({
        imageSource: './assets/heart.png',
        width: 50,
        height: 50
    }),
    new Scaler({
        scaleSpeed: new Vector(0.02, 0.02), // Faster pulsation
        minScale: new Vector(0.8, 0.8),
        maxScale: new Vector(1.2, 1.2)
    })
);

myLayer.addChild(heart);
```