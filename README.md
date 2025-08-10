# Getting Started

This guide will walk you through the basics of creating a game with the Forge engine.

## Project Structure

The Forge engine is organized into the following files and directories:

- `helpers.ts`: A collection of helper functions.
- `types.ts`: Contains the TypeScript interfaces used throughout the engine.
- `README.md`: The main README file for the project.
- `docs/`: Contains the documentation for the engine.
- `engine/`: Contains the engine page for creating games.
- `Math/`: Contains the `Vector.ts` file, which is a simple vector library.
- `Parts/`: Contains the core components of the engine.
- `public/`: Contains the public assets for the game, such as images and scripts.
- `src/`: Contains the source code for the game.

## Overview

The Forge engine is build on the core concept of trees. We consider each node on the tree a "Part" in the game. The tree always begins with a Game part, and then it can be built further from there.
A typical game structure might look like the following:

```
Game
-> Start Scene
----> Text
--------> Transform
----> Start Button
--------> Transform

-> Game Scene
----> Player
--------> Transform
--------> SpriteRender
--------> BoxCollider
----> Enemy
--------> Transform
--------> SpriteRender
--------> BoxCollider
----> Coin
--------> Transform
--------> SpriteRender
--------> BoxCollider
... etc
```

In order to build a game, you would mix and match Parts together to build your game. There are a few prebuilt parts that exist to simplify the development process, but you will need to build the core functionality yourself.

## Your First Game: "Hello, World!"

Let's create the simplest possible game to see the engine in action. This game will display the text "Hello, World!" on the screen.

### 1. Set up your HTML file

First, you need an HTML file to host your game. Create an `index.html` in your project's `public` directory.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Forge Game</title>
    <style>
        body { margin: 0; overflow: hidden; background-color: #333; }
        canvas { display: block; }
    </style>
</head>
<body>
    <canvas id="game-canvas"></canvas>
    <script src="script.js"></script>
</body>
</html>
```

### 2. Create the main script

Next, create a `script.js` file (or `main.ts` if you are using TypeScript) in your `src` directory. This is where your game's code will live.

```javascript
import { Game } from '../Parts/Game';
import { Scene } from '../Parts/Scene';
import { GameObject } from '../Parts/GameObject';
import { Transform } from '../Parts/Children/Transform';
import { TextRender } from '../Parts/Children/TextRender';
import { Vector } from '../Math/Vector';

// 1. Create the Game instance
const myGame = new Game({
    name: 'HelloWorldGame',
    canvas: 'game-canvas', // The ID of the canvas in your HTML
    width: 800,
    height: 600,
    devmode: true // Enable debug tools
});

// 2. Create a Scene
const mainScene = new Scene({ name: 'MainScene' });

// 3. Create a GameObject for our text
const helloText = new GameObject({ name: 'HelloWorldText' });

// 4. Add components to the GameObject
helloText.addChildren(
    // All GameObjects need a Transform for position, rotation, and scale
    new Transform({
        position: new Vector(400, 300) // Center of the 800x600 canvas
    }),
    // The TextRender component will draw our text
    new TextRender({
        name: 'MyText',
        textContent: 'Hello, World!',
        font: '48px Arial',
        color: 'white',
        align: 'center'
    })
);

// 5. Add the GameObject to the Scene
mainScene.addChild(helloText);

// 6. Add the Scene to the Game
myGame.addChild(mainScene);

// 7. Start the game!
myGame.start(mainScene);

```

### 3. Run your game

You will need a local development server to run your game. If you have one set up, navigate to your `public/index.html`. You should see "Hello, World!" displayed in the center of the canvas.

Because `devmode` is on, you can also see the node tree on the right side of the screen, which is a powerful tool for debugging and understanding your game's structure.

Congratulations, you've made your first game with the Forge engine! From here, you can explore the other `Part`s to add images, player input, physics, and more.
