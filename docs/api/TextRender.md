# TextRender

**Extends:** [Renderer](./Renderer.md)

The `TextRender` component draws text to the screen. It's ideal for UI elements like scores, labels, or dialogue.

## Constructor

`new TextRender({ name, textContent, font, align, color })`

-   `name: string`
    The name of the text render part.

-   `textContent: string`
    The string of text that you want to display.

-   `font: string`
    A CSS font string that defines the size and family of the font. For example: `"24px Arial"`.

-   `align?: "center" | "left" | "right"`
    The horizontal alignment of the text relative to the `Transform`'s position. Defaults to `"left"`.

-   `color?: string`
    A CSS color string for the text color. Defaults to `'black'`.

## Properties

-   `textContent: string`
    The string of text that you want to display.

-   `font: string`
    A CSS font string that defines the size and family of the font.

-   `align: "center" | "left" | "right"`
    The horizontal alignment of the text relative to the `Transform`'s position.

-   `color: string`
    A CSS color string for the text color.

## Methods

-   `setText(text: string)`
    Sets the text content of the renderer and updates its superficial dimensions.

## Examples

### Creating a Score Display

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { TextRender } from './Parts/Children/TextRender';
import { Vector } from './Math/Vector';

const scoreDisplay = new GameObject({ name: 'ScoreDisplay' });

scoreDisplay.addChildren(
    new Transform({
        position: new Vector(20, 20) // Top-left corner
    }),
    new TextRender({
        name: 'ScoreText', // Give it a name to find it later
        textContent: 'Score: 0',
        font: '20px monospace',
        color: 'white',
        align: 'left'
    })
);

myUiLayer.addChild(scoreDisplay);
```

### Updating the Score from another Part

This example shows a `GameManager` part that finds the score display and updates its text.

```javascript
// In a GameManager Part, for example
import { Part } from './Parts/Part';
import { TextRender } from './Parts/Children/TextRender';

// Assume 'scoreDisplay' is the GameObject created above
declare const scoreDisplay: GameObject;

class GameManager extends Part {
    constructor() {
        super();
        this.name = 'GameManager';
        this.score = 0;
    }

    addScore(points) {
        this.score += points;

        // Find the TextRender component on the scoreDisplay object
        const textRenderer = scoreDisplay.child<TextRender>('ScoreText');

        if (textRenderer) {
            textRenderer.setText(`Score: ${this.score}`);
        }
    }
}
```