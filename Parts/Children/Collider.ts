import { Part } from "../Part";

export class Collider extends Part {
    colliding: boolean = false;
    collidingWith: Set<Collider> = new Set(); // List of colliding parts
    constructor() {
        super();
        this.name = "Collider";
    }

    onMount(parent: Part) {
        super.onMount(parent);
        if (!this.sibling("Transform")) {
            console.warn(
                `Collider <${this.name}> (${this.id}) does not have Transform sibling. Please ensure you add a Transform component before adding a Collider. It will not technically effect functionality, but it is good practice.`
            );
            return;
        }
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

    act() {
        super.act();
        this.hoverbug = `${this.colliding ? "🟥" : "🟩"} - ${Array.from(this.collidingWith).map(o => o.name).join(",")} objects`

    }
}