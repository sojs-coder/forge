import { Part } from "../Part";
import { Vector } from "../../Math/Vector";

export class Transform extends Part {
    position: Vector;
    worldPosition: Vector; // Will be updated when mounted to a parent
    rotation: number; // radians
    scale: Vector;
    initialized: boolean;

    constructor({ position, rotation, scale }: { position?: Vector, rotation?: number, scale?: Vector } = {}) {
        super({ name: "Transform" });
        this.position = position || Vector.From(0);
        this.worldPosition = Vector.From(0); // Initialize worldPosition as a new Vector
        this.worldPosition.set(this.position); // Initially, worldPosition is the same as local position
        this.rotation = rotation || 0; // Default rotation in radians
        this.scale = scale || new Vector(1, 1); // Default scale
        this.debugEmoji = "📐"; // Emoji for debugging Transform
        this.type = "Transform";
        this.initialized = false;
    }

    onMount(parent: Part) {
        super.onMount(parent);
        this.updateWorldPosition();
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
    worldToLocal(position: Vector): Vector {
        // 1. Translate back to origin
        const translated = position.subtract(this.worldPosition);

        // 2. Rotate back by the inverse of the transform's rotation
        const cos = Math.cos(-this.rotation);
        const sin = Math.sin(-this.rotation);
        const rotated = new Vector(
            translated.x * cos - translated.y * sin,
            translated.x * sin + translated.y * cos
        );

        // 3. Scale back by the inverse of the transform's scale
        const scaled = new Vector(
            rotated.x / this.scale.x,
            rotated.y / this.scale.y
        );

        return scaled;
    }
    preFrame(): void {
        super.preFrame();
        this.updateWorldPosition();
    }
    updateWorldPosition() {
        const parentTransform = this.parent?.parent?.child<Transform>("Transform");
        if (parentTransform) {
            // 1. Scale the local position by the parent's scale
            const scaledPosition = this.position.multiply(parentTransform.scale);

            // 2. Rotate the scaled position by the parent's rotation
            const cos = Math.cos(parentTransform.rotation);
            const sin = Math.sin(parentTransform.rotation);
            const rotatedPosition = new Vector(
                scaledPosition.x * cos - scaledPosition.y * sin,
                scaledPosition.x * sin + scaledPosition.y * cos
            );

            // 3. Add the parent's world position
            this.worldPosition.set(rotatedPosition.add(parentTransform.worldPosition));
        } else {
            this.worldPosition.set(this.position);
        }

        this.initialized = true; // We have at least one tick with an actual world position instead of a default 0,0 
    }
    act(_delta: number) {
        this.hoverbug = `${this.position.toString()} | ${this.worldPosition.toString()} | ${(this.rotation / Math.PI).toFixed(2)}pi | ${this.scale.toString()}`;
    }
}
