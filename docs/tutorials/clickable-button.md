# Creating a Clickable Button

This tutorial will guide you through creating an interactive button that responds to clicks and hover events using the `Button` component.

## 1. Set up your Scene and GameObjects

First, ensure you have a `Game` and `Scene` set up. Then, create a `GameObject` that will represent your button. This `GameObject` will need a `Transform` for its position and a `Button` component for its appearance and click logic.

```javascript
import { Game } from './Parts/Game';
import { Scene } from './Parts/Scene';
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { Button } from './Parts/Children/Button';
import { Vector } from './Math/Vector';

// 1. Create the Game instance (if you haven't already)
const myGame = new Game({
    name: 'ButtonDemo',
    canvas: 'game-canvas',
    width: 800,
    height: 600,
    devmode: true
});

// 2. Create a Scene
const mainScene = new Scene({ name: 'MainScene' });

// 3. Define a function to handle the button click
function onButtonClick() {
    console.log('Button Clicked!');
    alert('You clicked the button!');
}

// 4. Create the Button GameObject
const startButton = new GameObject({ name: 'StartButton' });
startButton.addChildren(
    new Transform({ position: new Vector(400, 300) }), // Center the button
    new Button({
        label: 'Start Game',
        width: 200,
        height: 60,
        backgroundColor: '#4CAF50',
        color: 'white',
        font: '24px Arial',
        onClick: onButtonClick
    })
);

// 5. Add the button to the scene
mainScene.addChild(startButton);

// 6. Add the scene to the game and start
myGame.addChild(mainScene);
myGame.start(mainScene);
```

## 2. Adding Sound Effects to the Button

You can easily add sound feedback to your button's interactions by providing `Sound` instances to its constructor. Ensure you have `Sound` assets (e.g., `.mp3` or `.wav` files) available.

```javascript
import { Sound } from './Parts/Sound';

// ... (previous code for Game, Scene, GameObject, Transform)

// Create Sound instances
const clickSound = new Sound({ name: 'ClickSound', src: './assets/audio/button_click.mp3', volume: 0.7 });
const hoverSound = new Sound({ name: 'HoverSound', src: './assets/audio/button_hover.mp3', volume: 0.5 });

// Add sounds to the button's GameObject (they need to be part of the hierarchy)
startButton.addChild(clickSound);
startButton.addChild(hoverSound);

// Modify the Button constructor to include sounds
startButton.addChildren(
    new Transform({ position: new Vector(400, 300) }),
    new Button({
        label: 'Start Game',
        width: 200,
        height: 60,
        backgroundColor: '#4CAF50',
        color: 'white',
        font: '24px Arial',
        onClick: onButtonClick,
        clickSound: clickSound, // Reference the Sound instance
        hoverSound: hoverSound  // Reference the Sound instance
    })
);

// ... (rest of your scene setup and game start)
```

Now, when you hover over the button, the `hoverSound` will play, and when you click it, the `clickSound` will play. The `Button` component handles playing these sounds automatically.