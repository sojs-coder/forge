import { Part } from "./Part";
import { Transform } from "./Children/Transform";
import { Health } from "./Health";
import { Game } from "./Game";

export class HealthBar extends Part {
    width: number;
    height: number;
    color: string;
    backgroundColor: string;
    targetHealth: Health | undefined = undefined;
    offsetHeight: number = 0; // Offset from the parent GameObject's position
    constructor({ width = 100, height = 10, color = "green", backgroundColor = "red", offsetHeight = 0 }: { width?: number, height?: number, color?: string, backgroundColor?: string, offsetHeight?: number }) {
        super({ name: 'HealthBar' });
        this.width = width;
        this.height = height;
        this.color = color;
        this.backgroundColor = backgroundColor;
        this.debugEmoji = "🩹";
        this.offsetHeight = offsetHeight;
        this.type = "HealthBar";
    }

    onMount(parent: Part) {
        super.onMount(parent);
        this.targetHealth = this.sibling<Health>("Health");
        if (!this.targetHealth) {
            console.warn(`HealthBar <${this.name}> requires a Health sibling.`);
        }
    }

    act(delta: number) {
        super.act(delta);

        if (!this.top) {
            throw new Error(`HealthBar <${this.name}> is not attached to a top-level parent. Ensure it is added to a Game instance or Scene before rendering.`);
        }
        const transform = this.sibling<Transform>("Transform");
        if (!transform) {
            throw new Error(`HealthBar <${this.name}> requires a Transform sibling to determine position. Ensure it is mounted to a GameObject with a Transform component.`);
        }
        const ctx = this.top.context;
        if (!ctx) {
            throw new Error(`HealthBar <${this.name}> requires a valid context to render. Ensure it is mounted to a Game instance with a canvas.`);
        }

        const position = transform.worldPosition;

        ctx.save();
        ctx.translate(position.x, position.y);

        // Draw background bar
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(-this.width / 2, (-this.height / 2) - this.offsetHeight, this.width, this.height);

        // Draw health bar
        if (this.targetHealth) {
            const healthPercentage = this.targetHealth.currentHealth / this.targetHealth.maxHealth;
            const currentHealthWidth = this.width * healthPercentage;
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.width / 2, (-this.height / 2) - this.offsetHeight, currentHealthWidth, this.height);
        }

        ctx.restore();

        this.hoverbug = this.targetHealth ? `${this.targetHealth.currentHealth}/${this.targetHealth.maxHealth}` : "No Health target";

    }
}