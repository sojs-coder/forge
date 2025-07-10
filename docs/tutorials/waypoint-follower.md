# Following Waypoints

This tutorial will demonstrate how to make a `GameObject` follow a predefined path using the `WaypointFollower` component.

## 1. Set up your Scene and GameObject

First, ensure you have a `Game` and `Scene` set up. Then, create a `GameObject` that you want to move along a path. This `GameObject` will need a `Transform` for its position and a visual component (like `SpriteRender` or `ColorRender`) so you can see its movement.

```javascript
import { Game } from './Parts/Game';
import { Scene } from './Parts/Scene';
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { ColorRender } from './Parts/Children/ColorRender';
import { WaypointFollower } from './Parts/WaypointFollower';
import { Vector } from './Math/Vector';

// 1. Create the Game instance (if you haven't already)
const myGame = new Game({
    name: 'WaypointDemo',
    canvas: 'game-canvas',
    width: 800,
    height: 600,
    devmode: true
});

// 2. Create a Scene
const mainScene = new Scene({ name: 'MainScene' });

// 3. Define the waypoints for the path
const pathWaypoints = [
    new Vector(100, 100),
    new Vector(700, 100),
    new Vector(700, 500),
    new Vector(100, 500)
];

// 4. Create the GameObject that will follow the waypoints
const patrolBot = new GameObject({ name: 'PatrolBot' });
patrolBot.addChildren(
    new Transform({ position: pathWaypoints[0] }), // Start at the first waypoint
    new ColorRender({ width: 40, height: 40, color: 'purple' }),
    new WaypointFollower({
        waypoints: pathWaypoints,
        speed: 3 // Speed at which the bot moves between waypoints
    })
);

// 5. Add the GameObject to the scene
mainScene.addChild(patrolBot);

// 6. Add the scene to the game and start
myGame.addChild(mainScene);
myGame.start(mainScene);
```

## 2. Customizing Waypoint Following

-   **`waypoints: Vector[]`**: This is an array of `Vector` objects that define the points the `GameObject` will visit in sequence. The object will loop through these waypoints indefinitely.
-   **`speed: number`**: Controls how fast the `GameObject` moves between waypoints. Adjust this value to make the object move faster or slower along its path.

## 3. Visualizing Waypoints (for debugging)

While not part of the `WaypointFollower` component itself, you can draw the waypoints in your game's debug mode to visualize the path. This can be done in a custom `Part` or directly in your scene's `act` method (if `devmode` is enabled).

```javascript
// Example of drawing waypoints (for debugging purposes)
class WaypointDebugger extends Part {
    waypoints: Vector[];

    constructor(waypoints: Vector[]) {
        super({ name: 'WaypointDebugger' });
        this.waypoints = waypoints;
    }

    act() {
        super.act();
        if (this.top && this.top.devmode && this.top.context) {
            const ctx = this.top.context;
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(this.waypoints[0].x, this.waypoints[0].y);
            for (let i = 1; i < this.waypoints.length; i++) {
                ctx.lineTo(this.waypoints[i].x, this.waypoints[i].y);
            }
            ctx.closePath();
            ctx.stroke();

            this.waypoints.forEach(wp => {
                ctx.fillStyle = 'red';
                ctx.beginPath();
                ctx.arc(wp.x, wp.y, 5, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    }
}

// Add the debugger to your scene (e.g., mainScene.addChild(new WaypointDebugger(pathWaypoints));)
```