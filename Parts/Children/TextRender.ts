import type { Transform } from "./Transform";
import { Renderer } from "./Renderer";
import type { Part } from "../Part";

export class TextRender extends Renderer {
    textContent: string; // The content of the text to render
    font: string; // Should be like: "24px Arial"
    align: "center" | "left" | "right";
    color: string; // Color of the text, e.g., "black", "red", etc (or rgb, or hex, etc).
    constructor({ name, textContent, font, align, color }: { name: string, textContent: string, font: string, align?: "center" | "left" | "right", color?: string }) {
        super({ width: 0, height: 0, disableAntiAliasing: true }); // Width and height will be set based on text content
        this.name = name;
        this.textContent = textContent;
        this.font = font;
        this.align = align || "left"; // Default to left alignment if not specified
        this.color = color || 'black'; // Default color if not specified
        this.debugEmoji = "🅰️";
    }
    onMount(parent: Part) {
        super.onMount(parent);
        this.updateSuperficialDimensions();
    }

    private updateSuperficialDimensions() {
        if (this.top && this.top.context) {
            const context = this.top.context;
            context.font = this.font;
            const metrics = context.measureText(this.textContent);
            this._superficialWidth = metrics.width;
            this._superficialHeight = parseInt(this.font) || 20; // Approximate height from font size
            // Update the width and height of the renderer
            this.width = this._superficialWidth;
            this.height = this._superficialHeight;
        }
    }
    setText(text: string) {
        this.textContent = text;
        this.updateSuperficialDimensions();
    }
    act() {
        super.act();
        const transform = this.sibling<Transform>('Transform');
        if (!transform) {
            console.warn(`Text <${this.name}> (${this.id}) does not have a Transform sibling. Skipping rendering.`);
            return;
        }

        if (!this.top) {
            throw new Error(`Text <${this.name}> (${this.id}) is not attached to a top-level parent. Ensure it is added to a Game instance or Scene before rendering.`);
        }

        const context = this.top.context;
        const position = transform.worldPosition;
        const rotation = transform.rotation;
        const scale = transform.scale;

        if (!context) {
            throw new Error(`Text <${this.name}> (${this.id}) requires a valid context to render. Ensure it is mounted to a Game instance with a canvas.`);
        }
        context.save();
        context.font = this.font;
        context.textAlign = this.align;
        context.fillStyle = this.color; // Default to black if no color is set
        context.translate(position.x, position.y);
        context.rotate(rotation);
        context.scale(scale.x, scale.y);
        context.fillText(this.textContent, 0, 0); // Draw text at the origin of the transformed context
        context.restore();

        this.hoverbug = `${this.textContent} (${this._superficialWidth}x${this._superficialHeight})`;

    }
}