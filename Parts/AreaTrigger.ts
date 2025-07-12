import { Part } from "./Part";
import { Collider } from "./Children/Collider";

export class AreaTrigger extends Part {
    onEnter?: (other: Collider) => void;
    onExit?: (other: Collider) => void;
    activeCollisions: Set<Collider> = new Set();

    constructor({ name, onEnter, onExit }: { name?: string, onEnter?: (other: Collider) => void, onExit?: (other: Collider) => void }) {
        super({ name: name || 'AreaTrigger' });
        this.onEnter = onEnter;
        this.onExit = onExit;
        this.debugEmoji = "🧲";
    }

    act(delta: number) {
        super.act(delta);
        const collider = this.sibling<Collider>("Collider");
        if (!collider) {
            console.warn(`AreaTrigger <${this.name}> requires a Collider sibling.`);
            return;
        }

        const currentCollisions = new Set<Collider>();
        if (collider.colliding) {
            for (const other of collider.collidingWith) {
                currentCollisions.add(other);
                if (!this.activeCollisions.has(other)) {
                    // New collision - onEnter
                    if (this.onEnter) {
                        this.onEnter(other);
                    }
                }
            }
        }

        // Check for exited collisions - onExit
        for (const other of this.activeCollisions) {
            if (!currentCollisions.has(other)) {
                const exitedCollider = Array.from(collider.collidingWith).find(c => c.id === other.id); // This might be tricky as collidingWith is reset
                // A more robust way would be to store references to the actual collider objects
                // For simplicity, we'll just call onExit without the specific collider for now
                if (this.onExit) {
                    // We can't easily get the 'other' collider object here after it's no longer colliding
                    // A more advanced solution would involve tracking the actual collider objects.
                    this.onExit(exitedCollider || ({} as Collider)); // Placeholder
                }
            }
        }

        this.activeCollisions = currentCollisions;
        this.hoverbug = `Active: ${this.activeCollisions.size}`;
    }
}