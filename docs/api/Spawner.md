# Spawner

**Extends:** [Part](./Part.md)

The `Spawner` component is used to automatically create and add `GameObject`s to the game world at a specified rate. It's ideal for generating enemies, collectibles, or environmental elements.

## Properties

-   `objectToSpawn: () => GameObject`
    A function that returns a new `GameObject` instance to be spawned. This function will be called each time a new object needs to be created.

-   `spawnRate: number`
    The time in milliseconds between each spawn event. Defaults to `1000` (1 second).

-   `maxSpawns: number`
    The maximum number of objects this spawner will create. Set to `Infinity` for continuous spawning. Defaults to `10`.

## How it Works

The `Spawner` component periodically calls the `objectToSpawn` function and adds the returned `GameObject` as a child to its own parent. This means if the `Spawner` is on a `Layer`, the spawned objects will also be added to that `Layer`.

## Examples

### Spawning Enemies Periodically

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { Spawner } from './Parts/Spawner';
import { Vector } from './Math/Vector';

// Function to create a new enemy GameObject
function createEnemy(position: Vector) {
    const enemy = new GameObject({ name: 'Enemy' });
    enemy.addChildren(
        new Transform({ position: position }),
        new SpriteRender({
            imageSource: './assets/enemy.png',
            width: 32,
            height: 32
        })
        // Add other enemy components like Health, AI, etc.
    );
    return enemy;
}

const enemySpawner = new GameObject({ name: 'EnemySpawner' });
enemySpawner.addChildren(
    new Spawner({
        objectToSpawn: () => createEnemy(new Vector(800, Math.random() * 500 + 50)), // Spawn off-screen right
        spawnRate: 2000, // Spawn every 2 seconds
        maxSpawns: Infinity // Keep spawning indefinitely
    })
);

myScene.addChild(enemySpawner);
```

### Spawning a Limited Number of Collectibles

```javascript
import { GameObject } from './Parts/GameObject';
import { Transform } from './Parts/Children/Transform';
import { SpriteRender } from './Parts/Children/SpriteRender';
import { Spawner } from './Parts/Spawner';
import { Vector } from './Math/Vector';

function createCoin(position: Vector) {
    const coin = new GameObject({ name: 'Coin' });
    coin.addChildren(
        new Transform({ position: position }),
        new SpriteRender({
            imageSource: './assets/coin.png',
            width: 20,
            height: 20
        })
    );
    return coin;
}

const coinSpawner = new GameObject({ name: 'CoinSpawner' });
coinSpawner.addChildren(
    new Spawner({
        objectToSpawn: () => createCoin(new Vector(Math.random() * 700 + 50, Math.random() * 500 + 50)),
        spawnRate: 500, // Spawn every 0.5 seconds
        maxSpawns: 10 // Only spawn 10 coins
    })
);

myScene.addChild(coinSpawner);
```