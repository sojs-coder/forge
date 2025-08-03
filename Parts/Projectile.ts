import { Part } from "./Part";
import { Transform } from "./Children/Transform";
import { Vector } from "../Math/Vector";
import { Collider } from "./Children/Collider";
import { Health } from "./Health";

export class Projectile extends Part {
    speed: number;
    direction: Vector;
    damage: number;

    constructor({ name, speed = 10, direction, damage = 10 }: { name?: string, speed?: number, direction: Vector, damage?: number }) {
        super({ name: name || 'Projectile' });
        this.speed = speed;
        this.direction = direction.normalize(); // Ensure direction is a unit vector
        this.damage = damage;
        this.debugEmoji = "🚀";
    }

    act(delta: number) {
        super.act(delta);
        const transform = this.sibling<Transform>("Transform");
        if (transform) {
            transform.position = transform.position.add(this.direction.multiply(this.speed * delta));
        }

        const collider = this.sibling<Collider>("Collider");
        if (collider && collider.colliding) {
            for (const other of collider.collidingWith) {
                const health = other.parent?.sibling<Health>("Health");
                if (health) {
                    health.takeDamage(this.damage);
                    this.parent?.removeChild(this);
                    break; // Only hit one target
                }
            }
        }
    }
}