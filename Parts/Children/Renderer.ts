import { Vector } from "../../Math/Vector";
import { Part } from "../Part";
import type { Transform } from "./Transform";

export class Renderer extends Part {
    width: number;
    height: number;
    facing: Vector = new Vector(1, 1); // Default facing direction
    disableAntiAliasing: boolean = false; // Option to disable anti-aliasing
    constructor({ width, height, disableAntiAliasing }: { width: number, height: number, disableAntiAliasing?: boolean }) {
        super({ name: "Renderer" });
        this.width = width;
        this.height = height;
        this.disableAntiAliasing = disableAntiAliasing || false; // Default to false if not provided
        this.debugEmoji = "🎨"; // Emoji for debugging Renderer
        this.type = "Renderer";
    }

    face(direction: Vector) {
        if (direction.x !== -1 && direction.x !== 1 && direction.y !== -1 && direction.y !== 1) {
            throw new Error("Direction must be vector with -1 or 1 in x and y axis");
        }
        this.facing = direction;
    }
}