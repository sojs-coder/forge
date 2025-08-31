import { Part } from "./Part";
import { Engine, World } from "matter-js";
import { Vector } from "../Math/Vector";

export class PhysicsEngine extends Part {
    engine: Engine;
    world: World;
    gravity: { x: number, y: number };
    scale: number;

    constructor({ gravity, scale }: { gravity?: Vector, scale: number }) {
        super({ name: 'PhysicsEngine' });
        this.gravity = gravity?.toObject() || new Vector(0, 1).toObject();
        this.scale = scale || 0.001;

        this.engine = Engine.create({
            gravity: {
                x: this.gravity.x,
                y: this.gravity.y,
                scale: this.scale
            }
        });
        this.world = this.engine.world;

        this.debugEmoji = "⚛️";
        this.type = "PhysicsEngine";
    }
    clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        const clonedEngine = new PhysicsEngine({
            gravity: new Vector(this.gravity.x, this.gravity.y),
            scale: this.scale
        });

        memo.set(this, clonedEngine);

        this._cloneProperties(clonedEngine, memo);

        // No additional resets needed, as the constructor already creates a fresh engine/world

        return clonedEngine as this;
    }
    destroy(): void {
        super.destroy();
        // Clean up the physics engine
        if (this.world) {
            World.clear(this.world, false); // Clear the world without resetting the engine
            this.engine = Engine.create(); // Reset the engine
        }
    }
    onMount(parent: Part) {
        super.onMount(parent);
    }

    act(delta: number) {
        super.act(delta);
        Engine.update(this.engine, Math.min(delta, 1000 / 30));
    }
}