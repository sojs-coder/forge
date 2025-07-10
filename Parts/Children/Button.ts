import type { ButtonStyles, ButtonStyle } from "../../types";
import { Transform } from "./Transform";
import { Part } from "../Part";
import { Input } from "../Input";
import { Scene } from "../Scene";
import { Renderer } from "./Renderer";
import { Sound } from "../Sound";

export class Button extends Renderer {
    styles?: ButtonStyles;
    private isHovered: boolean = false;
    private isActive: boolean = false;
    private onClickHandler: () => void;
    clickSound?: Sound;
    hoverSound?: Sound;
    activeSound?: Sound;

    constructor({ label, onClick, styles, clickSound, hoverSound, activeSound }: { label: string; onClick: () => void; styles?: ButtonStyles, clickSound?: Sound, hoverSound?: Sound, activeSound?: Sound }) {
        super({ width: styles?.default?.width ?? 100, height: styles?.default?.height ?? 50, disableAntiAliasing: true });
        this.name = label;
        this.onClickHandler = onClick;
        this.styles = styles;
        this.clickSound = clickSound;
        this.hoverSound = hoverSound;
        this.activeSound = activeSound;

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
            console.log(`Button ${this.name} hovered`);
        };

        this.onunhover = () => {
            this.isHovered = false;
            this.isActive = false; // Reset active state when unhovered
            console.log(`Button ${this.name} unhovered`);
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
            console.warn(
                `Button <${this.name}> (${this.id}) does not have Transform sibling. Please ensure you add a Transform component before adding a Button.`
            );
        }

        // Ensure an Input instance is attached to the scene
        if (this.parent instanceof Scene && !this.parent.sibling("Input")) {
            this.parent.addChild(new Input({
                key: () => {},
                keyup: () => {},
                mousemove: () => {},
                click: () => {},
            }));
        }

        // Set superficial dimensions based on default styles
        const defaultStyle = this.styles?.default;
        this.superficialWidth = defaultStyle?.width ?? 100;
        this.superficialHeight = defaultStyle?.height ?? 50;
    }

    act() {
        super.act();

        if (!this.top) {
            throw new Error(`Button <${this.name}> is not attached to a top-level parent. Ensure it is added to a Game instance or Scene before rendering.`);
        }
        const transform = this.sibling<Transform>("Transform");
        if (!transform) {
            throw new Error(`Button <${this.name}> does not have a Transform sibling. Ensure it is mounted to a GameObject with a Transform component.`);
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