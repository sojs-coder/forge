# Input

**Extends:** [Part](./Part.md)

The `Input` component is the bridge between the user's actions (keyboard and mouse) and your game's logic. You create an `Input` component and provide it with callback functions that will be executed when input events occur.

An `Input` component should be added as a child to the `Scene` it controls.

## Constructor

`new Input({ key, keyup, mousemove, click })`

-   `key?: (event: KeyboardEvent) => void`
    Called on every frame for every key that is currently held down.

-   `keyup?: (event: KeyboardEvent) => void`
    Called once when a key is released.

-   `mousemove?: (event: MouseEvent, hovering: Part) => void`
    Called when the mouse moves. The `hovering` parameter is the `Part` the mouse is currently over.

-   `click?: (event: MouseEvent, clicked: Part) => void`
    Called when the mouse is clicked. The `clicked` parameter is the `Part` that was clicked on.

## Properties

-   `downkeys: Set<string>`
    A `Set` containing the `key` strings of all keyboard keys that are currently being held down. This is useful for continuous actions like movement.

-   `currentMousePos: { x: number, y: number }`
    The current position of the mouse cursor in world coordinates.

-   `lastClickPos: { x: number, y: number } | null`
    The world coordinates of the last mouse click. It is set to `null` after being processed.

-   `initialized: boolean`
    A boolean indicating whether the event listeners have been initialized.

## Methods

-   `initialize(canvas: HTMLCanvasElement)`
    Initializes the event listeners for the input component. This is called internally by the engine.

## Examples

### Creating an Input Handler for Player Movement

```javascript
import { Scene } from './Parts/Scene';
import { Input } from './Parts/Input';
import { Transform } from './Parts/Children/Transform';
import { GameObject } from './Parts/GameObject';

// Assume 'player' is a GameObject with a Transform child
declare const player: GameObject;
const playerTransform = player.child<Transform>('Transform');

const playerInput = new Input({
    key: (event) => {
        // This runs every frame a key is down
        switch (event.key) {
            case 'w':
                playerTransform.position.y -= 5;
                break;
            case 's':
                playerTransform.position.y += 5;
                break;
            case 'a':
                playerTransform.position.x -= 5;
                break;
            case 'd':
                playerTransform.position.x += 5;
                break;
        }
    },
    keyup: (event) => {
        if (event.key === ' ') {
            console.log('Player jumped!');
        }
    },
    mousemove: (event, hovering) => {
        if (hovering) {
            console.log('Hovering over:', hovering.name);
        }
    },
    click: (event, clicked) => {
        if (clicked) {
            console.log('Clicked on:', clicked.name);
            // Example: tell a part on the clicked object to do something
            const clickable = clicked.sibling('Clickable'); // A custom part
            clickable?.doSomething();
        }
    }
});

// Add the input handler to your scene
myScene.addChild(playerInput);
```