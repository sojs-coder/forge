import type { Part } from "../../Parts/Part";

export interface GameNode {
    id: string;
    type: string;
    properties: Record<string, any>;
    children: GameNode[];
    expanded?: boolean;
    parent?: string | null; // Reference to the parent node
}

export interface NodeDefinition {
    properties: { name: PropertyDefinition } & Record<string, PropertyDefinition>;
    children?: string[];
    code?: string;
    singular?: boolean; // If true, this node can only have one instance in the parent
}

export interface PropertyDefinition {
    type: 'text' | 'number' | 'boolean' | 'Vector' | 'color' | 'Part' | 'list' | 'file' | 'enum';
    default?: any;
    description?: string; // Optional description for the property
    subType?: string; // For Part and list types
    fileType?: 'image' | 'audio' | 'video' | 'json'; // For 'file' type
    options?: string[]; // For 'enum' type
    dontShow?: boolean; // If true, this property won't be shown in the editor

}

export interface EditorState {
    ready: boolean;
    fileNames: Map<string, string>; // For file inputs, maps symbol to file name
    selectedNode: GameNode | null;
    currentGameInstance: Part | null; // Assuming Game extends Part
    isGamePaused: boolean;
    currentTab: 'game' | 'editor';
    selectedCustomNode: { type: string, category: string } | null;
    gameTree: GameNode;
    customNodeEditTimes: Record<string, number>;
}
