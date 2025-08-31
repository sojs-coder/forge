# Layer

**Extends:** [Part](./Part.md)

A `Layer` is a direct child of a `Scene` and is used to group `GameObject`s for organizational and rendering purposes. The order in which you add `Layer`s to a `Scene` determines their rendering order. Layers added first are drawn first, meaning they will appear behind layers added later.

For example, you would typically have a `Background` layer, a `Gameplay` layer, and a `UI` layer, added in that order.

## Constructor

`new Layer({ name, spatialGridDefinition })`

-   `name: string`
    The name of the layer.

-   `spatialGridDefinition?: number`
    The cell size for the spatial grid used for broad-phase collision detection. Defaults to `100`.

## Properties

A `Layer` inherits all properties from `Part`. It does not add any of its own specific properties.

## Methods

-   `addChild(part: Part)`
    Adds a `Part` (typically a `GameObject`) to this layer.

-   `addChildren(...parts: Part[])`
    Adds multiple `Part`s to this layer.

## Examples

### Creating and Using Layers

This example demonstrates a typical layering setup for a simple game.

```javascript
import { Scene } from './Parts/Scene';
import { Layer } from './Parts/Layer';
import { GameObject } from './Parts/GameObject';
import { ColorRender } from './Parts/Children/ColorRender';
import { Transform } from './Parts/Children/Transform';

const myScene = new Scene({ name: 'MainScene' });

// 1. Background Layer (drawn first)
const backgroundLayer = new Layer({ name: 'Background' });
const sky = new GameObject({ name: 'Sky' });
sky.addChildren(
    new Transform(),
    new ColorRender({ color: 'skyblue', width: 800, height: 600 })
);
backgroundLayer.addChild(sky);

// 2. Gameplay Layer (drawn on top of background)
const gameplayLayer = new Layer({ name: 'Gameplay' });
const player = new GameObject({ name: 'Player' }); // Assume player is set up elsewhere
gameplayLayer.addChild(player);

// 3. UI Layer (drawn on top of everything)
const uiLayer = new Layer({ name: 'UI' });
const scoreText = new GameObject({ name: 'ScoreDisplay' }); // Assume scoreText is set up
uiLayer.addChild(scoreText);

// Add layers to the scene in the desired rendering order
myScene.addChildren(backgroundLayer, gameplayLayer, uiLayer);

// Add the scene to your game
myGame.addChild(myScene);
```