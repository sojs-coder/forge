# Part

**Extends:** None (Base Class)

The `Part` class is the fundamental building block of the entire Forge engine. Every other class, from `Game` and `Scene` to `Transform` and `SpriteRender`, inherits from `Part`. It provides the core functionality for creating a hierarchical scene graph, handling parent-child relationships, and executing per-frame logic.

## Constructor

`new Part({ name })`

-   `name?: string`
    A human-readable name for the part. Defaults to `"New Object"`.

## Key Concepts

- **Hierarchy**: Parts can be nested within each other to create complex objects. A `GameObject` might have a `Transform`, a `SpriteRender`, and a `BoxCollider` as its children.
- **Lifecycle Methods**: `Part` provides methods like `onMount` and `act` that are automatically called by the engine at the appropriate times.
- **Siblings**: A `Part` can easily access its siblings (other `Part`s that share the same parent) using the `sibling()` method. This is essential for components to communicate with each other (e.g., a movement script accessing the `Transform`).

## Properties

-   `id: string`
    A unique identifier automatically generated for each `Part` instance.

-   `name: string`
    A human-readable name for the part, used for debugging and for accessing children by name.

-   `childrenArray: Part[]`
    An array containing all direct children, preserving the order in which they were added. This is used for iterating through children during the update loop.

-   `parent?: Part`
    A reference to the `Part` that this part is a child of. It's `undefined` for the top-level `Game` part.

-   `top?: Game`
    A reference to the top-level `Game` instance. This is automatically propagated down the hierarchy, giving any `Part` access to the global game state, like the rendering `context`.

-   `ready: boolean`
    A boolean indicating whether the part is ready for use.

-   `registrations: { [key: string]: any }`
    For storing information set by parents or other parts.

-   `flats: { colliders: Collider[] }`
    Used for storing flat lists of certain types of children, like colliders.

-   `_layoutWidth: number`
    Used for layout calculations in debugTreeRender.

-   `context?: CanvasRenderingContext2D`
    Optional context property for rendering. Derived from the top-level parent, not usually defined unless top-level parent is a canvas element.

-   `debugEmoji?: string`
    Optional emoji for debugging purposes.

-   `hoverbug?: string`
    Tooltip for debug info, works with debugTreeRender.

-   `_superficialWidth: number`
    General width of object.

-   `_superficialHeight: number`
    General height of object.

-   `ties: Set<{ target: Part; localAttribute: string; targetAttribute: string; }>`
    Ties to other parts, allowing for dynamic attribute linking.

-   `type: string`
    The type of the part.

-   `base: string`
    The base class of the part. For example, `BoxCollider` and `PolygonCollider` are both of base `Collider`. `Button` and `AnimatedSprite` are both of base `Renderer`. Most parts are of base `Part`

## Methods

-   `tie(target: Part, property: string, localAttribute: string)`
    Ties a local attribute of this part to a property of a target part.

-   `onclick(event: MouseEvent, clicked: Part)`
    Optional click handler for the part.

-   `onhover()`
    Optional hover handler for the part.

-   `onunhover()`
    Optional unhover handler for the part.

-   `onmousedown(event: MouseEvent)`
    Optional mousedown handler for the part.

-   `onmouseup(event: MouseEvent)`
    Optional mouseup handler for the part.

-   `sibling<T extends Part>(name: string): T | undefined`
    Retrieves a sibling `Part` by its name.

-   `setSuperficialDimensions(width: number, height: number)`
    Sets the superficial dimensions of the part.

-   `onMount(parent: Part)`
    Called when the part is mounted to a parent.

-   `onRegister(attribute: string, value: any)`
    Called when an attribute is registered.

-   `onUnregister(attribute: string, value: any)`
    Called when an attribute is unregistered.

-   `addChild(child: Part)`
    Adds another `Part` as a child of this one.

-   `addChildren(...children: Part[])`
    Adds multiple `Part`s as children of this one.

-   `setTop(top: Game)`
    Sets the top-level `Game` instance for this part and its children.

-   `attr<T>(attribute: string, value?: T): T | undefined`
    Gets or sets an attribute of the part.

-   `act(delta: number)`
    The main update method. It's called on every `Part` in the scene graph on every frame of the game loop. You override this method in your custom classes to implement your game logic.

-   `setAll(attribute: string, value: any)`
    Sets an attribute and propagates it to all children.

-   `calculateLayout(spacing?: { x: number, y: number })`
    Calculates the layout of the part and its children for debugging purposes.

-   `removeChild(child: Part)`
    Removes a specific child `Part`.

-   `debugTreeRender(x: number, y: number, spacing?: { x: number, y: number })`
    Renders the debug tree for this part and its children.

-   `child<T extends Part>(name: string): T | undefined`
    Retrieves a child `Part` by its name or type.

-   `onStart()`
    Called before act() is called, when the scene is first started through `Game.start()`

-   `frameEnd(delta: number)`
    Called when the frame has ended. This is good if you want your Part to have final say in the scene. Eg: apply a filter some other form of post effects.

-   `isVisible(camera: Camera): boolean`
    Returns true or false if the object is visible in the camera. Needs to be called on a collider or implemented in a custom class, otherwise it will not work. This is good if a Part is computationally intensive, you can call a sibling collider's isVisible method and skip an intensive rending process if it is not visible (eg: lighting). You most likely want to override this method.

-   `getPart<T extends Part>(arg: (string | new (...args: any[]) => T)): T | undefined`
    Searches through children parts to find a part of that type. Example: `part.getPart<Collider>(Collider)`. It can also be used with strings, and can reference both base types and main types. Example: `part.getPart<Collider>("Collider")` - this would return the first collider child, which could be a BoxCollider, PolygonCollider, or Collider instance.

-   `getChildPartRecursive<T extends Part>(arg: (string | new (...args: any[]) => T), found: T[] = []): T[]`
    This goes through the child node graph and identifies any child of type T. (Same implementation as getPart- either string or type). For example `part.getChildPartRecursive<Collider>("Collider")` would get every BoxCollider, PolygonCollider, and Collider that is a child of `part`.

-   `siblingOf<T extends Part>(...args: string[]): (T extends Part)[]`
    Returns a list of parts that are of type in args, as a string. `part.siblinOf("Camera", "Input", "Renderer", "BoxCollider")` would return a list with every Camera, Input, Renderer, TextRender, ColorRender, AnimatedSprite, SpriteRender, Button, and BoxCollider that is a sibling of the part.


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