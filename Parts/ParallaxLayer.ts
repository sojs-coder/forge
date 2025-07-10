import { Layer } from "./Layer";
import { Transform } from "./Children/Transform";
import { Camera } from "./Camera";
import { Vector } from "../Math/Vector";

export class ParallaxLayer extends Layer {
    parallaxFactor: number;

    constructor({ name, parallaxFactor = 0.5 }: { name: string, parallaxFactor?: number }) {
        super({ name });
        this.parallaxFactor = parallaxFactor;
    }

    act() {
        const camera = this.top?.currentScene?.activeCamera;
        if (camera) {
            const cameraTransform = camera.sibling<Transform>("Transform");
            if (cameraTransform) {
                const cameraPosition = cameraTransform.worldPosition;
                this.childrenArray.forEach(child => {
                    const childTransform = child.sibling<Transform>("Transform");
                    if (childTransform) {
                        childTransform.position = new Vector(cameraPosition.x * this.parallaxFactor, cameraPosition.y * this.parallaxFactor);
                    }
                });
            }
        }
        super.act();
    }
}