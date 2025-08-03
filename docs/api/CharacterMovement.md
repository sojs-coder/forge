# CharacterMovement

**Extends:** [Part](./Part.md)

The `CharacterMovement` component provides basic character movement functionality based on keyboard input. It supports WASD, Arrow Key, and combined control schemes.

## Constructor

`new CharacterMovement({ speed, movementType, input })`

-   `speed?: number`
    The movement speed of the character in pixels per frame. Defaults to `5`.

-   `movementType?: 'WASD' | 'ArrowKeys' | 'BOTH'`
    The control scheme for movement. Can be `'WASD'`, `'ArrowKeys'`, or `'BOTH'`. Defaults to `'WASD'`.

-   `input?: Input`
    The `Input` component to use for movement. If not provided, it will be automatically detected from the scene.

## Properties

-   `speed: number`
    The movement speed of the character in pixels per frame.

-   `movementType: 'WASD' | 'ArrowKeys' | 'BOTH'`
    The control scheme for movement. Can be `'WASD'`, `'ArrowKeys'`, or `'BOTH'`.

-   `input: Input | undefined`
    The `Input` component to use for movement.

## How it Works

This component listens for keyboard input and updates the `position` of its parent `GameObject`'s `Transform` component accordingly. It requires an `Input` component to be present in the `Scene`.

## Example

### Basic Player Movement

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { CharacterMovement } from './Parts/CharacterMovement';
import { Vector } from './Math/Vector';
import { Input } from './Parts/Input';

// Create an Input component for the scene
const input = new Input({});
myScene.addChild(input);

const player = new GameObject({ name: 'Player' });
player.addChildren(
    new Transform({ position: new Vector(400, 300) }),
    new SpriteRender({
        imageSource: './assets/player.png',
        width: 32,
        height: 32
    }),
    new CharacterMovement({ speed: 5, movementType: 'BOTH', input: input })
);

myScene.addChild(player);
```