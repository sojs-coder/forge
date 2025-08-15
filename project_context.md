# Welcome to the Forge Engine Context

## Project Overview
This project is a game engine, called Forge. The engine follows a "Game Tree" concept, where each node in the tree is a Part, and the parent node is the game itself. A parent node (Part) calls its act() method each tick, then calls its childrens act() methods. There is a web-based engine that uses the engine core to facilitate easier build of games.

## Overview
- You are running on a windows machine. Please use powershell commands by defualt
- Runtime is Bun. Build commands are build:engine, build:editor, and build:all.

## Code Overview
- Examine ./docs for documentation of the project
- Examine ./Parts for the code on each built-in part
- Examine ./engine for the code that runs the web engine. Ignore the .js files (specifically, bundle.js, editor.js, script.bak.js, and defs.bak.js), as the project is built using ts and these are just the build files.

## Current Task

Examine the structure of the spritesheet data (@docs/spritesheet-format.md), and build a page engine/spriteBuilder.html that allows for importing individual assets and creating spritesheets, complete with animation support. Also, allow building sprites through drawing.

The idea is that the editor is on large canvas, and there is a right panel for selecting current animation. A bottom gutter allows selecting individual frames for the animation. Also, allow saving individual frames of the sprites. 

When exporting, combing the animations and frames and zip them, so that the unzipped file gives spritesheet.png and spritesheetdata.json.

Please build it using ts, and add another build directive to package.json `build:spriteEditor` and `watch:spriteEditor`, which outputs to spriteEditor.js. Attach this to the html file.

Use the same style guides as the editor (@engine/styles.css).

Begin by examining @docs/spritesheet-format.md and the attached format.

## SpritesheetData interface
```ts
export interface SpriteSheetData {
    frames: Array<{
        filename: string; // Name of the frame
        frame: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
        rotated?: boolean;
        trimmed?: boolean;
        spriteSourceSize?: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
        sourceSize?: {
            w: number;
            h: number;
        };
        duration?: number; // Optional duration for each frame (in milliseconds)
    }>;
    meta: {
        image: string; // Path to the spritesheet image
        size: {
            w: number; // Width of the spritesheet
            h: number; // Height of the spritesheet
        };
        startingAnimation?: string; // Optional property to specify the starting animation
        startingFrame?: string; // Optional property to specify the starting frame
        animations: {
            [animationName: string]: {
                frames: string[]; // Array of frame names for this animation
                loop?: boolean; // Optional property to indicate if the animation should loop
                bounce?: boolean; // Optional property to indicate if the animation should bounce
            };
        }; // Optional property to define animations by frame names
    }
}
```