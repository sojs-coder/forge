import { nodeDefinitions } from "./definitions.ts";
import { exportSaveFile, importSaveFile } from "./exporter.ts";
import { state } from "./state.ts";
import { updateTreeDisplay } from "./tree.ts";

const gameTab = document.getElementById('game-tab')!;
const editorTab = document.getElementById('editor-tab')!;
const gameContainer = document.getElementById('game-container')!;
const nodeEditorContainer = document.getElementById('node-editor-container')!;
const treeView = document.getElementById('tree-view')!;
const customNodesList = document.getElementById('custom-nodes-list')!;
const addNodeButton = document.getElementById('add-node-button')!;
const saveButton = document.getElementById('save-button')! as HTMLButtonElement;
const loadButton = document.getElementById('load-button')! as HTMLButtonElement;

export function setupUI(editor: any) {
    gameTab.addEventListener('click', () => switchTab('game', editor));
    editorTab.addEventListener('click', () => switchTab('editor', editor));
    switchTab('game', editor); // Initial state
}

export function switchTab(tab: 'game' | 'editor', editor: any) {
    state.currentTab = tab;
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    if (tab === 'game') {
        gameTab.classList.add('active');
        gameContainer.classList.add('active');
        treeView.classList.remove('hidden');
        customNodesList.classList.remove('active');
        addNodeButton.style.display = 'block';
    } else {
        editorTab.classList.add('active');
        nodeEditorContainer.classList.add('active');
        treeView.classList.add('hidden');
        customNodesList.classList.add('active');
        addNodeButton.style.display = 'none';
        if (editor) {
            setTimeout(() => editor.refresh(), 10);
        }
    }
}

saveButton.addEventListener('click', () => {
    console.log("Saving game state...");
    exportSaveFile(state.gameTree, nodeDefinitions);
});

loadButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.fesave';
    input.onchange = async (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            try {
                const { gameTree, nodeDefinitions: loadedNodeDefinitions } = await importSaveFile(file);
                state.gameTree = gameTree;
                updateTreeDisplay();
                Object.assign(nodeDefinitions, loadedNodeDefinitions);
                console.log("Game state loaded successfully.");
            } catch (error) {
                console.error("Error loading game state:", error);
            }
        }
    };
    input.click();
});

