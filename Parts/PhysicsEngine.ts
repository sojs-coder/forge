import { Part } from "./Part";
import { Engine, World } from "matter-js";

export class PhysicsEngine extends Part {
    engine: Engine;
    world: World;

    constructor({ name }: { name?: string }) {
        super({ name: name || 'PhysicsEngine' });
        this.engine = Engine.create();
        this.world = this.engine.world;
        this.debugEmoji = "⚛️";
    }

    onMount(parent: Part) {
        super.onMount(parent);
        // Optionally, you might want to tie this to a specific scene or game
        // For now, it will just exist as a part.
    }

    act() {
        super.act();
        // Update the Matter.js engine
        Engine.update(this.engine, 1000 / 60); // Update at 60 frames per second
    }
}