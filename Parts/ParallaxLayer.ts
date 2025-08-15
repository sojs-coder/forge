import { Layer } from "./Layer";
import { Transform } from "./Children/Transform";
import { Camera } from "./Camera";
import { Vector } from "../Math/Vector";

export class ParallaxLayer extends Layer {
    parallaxFactor: number;
    private originalPositions: Map<string, Vector> = new Map();
    private initialized = false;
    constructor({ name, parallaxFactor = 0.5 }: { name: string, parallaxFactor?: number }) {
        super({ name });
        this.parallaxFactor = parallaxFactor;
    }

    clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        const clonedLayer = new ParallaxLayer({
            name: this.name,
            parallaxFactor: this.parallaxFactor
        });

        memo.set(this, clonedLayer);

        this._cloneProperties(clonedLayer, memo);

        // Reset properties that need re-initialization after construction
        clonedLayer.initialized = false;
        clonedLayer.originalPositions = new Map(); // Will be re-populated by initialize()

        return clonedLayer as this;
    }

    initialize() {
        // Store original positions when the layer starts
        this.childrenArray.forEach(child => {
            const childTransform = child.child<Transform>("Transform");
            if (childTransform) {
                this.originalPositions.set(child.name, new Vector(childTransform.position.x, childTransform.position.y));
            }
        });
    }

    act(delta: number) {
        if (!this.initialized) {
            this.initialize();
            this.initialized = true;
        }
        const camera = this.top?.currentScene?.activeCamera;
        if (camera) {
            const cameraTransform = camera.child<Transform>("Transform");
            if (cameraTransform) {
                const cameraPosition = cameraTransform.worldPosition;
                this.childrenArray.forEach(child => {
                    const childTransform = child.child<Transform>("Transform");
                    if (childTransform) {
                        const originalPos = this.originalPositions.get(child.name);
                        if (originalPos) {
                            // Calculate parallax position based on camera movement and original position
                            const parallaxX = originalPos.x + (cameraPosition.x * this.parallaxFactor);
                            const parallaxY = originalPos.y + (cameraPosition.y * this.parallaxFactor);
                            
                            childTransform.position.set(new Vector(parallaxX, parallaxY));
                        }
                    }
                });
            }
        }
        super.act(delta);
    }
}