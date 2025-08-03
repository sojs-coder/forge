# WaypointFollower

**Extends:** [Part](./Part.md)

The `WaypointFollower` component makes a `GameObject` move along a series of points in the world.

## Constructor

`new WaypointFollower({ waypoints, speed })`

-   `waypoints: Vector[]`
    An array of `Vector`s representing the points the `GameObject` will move between.

-   `speed?: number`
    The speed at which the `GameObject` moves between waypoints. Defaults to `5`.

## Properties

-   `waypoints: Vector[]`
    An array of `Vector`s representing the points the `GameObject` will move between.

-   `speed: number`
    The speed at which the `GameObject` moves between waypoints.

-   `currentWaypointIndex: number`
    The index of the current waypoint the object is moving towards.

## How it Works

The `WaypointFollower` component continuously moves its parent `GameObject` towards the next waypoint in the `waypoints` array. When it reaches a waypoint, it will target the next one in the array, looping back to the beginning when it reaches the end.

## Example

This example shows how to make a platform move back and forth between two points.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { WaypointFollower } from './Parts/WaypointFollower';
import { Vector } from './Math/Vector';

const platform = new GameObject({ name: 'MovingPlatform' });
platform.addChildren(
    new Transform({ position: new Vector(100, 400) }),
    new WaypointFollower({
        waypoints: [
            new Vector(100, 400),
            new Vector(500, 400)
        ],
        speed: 2
    })
);

myScene.addChild(platform);
```