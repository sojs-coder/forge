import { Part } from "./Part";
import { Transform } from "./Children/Transform";

export class Rotator extends Part {
    rotationSpeed: number;

    constructor({ name, rotationSpeed = 0.05 }: { name?: string, rotationSpeed?: number }) {
        super({ name: name || 'Rotator' });
        this.rotationSpeed = rotationSpeed;
        this.debugEmoji = "🔄";
    }

    act() {
        super.act();
        const transform = this.sibling<Transform>("Transform");
        if (transform) {
            transform.rotation += this.rotationSpeed;
        }
    }
}