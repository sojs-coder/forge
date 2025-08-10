import type { ButtonStyles, ButtonStyle } from "../../types";
import { Transform } from "./Transform";
import { Part } from "../Part";
import { Input } from "../Input";
import { Scene } from "../Scene";
import { Renderer } from "./Renderer";
import { Sound } from "../Sound";
import { isNamedTupleMember } from "typescript";
import type { Camera } from "../Camera";
import type { BoxCollider } from "./BoxCollider";
import { PolygonCollider } from "./PolygonCollider";

export class Button extends Renderer {
    styles?: ButtonStyles;
    isHovered: boolean = false;
    isActive: boolean = false;
    private onClickHandler: () => void;
    clickSound?: Sound;
    hoverSound?: Sound;
    activeSound?: Sound;

    constructor({ label, onClick, styles, clickSound, hoverSound, activeSound, width, height, backgroundColor, color, font, borderRadius, borderWidth, borderColor, hoverBackground, hoverColor, activeBackground, activeColor }: { label: string; onClick: () => void; styles?: ButtonStyles, clickSound?: Sound, hoverSound?: Sound, activeSound?: Sound, width?: number, height?: number, backgroundColor?: string, color?: string, font?: string, borderRadius?: number, borderWidth?: number, borderColor?: string, hoverBackground?: string, hoverColor?: string, activeBackground?: string, activeColor?: string }) {
        super({ width: styles?.default?.width || width || 100, height: styles?.default?.height || height || 50, disableAntiAliasing: true });
        this.name = label;
        this.onClickHandler = onClick;
        this.styles = styles || {};
        this.styles.default = {
            width,
            height,
            backgroundColor,
            color,
            font,
            borderWidth,
            borderRadius,
            borderColor,
            ...this.styles.default
        }
        this.styles.hover = {
            backgroundColor: hoverBackground,
            color: hoverColor,
            ...this.styles.hover
        };
        this.styles.active = {
            backgroundColor: activeBackground,
            color: activeColor,
            ...this.styles.active
        };
        this.clickSound = clickSound;
        this.hoverSound = hoverSound;
        this.activeSound = activeSound;
        this.type = "Button";

        this.onclick = (event: MouseEvent, input: any) => {
            if (this.onClickHandler) {
                this.onClickHandler();
            }
            if (this.clickSound) {
                this.clickSound.play({ clone: true });
            }
            event.stopPropagation(); // Prevent further propagation of the click event
            event.preventDefault(); // Prevent default action of the click event
        };

        this.onhover = () => {
            this.isHovered = true;
            if (this.hoverSound) {

                this.hoverSound.play({ clone: true });
            }
        };

        this.onunhover = () => {
            this.isHovered = false;
            this.isActive = false; // Reset active state when unhovered
        };

        this.onmousedown = (event: MouseEvent) => {
            if (event.button === 0) { // Left mouse button
                this.isActive = true;
                if (this.activeSound) {
                    this.activeSound.play({ clone: true });
                }
            }
        };

        this.onmouseup = (event: MouseEvent) => {
            if (event.button === 0) { // Left mouse button
                this.isActive = false;
            }
        };
    }
    onMount(parent: Part) {
        super.onMount(parent);
        if (!this.sibling("Transform")) {
            this.top?.warn(
                `Button <${this.name}> (${this.id}) does not have Transform sibling. Please ensure you add a Transform component before adding a Button.`
            );
        }
        this.superficialWidth = this.width ?? 100;
        this.superficialHeight = this.height ?? 50;
    }
    setOnClick(onClick: () => void) {
        this.onClickHandler = onClick;
    }
    act(delta: number) {
        super.act(delta);

        if (!this.top) {
            throw new Error(`Button <${this.name}> is not attached to a top-level parent. Ensure it is added to a Game instance or Scene before rendering.`);
        }
        const transform = this.sibling<Transform>("Transform");
        if (!transform) {
            throw new Error(`Button <${this.name}> does not have a Transform sibling. Ensure it is mounted to a GameObject with a Transform component.`);
        }
        const boxCollider = this.sibling<BoxCollider>("BoxCollider") || this.sibling<PolygonCollider>("PolygonCollider");
        if (!boxCollider && !this.warned.has("MissingBoxCollider")){
            this.top?.warn(`Button <${this.name}> (${this.id}) does not have a Collider sibling. It may not function correctly without a collider for input detection.`) ? this.warned.add("MissingBoxCollider") : undefined;
        }
        const scene = this.registrations["scene"] as Scene | undefined;
        if (scene) {
            if (!scene.child<Input>("Input")) {
                const input = new Input({
                    key: () => { },
                    keyup: () => { },
                    mousemove: () => { },
                    click: () => { }
                });
                scene.addChild(input);
            }
            if (!scene.child<Camera>("Camera") && !this.warned.has("Camera")) {
                const seen = this.top?.error(`Button <${this.name}> requires a Camera to function properly. Please add a Camera to the Scene.`);
                if (seen) {
                    this.warned.add("Camera");
                }
            }
        }
        const position = transform.worldPosition;
        const rotation = transform.rotation;
        const scale = transform.scale;
        const ctx = this.top.context;
        if (!ctx) {
            throw new Error(`Button <${this.name}> requires a valid context to render. Ensure it is mounted to a Game instance with a canvas.`);
        }

        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate(rotation);
        ctx.scale(scale.x, scale.y);

        // Determine current style based on state, merging with default styles
        const defaultStyle = this.styles?.default || {};
        let effectiveStyle: ButtonStyle = { ...defaultStyle };

        if (this.isHovered && this.styles?.hover) {
            effectiveStyle = { ...effectiveStyle, ...this.styles.hover };
        }
        if (this.isActive && this.styles?.active) {
            effectiveStyle = { ...effectiveStyle, ...this.styles.active };
        }

        // Extract styles with defaults
        const borderRadius = effectiveStyle.borderRadius ?? 5;
        const borderWidth = effectiveStyle.borderWidth ?? 2;
        const borderColor = effectiveStyle.borderColor ?? "#000000";
        const backgroundColor = effectiveStyle.backgroundColor ?? "#CCCCCC";
        const color = effectiveStyle.color ?? "#000000";
        const font = effectiveStyle.font ?? "16px Arial";
        const width = effectiveStyle.width ?? 100;
        const height = effectiveStyle.height ?? 50;
        this.width = effectiveStyle.width ?? width; // Update width based on effective style
        this.height = effectiveStyle.height ?? height; // Update height based on effective style
        // Draw button background with border radius
        const w = width;
        const h = height;
        const r = Math.min(borderRadius, w / 2, h / 2);

        ctx.beginPath();
        ctx.moveTo(-w / 2 + r, -h / 2);
        ctx.lineTo(w / 2 - r, -h / 2);
        ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
        ctx.lineTo(w / 2, h / 2 - r);
        ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
        ctx.lineTo(-w / 2 + r, h / 2);
        ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
        ctx.lineTo(-w / 2, -h / 2 + r);
        ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
        ctx.closePath();

        ctx.fillStyle = backgroundColor;
        ctx.fill();

        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = borderColor;
        ctx.stroke();

        // Draw button label
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.save();
        ctx.clip(); // Ensure text doesn't overflow rounded corners
        ctx.fillText(this.name, 0, 0);
        ctx.restore();

        ctx.restore();

        this.hoverbug = `Hovered: ${this.isHovered ? "🟢" : "🔴"}`;
    }
}