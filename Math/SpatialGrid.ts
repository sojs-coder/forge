
import type { Collider } from '../Parts/Children/Collider';
import type { Vector } from './Vector';

export class SpatialGrid {
    private cells: Map<string, Collider[]>;
    private cellSize: number;

    constructor(cellSize: number) {
        this.cells = new Map();
        this.cellSize = cellSize;
    }

    private getKey(x: number, y: number): string {
        return `${Math.floor(x / this.cellSize)}_${Math.floor(y / this.cellSize)}`;
    }

    clear() {
        this.cells.clear();
    }

    insert(collider: Collider) {
        const start = collider.realWorldStart;
        const end = collider.realWorldEnd;

        const startX = Math.floor(start.x / this.cellSize);
        const startY = Math.floor(start.y / this.cellSize);
        const endX = Math.floor(end.x / this.cellSize);
        const endY = Math.floor(end.y / this.cellSize);

        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                const key = `${x}_${y}`;
                if (!this.cells.has(key)) {
                    this.cells.set(key, []);
                }
                this.cells.get(key)!.push(collider);
            }
        }
    }

    query(collider: Collider): Collider[] {
        const candidates = new Set<Collider>();
        const start = collider.realWorldStart;
        const end = collider.realWorldEnd;

        const startX = Math.floor(start.x / this.cellSize);
        const startY = Math.floor(start.y / this.cellSize);
        const endX = Math.floor(end.x / this.cellSize);
        const endY = Math.floor(end.y / this.cellSize);

        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                const key = `${x}_${y}`;
                if (this.cells.has(key)) {
                    for (const other of this.cells.get(key)!) {
                        candidates.add(other);
                    }
                }
            }
        }
        return Array.from(candidates);
    }
}
