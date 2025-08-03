# Scene

**Extends:** [Part](./Part.md)

A `Scene` is a top-level container within your `Game`. It represents a single screen or level, like a "Main Menu", "Level 1", or "Game Over" screen. You organize your game's content by adding `Layer`s to a `Scene`.

Only one `Scene` can be active at a time, and the `Game` object is responsible for managing which `Scene` is currently being displayed.

## Constructor

`new Scene({ name, backgroundColor })`

-   `name: string`
    The name of the scene.

-   `backgroundColor?: string`
    The background color of the scene. Defaults to `"#000"` (black).

## Properties

A `Scene` inherits all properties from `Part`.

-   `activeCamera: Camera | null`
    The `Camera` that is currently being used to view this `Scene`. When a `Camera` is added as a child to any `Part` within the `Scene`'s hierarchy, it automatically registers itself as the `activeCamera`.

-   `backgroundColor: string`
    The background color of the scene. Defaults to `"#000"` (black).

## Methods

-   `addChild(part: Part)`
    Adds a `Part` (typically a `Layer`) to this scene.

-   `addChildren(...parts: Part[])`
    Adds multiple `Part`s to this scene.

-   `act(delta: number)`
    The main update method for the scene. This is called by the `Game` loop.

## Examples

### Creating a Scene and Adding Layers

```javascript
import { Scene } from './Parts/Scene';
import { Layer } from './Parts/Layer';
import { GameObject } from './Parts/GameObject';

const myScene = new Scene({ name: 'Level1', backgroundColor: '#87CEEB' }); // Sky blue background

const backgroundLayer = new Layer({ name: 'Background' });
const gameplayLayer = new Layer({ name: 'Gameplay' });
const uiLayer = new Layer({ name: 'UI' });

// Create a player GameObject (see GameObject docs for details)
const player = new GameObject({ name: 'Player' });
// ... add components to player

// Add the player to the gameplay layer
gameplayLayer.addChild(player);

// Add the layers to the scene
myScene.addChildren(backgroundLayer, gameplayLayer, uiLayer);

// Add the scene to the game
myGame.addChild(myScene);
```

### Switching Scenes

You can switch between scenes using the `setScene` method on your `Game` instance.

```javascript
// Assume myGame is your Game instance
const mainMenuScene = new Scene({ name: 'MainMenu' });
const level1Scene = new Scene({ name: 'Level1' });

myGame.addChildren(mainMenuScene, level1Scene);

// Start with the main menu
myGame.start(mainMenuScene);

// Later, to switch to level 1 (e.g., when a "Start" button is clicked)
function startGame() {
    myGame.setScene('Level1'); // Switch by name
}
```