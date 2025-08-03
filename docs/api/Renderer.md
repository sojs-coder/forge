# Renderer

**Extends:** [Part](./Part.md)

`Renderer` is an abstract base class for all components that draw something to the screen. You don't use `Renderer` directly, but rather one of its subclasses:

-   [SpriteRender](./SpriteRender.md)
-   [AnimatedSprite](./AnimatedSprite.md)
-   [ColorRender](./ColorRender.md)
-   [TextRender](./TextRender.md)
-   [Button](./Button.md)

All renderers require a [Transform](./Transform.md) component as a sibling to know where to draw.

## Constructor

`new Renderer({ width, height, disableAntiAliasing })`

-   `width: number`
    The width of the renderer.

-   `height: number`
    The height of the renderer.

-   `disableAntiAliasing?: boolean`
    If `true`, disables anti-aliasing for this renderer. Defaults to `false`.

## Properties

-   `width: number`
    The width of the renderer.

-   `height: number`
    The height of the renderer.

-   `facing: Vector`
    The direction the renderer is facing. Defaults to `new Vector(1, 1)`.

-   `disableAntiAliasing: boolean`
    If `true`, disables anti-aliasing for this renderer.

## Methods

-   `face(direction: Vector)`
    Sets the facing direction of the renderer. The direction vector should have `x` and `y` components of either `-1` or `1`.

## Abstract Methods

-   `render(ctx: CanvasRenderingContext2D, transform: Transform): void`
    This method is called by the `act` method of the `Renderer` class. It is responsible for drawing the object to the canvas.