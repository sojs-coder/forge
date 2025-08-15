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

    clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        const clonedFollow = new Follow({
            name: this.name,
            target: this.target as Transform,
            offset: this.offset.clone(),
            interpolationSpeed: this.interpolationSpeed
        });

        memo.set(this, clonedFollow);

        this._cloneProperties(clonedFollow, memo);

        // Reset properties that need re-initialization after construction
        // Handle target separately, as it might be a cloned object
        if (this.target && memo.has(this.target)) {
            clonedFollow.target = memo.get(this.target);
        } else {
            clonedFollow.target = this.target; // Keep reference to original if not cloned
        }
        clonedFollow.externalOffset = new Vector(0, 0); // Reset external offset

        return clonedFollow as this;
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
