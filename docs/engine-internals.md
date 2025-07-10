# Engine Internals

This document provides a high-level overview of the internal workings of the Forge engine. Understanding these concepts can help you write more efficient and effective code.

## 1. The Game Loop

The heart of the engine is the `Game` class's `loop()` method. This loop is started when you call `myGame.start()` and it uses `window.requestAnimationFrame()` to run as efficiently as possible, typically 60 times per second.

On each iteration of the loop, it performs these key actions:

1.  **Clear the Canvas**: The entire canvas is wiped clean to prepare for drawing the new frame.
2.  **Call `act()` on the Current Scene**: The loop triggers the `act()` method of the `currentScene`.
3.  **Render Debug Info (if `devmode` is true)**: If devmode is enabled, the engine calculates and renders the visual node tree and other debugging information.

## 2. The Scene Graph and the `act()` Cascade

The Forge engine uses a hierarchical structure called a **scene graph**. The root of this graph is the `Game` object. Its children are `Scene`s, which have `Layer`s as children, which in turn have `GameObject`s as children, and so on.

When the game loop calls `currentScene.act()`, it triggers a cascade down the entire scene graph:

-   The `Scene`'s `act()` method calls `act()` on all of its children (`Layer`s).
-   Each `Layer`'s `act()` method calls `act()` on all of its children (`GameObject`s).
-   Each `GameObject`'s `act()` method calls `act()` on all of its children (components like `Transform`, `SpriteRender`, `PlayerController`, etc.).

This is how every single `Part` in your game gets a chance to perform its logic on every single frame. This is why you put your per-frame logic inside the `act()` method of your custom components.

### Rendering Order

Rendering is part of the `act()` cascade. A component like `SpriteRender` will perform its drawing logic inside its `act()` method. Because the cascade happens in the order children are added, the rendering order is naturally determined by the structure of your scene graph.

-   `Layer`s added to a `Scene` first are rendered first (appearing in the background).
-   `GameObject`s added to a `Layer` first are rendered first.

## 3. Sibling Communication

A `GameObject` is a simple container. Its behavior is defined by the component `Part`s you add to it. For these components to work together, they need to be able to communicate.

The primary way they do this is with the `this.sibling<T>(name)` method.

Consider a `Player` `GameObject` with three children:
1.  A `Transform` named "Transform".
2.  A `SpriteRender` named "SpriteRender".
3.  A custom `PlayerController` named "PlayerController".

Inside `PlayerController.act()`, you need to move the player. To do this, you need to change the `position` on the `Transform`. You get a reference to it like this:

```javascript
// Inside PlayerController.ts
act() {
    const transform = this.sibling<Transform>('Transform');
    if (transform) {
        transform.position.x += 5;
    }
}
```

This is the core pattern of the engine: **`GameObject`s group components, and components talk to their siblings to create emergent behavior.**

## 4. Input and Event Handling

User input is handled by the `Input` component, which you add to your `Scene`.

-   It listens for native browser events (like `keydown`, `click`, `mousemove`).
-   It determines the world coordinates of mouse events by factoring in the active `Camera`'s position and zoom.
-   It identifies which `Part` is being hovered over or clicked.
-   It calls the appropriate callback function you provided in its constructor (`key`, `click`, etc.).
-   It also calls lifecycle methods directly on the `Part`s being interacted with, such as `onhover()`, `onclick()`, `onmousedown()`, etc. This allows you to define interaction logic directly on a `Part` (like a `Button`) itself.
