import { Vector } from "../Math/Vector";
import { Transform } from "./Children/Transform";
import { Part } from "./Part";
import { Scene } from "./Scene";


export class Camera extends Part {
    zoom: Vector;

    constructor({ name, zoom }: { name: string, zoom?: Vector }) {
        super({ name });
        this.zoom = Vector.From(1);
        this.debugEmoji = "📷"; // Camera specific emoji for debugging
        this.type = "Camera";
    }

    onMount(parent: Part) {
        super.onMount(parent);
        let currentParent: Part | undefined = this.parent;
        while (currentParent) {
            if (currentParent instanceof Scene) {
                currentParent.activeCamera = this;
                return;
            }
            currentParent = currentParent.parent;
        }
        throw new Error("Camera must be mounted to a Scene (or a child of a Scene) to be registered.");
    }

    setActive() {
        // Set this camera as the active camera for the layer's parent (scene)
        if (this.registrations.layer && this.registrations.layer.parent) {
            this.registrations.layer.parent.activeCamera = this;
        } else {
            throw new Error("Camera must be mounted to a Layer with a parent Scene to be set active.");
        }
    }

    getViewMatrix(): { offset: Vector; scale: Vector } {
        // Could be used in rendering context
        const transform = this.child<Transform>("Transform")
        if (!transform) {
            if (!this.warned.has("TransformMissing")) {
                // Warn only once about missing Transform component
                const seen = this.top?.warn(`Camera <${this.name}> (${this.id}) does not have a Transform component. View matrix will not be calculated.`);
                if (seen) this.warned.add("TransformMissing");
            }
            return { offset: Vector.From(0), scale: this.zoom };
        }
        return {
            offset: (transform).worldPosition.multiply(-1), // View shift is inverse of camera
            scale: this.zoom
        };
    }

    act(delta: number) {
        super.act(delta);
        const transform = this.child<Transform>("Transform");
        if (transform) {
            this.zoom = transform.scale;
        } else {
            if (!this.warned.has("TransformMissing")) {
                this.top?.warn(`Camera <${this.name}> (${this.id}) does not have a Transform component. Camera zoom will not be updated.`) ? this.warned.add("TransformMissing") : null;
            }
        }
    }

}