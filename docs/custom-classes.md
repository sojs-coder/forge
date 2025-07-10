
# Creating Custom Classes

One of the most powerful features of the Forge engine is the ability to create your own custom classes to encapsulate specific behaviors. These classes, which extend the base `Part` class, can be attached to `GameObjects` to add functionality like movement, health, or any other game logic you can imagine.

This tutorial will walk you through the process of creating a custom class, using the `EnemyMovement.js` file as a real-world example.

## 1. The Basic Structure

Every custom class should extend the `Part` class. This provides it with the necessary lifecycle methods and properties to integrate with the engine.

Here's a basic template:

```javascript
import { Part } from "../Parts/Part";
import { Transform } from "../Parts/Children/Transform"; // Often needed

export class MyCustomClass extends Part {
    constructor() {
        super();
        this.name = "MyCustomClass";
        // Initialize your properties here
    }

    // Called once when the part is added to a parent
    onMount(parent: Part) {
        super.onMount(parent);
        // Setup logic that depends on the parent
    }

    // Called every frame by the game loop
    act() {
        // Your per-frame logic goes here
    }
}
```

## 2. Example: `EnemyMovement.ts`

Let's break down the `EnemyMovement.ts` class to see these concepts in action. This class is responsible for making an enemy character move back and forth within the screen boundaries.

```javascript
import { Part } from "../Parts/Part";
import type { Transform } from "../Parts/Children/Transform";

export class EnemyMovement extends Part {
    direction: number;
    nextFlip: number;
    minX: number;
    maxX: number;
    gameWidth: number;
    speed: number = 2;

    constructor(gameWidth: number, speed: number = 2) {
        super();
        this.name = "EnemyMovement";
        this.gameWidth = gameWidth;
        this.speed = speed;
        this.direction = 1; // 1 for right, -1 for left
        this.nextFlip = Date.now() + 1000 + (Math.random() - 0.5) * 500;
    }

    onMount(parent: Part) {
        super.onMount(parent);
        this.minX = 0;
        this.maxX = this.gameWidth - this.superficialWidth;
    }

    act() {
        const now = Date.now();
        if (now >= this.nextFlip) {
            this.direction = Math.random() < 0.5 ? 1 : -1;
            this.nextFlip = now + 1000 + (Math.random() - 0.5) * 500;
        }

        const transform = this.sibling<Transform>('Transform');
        if (!transform) {
            // It's good practice to warn if a required sibling is missing
            console.warn(
                `EnemyMovement <${this.name}> (${this.id}) does not have Transform sibling. Skipping movement.`
            );
            return;
        }

        transform.position.x += this.direction * this.speed;

        // Enforce bounds
        if (transform.position.x < this.minX) {
            transform.position.x = this.minX;
            this.direction = 1;
        } else if (transform.position.x > this.maxX) {
            transform.position.x = this.maxX;
            this.direction = -1;
        }
    }
}
```

### Key Concepts in `EnemyMovement.ts`

*   **`constructor(gameWidth, speed)`**: The constructor takes the `gameWidth` and `speed` as arguments, allowing you to configure the movement for different enemies or game levels. It initializes properties like the starting `direction` and schedules the first `nextFlip`.
*   **`onMount(parent)`**: This method is crucial for setup that depends on the parent `GameObject`. Here, it calculates the `maxX` boundary based on the game's width and the enemy's own width (`superficialWidth`), which is inherited from its parent. This ensures the enemy doesn't move partially off-screen.
*   **`act()`**: This is where the magic happens every frame.
    *   It checks if it's time to flip the direction.
    *   It gets a reference to its `Transform` sibling using `this.sibling<Transform>('Transform')`. **This is a fundamental pattern**: custom logic parts (like movement) often need to read or modify the `Transform` of the `GameObject` they are attached to.
    *   It updates the `x` position of the `Transform`.
    *   It checks if the enemy has hit the screen boundaries and reverses its direction if necessary.

## 3. Using Your Custom Class

Once you've defined your class, you can attach it to a `GameObject` in your scene setup:

```javascript
// In your scene setup file...
import { GameObject } from "./Parts/GameObject";
import { Transform } from "./Parts/Children/Transform";
import { SpriteRender } from "./Parts/Children/SpriteRender";
import { EnemyMovement } from "./src/EnemyMovement"; // Import your class

// ...

const enemy = new GameObject({ name: "MyEnemy" });

enemy.addChildren(
    new Transform({ position: new Vector(100, 100) }),
    new SpriteRender({ imageSource: "path/to/enemy.png", width: 32, height: 32 }),
    new EnemyMovement(800, 3) // Add your custom part!
);

myLayer.addChild(enemy);
```

Now, the `enemy` `GameObject` will automatically have the movement behavior defined in `EnemyMovement` applied to it every frame.
