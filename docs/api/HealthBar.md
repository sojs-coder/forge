# HealthBar

**Extends:** [Part](./Part.md)

The `HealthBar` component displays a visual representation of a `Health` component's current health.

## Constructor

`new HealthBar({ width, height, color, backgroundColor, offsetHeight })`

-   `width?: number`
    The width of the health bar in pixels. Defaults to `100`.

-   `height?: number`
    The height of the health bar in pixels. Defaults to `10`.

-   `color?: string`
    The color of the health bar. Defaults to `"green"`.

-   `backgroundColor?: string`
    The color of the health bar's background. Defaults to `"red"`.

-   `offsetHeight?: number`
    The vertical offset of the health bar from the parent `GameObject`'s position. Defaults to `0`.

## Properties

-   `width: number`
    The width of the health bar in pixels.

-   `height: number`
    The height of the health bar in pixels.

-   `color: string`
    The color of the health bar.

-   `backgroundColor: string`
    The color of the health bar's background.

-   `targetHealth: Health | undefined`
    A reference to the `Health` component that this health bar is tracking.

-   `offsetHeight: number`
    The vertical offset of the health bar from the parent `GameObject`'s position.

## How it Works

The `HealthBar` component requires a `Health` sibling and a `Transform` sibling. It reads the `currentHealth` and `maxHealth` from the `Health` component to calculate the width of the health bar. It then uses the `Transform` component to position the health bar in the world.

## Example

This example shows how to create an enemy with a health bar.

```javascript
import { GameObject } from './Parts/GameObject';
import { Health } from './Parts/Health';
import { HealthBar } from './Parts/HealthBar';
import { Transform } from './Parts/Children/Transform';
import { Vector } from './Math/Vector';

const enemy = new GameObject({ name: 'Enemy' });
enemy.addChildren(
    new Transform({ position: new Vector(200, 200) }),
    new Health({ maxHealth: 50 }),
    new HealthBar({ width: 50, height: 5, offsetHeight: -30 })
);

myScene.addChild(enemy);
```