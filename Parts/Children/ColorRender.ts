import { Part } from "../Part";
import { Renderer } from "./Renderer";
import { Transform } from "./Transform";
import { Game } from "../Game";

export class ColorRender extends Renderer {
    color: string;
    constructor({ width, height, color }: { width: number, height: number, color: string }) {
        super({ width, height });
        this.name = "ColorRender";
        this.color = color;
        this.debugEmoji = "🎨";
    }

    onMount(parent: Part) {
        super.onMount(parent);
        if (!this.sibling("Transform")) {
            console.warn(`ColorRender <${this.name}> does not have a Transform sibling. Please ensure you add a Transform component before adding others.`);
            return;
        }
        parent.setSuperficialDimensions(this.width, this.height);
    }

    act() {
        super.act();

        if (!this.top) {
            throw new Error(`ColorRender <${this.name}> is not attached to a top-level parent. Ensure it is added to a Game instance or Scene before rendering.`);
        }
        if (!(this.top instanceof Game)) {
            throw new Error(`ColorRender <${this.name}> is not attached to a Game instance. Ensure it is added to a Game, Scene, or Layer with a game ancestor.`);
        }
        const transform = this.sibling<Transform>("Transform");
        if (!transform) {
            console.warn(`ColorRender <${this.name}> does not have a Transform sibling. Skipping rendering.`);
            return;
        }
        const position = transform.worldPosition;
        const rotation = transform.rotation;

        this.top.context.save();
        this.top.context.translate(position.x, position.y);
        this.top.context.rotate(rotation);
        this.top.context.scale(transform.scale.x * this.facing.x, transform.scale.y * this.facing.y);

        this.top.context.fillStyle = this.color;
        this.top.context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        this.top.context.restore();

        this.hoverbug = `Color: ${this.color}`;
    }
}