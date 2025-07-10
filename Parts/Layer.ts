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

    addChild(gameObject: GameObject) {
        gameObject.setAll("layer", this);
        super.addChild(gameObject);
    }
    addChildren(...gameObjects: GameObject[]) {
        gameObjects.forEach((gameObject) => this.addChild(gameObject));
    }
}