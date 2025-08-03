import { Part } from "./Part";
import { Transform } from "./Children/Transform";
import { Vector } from "../Math/Vector";
import type { Follow } from "./Follow";

export class CameraShake extends Part {
    intensity: number;
    duration: number;
    initialized: boolean = false;
    private shakeTimer: number = 0;
    private originalCameraPosition: Vector | null = null;

    constructor({ intensity = 5, duration = 60 }: { intensity?: number, duration?: number }) {
        super({ name:'CameraShake' });
        this.intensity = intensity;
        this.duration = duration;
        this.debugEmoji = " tremors";
        this.type = "CameraShake";
    }

    initialize() {
        this.initialized = true;
        // Find the camera in the scene and store its original position
        const camera = this.top?.currentScene?.activeCamera;
        if (camera) {
            const cameraTransform = camera.child<Transform>("Transform");
            if (cameraTransform) {
                this.originalCameraPosition = cameraTransform.position.clone();
            }
        }
    }
    shake() {
        this.shakeTimer = this.duration;
    }

    act(delta: number) {
        super.act(delta);
        if (!this.initialized) {
            this.initialize();
        }

        const camera = this.top?.currentScene?.activeCamera;
        const follow = camera?.child<Follow>("Follow");
        const transform = camera?.child<Transform>("Transform");

        if (this.shakeTimer > 0) {
            const offsetX = (Math.random() - 0.5) * this.intensity;
            const offsetY = (Math.random() - 0.5) * this.intensity;

            if (follow) {
                follow.externalOffset.set(offsetX, offsetY);
            } else if (transform && this.originalCameraPosition) {
                transform.moveTo(this.originalCameraPosition.add(new Vector(offsetX, offsetY)));
            }

            this.shakeTimer--;
        } else {
            if (follow) {
                follow.externalOffset.set(0, 0);
            } else if (transform && this.originalCameraPosition) {
                transform.moveTo(this.originalCameraPosition);
            }
        }

        this.hoverbug = `Shaking: ${this.shakeTimer > 0 ? "✅" : "❌"}`;
    }

}