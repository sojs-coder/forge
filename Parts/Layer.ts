import { GameObject } from "./GameObject";
import { generateUID } from "../helpers";
import { Part } from "./Part";
import { SpatialGrid } from "../Math/SpatialGrid";
import type { Collider } from "./Children/Collider";

export class Layer extends Part {
    spatialGrid: SpatialGrid;

    constructor({ name }: { name: string }) {
        super({ name });
        this.type = "Layer";
        this.id = generateUID();
        this.debugEmoji = "🗂️"; // Default emoji for debugging the layer
        this.spatialGrid = new SpatialGrid(100);
    }

    addChild(part: Part) {
        part.setAll("layer", this);
        super.addChild(part);
    }

    addChildren(...parts: Part[]) {
        parts.forEach((part) => this.addChild(part));
    }

    removeChild(part: Part) {
        part.onUnregister("layer", this);
        super.removeChild(part);
    }

    act(delta: number) {
        if (!this.ready) {
            return;
        }

        this.spatialGrid.clear();
        const colliders = this.flats.colliders as Collider[];
        for (const collider of colliders) {
            if (collider.active) {
                this.spatialGrid.insert(collider);
            }
        }

        this.ties.forEach(tie => {
            if (tie.target && tie.target.hasOwnProperty(tie.targetAttribute)) {
                const value = this.attr(tie.localAttribute);
                tie.target.attr(tie.targetAttribute, value);
            }
        });

        this.childrenArray.forEach(child => {
            child.act(delta);
        });
    }
}