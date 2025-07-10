import { Part } from "./Part";
import { Transform } from "./Children/Transform";
import { Vector } from "../Math/Vector";

export class Follow extends Part {
    target: Part | null = null;
    offset: Vector;

    constructor({ name, target, offset = new Vector(0, 0) }: { name?: string, target: Part, offset?: Vector }) {
        super({ name: name || 'Follow' });
        this.target = target;
        this.offset = offset;
        this.debugEmoji = "🎯";
    }

    act() {
        super.act();
        if (this.target) {
            const targetTransform = this.target.sibling<Transform>("Transform");
            const ownTransform = this.sibling<Transform>("Transform");
            if (targetTransform && ownTransform) {
                ownTransform.position = targetTransform.worldPosition.add(this.offset);
            }
        }
    }
}