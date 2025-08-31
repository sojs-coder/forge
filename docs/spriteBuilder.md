# Sprite Builder

The Sprite Builder is a tool within the Forge Engine editor that allows you to create and edit spritesheets and their animations.

## Overview

The Sprite Builder provides a canvas for drawing individual frames, tools for creating animations from those frames, and an export functionality to generate a spritesheet image and a compatible JSON data file for use with the `AnimatedSprite` component.

## Layout

-   **Top Panel**: Contains global actions and settings.
    -   `Create Frame`: Adds a new, empty frame to the frames list.
    -   `Export Spritesheet`: Exports the frames and animations as a PNG image and a JSON file.
    -   `Overlay Frame`: Allows you to see a semi-transparent version of another frame while drawing on the current one, which is useful for animation consistency.
    -   `Frame Width`/`Frame Height`: Sets the dimensions for new frames.
    -   `Light Background`: Toggles the canvas background color between dark and light.

-   **Drawing Tools**: A panel with tools for drawing on the canvas. This panel appears when you are editing a frame.
    -   `Pencil`, `Line`, `Circle`, `Polygon`, `Image`, `Cursor`, `Select`: Various tools for drawing and manipulating shapes.
    -   `Color Picker`: Selects the drawing color.
    -   `Thickness`: Sets the line thickness.
    -   `Anti-aliasing`: Toggles anti-aliasing for smoother lines.
    -   `Save Drawing`/`Cancel`: Saves or discards the changes to the current frame.

-   **Center Panel**: The main canvas where you draw and edit individual frames.

-   **Right Panel**: Manages animations.
    -   `Animations List`: Shows all created animations.
    -   `Add Animation`: Creates a new animation sequence.

-   **Bottom Gutter**: Manages all the frames in your spritesheet.
    -   `Frames List`: Displays all created frames. You can select, reorder, and delete frames from here.

## Workflow

1.  **Create Frames**: Click `Create Frame` to add as many frames as you need for your animations. Set the desired `Frame Width` and `Frame Height` before creating them.
2.  **Draw Frames**: Click on a frame in the `Frames List` to open it in the `Center Panel`. Use the `Drawing Tools` to create your sprite art.
3.  **Create Animations**: Click `Add Animation` in the `Right Panel`. Give the animation a name (e.g., "walk", "idle").
4.  **Build Animations**: Drag frames from the `Frames List` at the bottom and drop them into an animation in the `Animations List` on the right to build your animation sequence.
5.  **Preview Animations**: Click the preview button on an animation to see it play in a modal window.
6.  **Export**: Click `Export Spritesheet`. This will generate a single PNG image containing all your frames and a JSON file that describes the locations of those frames and the animation sequences you created. These two files can then be used with the `AnimatedSprite` component in your game.
