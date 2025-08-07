import type { Vector } from "../../engine/bundle";
import { Part } from "../Part";
import type { Transform } from "./Transform";

export class Collider extends Part {
    colliding: boolean = false;
    collidingWith: Set<Collider> = new Set(); // List of colliding parts
    constructor() {
        super({ name: "Collider" });
        this.type = "Collider";
    }

    onMount(parent: Part) {
        super.onMount(parent);
        if (!this.sibling("Transform")) {
            this.top?.warn(
                `Collider <${this.name}> (${this.id}) does not have Transform sibling. Please ensure you add a Transform component before adding a Collider. It will not technically effect functionality, but it is good practice.`
            );
            return;
        }
    }
    get vertices(): Vector[] {
        // Override in subclasses to provide collider-specific vertices
        return [];
    }

    onRegister(attribute: string, value: any) {
        super.onRegister(attribute, value);
        if (attribute === "layer") {
            value.flats.colliders.push(this);
        }
    }

    onUnregister(attribute: string, value: any) {
        super.onUnregister(attribute, value);
        if (attribute === "layer") {
            const list = value.flats.colliders;
            const index = list.indexOf(this);
            if (index !== -1) {
                list.splice(index, 1);
            }
        }
    }

    act(delta: number) {
        super.act(delta);
        if (!this.registrations?.layer) {
            throw new Error(`Collider <${this.name}> (${this.id}) is not registered to a layer. Collisions will not be checked. Collisions require layers.`)
        }
        this.hoverbug = `${this.colliding ? "🟥" : "🟩"} - ${Array.from(this.collidingWith).map(o => o.name).join(",")} objects`

    }
}