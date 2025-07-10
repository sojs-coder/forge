# Part

**Extends:** None (Base Class)

The `Part` class is the fundamental building block of the entire Forge engine. Every other class, from `Game` and `Scene` to `Transform` and `SpriteRender`, inherits from `Part`. It provides the core functionality for creating a hierarchical scene graph, handling parent-child relationships, and executing per-frame logic.

## Key Concepts

- **Hierarchy**: Parts can be nested within each other to create complex objects. A `GameObject` might have a `Transform`, a `SpriteRender`, and a `BoxCollider` as its children.
- **Lifecycle Methods**: `Part` provides methods like `onMount` and `act` that are automatically called by the engine at the appropriate times.
- **Siblings**: A `Part` can easily access its siblings (other `Part`s that share the same parent) using the `sibling()` method. This is essential for components to communicate with each other (e.g., a movement script accessing the `Transform`).

## Properties

-   `id: string`
    A unique identifier automatically generated for each `Part` instance.

-   `name: string`
    A human-readable name for the part, used for debugging and for accessing children by name.

-   `children: { [id: string]: Part }`
    An object (dictionary/map) containing all direct children of this part, indexed by their `name`. This allows for quick access to a specific child.

-   `childrenArray: Part[]`
    An array containing all direct children, preserving the order in which they were added. This is used for iterating through children during the update loop.

-   `parent?: Part`
    A reference to the `Part` that this part is a child of. It's `undefined` for the top-level `Game` part.

-   `top?: Game`
    A reference to the top-level `Game` instance. This is automatically propagated down the hierarchy, giving any `Part` access to the global game state, like the rendering `context`.

-   `superficialWidth: number` & `superficialHeight: number`
    These properties represent the general or "superficial" dimensions of a `Part`. Their meaning is context-dependent:
    - For a `Part` with a `Renderer` child (like `SpriteRender` or `ColorRender`), these dimensions are typically set by that renderer to match the visual size of the object.
    - For a `Part` with a `Collider` child, the collider might set these dimensions.
    - For a simple `GameObject` with no renderer or collider, they might remain 0 or be set manually.
    They are a way for parts to understand the approximate size of their siblings or parents without needing to know the specific type of renderer or collider being used. For example, `EnemyMovement.ts` uses `superficialWidth` to know how far from the edge of the screen to stop, regardless of what the enemy looks like.

## Methods

-   `addChild(child: Part)`
    Adds another `Part` as a child of this one.

-   `removeChild(child: Part)`
    Removes a specific child `Part`.

-   `sibling<T extends Part>(name:string): T | undefined`
    Retrieves a sibling `Part` by its name. This is a very common and powerful method.

-   `act()`
    The main update method. It's called on every `Part` in the scene graph on every frame of the game loop. You override this method in your custom classes to implement your game logic.

## Examples

### Creating a Custom Part

This is the foundation for all custom game logic.

```javascript
import { Part } from './Parts/Part';
import { Transform } from './Parts/Children/Transform';

class Health extends Part {
    constructor() {
        super();
        this.name = 'Health';
        this.currentHealth = 100;
    }

    takeDamage(amount) {
        this.currentHealth -= amount;
        console.log(`Ouch! Health is now ${this.currentHealth}`);
        if (this.currentHealth <= 0) {
            // We can access the parent GameObject and tell it to do something
            this.parent?.destroy(); // Assuming a destroy method exists
        }
    }

    act() {
        // Maybe regenerate health over time
        // this.currentHealth += 0.1;
    }
}
```

### Using a Part from another Part (Sibling Communication)

Here, a `PlayerController` part accesses its `Transform` sibling to move and its `Health` sibling to take damage.

```javascript
import { Part } from './Parts/Part';
import { Transform } from './Parts/Children/Transform';
import { Health } from './Health'; // Your custom class

class PlayerController extends Part {
    constructor() {
        super();
        this.name = 'PlayerController';
        this.speed = 5;
    }

    act() {
        // Get the Transform sibling to move the player
        const transform = this.sibling<Transform>('Transform');
        if (transform) {
            // (Input handling logic would go here)
            // For example, move right:
            transform.position.x += this.speed;
        }

        // Example of interacting with another sibling
        if (/* some condition for taking damage */) {
            const health = this.sibling<Health>('Health');
            health?.takeDamage(10);
        }
    }
}

// In your scene setup:
const player = new GameObject({ name: 'Player' });
player.addChildren(
    new Transform({ position: new Vector(50, 50) }),
    new Health(),
    new PlayerController()
);
```
