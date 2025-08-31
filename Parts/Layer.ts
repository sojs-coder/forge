import { GameObject } from "./GameObject";
import { generateUID } from "../helpers";
import { Part } from "./Part";

export class Layer extends Part {
    constructor({ name }: { name: string }) {
        super({ name });
        this.type = "Layer";
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
    removeChild(part: Part) {
        part.onUnregister("layer", this);
        super.removeChild(part);
    }
    act(delta: number) {
        if (!this.ready) {
            return;
        }
        this.ties.forEach(tie => {
            if (tie.target && tie.target.hasOwnProperty(tie.targetAttribute)) {
                const value = this.attr(tie.localAttribute);
                tie.target.attr(tie.targetAttribute, value);
            }
        });
        this.childrenArray.forEach(child => {
            child.act(delta);
        });
    }
}