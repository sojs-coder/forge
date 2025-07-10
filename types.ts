export interface SpriteSheetData {
    frames: Array<{
        filename: string; // Name of the frame
        frame: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
        rotated?: boolean;
        trimmed?: boolean;
        spriteSourceSize?: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
        sourceSize?: {
            w: number;
            h: number;
        };
        duration?: number; // Optional duration for each frame (in milliseconds)
    }>;
    meta: {
        image: string; // Path to the spritesheet image
        size: {
            w: number; // Width of the spritesheet
            h: number; // Height of the spritesheet
        };
        startingAnimation?: string; // Optional property to specify the starting animation
        startingFrame?: string; // Optional property to specify the starting frame
        animations: {
            [animationName: string]: {
                frames: string[]; // Array of frame names for this animation
                loop?: boolean; // Optional property to indicate if the animation should loop
                bounce?: boolean; // Optional property to indicate if the animation should bounce
            };
        }; // Optional property to define animations by frame names
    }
}

export interface ButtonStyle {
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    backgroundColor?: string;
    color?: string;
    font?: string;
    width?: number;
    height?: number;
}
export interface ButtonStyles {
    default?: ButtonStyle;
    hover?: ButtonStyle;
    active?: ButtonStyle;
}