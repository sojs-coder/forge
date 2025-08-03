import { version } from "bun";
import { Vector } from "../../Math/Vector";
import { Part } from "../Part";

export class Transform extends Part {
    position: Vector;
    worldPosition: Vector; // Will be updated when mounted to a parent
    rotation: number; // radians
    scale: Vector;

    constructor({ position, rotation, scale }: { position?: Vector, rotation?: number, scale?: Vector } = {}) {
        super({ name: "Transform" });
        this.position = position || Vector.From(0);
        this.worldPosition = Vector.From(0); // Initialize worldPosition as a new Vector
        this.worldPosition.set(this.position); // Initially, worldPosition is the same as local position
        this.rotation = rotation || 0; // Default rotation in radians
        this.scale = scale || new Vector(1, 1); // Default scale
        this.debugEmoji = "📐"; // Emoji for debugging Transform
        this.type = "Transform";
    }

    onMount(parent: Part) {
        super.onMount(parent);
        // Transform's world position is determined from it's own local position and the parent's world position.
        // If we reference the parent's world position, we will get this Transform itself
        // Therefore, we need to use the grandparent's world position, if it exists
        const grandparentTransform = parent.sibling<Transform>("Transform");
        if (grandparentTransform) {
            this.worldPosition.set(this.position.add(grandparentTransform.worldPosition));
        } else {
            this.worldPosition.set(this.position); // If no grandparent, worldPosition is same as local position
        }
        // Inherit superficial dimensions from parent if available
        if (parent.superficialWidth && parent.superficialHeight) {
            this.superficialWidth = parent.superficialWidth;
            this.superficialHeight = parent.superficialHeight;
        }
    }
    move(delta: Vector) {
        this.position.set(this.position.add(delta));
        this.updateWorldPosition();
    }
    moveTo(position: Vector) {
        this.position.set(position);
        this.updateWorldPosition();
    }
    rotate(angle: number) { // Rotate by angle in radians
        this.rotation += angle;
        this.rotation = this.rotation % (2 * Math.PI); // Normalize rotation to [0, 2π)
        this.updateWorldPosition();
    }
    setRotation(rotation: number) { // Set rotation directly in radians
        this.rotation = rotation % (2 * Math.PI); // Normalize rotation to [0, 2π)
        this.updateWorldPosition();
    }
    updateWorldPosition() {
        // Update world position based on parent's world position
        const parentTransform = this.parent?.sibling<Transform>("Transform");
        if (parentTransform) {
            this.worldPosition.set(this.position.add(parentTransform.worldPosition));
        } else {
            this.worldPosition.set(this.position); // If no parent, worldPosition is same as local position
        }
    }
    act(_delta: number) {
        this.updateWorldPosition();
        this.hoverbug = `${this.position.toString()} | ${this.worldPosition.toString()} | ${(this.rotation / Math.PI).toFixed(2)}pi | ${this.scale.toString()}`;
    }
}