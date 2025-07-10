import { Part } from "./Part";
import { Camera } from "./Camera";
import { Transform } from "./Children/Transform";
import { Vector } from "../Math/Vector";

export class CameraShake extends Part {
    intensity: number;
    duration: number;
    private shakeTimer: number = 0;
    private originalCameraPosition: Vector | null = null;

    constructor({ name, intensity = 5, duration = 60 }: { name?: string, intensity?: number, duration?: number }) {
        super({ name: name || 'CameraShake' });
        this.intensity = intensity;
        this.duration = duration;
        this.debugEmoji = " tremors";
    }

    onMount(parent: Part) {
        super.onMount(parent);
        // Find the camera in the scene and store its original position
        const camera = this.top?.currentScene?.activeCamera;
        if (camera) {
            const cameraTransform = camera.sibling<Transform>("Transform");
            if (cameraTransform) {
                this.originalCameraPosition = cameraTransform.position.clone();
            }
        }
    }

    shake() {
        this.shakeTimer = this.duration;
    }

    act() {
        super.act();
        if (this.shakeTimer > 0) {
            const camera = this.top?.currentScene?.activeCamera;
            if (camera) {
                const cameraTransform = camera.sibling<Transform>("Transform");
                if (cameraTransform) {
                    const offsetX = (Math.random() - 0.5) * this.intensity;
                    const offsetY = (Math.random() - 0.5) * this.intensity;
                    cameraTransform.position = this.originalCameraPosition!.add(new Vector(offsetX, offsetY));
                }
            }
            this.shakeTimer--;
        } else if (this.originalCameraPosition) {
            // Reset camera position after shake
            const camera = this.top?.currentScene?.activeCamera;
            if (camera) {
                const cameraTransform = camera.sibling<Transform>("Transform");
                if (cameraTransform) {
                    cameraTransform.position = this.originalCameraPosition;
                }
            }
        }
        this.hoverbug = `Shaking: ${this.shakeTimer > 0 ? "✅" : "❌"}`;
    }
}