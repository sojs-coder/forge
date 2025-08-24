import { applyCamera, generateUID, resetCamera } from "../helpers";
import type { Camera } from "./Camera";
import { Game } from "./Game";
import { Part } from "./Part";

export class Scene extends Part {
    activeCamera: Camera | null = null; // The active camera for this scene
    constructor({ name }: { name: string } = { name: "Scene" }) {
        super();
        this.name = name;
        this.debugEmoji = "🏞️"; // Default emoji for debugging the scene
    }
    clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        const clonedScene = new Scene({
            name: this.name,
        });

        memo.set(this, clonedScene);

        this._cloneProperties(clonedScene, memo);

        // Reset properties that need re-initialization after construction
        if (this.activeCamera && memo.has(this.activeCamera)) {
            clonedScene.activeCamera = memo.get(this.activeCamera);
        } else {
            clonedScene.activeCamera = null;
        }

        return clonedScene as this;
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