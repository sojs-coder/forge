# GravityCharacterMovement

**Extends:** [Part](./Part.md)

The `GravityCharacterMovement` component provides a more advanced character controller that includes gravity, jumping, and interactions with different ground types like water.

## Constructor

`new GravityCharacterMovement({ speed, movementType, input, gravityScale, maxSpeed, jumpForce, waterFraction, landFraction })`

-   `speed?: number`
    The movement speed of the character. Defaults to `5`.

-   `movementType?: 'WASD' | 'ArrowKeys' | 'BOTH'`
    The control scheme for movement. Defaults to `'WASD'`.

-   `input?: Input`
    The `Input` component to use for movement.

-   `gravityScale: Vector`
    The gravity vector applied to the character.

-   `maxSpeed: number`
    The maximum speed of the character.

-   `jumpForce: number`
    The force applied to the character when jumping.

-   `waterFraction?: number`
    The fraction of normal speed and jump force when in water (0-1). Defaults to `0.5`.

-   `landFraction?: number`
    The fraction of normal speed and jump force when on land (0-1). Defaults to `1.0`.

## Properties

-   `speed: number`
-   `movementType: 'WASD' | 'ArrowKeys' | 'BOTH'`
-   `input: Input | undefined`
-   `gravityScale: Vector`
-   `maxSpeed: number`
-   `velocity: Vector`
-   `jumpForce: number`
-   `facing: Vector`
-   `waterFraction: number`
-   `landFraction: number`

## How it Works

This component applies gravity to the character and allows for jumping. It also checks for collisions with objects tagged as 'ground' or 'water' to modify movement behavior.

## Example

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { GravityCharacterMovement } from './Parts/GravityCharacterMovement';
import { Vector } from './Math/Vector';
import { Input } from './Parts/Input';

const input = new Input({});
myScene.addChild(input);

const player = new GameObject({ name: 'Player' });
player.addChildren(
    new Transform({ position: new Vector(400, 300) }),
    new GravityCharacterMovement({
        speed: 5,
        movementType: 'BOTH',
        input: input,
        gravityScale: new Vector(0, 0.5),
        maxSpeed: 10,
        jumpForce: 10
    })
);

myScene.addChild(player);
```
