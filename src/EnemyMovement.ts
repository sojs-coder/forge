import { color } from "bun";
import type { ColorRender } from "../Parts/Children/ColorRender";
import type { SpriteRender } from "../Parts/Children/SpriteRender";
import type { Transform } from "../Parts/Children/Transform";
import { Part } from "../Parts/Part";

export class EnemyMovement extends Part {
    direction: number; // 1 for right, -1 for left
    nextFlip: number; // Timestamp for the next direction flip
    minX: number; // Minimum X position
    maxX: number; // Maximum X position
    gameWidth: number; // Width of the game area
    speed: number = 2; // Speed of the enemy movement
    constructor(gameWidth: number, speed: number = 2) {
        super();
        this.minX = 0;
        this.gameWidth = gameWidth;
        this.maxX = gameWidth;
        this.speed = speed;
        this.name = "EnemyMovement";
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
            console.warn(
                `EnemyMovement <${this.name}> (${this.id}) does not have Transform sibling. Skipping movement.`
            );
            return;
        }

        transform.position.x += this.direction * this.speed;

        // Enforce bounds
        if (transform.position.x < this.minX) {
            transform.position.x = this.minX;
            this.direction = 1; // Change direction if hit left bound
        } else if (transform.position.x > this.maxX) {
            transform.position.x = this.maxX;
            this.direction = -1; // Change direction if hit right bound
        }
    }
}