import { Part } from "./Part";
import { Input } from "./Input";

export class Clickable extends Part {
    onClick?: (event: MouseEvent, clicked: Part) => void;
    onHover?: () => void;
    onUnhover?: () => void;

    constructor({ name, onClick, onHover, onUnhover }: { name?: string, onClick?: (event: MouseEvent, clicked: Part) => void, onHover?: () => void, onUnhover?: () => void }) {
        super({ name: name || 'Clickable' });
        this.onClick = onClick;
        this.onHover = onHover;
        this.onUnhover = onUnhover;
        this.debugEmoji = "👆";
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

    onclick(event: MouseEvent, clicked: Part) {
        if (this.onClick) {
            this.onClick(event, clicked);
        }
        super.onclick(event, clicked);
    }

    onhover() {
        if (this.onHover) {
            this.onHover();
        }
        super.onhover();
    }

    onunhover() {
        if (this.onUnhover) {
            this.onUnhover();
        }
        super.onunhover();
    }
}