import { GameObject } from "./GameObject";
import { generateUID } from "../helpers";
import { Part } from "./Part";

export class Layer extends Part {
    constructor({ name }: { name: string }) {
        super();
        this.name = name;
        this.id = generateUID();
        this.debugEmoji = "🗂️"; // Default emoji for debugging the layer
    }

    addChild(part: Part) {
        part.setAll("layer", this);
        super.addChild(part);
    }
    addChildren(...parts: Part[]) {
        parts.forEach((part) => this.addChild(part));
    }
}