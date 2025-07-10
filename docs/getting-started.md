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