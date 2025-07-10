# GameObject

**Extends:** [Part](./Part.md)

The `GameObject` is a fundamental building block. It serves as a container for other `Part`s (components) to create a single, cohesive entity in your game. Think of a `Player`, an `Enemy`, or a `Bullet`—these are all typically `GameObject`s.

By itself, a `GameObject` doesn't do much. Its power comes from the components you add to it.

## Properties

A `GameObject` inherits all properties from `Part`, such as `name`, `parent`, and `children`.

-   `layer?: Layer`
    A reference to the `Layer` this `GameObject` belongs to. This is automatically set when you add the `GameObject` to a `Layer`.

## Examples

### Creating a Simple GameObject

This creates an empty `GameObject`. It exists in the scene but has no appearance or behavior yet.

```javascript
import { GameObject } from './Parts/GameObject';

const myObject = new GameObject({ name: 'EmptyObject' });
```

### Creating a Player GameObject with Components

This is a more typical use case. We create a `GameObject` and then add `Part`s to it to define its properties and behavior.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { BoxCollider } from './Parts/Children/BoxCollider';
import { PlayerController } from './PlayerController'; // A custom Part

const player = new GameObject({ name: 'Player' });

player.addChildren(
    new Transform({ position: new Vector(100, 200) }),
    new SpriteRender({ imageSource: './assets/player.png', width: 32, height: 48 }),
    new BoxCollider({ width: 32, height: 48 }),
    new PlayerController() // Your custom script
);

// Now, you would add the 'player' to a Layer in your Scene
myLayer.addChild(player);
```
