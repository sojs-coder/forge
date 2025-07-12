import type { EditorState, GameNode } from "./types.ts";

export const state: EditorState = {
    ready: false,
    selectedNode: null,
    currentGameInstance: null,
    isGamePaused: false,
    currentTab: 'game',
    selectedCustomNode: null,
    fileNames: new Map<string, string>(), // For file inputs, maps symbol to file name
    gameTree: {
        id: 'game_root',
        type: 'Game',
        properties: {
            name: 'MyGame',
            canvas: 'gamecanvas',
            width: 800,
            height: 600,
            devmode: true,
            disableAntiAliasing: false
        },
        children: []
    },
    customNodeEditTimes: {},
};

export function findNodeById(node: GameNode, id: string): GameNode | null {
    if (node.id === id) {
        return node;
    }
    if (node.children) {
        for (const child of node.children) {
            const found = findNodeById(child, id);
            if (found) {
                return found;
            }
        }
    }
    return null;
}

export function findParentNode(parentNode: GameNode, targetId: string): GameNode | null {
    if (parentNode.children) {
        for (const child of parentNode.children) {
            if (child.id === targetId) {
                return parentNode;
            }
            const found = findParentNode(child, targetId);
            if (found) {
                return found;
            }
        }
    }
    return null;
}
