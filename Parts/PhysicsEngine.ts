import { Part } from "./Part";
import { Engine, World } from "matter-js";
import { Vector } from "../Math/Vector";

export class PhysicsEngine extends Part {
    engine: Engine;
    world: World;

    constructor({ gravity }: { gravity?: { x: number, y: number, scale: number } }) {
        super({ name: 'PhysicsEngine' });
        this.engine = Engine.create({
            gravity: gravity || {
                x: 0,
                y: 1, // Default gravity pointing downwards
                scale: 0.001 // Scale for the gravity vector
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
            gravity: this.engine.gravity // Pass original gravity settings to constructor
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