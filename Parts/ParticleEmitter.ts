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

        this.addChild(new Transform({
            position: Vector.From(0),
            rotation: 0,
            scale: Vector.From(1)
        }));
        this.addChild(new ColorRender({ width: size, height: size, color }));
    }
    destroy(): void {
        super.destroy();
        this.velocity = Vector.From(0); // Reset velocity
        this.lifetime = 0;
    }

    act(delta: number) {
        super.act(delta);
        const transform = this.child<Transform>("Transform");
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
    range: number[]; // Range in 2Pi for emission direction
    private particles: Particle[] = [];
    private lastEmissionTime: number = 0;
    private emittedCount: number = 0;

    constructor({ range, particleColor = "#FFFFFF", particleSize = 5, particleSpeed = 2, particleLifetime = 60, emissionRate = 100, maxParticles = 100 }: { range?: number[], particleColor?: string, particleSize?: number, particleSpeed?: number, particleLifetime?: number, emissionRate?: number, maxParticles?: number }) {
        super({ name: 'ParticleEmitter' });
        this.particleColor = particleColor;
        this.particleSize = particleSize;
        this.particleSpeed = particleSpeed;
        this.particleLifetime = particleLifetime;
        this.emissionRate = emissionRate;
        this.maxParticles = maxParticles;
        this.range = range || [0, 6.283185307179586]; // Default to 1 radian range
        this.debugEmoji = "💨";
        this.type = 'ParticleEmitter';
    }
    clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        const clonedEmitter = new ParticleEmitter({
            range: this.range,
            particleColor: this.particleColor,
            particleSize: this.particleSize,
            particleSpeed: this.particleSpeed,
            particleLifetime: this.particleLifetime,
            emissionRate: this.emissionRate,
            maxParticles: this.maxParticles
        });

        memo.set(this, clonedEmitter);

        this._cloneProperties(clonedEmitter, memo);

        // Reset properties that need re-initialization after construction
        clonedEmitter.lastEmissionTime = 0;
        clonedEmitter.emittedCount = 0;
        clonedEmitter.particles = []; // Clear particles, they will be re-emitted

        return clonedEmitter as this;
    }
    onMount(parent: Part) {
        super.onMount(parent);
        if (this.top?.devmode) parent.addChild(new ColorRender({ width: 100, height: 100, color: "rgba(255, 255, 255, 0.5)" }));
    }
    destroy(): void {
        super.destroy();
        // Clean up particles
        this.particles = [];
        this.lastEmissionTime = 0;
        this.emittedCount = 0;
    }
    act(delta: number) {
        super.act(delta);
        const now = Date.now();
        if (this.particles.length < this.maxParticles && now - this.lastEmissionTime >= this.emissionRate) {
            const transform = this.sibling<Transform>("Transform");
            if (transform) {
                const angle = Math.random() * (this.range[1] - this.range[0]) + this.range[0]; // Random direction
                const velocity = new Vector(Math.cos(angle) * this.particleSpeed, Math.sin(angle) * this.particleSpeed);
                const particle = new Particle({
                    name: `Particle-${this.emittedCount}`,
                    color: this.particleColor,
                    size: this.particleSize,
                    velocity: velocity,
                    lifetime: this.particleLifetime
                });
                this.addChild(particle);
                particle.child<Transform>("Transform")!.position = transform.position.clone(); // Start at emitter's position
                this.emittedCount++;
                this.lastEmissionTime = now;
            }
        }
        this.hoverbug = `Emitted: ${this.emittedCount}`;
    }
}