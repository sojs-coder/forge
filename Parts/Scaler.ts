import { Part } from "./Part";
import { Transform } from "./Children/Transform";
import { Vector } from "../Math/Vector";

export class Scaler extends Part {
    scaleSpeed: Vector;
    minScale: Vector;
    maxScale: Vector;
    private scalingUp: boolean = true;

    constructor({ name, scaleSpeed = new Vector(0.01, 0.01), minScale = new Vector(0.5, 0.5), maxScale = new Vector(1.5, 1.5) }: { name?: string, scaleSpeed?: Vector, minScale?: Vector, maxScale?: Vector }) {
        super({ name: name || 'Scaler' });
        this.scaleSpeed = scaleSpeed;
        this.minScale = minScale;
        this.maxScale = maxScale;
        this.debugEmoji = "📈";
    }

    act(delta: number) {
        super.act(delta);
        const transform = this.sibling<Transform>("Transform");
        if (transform) {
            if (this.scalingUp) {
                transform.scale = transform.scale.add(this.scaleSpeed.multiply(delta));
                if (transform.scale.x >= this.maxScale.x || transform.scale.y >= this.maxScale.y) {
                    this.scalingUp = false;
                }
            } else {
                transform.scale = transform.scale.subtract(this.scaleSpeed.multiply(delta));
                if (transform.scale.x <= this.minScale.x || transform.scale.y <= this.minScale.y) {
                    this.scalingUp = true;
                }
            }
        }
    }
}