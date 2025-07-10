import { Part } from "./Part";
import { GameObject } from "./GameObject";

export class Spawner extends Part {
    objectToSpawn: () => GameObject;
    spawnRate: number;
    maxSpawns: number;
    private spawnCount: number = 0;
    private lastSpawnTime: number = 0;

    constructor({ name, objectToSpawn, spawnRate, maxSpawns = Infinity }: { name?: string, objectToSpawn: () => GameObject, spawnRate: number, maxSpawns?: number }) {
        super({ name: name || 'Spawner' });
        this.objectToSpawn = objectToSpawn;
        this.spawnRate = spawnRate;
        this.maxSpawns = maxSpawns;
        this.debugEmoji = "🏭";
    }

    act() {
        super.act();
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