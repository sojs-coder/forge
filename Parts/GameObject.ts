import type { Layer } from "./Layer";
import { Part } from "./Part";

export class GameObject extends Part {
    layer?: Layer;
    constructor({ name, render = true }: { name: string, render?: boolean }) {
        super({ name, render: !!render });
        this.type = "GameObject";
        this.debugEmoji = "🕹️"; // Default emoji for debugging the game object
    }
}
