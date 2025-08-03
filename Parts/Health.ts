import { Part } from "./Part";

export class Health extends Part {
    maxHealth: number;
    currentHealth: number;
    onDeath?: () => void;
    isDead: boolean = false;

    constructor({ maxHealth = 100, onDeath = () => {} }: { maxHealth?: number, onDeath?: () => void }) {
        super({ name: 'Health' });
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.onDeath = onDeath;
        this.debugEmoji = "❤️";
        this.type = "Health";
    }

    takeDamage(amount: number) {
        this.currentHealth -= amount;
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            if (this.onDeath) {
                this.isDead = true;
                this.onDeath();
            }
        }
    }

    heal(amount: number) {
        this.currentHealth += amount;
        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
    }

    act(delta: number) {
        super.act(delta);
        this.hoverbug = `${this.currentHealth}/${this.maxHealth}`;
    }
}