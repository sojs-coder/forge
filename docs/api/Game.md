# Game

**Extends:** [Part](./Part.md)

The `Game` class is the heart of your application. It's the top-level container that manages the main game loop, scenes, rendering context, and user input.

## Constructor

`new Game({ name, canvas, devmode, width, height, disableAntiAliasing, showtoolTips })`

-   `name: string`
    The name of the game.

-   `canvas: HTMLCanvasElement | string`
    The HTML canvas element or the ID of the canvas element that the game will be rendered onto.

-   `width: number`
    The width of the game canvas.

-   `height: number`
    The height of the game canvas.

-   `devmode?: boolean`
    When set to `true`, enables special debugging features, such as the visual node tree and tooltips. Defaults to `false`.

-   `disableAntiAliasing?: boolean`
    When set to `true`, disables anti-aliasing for all rendering. Defaults to `false`.

-   `showtoolTips?: boolean`
    When set to `true`, shows tooltips in devmode. Defaults to `false`.

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

-   `width: number`
    The width of the game canvas.

-   `height: number`
    The height of the game canvas.

-   `isRunning: boolean`
    Indicates whether the game loop is currently running.

-   `isPaused: boolean`
    Indicates whether the game loop is currently paused.

-   `messageHook: (type: "warn" | "error" | "debug", ...args: any[]) => void`
    Trap logging to route to a different spot than console.

## Methods

-   `changeCanvasSize(width: number, height: number)`
    Changes the size of the game canvas.

-   `addChild(scene: Scene)`
    Adds a scene to the game. The first scene added will automatically become the `currentScene`.

-   `addChildren(...scenes: Scene[])`
    Adds multiple scenes to the game.

-   `start(starterScene: Scene | string)`
    Starts the game loop with the specified scene. Can be a `Scene` object or the name of a scene.

-   `loop()`
    The main game loop. This method is called automatically by `start()`.

-   `pause()`
    Pauses the game loop.

-   `resume()`
    Resumes the game loop.

-   `stop()`
    Stops the game loop.

-   `act(purposeful?: boolean | number)`
    Executes one frame of the current scene. This is primarily for internal use or debugging.

-   `setScene(scene: Scene | string)`
    Sets the current active scene. Can be a `Scene` object or the name/ID of a scene.

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