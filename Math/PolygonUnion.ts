import * as polygonClipping from 'polygon-clipping';
import { Vector } from './Vector';

/**
 * Unions an array of polygons (each a Vector[]) and returns an array of resulting polygons (Vector[][]).
 * Always returns Vector[][], even for empty or single input.
 */
export function unionPolygons(polygons: Vector[][]): Vector[][] {
    if (polygons.length === 0) return [];
    if (polygons.length === 1) return [polygons[0]];
    try {
        const convertedPolygons: polygonClipping.Polygon[] = polygons.map(polygon => {
            const coords = polygon.map(vertex => vertex.toArray());
            if (coords.length > 0) {
                const first = coords[0];
                const last = coords[coords.length - 1];
                if (first[0] !== last[0] || first[1] !== last[1]) {
                    coords.push([first[0], first[1]]);
                }
            }
            return [coords];
        });
        let result: polygonClipping.MultiPolygon = [convertedPolygons[0]];
        for (let i = 1; i < convertedPolygons.length; i++) {
            result = polygonClipping.union(result, [convertedPolygons[i]]);
            if (!result || result.length === 0) {
                console.warn('Union operation resulted in empty geometry at step', i);
                return [];
            }
        }
        if (!result || result.length === 0) {
            return [];
        }
        // Convert all resulting polygons to Vector[][]
        return result.map(polygon => {
            const coords = polygon[0];
            let vectors = coords.map((coord: number[]) => new Vector(coord[0], coord[1]));
            if (vectors.length > 1) {
                const first = vectors[0];
                const last = vectors[vectors.length - 1];
                if (first.x === last.x && first.y === last.y) {
                    vectors = vectors.slice(0, -1);
                }
            }
            return vectors;
        });
    } catch (error) {
        console.error('Error during polygon union:', error);
        // Fallback: return all input polygons
        return polygons;
    }
}

// Helper function to calculate polygon area from coordinate array
function calculatePolygonArea(coords: number[][]): number {
    if (coords.length < 3) return 0;
    let area = 0;
    for (let i = 0; i < coords.length; i++) {
        const j = (i + 1) % coords.length;
        area += coords[i][0] * coords[j][1];
        area -= coords[j][0] * coords[i][1];
    }
    return Math.abs(area) / 2;
}