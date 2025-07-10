import { generateUID } from "../helpers";
import type { Layer } from "./Layer";
import { Part } from "./Part";

export class GameObject extends Part {
    layer?: Layer;
    constructor({ name }: { name: string }) {
        super();
        this.name = name;
        this.debugEmoji = "🕹️"; // Default emoji for debugging the game object
    }
}
