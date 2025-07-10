# CharacterMovement

**Extends:** [Part](./Part.md)

The `CharacterMovement` component provides basic character movement functionality based on keyboard input. It supports both WASD and Arrow Key control schemes.

## Properties

-   `speed: number`
    The movement speed of the character in pixels per frame. Defaults to `5`.

-   `movementType: 'WASD' | 'ArrowKeys'`
    The control scheme for movement. Can be either `'WASD'` or `'ArrowKeys'`. Defaults to `'WASD'`.

## How it Works

This component listens for keyboard input and updates the `position` of its parent `GameObject`'s `Transform` component accordingly. It requires an `Input` component to be present in the `Scene`.

## Examples

### Basic Player Movement

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { CharacterMovement } from './Parts/CharacterMovement';
import { Vector } from './Math/Vector';

const player = new GameObject({ name: 'Player' });
player.addChildren(
    new Transform({ position: new Vector(400, 300) }),
    new SpriteRender({
        imageSource: './assets/player.png',
        width: 32,
        height: 32
    }),
    new CharacterMovement({ speed: 5, movementType: 'WASD' })
);

myScene.addChild(player);
```