import { Vector } from "../../Math/Vector";
import { Part } from "../Part";

export class Transform extends Part {
    position: Vector;
    worldPosition: Vector; // Will be updated when mounted to a parent
    rotation: number; // radians
    scale: Vector;

    constructor({ position, rotation, scale }: { position?: Vector, rotation?: number, scale?: Vector } = {}) {
        super();
        this.name = "Transform";
        this.position = position || new Vector(0, 0);
        this.worldPosition = this.position; // Initialize worldPosition to match local position (until mounted)
        this.rotation = rotation || 0; // Default rotation in radians
        this.scale = scale || new Vector(1, 1); // Default scale
        this.debugEmoji = "📐"; // Emoji for debugging Transform
    }

    onMount(parent: Part) {
        super.onMount(parent);
        // Transform's world position is determined from it's own local position and the parent's world position.
        // If we reference the parent's world position, we will get this Transform itself
        // Therefore, we need to use the grandparent's world position, if it exists
        const grandparentTransform = parent.sibling<Transform>("Transform");
        if (grandparentTransform) {
            this.worldPosition = this.position.add(grandparentTransform.worldPosition);
        } else {
            this.worldPosition = this.position;
        }
        // Inherit superficial dimensions from parent if available
        if (parent.superficialWidth && parent.superficialHeight) {
            this.superficialWidth = parent.superficialWidth;
            this.superficialHeight = parent.superficialHeight;
        }
    }

    act() {
        // Update world position if grandparent has Transform
        const grandparentTransform = this.parent?.sibling<Transform>("Transform");
        if (grandparentTransform) {
            this.worldPosition = this.position.add(grandparentTransform.worldPosition);
        }
        this.hoverbug = `${this.position.toString()} | ${this.worldPosition.toString()} | ${(this.rotation / Math.PI).toFixed(2)}pi | ${this.scale.toString()}`;
    }
}