import type { Part } from "../../Parts/Part";

export interface GameNode {
    id: string;
    name: string;
    type: string;
    properties: Record<string, any>;
    children: GameNode[];
    expanded?: boolean;
}

export interface NodeDefinition {
    properties: Record<string, PropertyDefinition>;
    children?: string[];
    code?: string;
}

export interface PropertyDefinition {
    type: 'text' | 'number' | 'boolean' | 'Vector' | 'color' | 'Part' | 'list' | 'file';
    default?: any;
    description?: string; // Optional description for the property
    subType?: string; // For Part and list types
    fileType?: 'image' | 'audio' | 'video' | 'json'; // For 'file' type
}

export interface EditorState {
    ready: boolean;
    selectedNode: GameNode | null;
    currentGameInstance: Part | null; // Assuming Game extends Part
    isGamePaused: boolean;
    currentTab: 'game' | 'editor';
    selectedCustomNode: { type: string, category: string } | null;
    gameTree: GameNode;
    customNodeEditTimes: Record<string, number>;
}
