# Button

**Extends:** [Renderer](./Renderer.md)

The `Button` component creates a clickable UI button with different visual states for default, hover, and active (clicked).

## Constructor

`new Button({ label, onClick, styles, clickSound, hoverSound, activeSound })`

-   `label: string`
    The text to display on the button.

-   `onClick: () => void`
    A function to be called when the button is clicked.

-   `styles?: ButtonStyles`
    An object that defines the styles for the button in its different states (default, hover, active).

-   `clickSound?: Sound`
    A `Sound` to play when the button is clicked.

-   `hoverSound?: Sound`
    A `Sound` to play when the mouse hovers over the button.

-   `activeSound?: Sound`
    A `Sound` to play when the button is pressed.

## Properties

-   `styles?: ButtonStyles`
    An object that defines the styles for the button in its different states (default, hover, active).

-   `isHovered: boolean`
    A boolean that is true when the mouse is hovering over the button.

-   `isActive: boolean`
    A boolean that is true when the button is being pressed.

-   `clickSound?: Sound`
    A `Sound` to play when the button is clicked.

-   `hoverSound?: Sound`
    A `Sound` to play when the mouse hovers over the button.

-   `activeSound?: Sound`
    A `Sound` to play when the button is pressed.

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
                font: '20px Arial'
            },
            hover: {
                backgroundColor: '#45a049' // Darker green
            }
        }
    })
);

myMenuScene.addChild(startButton);
```