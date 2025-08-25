import { Vector } from "../../Math/Vector";
import { Game } from "../Game";
import { Part } from "../Part";
import { Renderer } from "./Renderer";
import type { Transform } from "./Transform";

export class SpriteRender extends Renderer {
    imageSource: string | null;
    image: any; // Using any for cross-platform compatibility
    disableAntiAliasing: boolean; // Whether to disable anti-aliasing
    constructor({ imageSource, width, height, disableAntiAliasing, facing }: { imageSource: string, width: number, height: number, disableAntiAliasing?: boolean, facing: Vector }) {
        super({ width, height });
        this.name = "SpriteRender";
        this.type = "SpriteRender";
        this.base = "Renderer";
        this.ready = false;
        this.imageSource = imageSource;
        this.disableAntiAliasing = typeof disableAntiAliasing !== "undefined" ? disableAntiAliasing : false;
        this.debugEmoji = "🖼️"; // Default emoji for debugging the sprite render 
        this.image = new Image() as HTMLImageElement;
        this.facing = facing || Vector.From(1);
        this.image.onload = () => {
            this.ready = true;
        };
        this.image.onerror = (err: any) => {
            this.top?.error(`[C] Failed to load image<${this.imageSource?.slice(0, 30)}>:`, err.message);
        };
        this.image.src = imageSource;

        this.width = width;
        this.height = height;
    }
    clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        const clonedSprite = new SpriteRender({
            imageSource: this.imageSource!,
            width: this.width,
            height: this.height,
            disableAntiAliasing: this.disableAntiAliasing,
            facing: this.facing.clone()
        });

        memo.set(this, clonedSprite);

        this._cloneProperties(clonedSprite, memo);

        // Reset properties that need re-initialization after construction
        clonedSprite.ready = false;

        return clonedSprite as this;
    }
    onMount(parent: Part) {
        super.onMount(parent);
        if (!this.sibling("Transform")) {
            this.top?.warn(`SpriteRender <${this.name}> requires a Transform component to be mounted to a parent GameObject.`);
        }
        this.parent?.setSuperficialDimensions(this.width, this.height);
    }

    act(delta: number) {
        super.act(delta);

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
        this.top.context.imageSmoothingEnabled = !this.disableAntiAliasing; // Respect anti-aliasing setting
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