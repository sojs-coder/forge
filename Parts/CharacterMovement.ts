import { Part } from "./Part";
import { Transform } from "./Children/Transform";
import { Input } from "./Input";

export class CharacterMovement extends Part {
    speed: number;
    movementType: 'WASD' | 'ArrowKeys';
    input: Input | undefined;

    constructor({ name, speed = 5, movementType = 'WASD', input }: { name?: string, speed?: number, movementType?: 'WASD' | 'ArrowKeys', input?: Input }) {
        super({ name: name || 'CharacterMovement' });
        this.speed = speed;
        this.movementType = movementType;
        this.input = input
    }


    act(): void {
        if (!this.input) {
            return;
        }

        const transform = this.sibling<Transform>("Transform");
        if (!transform) {
            return;
        }

        const keys = this.input.downkeys;

        if (this.movementType === 'WASD') {
            if (keys.has('w')) {
                transform.position.y -= this.speed;
            }
            if (keys.has('s')) {
                transform.position.y += this.speed;
            }
            if (keys.has('a')) {
                transform.position.x -= this.speed;
            }
            if (keys.has('d')) {
                transform.position.x += this.speed;
            }
        } else if (this.movementType === 'ArrowKeys') {
            if (keys.has('ArrowUp')) {
                transform.position.y -= this.speed;
            }
            if (keys.has('ArrowDown')) {
                transform.position.y += this.speed;
            }
            if (keys.has('ArrowLeft')) {
                transform.position.x -= this.speed;
            }
            if (keys.has('ArrowRight')) {
                transform.position.x += this.speed;
            }
        }
    }
}