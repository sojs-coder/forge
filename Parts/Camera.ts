import { Vector } from "../Math/Vector";
import { Transform } from "./Children/Transform";
import { Part } from "./Part";
import { Scene } from "./Scene";


export class Camera extends Part {
    zoom: Vector;

    constructor({ name }: { name: string, zoom?: Vector }) {
        super();
        this.name = name;
        this.zoom = Vector.From(1);
        this.debugEmoji = "📷"; // Camera specific emoji for debugging
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
        return {
            offset: (this.children["Transform"] as Transform).worldPosition.multiply(-1), // View shift is inverse of camera
            scale: this.zoom
        };
    }

    act(delta: number) {
        super.act(delta);
        const transform = this.children["Transform"] as Transform;
        if (transform) {
            this.zoom = transform.scale;
        } else {
            console.warn(`Camera <${this.name}> (${this.id}) does not have a Transform component. Camera zoom will not be updated.`);
        }
    }

}