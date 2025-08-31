import { Part } from "../Part";
import { Renderer } from "./Renderer";
import { Transform } from "./Transform";
import { Game } from "../Game";
import { Vector } from "../../Math/Vector";

export class ColorRender extends Renderer {
    color: string;
    vertices: Vector[];
    constructor({ width, height, color, vertices }: { width?: number, height?: number, color: string, vertices?: Vector[] }) {
        if (!width || !height) {
            if (vertices && vertices.length > 0) {
                width = Math.max(...vertices.map(v => v.x)) - Math.min(...vertices.map(v => v.x));
                height = Math.max(...vertices.map(v => v.y)) - Math.min(...vertices.map(v => v.y));
            } else {
                throw new Error("ColorRender requires either width and height or vertices to be defined.");
            }
        }
        
        super({ width, height });
        this.name = "ColorRender";
        this.color = color;
        this.debugEmoji = "🎨";
        this.type = "ColorRender";
        this.base = "Renderer";
        this.vertices = vertices || [];
        if (this.vertices.length === 0) {
            this.vertices = [
                new Vector(-this.width / 2, -this.height / 2),
                new Vector(this.width / 2, -this.height / 2),
                new Vector(this.width / 2, this.height / 2),
                new Vector(-this.width / 2, this.height / 2)
            ];
        }
    }

    onMount(parent: Part) {
        super.onMount(parent);
        if (!this.sibling("Transform")) {
            this.top?.warn(`ColorRender <${this.name}> does not have a Transform sibling. Please ensure you add a Transform component before adding others.`);
            return;
        }

        parent.setSuperficialDimensions(this.width, this.height);
    }
    clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        const clonedColor = new ColorRender({
            width: this.width,
            height: this.height,
            color: this.color,
            vertices: this.vertices.map(v => v.clone())
        });

        memo.set(this, clonedColor);

        this._cloneProperties(clonedColor, memo);

        return clonedColor as this;
    }
    act(delta: number) {
        super.act(delta);

        if (!this.top) {
            throw new Error(`ColorRender <${this.parent?.name}.${this.name}> is not attached to a top-level parent. Ensure it is added to a Game instance or Scene before rendering.`);
        }
        const transform = this.sibling<Transform>("Transform");
        if (!transform) {
            this.top?.warn(`ColorRender <${this.parent?.name}.${this.name}> does not have a Transform sibling. Skipping rendering.`);
            return;
        }
        const position = transform.worldPosition;
        const rotation = transform.rotation;

        this.top.context.save();
        this.top.context.translate(position.x, position.y);
        this.top.context.rotate(rotation);
        this.top.context.scale(transform.scale.x * this.facing.x, transform.scale.y * this.facing.y);

        this.top.context.fillStyle = this.color;
        this.top.context.beginPath();
        if (this.vertices.length > 0) {
            this.top.context.moveTo(this.vertices[0].x, this.vertices[0].y);
            for (let i = 1; i < this.vertices.length; i++) {
                this.top.context.lineTo(this.vertices[i].x, this.vertices[i].y);
            }
            this.top.context.closePath();
            this.top.context.fill();
        }
        this.top.context.restore(); this.hoverbug = `Color: ${this.color}`;
    }
}