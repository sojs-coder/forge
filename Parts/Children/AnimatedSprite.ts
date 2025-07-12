import type { SpriteSheetData } from "../../types";
import { Part } from "../Part";
import { Renderer } from "./Renderer";
import type { Transform } from "./Transform";

export class AnimatedSprite extends Renderer {
    spritesheet: string; // Path to the spritesheet JSON
    spritesheetData?: SpriteSheetData; // Parsed spritesheet data
    loadedSheet?: HTMLImageElement; // Loaded image for the spritesheet
    frames: Record<string, HTMLImageElement[]> = {}; // Object to hold individual frame images for each animation
    currentFrameIndex: number = 0; // Index of the current frame being displayed
    hasWarnedAboutTransform: boolean = false; // Flag to prevent multiple warnings about missing Transform part
    width: number; // Width of the animated sprite
    height: number; // Height of the animated sprite
    bouncing: boolean = false; // Flag to indicate if the sprite animation is in reverse (bouncing)
    currentAnimation: string = "default"; // Current animation name
    disableAntiAliasing: boolean = false; // Option to disable anti-aliasing
    webEngine: boolean = false; // Flag to indicate if this is running in a web engine context
    onAnimationComplete?: (animationName: string, sprite: AnimatedSprite) => void; // Callback for when an animation completes
    constructor({ spritesheet, spritesheetImage, width, height, startingAnimation, disableAntiAliasing = false, onAnimationComplete, webEngine = false }: { spritesheet: string, spritesheetImage?: string, width: number, height: number, startingAnimation?: string, disableAntiAliasing?: boolean, onAnimationComplete?: (animationName: string, sprite: AnimatedSprite) => void, webEngine?: boolean }) {
        super({ width, height }); // Call the parent constructor with empty imageSource
        this.name = "AnimatedSprite";
        this.debugEmoji = "🎞️"; // Default emoji for debugging the animated sprite
        this.spritesheet = spritesheet;
        this.width = width;
        this.height = height;
        this.ready = false;
        this.spritesheetImage = spritesheetImage; // Optional image for the spritesheet
        this.currentAnimation = startingAnimation || "default";
        this.disableAntiAliasing = disableAntiAliasing;
        this.onAnimationComplete = onAnimationComplete; // Set the callback for animation completion
        this.webEngine = webEngine; // Set the web engine flag
    }

    async onMount(parent: Part) {
        super.onMount(parent);
        parent.setSuperficialDimensions(this.width, this.height); // Set dimensions for the parent part
        let spritesheetData: SpriteSheetData;
        if (!this.spritesheet) {
            return;
        }
        if (this.spritesheet.startsWith("data:application/json")) {
            spritesheetData = JSON.parse(atob(this.spritesheet.split(',')[1]));
        } else {
            const response = await fetch(this.spritesheet);
            if (!response.ok) {
                throw new Error(`Failed to load spritesheet: ${response.statusText}`);
            }
            spritesheetData = await response.json() as SpriteSheetData; // Assuming the spritesheet is a JSON file
        }
        // Validate the data structure
        if (!spritesheetData.frames || !Array.isArray(spritesheetData.frames)) {
            throw new Error("Invalid spritesheet format: 'frames' array is missing or not an array.");
        }
        if (!spritesheetData.meta || !spritesheetData.meta.image) {
            throw new Error("Invalid spritesheet format: 'meta.image' is missing.");
        }
        if (!spritesheetData.meta.size || typeof spritesheetData.meta.size.w !== "number" || typeof spritesheetData.meta.size.h !== "number") {
            throw new Error("Invalid spritesheet format: 'meta.size' is missing or invalid.");
        }
        if (!spritesheetData.meta.animations || typeof spritesheetData.meta.animations !== "object") {
            throw new Error("Invalid spritesheet format: 'meta.animations' is missing or not an object.");
        }

        const image = new Image();
        // If spritesheetImage is provided, use it directly. Otherwise, try to resolve from spritesheet data.
        if (this.spritesheetImage) {
            image.src = this.spritesheetImage;
        } else {
            if (!this.webEngine) {
                const relativeToSpritesheet = this.spritesheet.startsWith("data:") ? "" : this.spritesheet.split("/").slice(0, -1).join("/");
                const path = spritesheetData.meta.image.startsWith("http") ? spritesheetData.meta.image : new URL(relativeToSpritesheet + "/" + spritesheetData.meta.image, window.location.href).href;  // Handle relative paths
                image.src = path; // Set the image source to the spritesheet image path
            }
        }

        image.onerror = (err) => {
            console.error(`Failed to load spritesheet image <${spritesheetData.meta.image}>:`, err);
            this.ready = false;
        };
        this.spritesheetData = spritesheetData; // Store the parsed spritesheet data
        this.frames = Object.fromEntries(Object.keys(spritesheetData.meta.animations).map(animationName => [animationName, Array(spritesheetData.meta.animations[animationName].frames.length).fill(null)])); // Initialize frames for each animation
        await new Promise<void>((resolve, reject) => {
            image.onload = () => {
                this.loadedSheet = image;
                resolve();
            };
            image.onerror = (err) => {
                console.error(`Failed to load spritesheet image <${spritesheetData.meta.image}>:`, err);
                this.ready = false;
                reject(err);
            };
        });
        const frameLoadPromises: Promise<void>[] = [];
        for (const animation of Object.keys(this.frames)) {
            this.frames[animation] = new Array(this.frames[animation].length);
            for (let i = 0; i < this.frames[animation].length; i++) {
                const frameIndex = this.spritesheetData?.frames.findIndex(frame => frame.filename === this.spritesheetData!.meta.animations[animation].frames[i]);
                if (frameIndex === -1) {
                    throw new Error(`Frame '${this.spritesheetData!.meta.animations[animation].frames[i]}' does not exist in spritesheet for animated sprite <${this.name}> attached to ${this.parent?.name}.`);
                }
                const frame: HTMLImageElement | null = this.frame(frameIndex!);
                if (frame) {
                    this.frames[animation][i] = frame; // Store the frame in the frames object
                    frameLoadPromises.push(new Promise<void>((resolve, reject) => {
                        frame.onload = () => {
                            resolve();
                        };
                        frame.onerror = (err) => {
                            console.error(`Failed to load frame at index ${i} for animated sprite <${this.name}>:`, err);
                            reject(err);
                        };
                    }));
                } else {
                    throw new Error(`Failed to create frame at index ${i} for animated sprite <${this.name}> attached to ${this.parent?.name}.`);
                }
            }

        }

        if (this.currentAnimation === "default" && this.spritesheetData.meta.startingAnimation) {
            this.currentAnimation = this.spritesheetData.meta.startingAnimation;
        } else if (this.currentAnimation === "default" && Object.keys(this.spritesheetData.meta.animations).length > 0) {
            this.currentAnimation = Object.keys(this.spritesheetData.meta.animations)[0];
        }

        this.ready = true;
    }
    frame(index: number): HTMLImageElement | null {
        if (!this.loadedSheet || !this.spritesheetData) {
            console.warn("AnimatedSprite is not ready or spritesheet data is missing.");
            return null;
        }
        const frameData = this.spritesheetData.frames[index];
        if (!frameData) {
            console.warn(`${this.name} attached to ${this.parent?.name} frame at index ${index} was indexed but does not exist in spritesheet`);
            return null;
        }
        const { x, y, w, h } = frameData.frame;
        const rotated = frameData.rotated;
        const spriteSourceSize = frameData.spriteSourceSize;
        const sourceSize = frameData.sourceSize;

        const canvas = document.createElement("canvas");
        canvas.width = sourceSize!.w;
        canvas.height = sourceSize!.h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Failed to get canvas context.");
            return null;
        }

        ctx.imageSmoothingEnabled = !this.disableAntiAliasing;

        ctx.save(); // Save the current context state

        if (rotated) {
            ctx.translate(sourceSize!.w / 2, sourceSize!.h / 2);
            ctx.rotate(90 * Math.PI / 180); // Rotate 90 degrees clockwise
            ctx.translate(-sourceSize!.h / 2, -sourceSize!.w / 2);
            ctx.drawImage(this.loadedSheet!, x, y, h, w, spriteSourceSize!.y, spriteSourceSize!.x, spriteSourceSize!.h, spriteSourceSize!.w);
        } else {
            ctx.drawImage(this.loadedSheet!, x, y, w, h, spriteSourceSize!.x, spriteSourceSize!.y, spriteSourceSize!.w, spriteSourceSize!.h);
        }

        ctx.restore(); // Restore the context to its original state

        const string = canvas.toDataURL("image/png"); // Return the frame as an image element
        const img = new Image();
        img.src = string;
        return img;
    }
    setAnimation(animationName: string, { loop, bounce }: { loop?: boolean, bounce?: boolean } = {}) {
        if (this.spritesheetData && this.spritesheetData.meta.animations[animationName]) {
            this.currentAnimation = animationName;
            this.currentFrameIndex = 0; // Reset to the first frame of the new animation
            this.bouncing = bounce ?? this.spritesheetData.meta.animations[animationName].bounce ?? false; // Reset bouncing state

            if (loop !== undefined) {
                this.spritesheetData.meta.animations[this.currentAnimation].loop = loop;
            }
        } else {
            console.warn(`Animation '${animationName}' does not exist in spritesheet for animated sprite <${this.name}> attached to ${this.parent?.name}.`);
        }
    }
    act(delta: number) {
        super.act(delta);
        if (!this.ready) {
            return;
        }
        const duration = (this.spritesheetData?.frames[this.currentFrameIndex].duration || 100)
        if (this.ready && this.spritesheetData) {
            if (delta > duration) {
                if (this.spritesheetData.meta.animations[this.currentAnimation].bounce) {
                    let direction = this.bouncing ? -1 : 1; // Determine direction based on bouncing flag
                    const animFrames = this.spritesheetData.meta.animations[this.currentAnimation].frames.length;
                    if (this.currentFrameIndex + direction < 0 || this.currentFrameIndex + direction >= animFrames) {
                        this.bouncing = !this.bouncing; // Reverse direction if at bounds
                        direction *= -1;
                    }
                    this.currentFrameIndex += direction;
                    // Clamp to valid range
                    if (this.currentFrameIndex < 0) this.currentFrameIndex = 0;
                    if (this.currentFrameIndex >= animFrames) this.currentFrameIndex = animFrames - 1;
                } else {
                    const animFrames = this.spritesheetData.meta.animations[this.currentAnimation].frames.length;
                    const shouldLoop = this.spritesheetData.meta.animations[this.currentAnimation].loop !== false; // Default to true if not specified

                    if (shouldLoop) {
                        const wasAtLastFrame = this.currentFrameIndex === animFrames - 1;
                        this.currentFrameIndex = (this.currentFrameIndex + 1) % animFrames;
                        // Call completion hook when we loop back to the first frame
                        if (wasAtLastFrame && this.onAnimationComplete) {
                            this.onAnimationComplete(this.currentAnimation, this);
                        }
                    } else {
                        // Don't loop - stop at the last frame
                        if (this.currentFrameIndex < animFrames - 1) {
                            this.currentFrameIndex++;
                        } else if (this.currentFrameIndex === animFrames - 1 && this.onAnimationComplete) {
                            // Animation completed (reached last frame of non-looping animation)
                            this.onAnimationComplete(this.currentAnimation, this);
                        }
                        // Stay at the last frame if we've reached it
                    }
                }
            }
            const transform = this.sibling<Transform>("Transform");
            if (!transform) {
                if (!this.hasWarnedAboutTransform) {
                    console.warn(`AnimatedSprite <${this.name}> attached to ${this.parent?.name} does not have a Transform component. Skipping rendering. This will only show once.`);
                    this.hasWarnedAboutTransform = true;
                }
                return;
            }
            if (!this.top) {
                throw new Error(`AnimatedSprite <${this.name}> is not attached to a top-level parent. Ensure it is added to a Game, Scene, or Layer before rendering.`);
            }
            if (this.top.context) {
                this.top.context.imageSmoothingEnabled = !this.disableAntiAliasing;
                const position = transform.worldPosition;
                const frame = this.frames[this.currentAnimation][this.currentFrameIndex];
                if (frame) {
                    this.top.context.save();
                    this.top.context.translate(position.x, position.y);
                    this.top.context.rotate(transform.rotation);
                    this.top.context.imageSmoothingEnabled = !this.disableAntiAliasing; // Respect anti-aliasing setting
                    this.top.context.scale(transform.scale.x * this.facing.x, transform.scale.y * this.facing.y);
                    this.top.context.drawImage(frame, -this.width / 2, -this.height / 2, this.width, this.height);
                    this.top.context.restore();
                } else {
                    console.warn(`Frame (${this.currentAnimation}) index ${this.currentFrameIndex} does not exist for animated sprite <${this.name}> attached to ${this.parent?.name}.`);
                }
            } else {
                throw new Error(`AnimatedSprite <${this.name}> attached to ${this.parent?.name} does not have a context to render to. Ensure it is added to a Game, Scene, or Layer with a game ancestor.`);
            }
        }

        // Create a neat little vertical progress bar for the current animation using an embedded HTML div
        const barHeight = 15; // px
        const barWidth = 6; // px
        const progress = delta / duration;
        this.hoverbug = // use a different loop emoji for loop and bounce
            `${this.ready ? "✅" : "❌"} ${this.spritesheetData?.meta.animations[this.currentAnimation].loop ? "🔁" : ""}` +
            `<div style="display:inline-block; width:${barWidth}px; height:${barHeight}px; background:linear-gradient(to top, dodgerblue ${progress * 100}%, #ccc ${progress * 100}%); border-radius:3px; border:1px solid #888; vertical-align:middle;border-radius:0px"></div> ` +
            `${this.frames[this.currentAnimation]?.map((frame: HTMLImageElement | null, i) => {
                if (!frame) return ""; // Skip if frame is null
                frame.style.cssText = `display:inline-block; margin-right:2px;width:10px; height:10px; border: 1px solid ${i === this.currentFrameIndex ? "green" : "white"};`;
                return frame.outerHTML;
            }).join("") || ""}` + // Show current frame with a green circle, others with white circles
            `${this.currentAnimation} ${this.bouncing ? "🔄" : ""}`
    }
}