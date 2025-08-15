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

    clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        const clonedHealth = new Health({
            maxHealth: this.maxHealth,
            onDeath: this.onDeath
        });

        memo.set(this, clonedHealth);

        this._cloneProperties(clonedHealth, memo);

        // Reset properties that need re-initialization after construction
        clonedHealth.isDead = false;
        clonedHealth.currentHealth = clonedHealth.maxHealth;

        return clonedHealth as this;
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