import { applyCamera, generateUID, resetCamera } from "../helpers";
import type { Camera } from "./Camera";
import { Game } from "./Game";
import { Part } from "./Part";

export class Scene extends Part {
    activeCamera: Camera | null = null; // The active camera for this scene
    backgroundColor: string; // Background color of the scene
    constructor({ name, backgroundColor }: { name: string, backgroundColor?: string } = { name: "Scene" }) {
        super();
        this.name = name;
        this.debugEmoji = "🏞️"; // Default emoji for debugging the scene
        this.backgroundColor = backgroundColor || "#000"; // Default background color
    }
    addChild(part: Part) {
        part.setAll("scene", this);
        super.addChild(part);

    }
    addChildren(...parts: Part[]) {
        parts.forEach((part) => this.addChild(part));
    }
    act(delta: number) {
        if (!this.top) {
            throw new Error(`Act called on Scene <${this.name}> without a top-level parent. Ensure this scene is added to a Game instance before calling act().`);
        }

        if (!this.top || !(this.top instanceof Game)) {
            throw new Error("Scene must be attached to a Game instance.");
        }
        if (!this.top.canvas) {
            throw new Error("Game instance must have a canvas element.");
        }

        // Draw background BEFORE applying camera transformations
        // This ensures the background covers the entire screen regardless of camera position
        if (this.backgroundColor) {
            this.top.context.fillStyle = this.backgroundColor;
            this.top.context.fillRect(0, 0, this.top.canvas.width, this.top.canvas.height);
        }

        // Now apply camera transformations for world space objects
        if (this.activeCamera && this.top instanceof Game) {
            const camera = this.activeCamera;
            applyCamera(this.top.context, camera);
        }

        super.act(delta); // Call the act method of the parent class to process children

        // Reset camera transformations after rendering world objects
        if (this.top instanceof Game && this.activeCamera) {
            resetCamera(this.top.context);
        }
    }
}