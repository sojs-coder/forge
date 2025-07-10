import { state } from "./state.ts";
import type { GameNode } from "./types.ts";

const gameContainer = document.getElementById('game-container')!;
const playButton = document.getElementById('play-button')! as HTMLButtonElement;
const pauseButton = document.getElementById('pause-button')! as HTMLButtonElement;
const stopButton = document.getElementById('stop-button')! as HTMLButtonElement;

export function setupGameControls() {
    playButton.addEventListener('click', async () => {
        const gameCode = generateGameCode(state.gameTree, true);

        const existingCanvas = document.getElementById('gamecanvas');
        if (existingCanvas) existingCanvas.remove();
        if (state.currentGameInstance) stopGame();

        const canvas = document.createElement('canvas');
        canvas.id = state.gameTree.properties.canvas;
        canvas.width = state.gameTree.properties.width;
        canvas.height = state.gameTree.properties.height;
        gameContainer.innerHTML = '';
        gameContainer.appendChild(canvas);
        gameContainer.classList.add('game-active'); // Add this line

        try {
            const gameFunction = getGameFunction(gameCode);
            state.currentGameInstance = gameFunction();
            state.isGamePaused = false;
            pauseButton.disabled = false;
            pauseButton.textContent = 'Pause';
            stopButton.disabled = false;
        } catch (error: any) {
            console.error('Error starting game:', error);
            gameContainer.innerHTML = `<div style="color: red; padding: 20px;">Error: ${error.message}</div>`;
        }
    });

    pauseButton.addEventListener('click', () => {
        if (!state.currentGameInstance) {
            playButton.click();
        } else if (state.isGamePaused) {
            resumeGame();
        } else {
            pauseGame();
        }
    });

    stopButton.addEventListener('click', () => {
        if (state.currentGameInstance) stopGame();
    });
}

function pauseGame() {
    if (state.currentGameInstance && !state.isGamePaused) {
        (state.currentGameInstance as any).pause();
        state.isGamePaused = true;
        pauseButton.textContent = 'Resume';
    }
}

function resumeGame() {
    if (state.currentGameInstance && state.isGamePaused) {
        (state.currentGameInstance as any).resume();
        state.isGamePaused = false;
        pauseButton.textContent = 'Pause';
    }
}

function stopGame() {
    if (state.currentGameInstance) {
        (state.currentGameInstance as any).stop();
        state.currentGameInstance = null;
        state.isGamePaused = false;
        pauseButton.disabled = true;
        pauseButton.textContent = 'Pause';
        stopButton.disabled = true;
        gameContainer.classList.remove('game-active'); // Add this line
    }
}

export function updateRender() {
    if (!state.ready || state.currentTab !== 'game') return;

    const code = generateGameCode(state.gameTree, false);
    const func = getGameFunction(code);
    const instance = func();
    try {
        if (typeof (instance as any).act === 'function') {
            (instance as any).act(true);
        }
    } catch (error) {
        console.warn('Error in updateRender:', error);
    }
}

function getGameFunction(gameCode: string): () => any {
    const codeToRun = `(() => { ${gameCode} return ${getVarName(state.gameTree)}; })();`;
    return new Function(`return ${codeToRun}`) as () => any;
}

function generateGameCode(node: GameNode, start = true): string {
    let code = '';
    const varName = getVarName(node);
    const nodeDefs = (window as any).nodeDefinitions;

    if (nodeDefs[node.type] && nodeDefs[node.type].code) {
        code += nodeDefs[node.type].code;
    }

    let props = '';
    for (const key in node.properties) {
        const propDef = nodeDefs[node.type]?.properties[key];
        let value = node.properties[key];
        if (propDef?.type === 'Part' && value?.id) {
            props += `${key}: ${getVarName(value)}, `;
        } else if (typeof value === 'string' && !isCode(value, propDef)) {
            props += `${key}: \"${value}\", `;
        } else {
            props += `${key}: ${value}, `;
        }
    }

    code += `const ${varName} = new ${node.type}({ ${props} });`;

    if (node.children && node.children.length > 0) {
        for (const child of node.children) {
            code += generateGameCode(child, false);
            code += `${varName}.addChild(${getVarName(child)});`;
        }
    }

    if (node.type === 'Game' && start) {
        const starter = node.properties.starterScene ? getVarName(node.properties.starterScene) : '';
        code += `${varName}.start(${starter});`;
    }
    return code;
}

function getVarName(node: GameNode): string {
    if (!node || !node.id) return '';
    return `n${node.id.replace(/[^a-zA-Z0-9_]/g, '_')}`;
}

function isCode(value: string, propDef: any): boolean {
    if (propDef?.type === 'Vector' || propDef?.type === 'list') return true;
    if (value.startsWith('new ') || value.startsWith('{') || value.startsWith('[')) return true;
    return false;
}
