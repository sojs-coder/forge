import { generateUID } from "../helpers";
import type { SpriteRender } from "./Children/SpriteRender";
import type { AnimatedSprite } from "./Children/AnimatedSprite";
import type { Game } from "./Game";
import type { Collider } from "./Children/Collider";
import type { Scene } from "./Scene";

type Tie<T extends Part = Part, L extends keyof T = keyof T, R extends keyof Part = keyof Part> = {
  target: T;
  localAttribute: R;
  targetAttribute: L;
};



export class Part {

    id: string;
    name: string;
    childrenArray: Part[] = []; // Array to maintain order of children
    parent?: Part;
    top: Game | undefined; // Reference to the top-level parent, typically a Game instance
    ready: boolean = false;
    registrations: { [key: string]: any } = {}; // For storing information set by parents or other parts
    flats: { colliders: Collider[] } = { colliders: [] };
    _layoutWidth: number = 0; // Used for layout calculations in debugTreeRender
    context?: CanvasRenderingContext2D; // Optional context property for rendering. Derived from the top-level parent, not usually defined unless top-level parent is a canvas element.
    debugEmoji?: string; // Optional emoji for debugging purposes
    hoverbug?: string; // Tooltip for debug info, works with debugTreeRender
    _superficialWidth: number = 0; // General width of object
    _superficialHeight: number = 0; // General height of object
    ties: Set<Tie> = new Set(); // Ties to other parts, allowing for dynamic attribute linking
    type: string;

    private _childrenByName: { [name: string]: Part } = {}; // For quick access to children by name
    private _childrenByType: { [type: string]: Array<Part> } = {}; // For quick access to children by type
    constructor({ name }: { name?: string } = {}) {
        this.id = generateUID();
        this.name = name || "New Object";
        this.type = "Part";
        this.childrenArray = [];
        this.parent = undefined;
        this.top = undefined;
        this.ready = true;
        this.debugEmoji = "🧩"; // Default emoji for debugging
    }
    tie<T extends Part>(
        target: T,
        targetAttribute: keyof T,
        localAttribute: keyof this
    ) {
        if (!target || !targetAttribute) return;

        if (target.hasOwnProperty(targetAttribute as string)) {
            this.ties.add({
                target,
                localAttribute,
                targetAttribute
            });
        }
    }

    onclick(event: MouseEvent, clicked: Part) {
        this.childrenArray.forEach(child => {
            if (typeof child.onclick === 'function') {
                child.onclick(event, clicked);
            }
        });
    }
    onhover() {
        this.childrenArray.forEach(child => {
            if (typeof child.onhover === 'function') {
                child.onhover();
            }
        });
    }; // Optional hover handler for the part
    onunhover() {
        this.childrenArray.forEach(child => {
            if (typeof child.onunhover === 'function') {
                child.onunhover();
            }
        });
    }; // Optional unhover handler for the part
    onmousedown(event: MouseEvent) {
        this.childrenArray.forEach(child => {
            if (typeof child.onmousedown === 'function') {
                child.onmousedown(event);
            }
        });
    }; // Optional mousedown handler for the part
    onmouseup(event: MouseEvent) {
        this.childrenArray.forEach(child => {
            if (typeof child.onmouseup === 'function') {
                child.onmouseup(event);
            }
        });
        this.onclick(event, this);
    }; // Optional mouseup handler for the part
    sibling<T extends Part>(name: string): T | undefined {
        if (!this.parent) {
            return undefined;
        }
        const sibling = this.parent._childrenByName[name];
        if (!sibling) {
            return undefined;
        }
        return sibling as T;
    }
    setSuperficialDimensions(width: number, height: number) {
        this._superficialHeight = height;
        this._superficialWidth = width;
        this.childrenArray.forEach(child => {
            if (typeof child.setSuperficialDimensions === 'function') {
                child.setSuperficialDimensions(width, height);
            }
        });
    }
    onMount(parent: Part) {
        this.parent = parent;
        for (const [k, v] of Object.entries(parent.registrations)) {
            this.setAll(k, v);
        }
    }
    onRegister(attribute: string, value: any) {
        // This method can be overridden in subclasses to handle registration logic
    }
    onUnregister(attribute: string, value: any) {
        switch (attribute) {
            case "parent":
                this.parent = undefined; // Clear parent reference
                this.registrations.layer.flats.colliders = this.registrations.layer.flats.colliders.filter((c: Collider) => c as any !== this as any);
                break;
            case "top":
                this.top = undefined; // Clear top reference
                break;
            case "layer":
                if (this.registrations.layer) {
                    this.registrations.layer.flats.colliders = this.registrations.layer.flats.colliders.filter((c: Collider) => c as any !== this as any);
                }
                break;
            default:
                // Handle other attributes if necessary
                break;
        }
        // This method can be overridden in subclasses to handle unregistration logic
    }

    onUnmount() {
        // This method can be overridden in subclasses to handle unmounting logic
    }
    addChild(child: Part) {
        if (this._childrenByName[child.name]) {
            console.warn(`Child with name <${child.name}> already exists in <${this.name}>. Skipping addition. (Child has ID <${child.id}>).`);
            return;
        }
        this.childrenArray.push(child);
        if (!this._childrenByType[child.type]) {
            this._childrenByType[child.type] = [];
        }
        this._childrenByType[child.type].push(child);
        this._childrenByName[child.name] = child; // Store child by name for quick access
        if (this.top) {
            child.setTop(this.top); // Set the top-level parent for the child
        }
        child.onMount(this);
    }
    addChildren(...children: Part[]) {
        children.forEach(child => this.addChild(child));
    }
    setTop(top: Game) {
        this.top = top;
        if (this.childrenArray.length > 0) {
            this.childrenArray.forEach(child => {
                child.setTop(top);
            });
        }
    }
    attr<T>(attribute: string, value?: T): T | undefined {
        if (!value ) {
            return (this as any)[attribute] as T;
        }
        (this as any)[attribute] = value;
        return value;
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

    setAll(attribute: string, value: any) {
        const current = this.registrations[attribute];
        if (current && current !== value) {
            this.onUnregister(attribute, current); // cleanup
        }

        if (current !== value) {
            this.onRegister(attribute, value); // new registration
        }

        this.registrations[attribute] = value;

        this.childrenArray.forEach(child => {
            child.setAll(attribute, value);
        });
    }
    calculateLayout(spacing = { x: 10, y: 20 }) {
        if (!this.childrenArray || this.childrenArray.length === 0) {
            this._layoutWidth = 100;
            return this._layoutWidth;
        }

        let totalWidth = 0;
        this.childrenArray.forEach(child => {
            if (typeof child.calculateLayout === 'function') {
                totalWidth += child.calculateLayout(spacing);
            }
        });

        totalWidth += (this.childrenArray.length - 1) * spacing.x;
        this._layoutWidth = totalWidth;
        return totalWidth;
    }
    removeChild(child: Part) {
        if (this._childrenByName[child.name]) {
            delete this._childrenByName[child.name];
            const index = this.childrenArray.indexOf(child);
            if (index !== -1) {
                this.childrenArray.splice(index, 1);
            }
            child.parent = undefined; // Clear parent reference
            child.top = undefined; // Clear top reference
            child.ready = false; // Mark as not ready
            child.onUnregister("parent", this); // Notify child of unregistration
            child.onUnregister("top", this.top); // Notify child of unregistration from top
            child.onUnmount(); // Call onUnmount for the removed child
        } else {
            console.warn(`Child with name <${child.name}> not found in <${this.name}>. Cannot remove. (Child has ID <${child.id}>).`);
        }
    }

    destroy() {
        // This method can be overridden in subclasses to handle destruction logic
        // For example, removing event listeners, clearing intervals, etc.
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    debugTreeRender(x: number, y: number, spacing = { x: 120, y: 80 }) {
        const context = this.context || (this.top && this.top.context);
        if (!context) return;

        const boxWidth = 100;
        const boxHeight = 40;
        const label = (this.debugEmoji || "") + this.name || this.id || 'Node';

        // Draw this node's box
        context.fillStyle = "#fff";
        context.strokeStyle = "#000";
        context.lineWidth = 2;
        context.fillRect(x - boxWidth / 2, y, boxWidth, boxHeight);
        context.strokeRect(x - boxWidth / 2, y, boxWidth, boxHeight);

        // Label
        context.font = "14px sans-serif";
        context.textAlign = "center";
        context.fillStyle = "#000";
        // Draw emoji (if present) separately to retain color
        // Prefer feature detection over constructor name checks for robustness
        const spriteRender = this as unknown as SpriteRender;
        const animatedSprite = this as unknown as AnimatedSprite;

        if (spriteRender && typeof spriteRender.image === "object" && spriteRender.image instanceof Image) {
            // Draw mini sprite
            context.drawImage(spriteRender.image, x - (25 / 2), y + 2, 25, 25);
        } else if (animatedSprite && animatedSprite.frames && animatedSprite.currentAnimation && animatedSprite.currentFrameIndex !== undefined) {
            // Draw current frame of animated sprite
            const currentFrame = animatedSprite.frames[animatedSprite.currentAnimation]?.[animatedSprite.currentFrameIndex];
            if (currentFrame && currentFrame instanceof Image) {
                context.drawImage(currentFrame, x - (25 / 2), y + 2, 25, 25);
            } else if (this.debugEmoji) {
                context.font = "20px sans-serif";
                context.fillText(this.debugEmoji, x, y + 22);
            }
        } else if (this.debugEmoji) {
            context.font = "20px sans-serif";
            context.fillText(this.debugEmoji, x, y + 22);
        }
        // Draw label (without emoji)
        const labelText = this.name || this.id || 'Node';
        context.font = "14px sans-serif";
        context.fillText(labelText, x, y + 38);

        // Draw children
        if (this.childrenArray && this.childrenArray.length > 0) {
            const totalWidth =
                this.childrenArray.reduce((acc, child) => acc + (child._layoutWidth || 100), 0) +
                spacing.x * (this.childrenArray.length - 1);

            let currentX = x - totalWidth / 2;

            this.childrenArray.forEach(child => {
                const childWidth = child._layoutWidth || 100;
                const childX = currentX + childWidth / 2;
                const childY = y + boxHeight + spacing.y;

                // Line from parent to child
                context.beginPath();
                context.moveTo(x, y + boxHeight);
                context.lineTo(childX, childY);
                context.stroke();

                if (typeof child.debugTreeRender === 'function') {
                    child.debugTreeRender(childX, childY, spacing);
                }

                currentX += childWidth + spacing.x;
            });
        }
    }
    child<T extends Part>(name: string): T | undefined {
        if (this.childrenArray.length === 0) {
            return undefined;
        }
        let child = this._childrenByName[name] || (this._childrenByType[name] ? this._childrenByType[name][0] : undefined);
        if (!child) {
            return undefined;
        }
        return child as T;
    }
    get superficialHeight() {
        return this._superficialHeight || 50;
    }
    get superficialWidth() {
        return this._superficialWidth || 100;
    }
    set superficialHeight(value: number) {
        this._superficialHeight = value;
        this.childrenArray.forEach(child => {
            if (typeof child.setSuperficialDimensions === 'function') {
                child.setSuperficialDimensions(this._superficialWidth, value);
            }
        });
    }
    set superficialWidth(value: number) {
        this._superficialWidth = value;
        this.childrenArray.forEach(child => {
            if (typeof child.setSuperficialDimensions === 'function') {
                child.setSuperficialDimensions(value, this._superficialHeight);
            }
        });
    }

}