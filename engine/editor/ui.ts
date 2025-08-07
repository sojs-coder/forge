import { updateCustomNodesList } from "./customNodes.ts";
import { nodeDefinitions } from "./definitions.ts";
import { exportSaveFile, importSaveFile } from "./exporter.ts";
import { state } from "./state.ts";
import { updateTreeDisplay } from "./tree.ts";
import { initializePartLibrary } from './partLibrary.ts';

const gameTab = document.getElementById('game-tab')!;
const editorTab = document.getElementById('editor-tab')!;
const gameContainer = document.getElementById('game-container')!;
const nodeEditorContainer = document.getElementById('node-editor-container')!;
const treeView = document.getElementById('tree-view')!;
const customNodesList = document.getElementById('custom-nodes-list')!;
const addNodeButton = document.getElementById('add-node-button')!;
const saveButton = document.getElementById('save-button')! as HTMLButtonElement;
const loadButton = document.getElementById('load-button')! as HTMLButtonElement;
const playButton = document.getElementById('play-button')! as HTMLButtonElement;
const pauseButton = document.getElementById('pause-button')! as HTMLButtonElement;
const stopButton = document.getElementById('stop-button')! as HTMLButtonElement;

const expandEditorButton = document.getElementById('expand-editor-button')! as HTMLButtonElement;

let isEditorExpanded = false;

export function setupUI(editor: any) {
    initializePartLibrary();
    gameTab.addEventListener('click', () => switchTab('game', editor));
    editorTab.addEventListener('click', () => switchTab('editor', editor));
    expandEditorButton.addEventListener('click', () => toggleEditorExpansion());
    switchTab('game', editor); // Initial state

    document.addEventListener('keydown', (event) => {
        // Alt + A: Add Node
        if (event.altKey && event.key === 'a') {
            event.preventDefault();
            addNodeButton.click();
        }
        // Alt + P: Play/Pause
        if (event.altKey && event.key === 'p') {
            event.preventDefault();
            if (!state.currentGameInstance) {
                playButton.click();
            } else {
                pauseButton.click();
            }
        }
        // Alt + S: Stop
        if (event.altKey && event.key === 's') {
            event.preventDefault();
            stopButton.click();
        }
        // Ctrl + S: Save
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            saveButton.click();
        }
        // Ctrl + L: Load
        if (event.ctrlKey && event.key === 'l') {
            event.preventDefault();
            loadButton.click();
        }
        // Alt + N: Node Editor
        if (event.altKey && event.key === 'n') {
            event.preventDefault();
            editorTab.click();
        }
        // Alt + /: Show Keybinds
        if (event.altKey && event.key === '/') {
            event.preventDefault();
            showKeybindsAsTable();
        }
        // Alt + F: Focus Selected Node
        if (event.altKey && event.key === 'f') {
            event.preventDefault();
            if (state.selectedNode) {
                const nodeElement = document.querySelector(`[data-node-id="${state.selectedNode.id}"]`);
                nodeElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

function toggleEditorExpansion() {
    isEditorExpanded = !isEditorExpanded;
    if (isEditorExpanded) {
        nodeEditorContainer.classList.add('expanded');
        gameContainer.style.display = 'none';
        const canvas = document.getElementById('gamecanvas');
        if (canvas) canvas.style.display = 'none';
        expandEditorButton.innerHTML = '&#x25BC;'; // Down arrow
    } else {
        nodeEditorContainer.classList.remove('expanded');
        gameContainer.style.display = 'flex'; // Restore original display
        const canvas = document.getElementById('gamecanvas');
        if (canvas) canvas.style.display = 'block';
        expandEditorButton.innerHTML = '&#x25B2;'; // Up arrow
    }
}

function showKeybinds() {
    const keybinds = [
        "Alt + A: Add Node",
        "Alt + P: Play/Pause Game",
        "Alt + S: Stop Game",
        "Ctrl + S: Save Project",
        "Ctrl + L: Load Project",
        "Alt + N: Switch to Node Editor",
        "Alt + /: Show Keybinds List",
        "Alt + F: Focus Selected Node",
        "Delete: Delete Selected Node",
        "Arrow Keys (Tree View): Navigate Nodes",
        "Enter (Add Node Popup): Select Node",
        "Arrow Keys (Add Node Popup): Navigate Options"
    ];
    alert("Keybinds:\n\n" + keybinds.join("\n"));
}

function showKeybindsAsTable() {
    const keybinds = {
        "Alt + A": "Add Node",
        "Alt + P": "Play/Pause Game",
        "Alt + S": "Stop Game",
        "Ctrl + S": "Save Project",
        "Ctrl + L": "Load Project",
        "Alt + N": "Switch to Node Editor",
        "Alt + /": "Show Keybinds List",
        "Alt + F": "Focus Selected Node",
        "Delete": "Delete Selected Node",
        "Arrow Keys (Tree View)": "Navigate Nodes",
        "Enter (Add Node Popup)": "Select Node",
        "Arrow Keys (Add Node Popup)": "Navigate Options"
    };
    alert(keybinds);
}

export function switchTab(tab: 'game' | 'editor', editor?: any) {
    state.currentTab = tab;
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    if (tab === 'game') {
        gameTab.classList.add('active');
        gameContainer.classList.add('active');
        nodeEditorContainer.classList.remove('active');
        treeView.classList.remove('hidden');
        customNodesList.classList.remove('active');
        addNodeButton.style.display = 'block';
        if (isEditorExpanded) {
            toggleEditorExpansion(); // Collapse editor if game tab is selected while expanded
        }
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
                const { gameTree, nodeDefinitions: loadedNodeDefinitions, fileNames: loadedFileNames } = await importSaveFile(file);
                state.gameTree = gameTree;
                state.fileNames = loadedFileNames; // Restore file names
                Object.assign(loadedNodeDefinitions, nodeDefinitions); // Merge loaded definitions with existing ones (prioritize existing definitions)
                Object.assign(nodeDefinitions, loadedNodeDefinitions); // Update global node definitions
                updateTreeDisplay();
                updateCustomNodesList();
            } catch (error) {
                console.error("Error loading game state:", error);
            }
        }
    };
    input.click();
});

export function customPrompt(message: string, defaultValue: string): Promise<string | null> {
    return new Promise((resolve) => {
        const promptBox = document.getElementById('custom-prompt')!;
        const messageElement = document.getElementById('custom-prompt-message')!;
        const inputElement = document.getElementById('custom-prompt-input')! as HTMLInputElement;
        const okButton = document.getElementById('custom-prompt-ok')!;
        const cancelButton = document.getElementById('custom-prompt-cancel')!;

        messageElement.textContent = message;
        inputElement.value = defaultValue;
        promptBox.style.display = 'flex';

        const closePrompt = (value: string | null) => {
            promptBox.style.display = 'none';
            inputElement.removeEventListener('keydown', onKeyDown);
            okButton.onclick = null;
            cancelButton.onclick = null;
            resolve(value);
        };

        okButton.onclick = () => closePrompt(inputElement.value);
        cancelButton.onclick = () => closePrompt(null);

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                closePrompt(inputElement.value);
            }
            if (event.key === 'Escape') {
                event.preventDefault();
                closePrompt(null);
            }
        };

        inputElement.addEventListener('keydown', onKeyDown);
        inputElement.focus();
        inputElement.select();
    });
}