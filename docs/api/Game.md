# Game

The `Game` class is the heart of your application. It's the top-level container that manages the main game loop, scenes, rendering context, and user input.

## Properties

-   `canvas: HTMLCanvasElement`
    The HTML canvas element that the game will be rendered onto.

-   `currentScene?: Scene`
    The scene that is currently being displayed and updated.

-   `devmode: boolean`
    When set to `true`, enables special debugging features, such as the visual node tree and tooltips.

-   `context: CanvasRenderingContext2D`
    The 2D rendering context of the canvas, used for all drawing operations.

-   `hovering?: Part`
    (Devmode only) The `Part` that the mouse is currently hovering over.

-   `superficialWidth: number` & `superficialHeight: number`
    For the `Game` class, these properties are derived directly from the `width` and `height` of the canvas itself. They represent the primary dimensions of the game area.

## Examples

### Creating a Game

This is the first step to starting any project.

```javascript
import { Game } from './Parts/Game';

const myGame = new Game({
    name: 'My Awesome Game',
    canvas: 'game-canvas', // The ID of your canvas element in your HTML
    width: 800,
    height: 600,
    devmode: true
});
```

### Starting the Game with a Scene

After creating your game and adding scenes to it, you need to tell the game which scene to start with.

```javascript
import { Game } from './Parts/Game';
import { Scene } from './Parts/Scene';

const myGame = new Game({ /* ... */ });
const myFirstScene = new Scene({ name: 'Level 1' });

// Add the scene to the game
myGame.addChild(myFirstScene);

// Start the game
myGame.start(myFirstScene);
// or by name:
// myGame.start('Level 1');
```
