import { Part } from "./Part";
import { Transform } from "./Children/Transform";
import { Vector } from "../Math/Vector";

export class WaypointFollower extends Part {
    waypoints: Vector[];
    speed: number;
    private currentWaypointIndex: number = 0;

    constructor({ waypoints, speed = 5 }: { waypoints: Vector[], speed?: number }) {
        super({ name: 'WaypointFollower' });
        this.waypoints = waypoints;
        this.speed = speed;
        this.debugEmoji = "📍";
    }

    act(delta: number) {
        super.act(delta);
        if (this.waypoints.length === 0) return;

        const transform = this.sibling<Transform>("Transform");
        if (!transform) {
            console.warn(`WaypointFollower <${this.name}> requires a Transform sibling.`);
            return;
        }

        const targetWaypoint = this.waypoints[this.currentWaypointIndex];
        const distance = transform.position.distance(targetWaypoint);

        if (distance < this.speed * delta) { // If close enough, snap to waypoint and move to next
            transform.position = targetWaypoint;
            this.currentWaypointIndex = (this.currentWaypointIndex + 1) % this.waypoints.length;
        } else {
            const direction = targetWaypoint.subtract(transform.position).normalize();
            transform.position = transform.position.add(direction.multiply(this.speed * delta));
        }
    }
}