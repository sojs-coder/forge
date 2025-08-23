import { Game } from "./Game";
import { Part } from "./Part";
import { Layer } from "./Layer";
import { Transform } from "./Children/Transform";
import { BoxCollider } from "./Children/BoxCollider";
import { PolygonCollider } from "./Children/PolygonCollider";
import { isPointInObject, isPointInPolygon } from "../helpers";

export class Input extends Part {
    key?: (event: KeyboardEvent) => void;
    keyup?: (event: KeyboardEvent) => void;
    mousemove?: (event: MouseEvent, hovering: Part) => void;
    click?: (event: MouseEvent, clicked: Part) => void;
    downkeys: Set<string> = new Set(); // Track currently pressed keys
    currentMousePos: { x: number, y: number } = { x: 0, y: 0 };
    lastClickPos: { x: number, y: number } | null = null;
    initialized: boolean; // Have the event listeners been initialized?
    private mousemoveDef?: (event: MouseEvent) => void; // Store the mousemove event handler (definite)
    private clickDef?: (event: MouseEvent) => void; // Store the click event handler (definite)
    private mousedownDef?: (event: MouseEvent) => void;
    private mouseupDef?: (event: MouseEvent) => void;
    private keydownDef?: (event: KeyboardEvent) => void;
    private keyupDef?: (event: KeyboardEvent) => void;

    clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        const clonedInput = new Input({
            key: this.key || (() => {}),
            keyup: this.keyup || (() => {}),
            mousemove: this.mousemove || (() => {}),
            click: this.click || (() => {})
        });

        memo.set(this, clonedInput);

        this._cloneProperties(clonedInput, memo);

        // Reset properties that need re-initialization after construction
        clonedInput.downkeys = new Set();
        clonedInput.currentMousePos = { x: 0, y: 0 };
        clonedInput.lastClickPos = null;
        clonedInput.initialized = false;
        clonedInput.mousemoveDef = undefined;
        clonedInput.clickDef = undefined;
        clonedInput.mousedownDef = undefined;
        clonedInput.mouseupDef = undefined;
        clonedInput.keydownDef = undefined;
        clonedInput.keyupDef = undefined;

        return clonedInput as this;
    }

    constructor({
        key,
        keyup,
        mousemove,
        click,
    }: {
        key: (event: KeyboardEvent) => void,
        keyup: (event: KeyboardEvent) => void,
        mousemove: (event: MouseEvent, hovering: Part) => void,
        click: (event: MouseEvent, clicked: Part) => void,
    }) {
        super({ name: "Input" });
        this.debugEmoji = "⌨️";
        this.key = key;
        this.keyup = keyup;
        this.mousemove = mousemove;
        this.click = click;
        this.initialized = false;
        this.type = "Input";
    }
    initialize(canvas: HTMLCanvasElement) {
        this.mousemoveDef = (event: MouseEvent) => {
            if (event.target !== canvas)  return;
            const game = this.top as Game;
            if (!game || !game.currentScene || game.currentScene !== this.parent || !game.currentScene?.activeCamera) {
                return;
            }
            const rect = canvas.getBoundingClientRect(); // DOM rect (in CSS pixels)
            const gameCanvas = game.canvas;
            // Convert from CSS (DOM) pixels → unscaled canvas space
            const mouseX = (event.clientX - rect.left) * (gameCanvas.width / rect.width);
            const mouseY = (event.clientY - rect.top) * (gameCanvas.height / rect.height);

            const camera = game.currentScene?.activeCamera;

            let finalX = mouseX;
            let finalY = mouseY;

            if (camera) {
                const view = camera.getViewMatrix();
                const transform = camera.child<Transform>("Transform");
                if (!transform) {
                    if (!this.warned.has("TransformMissing")) {
                        this.top?.warn("Camera does not have a Transform child.") ? this.warned.add("TransformMissing") : null;
                    }
                    return;
                }
                finalX = (mouseX - game.canvas.width / 2) / view.scale.x + transform.worldPosition.x;
                finalY = (mouseY - game.canvas.height / 2) / view.scale.y + transform.worldPosition.y;
            }


            this.currentMousePos = { x: finalX, y: finalY };
        }
        this.clickDef =  (event) => {
           const game = this.top as Game;
            if (!game || !game.currentScene || game.currentScene !== this.parent || !game.currentScene?.activeCamera) {
                return;
            }
            const rect = canvas.getBoundingClientRect(); // DOM rect (in CSS pixels)
            const gameCanvas = game.canvas;
            // Convert from CSS (DOM) pixels → unscaled canvas space
            const mouseX = (event.clientX - rect.left) * (gameCanvas.width / rect.width);
            const mouseY = (event.clientY - rect.top) * (gameCanvas.height / rect.height);

            const camera = game.currentScene?.activeCamera;

            let finalX = mouseX;
            let finalY = mouseY;

            if (camera) {
                const view = camera.getViewMatrix();
                const transform = camera.child<Transform>("Transform");
                if (!transform) {
                    this.top?.warn("Camera does not have a Transform child.");
                    return;
                }
                finalX = (mouseX - game.canvas.width / 2) / view.scale.x + transform.worldPosition.x;
                finalY = (mouseY - game.canvas.height / 2) / view.scale.y + transform.worldPosition.y;
            }


            this.lastClickPos = { x: finalX, y: finalY };
        }
        this.mousedownDef = (event) => {
            const game = this.top as Game;
            if (game.hovering) {
                game.hovering.onmousedown(event);
            }
        }
        this.mouseupDef = (event) => {
            const game = this.top as Game;
            if (game.hovering) {
                game.hovering.onmouseup(event);
            }
        }
        this.keydownDef = (event) => {
            this.downkeys.add(event.key);
        }
        this.keyupDef = (event) => {
            this.downkeys.delete(event.key);
            if (typeof this.keyup == "function") {
                this.keyup(event);
            }
        }
        canvas.addEventListener("mousemove", this.mousemoveDef);
        canvas.addEventListener("click",this.clickDef);
        canvas.addEventListener("mousedown", this.mousedownDef);
        canvas.addEventListener("mouseup", this.mouseupDef);

        document.addEventListener("keydown", this.keydownDef);
        document.addEventListener("keyup", this.keyupDef);
        this.initialized = true; // Mark as initialized after setting up listeners
    }

    destroy(): void {
        super.destroy();
        const canvas = this.top?.canvas;
        if (canvas) {
            // Remove all event listeners
            canvas.removeEventListener("mousemove", this.mousemoveDef!);
            canvas.removeEventListener("click", this.clickDef!);
            canvas.removeEventListener("mousedown", this.mousedownDef!);
            canvas.removeEventListener("mouseup", this.mouseupDef!);
            document.removeEventListener("keydown", this.keydownDef!);
            document.removeEventListener("keyup", this.keyupDef!);
        }
    }
    act(delta: number) {
        super.act(delta);
        if (!this.initialized) {
            if (!this.top || !(this.top instanceof Game)) {
                throw new Error("Input must be attached to a Game instance.");
            }
            if (!this.top.canvas) {
                throw new Error("Game instance must have a canvas element.");
            }
            this.initialize(this.top.canvas as HTMLCanvasElement);
        }
        const game = this.top as Game;
        if (!game || !game.currentScene || game.currentScene !== this.parent) {
            // Only process input for the current scene that this Input instance is attached to
            return;
        }

        // Process mouse movement for hover
        if (this.currentMousePos) {
            const childrenFlat = game.currentScene.childrenArray.flatMap(child => child.childrenArray);
            childrenFlat.sort((a, b) => {
                const layers = game.currentScene?.childrenArray.filter(l => l instanceof Layer) || [];
                layers.sort((a, b) => {
                    const aIndex = game.currentScene?.childrenArray.indexOf(a) || 0;
                    const bIndex = game.currentScene?.childrenArray.indexOf(b) || 0;
                    return aIndex - bIndex;
                });
                return layers.indexOf(a) - layers.indexOf(b);
            });

            const hovered = childrenFlat.find(child => {
                if (child.child<Transform>("Transform")) {
                    return isPointInObject(this.currentMousePos.x, this.currentMousePos.y, child);
                }
                return false;
            });
            if (game.hovering && game.hovering !== hovered) {
                game.hovering.onunhover();
                game.hovering = undefined;
            }

            if (hovered && game.hovering !== hovered) {
                game.hovering = hovered;
                hovered.onhover();
            }
        }

        // Process clicks
        if (this.lastClickPos) {
            const childrenFlat = game.currentScene.childrenArray.flatMap(child => child.childrenArray);
            childrenFlat.sort((a, b) => {
                const layers = game.currentScene?.childrenArray.filter(l => l instanceof Layer) || [];
                layers.sort((a, b) => {
                    const aIndex = game.currentScene?.childrenArray.indexOf(a) || 0;
                    const bIndex = game.currentScene?.childrenArray.indexOf(b) || 0;
                    return aIndex - bIndex;
                });
                return layers.indexOf(a) - layers.indexOf(b);
            });

            const clicked = childrenFlat.find(child => {
                if (child.child<Transform>("Transform")) {
                    return isPointInObject(this.lastClickPos!.x, this.lastClickPos!.y, child);
                }
                return false;
            });

            if (clicked) {
                if (typeof this.click == "function") {
                    this.click(new MouseEvent("click"), clicked);
                }
            }
            this.lastClickPos = null; // Clear click after processing
        }

        this.downkeys.forEach(key => {
            if (typeof this.key == "function") {
                this.key(new KeyboardEvent("keydown", { key }));
            }
        });
    }

}