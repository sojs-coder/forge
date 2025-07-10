# ParticleEmitter

**Extends:** [Part](./Part.md)

The `ParticleEmitter` component creates and manages a system of small, temporary visual elements (particles) for effects like explosions, smoke, dust, or magic spells. It emits simple colored square particles.

## Properties

-   `particleColor: string`
    The CSS color string for the particles. Defaults to `"#FFFFFF"` (white).

-   `particleSize: number`
    The width and height of each square particle in pixels. Defaults to `5`.

-   `particleSpeed: number`
    The maximum speed at which particles are emitted. Particles are emitted in random directions. Defaults to `2`.

-   `particleLifetime: number`
    The number of frames each particle will exist before being removed. Defaults to `60`.

-   `emissionRate: number`
    The delay in milliseconds between each particle emission. Defaults to `100`.

-   `maxParticles: number`
    The maximum number of particles that can be emitted by this emitter. Defaults to `100`.

## How it Works

The `ParticleEmitter` continuously creates new `Particle` objects (internal to the `ParticleEmitter` class) and adds them as children to its parent. Each `Particle` has its own `Transform` and `ColorRender` component. Particles move in a random direction, fade out over their `lifetime`, and are automatically removed when their `lifetime` expires.

## Examples

### Creating a Simple Smoke Emitter

This example shows how to create a continuous smoke effect at a specific position.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { ParticleEmitter } from './Parts/ParticleEmitter';
import { Vector } from './Math/Vector';

const smokeEmitter = new GameObject({ name: 'SmokeEmitter' });

smokeEmitter.addChildren(
    new Transform({ position: new Vector(100, 100) }),
    new ParticleEmitter({
        particleColor: 'rgba(100, 100, 100, 0.5)', // Grey, semi-transparent
        particleSize: 8,
        particleSpeed: 1,
        particleLifetime: 90, // Last longer
        emissionRate: 50, // Emit more frequently
        maxParticles: 500
    })
);

myLayer.addChild(smokeEmitter);
```

### Triggering a One-Shot Explosion Effect

To create a one-shot effect like an explosion, you would typically create the `ParticleEmitter` `GameObject` and then remove it after a short delay or when its `maxParticles` limit is reached.

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { ParticleEmitter } from './Parts/ParticleEmitter';
import { Timer } from './Parts/Timer'; // Assuming you have a Timer part
import { Vector } from './Math/Vector';

function createExplosion(position: Vector) {
    const explosion = new GameObject({ name: 'Explosion' });
    explosion.addChildren(
        new Transform({ position: position }),
        new ParticleEmitter({
            particleColor: 'orange',
            particleSize: 15,
            particleSpeed: 5,
            particleLifetime: 30,
            emissionRate: 10, // Rapid burst
            maxParticles: 50 // Limited number of particles
        }),
        new Timer({
            duration: 500, // Emitter active for 0.5 seconds
            onComplete: () => {
                explosion.parent?.removeChild(explosion); // Remove the explosion GameObject
            },
            repeats: false
        })
    );
    // Start the timer immediately
    explosion.sibling<Timer>('Timer')?.start();
    return explosion;
}

// Example usage:
// myLayer.addChild(createExplosion(new Vector(400, 300)));
```