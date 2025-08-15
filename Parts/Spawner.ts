import { Part } from "./Part";
import { GameObject } from "./GameObject";

export class Spawner extends Part {
    objectToSpawn: () => GameObject;
    spawnRate: number;
    maxSpawns: number;
    private spawnCount: number = 0;
    private lastSpawnTime: number = 0;

    constructor({ objectToSpawn, spawnRate, maxSpawns = Infinity }: { objectToSpawn: () => GameObject, spawnRate: number, maxSpawns?: number }) {
        super({ name: 'Spawner' });
        this.objectToSpawn = objectToSpawn;
        this.spawnRate = spawnRate;
        this.maxSpawns = maxSpawns;
        this.debugEmoji = "🏭";
        this.type = "Spawner";
    }

    clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        const clonedSpawner = new Spawner({
            objectToSpawn: this.objectToSpawn,
            spawnRate: this.spawnRate,
            maxSpawns: this.maxSpawns
        });

        memo.set(this, clonedSpawner);

        this._cloneProperties(clonedSpawner, memo);

        // Reset properties that need re-initialization after construction
        clonedSpawner.spawnCount = 0;
        clonedSpawner.lastSpawnTime = 0;

        return clonedSpawner as this;
    }

    act(delta: number) {
        super.act(delta);
        const now = Date.now();
        if (this.spawnCount < this.maxSpawns && now - this.lastSpawnTime >= this.spawnRate) {
            const newObject = this.objectToSpawn();
            this.parent?.addChild(newObject);
            this.spawnCount++;
            this.lastSpawnTime = now;
        }
        this.hoverbug = `${this.spawnCount}/${this.maxSpawns}`;
    }
}