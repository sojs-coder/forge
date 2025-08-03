# Follow

**Extends:** [Part](./Part.md)

The `Follow` component is used to make a `GameObject` follow another `Part` in the scene. This is useful for creating camera followers, companion AI, and more.

## Constructor

`new Follow({ target, offset, interpolationSpeed })`

-   `target: Transform`
    The `Transform` component of the `Part` to follow.

-   `offset?: Vector`
    An optional `Vector` that specifies an offset from the target's position. This is useful for positioning the follower relative to the target (e.g., a camera slightly above the player, or a shadow slightly below). Defaults to `new Vector(0, 0)`.

-   `interpolationSpeed?: number`
    The speed at which the follower interpolates its position towards the target's position. A value of `1` will make the follower snap to the target's position instantly. A value less than `1` will create a smooth following effect. Defaults to `1`.

## Properties

-   `target: Part | null`
    The `Part` that this component is currently following.

-   `offset: Vector`
    An optional `Vector` that specifies an offset from the target's position.

-   `externalOffset: Vector`
    An additional offset that can be applied externally, for example, by a `CameraShake` component.

-   `interpolationSpeed: number`
    The speed at which the follower interpolates its position towards the target's position.

## How it Works

The `Follow` component continuously updates the `position` of its parent `GameObject`'s `Transform` component to match the `position` of the `target`'s `Transform` component.

## Example

This example shows how to make a camera follow a player.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { Follow } from './Parts/Follow';
import { Vector } from './Math/Vector';
import { Camera } from './Parts/Camera';

// Assume 'player' is a GameObject that exists in the scene
declare const player: GameObject;

const camera = new Camera({ name: 'MainCamera' });
camera.addChildren(
    new Transform(),
    new Follow({
        target: player.child<Transform>('Transform'),
        offset: new Vector(0, -100), // Follow 100 pixels above the player
        interpolationSpeed: 0.1 // Smooth following
    })
);

myScene.addChild(camera);
```