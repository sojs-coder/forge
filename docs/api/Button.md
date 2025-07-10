# Button

**Extends:** [Renderer](./Renderer.md)

The `Button` component creates a clickable UI button with different visual states for default, hover, and active (clicked).

## Properties

-   `styles?: ButtonStyles`
    An object that defines the appearance of the button. It can have `default`, `hover`, and `active` properties, each with CSS-like styles (`backgroundColor`, `borderColor`, `borderRadius`, `font`, etc.).

-   `onClickHandler: () => void`
    The function that gets called when the button is clicked.

## `ButtonStyles` Interface

```typescript
interface ButtonStyle {
    width?: number;
    height?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    color?: string; // Text color
    font?: string;
}

interface ButtonStyles {
    default?: ButtonStyle;
    hover?: ButtonStyle;
    active?: ButtonStyle;
}
```

## Examples

### Creating a "Start Game" Button

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { Button } from './Parts/Children/Button';
import { Vector } from './Math/Vector';

// A function to be called when the button is clicked
function handleStartClick() {
    console.log('Game Started!');
    myGame.setScene('Level1'); // Example of a scene change
}

const startButton = new GameObject({ name: 'StartButton' });

startButton.addChildren(
    new Transform({ position: new Vector(400, 300) }),
    new Button({
        label: 'Start Game',
        onClick: handleStartClick,
        styles: {
            default: {
                width: 150,
                height: 50,
                backgroundColor: '#4CAF50', // Green
                color: 'white',
                borderRadius: 8,
                font: '20px Arial'
            },
            hover: {
                backgroundColor: '#45a049' // Darker green
            },
            active: {
                backgroundColor: '#3e8e41',
                // Make it look pressed
                transform: 'translateY(2px)' // Note: transform style is not yet supported
            }
        }
    })
);

myMenuScene.addChild(startButton);
```
