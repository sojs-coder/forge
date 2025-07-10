import { Part } from "./Part";
import { Transform } from "./Children/Transform";
import { ColorRender } from "./Children/ColorRender";
import { Vector } from "../Math/Vector";

class Particle extends Part {
    velocity: Vector;
    lifetime: number;
    private initialLifetime: number;

    constructor({ name, color, size, velocity, lifetime }: { name?: string, color: string, size: number, velocity: Vector, lifetime: number }) {
        super({ name: name || 'Particle' });
        this.velocity = velocity;
        this.lifetime = lifetime;
        this.initialLifetime = lifetime;
        this.debugEmoji = "✨";

        this.addChild(new Transform());
        this.addChild(new ColorRender({ width: size, height: size, color }));
    }

    act() {
        super.act();
        const transform = this.sibling<Transform>("Transform");
        if (transform) {
            transform.position = transform.position.add(this.velocity);
        }
        this.lifetime--;
        if (this.lifetime <= 0) {
            this.parent?.removeChild(this);
        }

        // Fade out particle
        const colorRender = this.sibling<ColorRender>("ColorRender");
        if (colorRender) {
            const alpha = this.lifetime / this.initialLifetime;
            const currentColor = colorRender.color;
            // Assuming color is in rgba format for simplicity, or convert it.
            // For now, just a simple fade out by changing alpha if it's rgba
            if (currentColor.startsWith("rgba")) {
                const parts = currentColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d\.]+)\)/);
                if (parts) {
                    colorRender.color = `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha.toFixed(2)})`;
                }
            }
        }
    }
}

export class ParticleEmitter extends Part {
    particleColor: string;
    particleSize: number;
    particleSpeed: number;
    particleLifetime: number;
    emissionRate: number; // milliseconds between emissions
    maxParticles: number;
    private lastEmissionTime: number = 0;
    private emittedCount: number = 0;

    constructor({ name, particleColor = "#FFFFFF", particleSize = 5, particleSpeed = 2, particleLifetime = 60, emissionRate = 100, maxParticles = 100 }: { name?: string, particleColor?: string, particleSize?: number, particleSpeed?: number, particleLifetime?: number, emissionRate?: number, maxParticles?: number }) {
        super({ name: name || 'ParticleEmitter' });
        this.particleColor = particleColor;
        this.particleSize = particleSize;
        this.particleSpeed = particleSpeed;
        this.particleLifetime = particleLifetime;
        this.emissionRate = emissionRate;
        this.maxParticles = maxParticles;
        this.debugEmoji = "💨";
    }

    act() {
        super.act();
        const now = Date.now();
        if (this.emittedCount < this.maxParticles && now - this.lastEmissionTime >= this.emissionRate) {
            const transform = this.sibling<Transform>("Transform");
            if (transform) {
                const angle = Math.random() * Math.PI * 2; // Random direction
                const velocity = new Vector(Math.cos(angle) * this.particleSpeed, Math.sin(angle) * this.particleSpeed);
                const particle = new Particle({
                    color: this.particleColor,
                    size: this.particleSize,
                    velocity: velocity,
                    lifetime: this.particleLifetime
                });
                particle.sibling<Transform>("Transform")!.position = transform.worldPosition; // Set particle position to emitter position
                this.parent?.addChild(particle);
                this.emittedCount++;
                this.lastEmissionTime = now;
            }
        }
        this.hoverbug = `Emitted: ${this.emittedCount}`;
    }
}