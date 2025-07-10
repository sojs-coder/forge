import { applyCamera, generateUID, resetCamera } from "../helpers";
import type { Camera } from "./Camera";
import { Game } from "./Game";
import { Part } from "./Part";

export class Scene extends Part {
    activeCamera: Camera | null = null; // The active camera for this scene
    constructor({ name }: { name: string }) {
        super();
        this.name = name;
        this.debugEmoji = "🏞️"; // Default emoji for debugging the scene
    }

    act() {
        if (!this.top) {
            console.warn(`Act called on Scene <${this.name}> without a top-level parent. Ensure this scene is added to a Game instance before calling act().`);
        }

        if (this.activeCamera && this.top instanceof Game) {
            const camera = this.activeCamera;
            applyCamera(this.top.context, camera);
        }
        super.act(); // Call the act method of the parent class to process children
        if (this.top instanceof Game && this.activeCamera) {
            resetCamera(this.top.context);
        }
    }
}