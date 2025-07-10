import { Game } from "./Game";
import { Part } from "./Part";
import { Layer } from "./Layer";
import { Transform } from "./Children/Transform";
import { BoxCollider } from "./Children/BoxCollider";
import { PolygonCollider } from "./Children/PolygonCollider";
import { isPointInObject, isPointInPolygon } from "../helpers";

export class Input extends Part {
    key: (event: KeyboardEvent) => void;
    keyup: (event: KeyboardEvent) => void;
    mousemove: (event: MouseEvent, hovering: Part) => void;
    click: (event: MouseEvent, clicked: Part) => void;
    downkeys: Set<string> = new Set(); // Track currently pressed keys
    currentMousePos: { x: number, y: number } = { x: 0, y: 0 };
    lastClickPos: { x: number, y: number } | null = null;

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
        super();
        this.name = "Input";
        this.debugEmoji = "⌨️";
        this.key = key;
        this.keyup = keyup;
        this.mousemove = mousemove;
        this.click = click;
    }

    onMount(parent: Part) {
        super.onMount(parent);
        if ((!this.top || this.parent instanceof Game)) {
            throw new Error("Please mount Input to a Scene already attached to a Game. You may attach the same input to multiple scenes if you want to share input handling across them.");
        }
        const canvas = this.top.canvas as HTMLCanvasElement;
        if (!canvas) {
            throw new Error("Input requires a canvas to be mounted to. Ensure the Game instance has a valid canvas.");
        }
        canvas.addEventListener("mousemove", (event) => {
            const game = this.top as Game;
            const rect = canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;

            const camera = game.currentScene?.activeCamera;
            if (camera) {
                const view = camera.getViewMatrix();
                const cameraTransform = camera.children["Transform"] as Transform;
                mouseX = (mouseX - game.canvas.width / 2) / view.scale.x + cameraTransform.worldPosition.x;
                mouseY = (mouseY - game.canvas.height / 2) / view.scale.y + cameraTransform.worldPosition.y;
            }
            this.currentMousePos = { x: mouseX, y: mouseY };
        });
        canvas.addEventListener("click", (event) => {
            const game = this.top as Game;
            const rect = canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;

            const camera = game.currentScene?.activeCamera;
            if (camera) {
                const view = camera.getViewMatrix();
                const cameraTransform = camera.children["Transform"] as Transform;
                mouseX = (mouseX - game.canvas.width / 2) / view.scale.x + cameraTransform.worldPosition.x;
                mouseY = (mouseY - game.canvas.height / 2) / view.scale.y + cameraTransform.worldPosition.y;
            }
            this.lastClickPos = { x: mouseX, y: mouseY };
        });
        canvas.addEventListener("mousedown", (event) => {
            const game = this.top as Game;
            if (game.hovering) {
                game.hovering.onmousedown(event);
            }
        });
        canvas.addEventListener("mouseup", (event) => {
            const game = this.top as Game;
            if (game.hovering) {
                game.hovering.onmouseup(event);
            }
        });

        document.addEventListener("keydown", (event) => {
            this.downkeys.add(event.key);
        });
        document.addEventListener("keyup", (event) => {
            this.downkeys.delete(event.key);
            this.keyup(event);
        });
    }

    act() {
        super.act();

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
                if (child.children["Transform"]) {
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
                if (child.children["Transform"]) {
                    return isPointInObject(this.lastClickPos!.x, this.lastClickPos!.y, child);
                }
                return false;
            });

            if (clicked) {
                this.click(new MouseEvent("click"), clicked);
            }
            this.lastClickPos = null; // Clear click after processing
        }

        this.downkeys.forEach(key => {
            this.key(new KeyboardEvent("keydown", { key }));
        });
    }

}