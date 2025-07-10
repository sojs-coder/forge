import { Game } from "../Game";
import { Part } from "../Part";
import { Renderer } from "./Renderer";
import type { Transform } from "./Transform";

export class SpriteRender extends Renderer {
    imageSource: string | null;
    image: any; // Using any for cross-platform compatibility
    constructor({ imageSource, width, height }: { imageSource: string, width: number, height: number }) {
        super({ width, height });
        this.name = "SpriteRender";
        this.ready = false;
        this.imageSource = imageSource;
        this.debugEmoji = "🖼️"; // Default emoji for debugging the sprite render 
        this.image = new Image() as HTMLImageElement;

        this.image.onload = () => {
            this.ready = true;
        };
        this.image.onerror = (err: any) => {
            console.error(`Failed to load image <${this.imageSource}>:`, err);
        };
        this.image.src = imageSource;

        this.width = width;
        this.height = height;
    }
    onMount(parent: Part) {
        super.onMount(parent);
        if (!this.sibling("Transform")) {
            throw new Error(`SpriteRender <${this.name}> requires a Transform component to be mounted to a parent GameObject.`);
        }
        this.parent?.setSuperficialDimensions(this.width, this.height);
    }

    act() {
        super.act();

        if (!this.ready) return;
        if (!this.top) {
            throw new Error(`SpriteRender <${this.name}> is not attached to a top-level parent. Ensure it is added to a Game instance or Scene before rendering.`);
        }
        if (!this.imageSource) {
            throw new Error(`SpriteRender <${this.name}> does not have an image source set. Please provide a valid image source.`);
        }
        if (!(this.top instanceof Game)) {
            throw new Error(`SpriteRender <${this.name}> is not attached to a Game instance. Ensure it is added to a Game, Scene, or Layer with a game ancestor.`);
        }
        const transform = this.sibling<Transform>("Transform");
        if (!transform) {
            throw new Error(`Can not render SpriteRender <${this.name}> without a Transform sibling. Ensure it is mounted to a GameObject with a Transform component.`);
        }
        const position = transform.worldPosition;
        const rotation = transform.rotation;

        this.top.context.save();
        // Move to the center of the sprite for rotation
        this.top.context.translate(position.x, position.y);
        this.top.context.rotate(rotation);
        this.top.context.imageSmoothingEnabled = !this.disableAntiAliasing; // Respect anti-aliasing setting
        this.top.context.scale(transform.scale.x * this.facing.x, transform.scale.y * this.facing.y);
        // Draw the image so that its top-left is at (-width/2, -height/2), centering it
        this.top.context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        this.top.context.restore();


        this.hoverbug = `${this.ready ? "✅ Loaded" : "❌ Not ready"}`
    }
}