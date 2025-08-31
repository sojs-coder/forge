/**
 * @author Peter Kelley
 * @author pgkelley4@gmail.com
 */

import type { Vector } from "./Vector";

/**
 * See if two line segments intersect. This uses the 
 * vector cross product approach described below:
 * http://stackoverflow.com/a/565282/786339
 * 
 * @param {Object} p point object with x and y coordinates
 *  representing the start of the 1st line.
 * @param {Object} p2 point object with x and y coordinates
 *  representing the end of the 1st line.
 * @param {Object} q point object with x and y coordinates
 *  representing the start of the 2nd line.
 * @param {Object} q2 point object with x and y coordinates
 *  representing the end of the 2nd line.
 */

export interface Point {
	x: number;
	y: number;
}

export function getLineSegmentsIntersection(p1: Vector, p2: Vector, p3: Vector, p4: Vector): Point | null {
    const d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);

    if (d === 0) {
        // Lines are parallel or collinear
        return null; // For now, we don't handle collinear intersections
    }

    const t = ((p3.x - p1.x) * (p4.y - p3.y) - (p3.y - p1.y) * (p4.x - p3.x)) / d;
    const u = -((p1.x - p3.x) * (p2.y - p1.y) - (p1.y - p3.y) * (p2.x - p1.x)) / d;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
            x: p1.x + t * (p2.x - p1.x),
            y: p1.y + t * (p2.y - p1.y),
        };
    }

    return null;
}

/**
 * Calculate the cross product of the two points.
 * 
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 * 
 * @return the cross product result as a float
 */
function crossProduct(point1: Point, point2: Point): number {
	return point1.x * point2.y - point1.y * point2.x;
}

/**
 * Subtract the second point from the first.
 * 
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 * 
 * @return the subtraction result as a point object
 */ 
function subtractPoints(point1: Point, point2: Point): Point {
    return {
        x: point1.x - point2.x,
        y: point1.y - point2.y
    }
}

/**
 * See if the points are equal.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return if the points are equal
 */
function equalPoints(point1: Point, point2: Point): boolean {
	return (point1.x == point2.x) && (point1.y == point2.y)
}

/**
 * See if all arguments are equal.
 *
 * @param {...} args arguments that will be compared by '=='.
 *
 * @return if all arguments are equal
 */
function allEqual(...args: any[]): boolean {
	var firstValue = args[0],
		i;
	for (i = 1; i < args.length; i += 1) {
		if (args[i] != firstValue) {
			return false;
		}
	}
	return true;
}



/** Modifications by @sojs-coder
 * 
 * 
 * - Type annotation
 *
 */