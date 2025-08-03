import { Vector } from "../Math/Vector";
import { Transform } from "./Children/Transform";
import { Part } from "./Part";



export class Follow extends Part {
    target: Part | null = null;
    offset: Vector;
    externalOffset: Vector = new Vector(0, 0);
    interpolationSpeed: number;

    constructor({ 
        name, 
        target, 
        offset = new Vector(0, 0), 
        interpolationSpeed = 1 
    }: { 
        name?: string, 
        target: Transform, 
        offset?: Vector, 
        interpolationSpeed?: number 
    }) {
        super({ name: name || 'Follow' });
        this.target = target;
        this.offset = offset;
        this.interpolationSpeed = interpolationSpeed;
        this.debugEmoji = "🎯";
    }

    act(delta: number) {
        super.act(delta);
        if (this.target) {
            const targetTransform = this.target as Transform;
            const ownTransform = this.sibling<Transform>("Transform");
            if (!ownTransform) {
                throw new Error(`Follow <${this.name}> requires a Transform component to be mounted to a parent GameObject.`);
            }

            const totalOffset = this.offset.add(this.externalOffset);
            const targetX = targetTransform.position.x + totalOffset.x;
            const targetY = targetTransform.position.y + totalOffset.y;

            if (this.interpolationSpeed >= 1) {
                ownTransform.position.x = targetX;
                ownTransform.position.y = targetY;
            } else {
                const t = this.interpolationSpeed * delta;
                ownTransform.position.x += (targetX - ownTransform.position.x) * t;
                ownTransform.position.y += (targetY - ownTransform.position.y) * t;
            }
        }
    }
}
