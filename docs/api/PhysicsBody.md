# PhysicsBody

**Extends:** [Part](./Part.md)

The `PhysicsBody` part gives a `GameObject` physical properties, allowing it to be affected by the `PhysicsEngine`.

## Properties

-   `isStatic: boolean`
    If `true`, the object will not be affected by gravity or other forces. Defaults to `false`.
-   `density: number`
    The density of the object. Defaults to `0.001`.
-   `friction: number`
    The friction of the object. Defaults to `0.1`.
-   `restitution: number`
    The bounciness of the object. Defaults to `0`.

## How it Works

The `PhysicsBody` component requires a `Transform` and a `Collider` (`BoxCollider` or `PolygonCollider`) to be present on the same `GameObject`. The `PhysicsBody` will automatically use the `Collider` to create a physical body in the `PhysicsEngine`.

## Examples

### Creating a Dynamic Physics Body

This creates a box that will be affected by gravity.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { BoxCollider } from './Parts/Children/BoxCollider';
import { ColorRender } from './Parts/Children/ColorRender';
import { PhysicsBody } from './Parts/PhysicsBody';
import { Vector } from './Math/Vector';

const myBox = new GameObject({ name: 'MyBox' });

myBox.addChildren(
    new Transform({
        position: new Vector(400, 100)
    }),
    new BoxCollider({
        width: 50,
        height: 50
    }),
    new ColorRender({
        width: 50,
        height: 50,
        color: '#ff0000'
    }),
    new PhysicsBody({
        isStatic: false
    })
);

myScene.addChild(myBox);
```

### Creating a Static Physics Body

This creates a box that will not be affected by gravity.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { BoxCollider } from './Parts/Children/BoxCollider';
import { ColorRender } from './Parts/Children/ColorRender';
import { PhysicsBody } from './Parts/PhysicsBody';
import { Vector } from './Math/Vector';

const myGround = new GameObject({ name: 'MyGround' });

myGround.addChildren(
    new Transform({
        position: new Vector(400, 550)
    }),
    new BoxCollider({
        width: 800,
        height: 50
    }),
    new ColorRender({
        width: 800,
        height: 50,
        color: '#00ff00'
    }),
    new PhysicsBody({
        isStatic: true
    })
);

myScene.addChild(myGround);
```