import { Part } from "./Part";
import { Transform } from "./Children/Transform";
import { Input } from "./Input";
import { Vector } from "../Math/Vector";

export class CharacterMovement extends Part {
    speed: number;
    movementType: 'WASD' | 'ArrowKeys' | 'BOTH';
    input: Input | undefined;

    constructor({ speed = 5, movementType = 'WASD', input }: { speed?: number, movementType?: 'WASD' | 'ArrowKeys' | 'BOTH', input?: Input }) {
        super({ name: 'CharacterMovement' });
        this.speed = speed;
        this.movementType = movementType;
        this.input = input;
        this.type = "CharacterMovement";
    }

    act(_delta: number): void {
        if (!this.input) {
            if (!this.warned.has("MissingInput")) this.top?.warn(`CharacterMovement <${this.name}> (${this.id}) is missing an input property. Please create an input on the scene and pass it.`) ? this.warned.add("MissingInput") : null;
            return;
        }

        const transform = this.sibling<Transform>("Transform");
        if (!transform) {
            return;
        }

        const keys = this.input.downkeys;
        let dx = 0;
        let dy = 0;

        if (this.movementType === 'WASD' || this.movementType === 'BOTH') {
            if (keys.has('w')) {
                dy -= 1;
            }
            if (keys.has('s')) {
                dy += 1;
            }
            if (keys.has('a')) {
                dx -= 1;
            }
            if (keys.has('d')) {
                dx += 1;
            }
        }
        if (this.movementType === 'ArrowKeys' || this.movementType === 'BOTH') {
            if (keys.has('ArrowUp')) {
                dy -= 1;
            }
            if (keys.has('ArrowDown')) {
                dy += 1;
            }
            if (keys.has('ArrowLeft')) {
                dx -= 1;
            }
            if (keys.has('ArrowRight')) {
                dx += 1;
            }
        }

        // Normalize diagonal movement
        if (dx !== 0 && dy !== 0) {
            dx *= Math.SQRT1_2; // 1 / sqrt(2)
            dy *= Math.SQRT1_2;
        }
        if (dx !== 0 || dy !== 0) {
            transform.move(new Vector(dx * this.speed, dy * this.speed));
        }
    }
}