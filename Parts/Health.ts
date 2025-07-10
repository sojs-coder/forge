import { Part } from "./Part";

export class Health extends Part {
    maxHealth: number;
    currentHealth: number;
    onDeath?: () => void;

    constructor({ name, maxHealth = 100, onDeath }: { name?: string, maxHealth?: number, onDeath?: () => void }) {
        super({ name: name || 'Health' });
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.onDeath = onDeath;
        this.debugEmoji = "❤️";
    }

    takeDamage(amount: number) {
        this.currentHealth -= amount;
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            if (this.onDeath) {
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

    act() {
        super.act();
        this.hoverbug = `${this.currentHealth}/${this.maxHealth}`;
    }
}