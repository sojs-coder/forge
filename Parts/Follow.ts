import { Part } from "./Part";
import { Transform } from "./Children/Transform";
import { Vector } from "../Math/Vector";

export class Follow extends Part {
    target: Part | null = null;
    offset: Vector;

    constructor({ name, target, offset = new Vector(0, 0) }: { name?: string, target: Transform, offset?: Vector }) {
        super({ name: name || 'Follow' });
        this.target = target;
        this.offset = offset;
        this.debugEmoji = "🎯";
    }
    onMount(parent: Part) {
        super.onMount(parent);
        if (this.target && !(this.target instanceof Transform)) {
            throw new Error("Target of Follow must be a Transform component.");
        }
    }
    act(delta: number) {
        super.act(delta);
        if (this.target) {
            const targetTransform = this.target;
            const ownTransform = this.sibling<Transform>("Transform");
            if(!ownTransform) {
                throw new Error(`Follow <${this.name}> requires a Transform component to be mounted to a parent GameObject.`);
            }
            if (targetTransform && ownTransform) {
                // Calculate offset by subtracting the target's position from the own position
                ownTransform.position.x = targetTransform.position.x + this.offset.x;
                ownTransform.position.y = targetTransform.position.y + this.offset.y;
            }
        }
    }
}