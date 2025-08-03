import type { Vector } from "./Math/Vector";
import type { Camera } from "./Parts/Camera";
import { BoxCollider } from "./Parts/Children/BoxCollider";
import type { PolygonCollider } from "./Parts/Children/PolygonCollider";
import { Transform } from "./Parts/Children/Transform";
import type { Part } from "./Parts/Part";
import type { SpriteSheetData } from "./types";

export function generateUID(): string {
    return Math.random().toString(36).substr(2, 9);
}

export function drawBox(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string = "black") {
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, width, height);
}

export function applyCamera(context: CanvasRenderingContext2D, camera: Camera) {
    const view = camera.getViewMatrix();
    context.save();
    context.translate(context.canvas.width / 2, context.canvas.height / 2); // Move origin to center of canvas
    context.translate(view.offset.x, view.offset.y); // Apply camera's inverse world position
    context.scale(view.scale.x, view.scale.y); // Apply camera's zoom
}

export function resetCamera(context: CanvasRenderingContext2D) {
    context.restore();
}

/**
 * @param tpJson Texture Packer JSON data
 * @description Converts Texture Packer JSON data to a format compatible with the SpriteSheetData interface. When exporting with TexturePacker, ensure to use the "JSON Array" format, and check the "prepend folder name" box to separate animations.
 * @returns SpriteSheetData
 */
export function convertTexturePackerToSpriteSheetData(tpJson: any): SpriteSheetData {
    const result: SpriteSheetData = {
        frames: [],
        meta: {
            image: tpJson.meta.image,
            size: {
                w: tpJson.meta.size.w,
                h: tpJson.meta.size.h,
            },
            animations: {},
        },
    };

    for (const frameData of tpJson.frames) {
        const { filename, frame } = frameData;

        // Add to frames list
        result.frames.push({
            filename: filename.split("/").pop() || filename, // Use the last part of the filename
            duration: frameData.duration || 100, // Optional duration for each frame
            frame: {
                x: frame.x,
                y: frame.y,
                w: frame.w,
                h: frame.h,
            },
            rotated: frameData.rotated || false,
            trimmed: frameData.trimmed || false,
            spriteSourceSize: frameData.spriteSourceSize,
            sourceSize: frameData.sourceSize,
        });

        // Extract animation name from folder (e.g., "walk")
        const [animationName, frameName] = filename.split("/");

        // Initialize animation entry if it doesn't exist
        if (!result.meta.animations[animationName]) {
            result.meta.animations[animationName] = { frames: [] };
        }

        // Add this frame to the animation group
        result.meta.animations[animationName].frames.push(frameName);
    }

    // Optionally, pick the first animation as the default
    const animationNames = Object.keys(result.meta.animations);
    if (animationNames.length > 0) {
        result.meta.startingAnimation = animationNames[0];
        result.meta.startingFrame = result.meta.animations[animationNames[0]].frames[0];
    }

    return result;
}

export function getDebugInfo(part: any, depth: number): string {
    if (!part || !part.childrenArray || part.childrenArray.length === 0) {
        return "";
    }
    let info = depth == 0 ? `${part.name} (${part.id})<br>` : "";
    const indent = "--".repeat(depth);
    part.childrenArray.forEach((child: any) => {
        info += `${indent}${child.name} (${child.id}): ${child.hoverbug || ""}<br>`;
        if (child.childrenArray && child.childrenArray.length > 0) {
            info += getDebugInfo(child, depth + 1);
        }
    });
    return info;
}
export function isPointInPolygon(pointX: number, pointY: number, polygonVertices: Vector[]): boolean {
    let inside = false;
    for (let i = 0, j = polygonVertices.length - 1; i < polygonVertices.length; j = i++) {
        const xi = polygonVertices[i].x, yi = polygonVertices[i].y;
        const xj = polygonVertices[j].x, yj = polygonVertices[j].y;

        const intersect = ((yi > pointY) !== (yj > pointY)) &&
            (pointX < (xj - xi) * (pointY - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}
export function isPointInObject(mouseX: number, mouseY: number, child: Part): boolean {
    const transform = child.child<Transform>("Transform");
    if (!transform) {
        console.warn(`Part <${child.name}> requires a Transform child.`);
        return false;
    }
    const position = transform.worldPosition;

    const boxCollider = child.child<BoxCollider>("BoxCollider");
    const polygonCollider = child.child<PolygonCollider>("PolygonCollider");
    let width, height, centerX, centerY;

    if (boxCollider && boxCollider.start && boxCollider.end) {
        // Use BoxCollider dimensions and offset
        const scaledStart = boxCollider.start.multiply(transform.scale);
        const scaledEnd = boxCollider.end.multiply(transform.scale);
        width = scaledEnd.x - scaledStart.x;
        height = scaledEnd.y - scaledStart.y;
        // BoxCollider center relative to position
        const offsetX = (scaledStart.x + scaledEnd.x) / 2;
        const offsetY = (scaledStart.y + scaledEnd.y) / 2;
        centerX = position.x + offsetX;
        centerY = position.y + offsetY;
    } else if (polygonCollider) {
        // For polygon colliders, the position is already the center
        // We use the AABB of the polygon for initial broad-phase check
        width = polygonCollider.realWorldEnd.x - polygonCollider.realWorldStart.x;
        height = polygonCollider.realWorldEnd.y - polygonCollider.realWorldStart.y;
        centerX = (polygonCollider.realWorldStart.x + polygonCollider.realWorldEnd.x) / 2;
        centerY = (polygonCollider.realWorldStart.y + polygonCollider.realWorldEnd.y) / 2;

        // For rotated polygons, perform a point-in-polygon test
        if (transform.rotation !== 0) {
            return isPointInPolygon(mouseX, mouseY, polygonCollider.worldVertices);
        }
    } else if ((child as any).width && (child as any).height) {
        // Check for width/height properties (e.g., AnimatedSprite, SpriteRender)
        // These are rendered centered at position + width/2, height/2
        width = (child as any).width * transform.scale.x;
        height = (child as any).height * transform.scale.y;
        centerX = position.x;
        centerY = position.y;
    } else {
        // Fall back to superficial dimensions
        width = (child?.superficialWidth || 50) * transform.scale.x;
        height = (child?.superficialHeight || 50) * transform.scale.y;
        centerX = position.x;
        centerY = position.y;
    }

    if (transform.rotation === 0) {
        const left = centerX - width / 2;
        const top = centerY - height / 2;
        return mouseX >= left && mouseX <= left + width && mouseY >= top && mouseY <= top + height;
    } else if (boxCollider) { // Only apply rotated box logic if it's a BoxCollider
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        const corners = [
            { x: -halfWidth, y: -halfHeight },
            { x: halfWidth, y: -halfHeight },
            { x: halfWidth, y: halfHeight },
            { x: -halfWidth, y: halfHeight },
        ];

        const cos = Math.cos(transform.rotation);
        const sin = Math.sin(transform.rotation);

        const rotatedCorners = corners.map(corner => {
            const rotatedX = corner.x * cos - corner.y * sin;
            const rotatedY = corner.x * sin + corner.y * cos;
            return {
                x: centerX + rotatedX,
                y: centerY + rotatedY
            };
        });

        // Point-in-polygon test
        let inside = false;
        for (let i = 0, j = rotatedCorners.length - 1; i < rotatedCorners.length; j = i++) {
            if (((rotatedCorners[i].y > mouseY) !== (rotatedCorners[j].y > mouseY)) &&
                (mouseX < (rotatedCorners[j].x - rotatedCorners[i].x) * (mouseY - rotatedCorners[i].y) / (rotatedCorners[j].y - rotatedCorners[i].y) + rotatedCorners[i].x)) {
                inside = !inside;
            }
        }
        return inside;
    }
    return false;
}

// require("fs").writeFileSync("monster.json", JSON.stringify(convertTexturePackerToSpriteSheetData({"frames": [

// {
// 	"filename": "idle/idle-0",
// 	"frame": {"x":100,"y":1,"w":17,"h":26},
// 	"rotated": false,
// 	"trimmed": false,
// 	"spriteSourceSize": {"x":0,"y":0,"w":17,"h":26},
// 	"sourceSize": {"w":17,"h":26}
// },
// {
// 	"filename": "idle/idle-1",
// 	"frame": {"x":21,"y":1,"w":17,"h":27},
// 	"rotated": false,
// 	"trimmed": false,
// 	"spriteSourceSize": {"x":0,"y":0,"w":17,"h":27},
// 	"sourceSize": {"w":17,"h":27}
// },
// {
// 	"filename": "idle/idle-2",
// 	"frame": {"x":1,"y":1,"w":18,"h":27},
// 	"rotated": false,
// 	"trimmed": false,
// 	"spriteSourceSize": {"x":0,"y":0,"w":18,"h":27},
// 	"sourceSize": {"w":18,"h":27}
// },
// {
// 	"filename": "idle/idle-3",
// 	"frame": {"x":78,"y":1,"w":20,"h":26},
// 	"rotated": false,
// 	"trimmed": false,
// 	"spriteSourceSize": {"x":0,"y":0,"w":20,"h":26},
// 	"sourceSize": {"w":20,"h":26}
// },
// {
// 	"filename": "walk/walk-0",
// 	"frame": {"x":177,"y":1,"w":17,"h":25},
// 	"rotated": false,
// 	"trimmed": false,
// 	"spriteSourceSize": {"x":0,"y":0,"w":17,"h":25},
// 	"sourceSize": {"w":17,"h":25}
// },
// {
// 	"filename": "walk/walk-1",
// 	"frame": {"x":119,"y":1,"w":17,"h":26},
// 	"rotated": false,
// 	"trimmed": false,
// 	"spriteSourceSize": {"x":0,"y":0,"w":17,"h":26},
// 	"sourceSize": {"w":17,"h":26}
// },
// {
// 	"filename": "walk/walk-2",
// 	"frame": {"x":40,"y":1,"w":17,"h":27},
// 	"rotated": false,
// 	"trimmed": false,
// 	"spriteSourceSize": {"x":0,"y":0,"w":17,"h":27},
// 	"sourceSize": {"w":17,"h":27}
// },
// {
// 	"filename": "walk/walk-3",
// 	"frame": {"x":157,"y":1,"w":18,"h":25},
// 	"rotated": false,
// 	"trimmed": false,
// 	"spriteSourceSize": {"x":0,"y":0,"w":18,"h":25},
// 	"sourceSize": {"w":18,"h":25}
// },
// {
// 	"filename": "walk/walk-4",
// 	"frame": {"x":138,"y":1,"w":17,"h":26},
// 	"rotated": false,
// 	"trimmed": false,
// 	"spriteSourceSize": {"x":0,"y":0,"w":17,"h":26},
// 	"sourceSize": {"w":17,"h":26}
// },
// {
// 	"filename": "walk/walk-5",
// 	"frame": {"x":59,"y":1,"w":17,"h":27},
// 	"rotated": false,
// 	"trimmed": false,
// 	"spriteSourceSize": {"x":0,"y":0,"w":17,"h":27},
// 	"sourceSize": {"w":17,"h":27}
// }],
// "meta": {
// 	"app": "https://www.codeandweb.com/texturepacker",
// 	"version": "1.0",
// 	"image": "sprite_test.png",
// 	"format": "RGBA8888",
// 	"size": {"w":195,"h":29},
// 	"scale": "1",
// 	"smartupdate": "$TexturePacker:SmartUpdate:a644d106dc7284a35edd312ffb5969fa:6d80dcba90cb53bd0891529221374b5c:e2c998ad5b48a6da356a9a84831ec759$"
// }
// }) as SpriteSheetData, null, 4));