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
        Engine.update(this.engine, delta);
    }
}