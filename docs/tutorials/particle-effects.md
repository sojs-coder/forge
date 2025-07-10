# Creating Particle Effects

This tutorial will guide you through creating various visual effects using the `ParticleEmitter` component, such as smoke, explosions, or magic trails.

## 1. Set up your Scene and Particle Emitter

First, ensure you have a `Game` and `Scene` set up. A `ParticleEmitter` needs a `GameObject` with a `Transform` to define where particles will be emitted from.

```javascript
import { Game } from './Parts/Game';
import { Scene } from './Parts/Scene';
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { ParticleEmitter } from './Parts/ParticleEmitter';
import { Vector } from './Math/Vector';

// 1. Create the Game instance (if you haven't already)
const myGame = new Game({
    name: 'ParticleDemo',
    canvas: 'game-canvas',
    width: 800,
    height: 600,
    devmode: true
});

// 2. Create a Scene
const mainScene = new Scene({ name: 'MainScene' });

// 3. Create a GameObject for the particle emitter
const smokeEmitter = new GameObject({ name: 'SmokeEmitter' });
smokeEmitter.addChildren(
    new Transform({ position: new Vector(400, 300) }), // Emitter position
    new ParticleEmitter({
        particleColor: 'rgba(100, 100, 100, 0.5)', // Grey, semi-transparent particles
        particleSize: 8,
        particleSpeed: 1,
        particleLifetime: 90, // Particles last for 90 frames
        emissionRate: 50, // Emit a particle every 50 milliseconds
        maxParticles: 500 // Max 500 particles at a time
    })
);

// 4. Add the emitter to the scene
mainScene.addChild(smokeEmitter);

// 5. Add the scene to the game and start
myGame.addChild(mainScene);
myGame.start(mainScene);
```

## 2. Customizing Particle Effects

The `ParticleEmitter` offers several properties to customize the appearance and behavior of your particle effects:

-   `particleColor`: The color of the emitted particles (any valid CSS color string).
-   `particleSize`: The size (width and height) of each square particle.
-   `particleSpeed`: How fast particles move after being emitted.
-   `particleLifetime`: How many frames each particle will exist before disappearing.
-   `emissionRate`: The interval (in milliseconds) between emitting new particles. A lower value means more frequent emissions.
-   `maxParticles`: The total number of particles that can be active at any given time from this emitter.

## 3. One-Shot Effects (e.g., Explosions)

For effects like explosions that happen once and then disappear, you can combine `ParticleEmitter` with a `Timer`.

```javascript
import { Timer } from './Parts/Timer';

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
                explosion.parent?.removeChild(explosion); // Remove the explosion GameObject after timer
            },
            repeats: false
        })
    );
    // Start the timer immediately after creation
    explosion.sibling<Timer>('Timer')?.start();
    return explosion;
}

// Example usage (e.g., when an enemy is destroyed):
// mainScene.addChild(createExplosion(new Vector(200, 200)));
```