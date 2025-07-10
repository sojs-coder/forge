import { Part } from "./Part";
import { Transform } from "./Children/Transform";
import { Input } from "./Input";
import { Game } from "./Game";

export class Draggable extends Part {
    private isDragging: boolean = false;
    private dragOffsetX: number = 0;
    private dragOffsetY: number = 0;

    constructor({ name }: { name?: string }) {
        super({ name: name || 'Draggable' });
        this.debugEmoji = "✋";
    }

    onMount(parent: Part) {
        super.onMount(parent);
        // Ensure an Input instance is attached to the scene
        if (this.top && this.top.currentScene && !this.top.currentScene.sibling("Input")) {
            this.top.currentScene.addChild(new Input({
                key: () => {},
                keyup: () => {},
                mousemove: () => {},
                click: () => {},
            }));
        }
    }

    onmousedown(event: MouseEvent) {
        const transform = this.sibling<Transform>("Transform");
        if (transform && this.top instanceof Game) {
            this.isDragging = true;
            this.dragOffsetX = this.top.lastMousePosition!.x - transform.worldPosition.x;
            this.dragOffsetY = this.top.lastMousePosition!.y - transform.worldPosition.y;
        }
        super.onmousedown(event);
    }

    onmouseup(event: MouseEvent) {
        this.isDragging = false;
        super.onmouseup(event);
    }

    act() {
        super.act();
        if (this.isDragging) {
            const transform = this.sibling<Transform>("Transform");
            if (transform && this.top instanceof Game && this.top.lastMousePosition) {
                transform.position.x = this.top.lastMousePosition.x - this.dragOffsetX;
                transform.position.y = this.top.lastMousePosition.y - this.dragOffsetY;
            }
        }
        this.hoverbug = `Dragging: ${this.isDragging ? "✅" : "❌"}`;
    }
}