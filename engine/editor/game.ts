import { state } from "./state.ts";
import type { GameNode } from "./types.ts";

const gameContainer = document.getElementById('game-container')!;
const playButton = document.getElementById('play-button')! as HTMLButtonElement;
const pauseButton = document.getElementById('pause-button')! as HTMLButtonElement;
const stopButton = document.getElementById('stop-button')! as HTMLButtonElement;

export function setupGameControls() {
    playButton.addEventListener('click', async () => {
        const gameCode = generateGameCode(state.gameTree, true);

        gameContainer.innerHTML = ''; // Clear existing content, including old error messages
        const existingCanvas = document.getElementById('gamecanvas');
        if (existingCanvas) existingCanvas.style.display = 'none';

        const canvas = document.createElement('canvas');
        canvas.id = state.gameTree.properties.canvas;
        canvas.width = state.gameTree.properties.width;
        canvas.height = state.gameTree.properties.height;
        if (!existingCanvas) {
            gameContainer.appendChild(canvas);
        } else {
            existingCanvas.style.display = '';
        }
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
            const errorDiv = document.createElement('div');
            errorDiv.style.color = 'red';
            errorDiv.style.padding = '20px';
            errorDiv.textContent = `Error: ${error.message}`;
            gameContainer.appendChild(errorDiv);
            if (canvas) canvas.style.display = 'none';
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
        gameContainer.classList.remove('game-active');
        const canvas = document.getElementById('gamecanvas');
        if (canvas) canvas.style.display = 'none';
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
function flattenNodes(node: GameNode, all: GameNode[] = []): GameNode[] {
    all.push(node);
    if (node.children) {
        for (const child of node.children) {
            flattenNodes(child, all);
        }
    }
    return all;
}

function getDependencies(node: GameNode): GameNode[] {
    const deps: GameNode[] = [];
    const props = node.properties;
    const nodeDefs = (window as any).nodeDefinitions;
    const propDefs = nodeDefs[node.type]?.properties ?? {};
    for (const key in props) {
        const value = props[key];
        const def = propDefs[key];
        if (def?.type === 'Part' && value?.id) {
            deps.push(value); // value is another node
        }
    }
    return deps;
}

function topologicalSort(root: GameNode): GameNode[] {
    const visited = new Set<string>();
    const temp = new Set<string>();
    const result: GameNode[] = [];

    function visit(node: GameNode) {
        if (visited.has(node.id)) return;
        if (temp.has(node.id)) throw new Error(`Cyclic dependency involving ${node.properties.name || node.id}`);

        temp.add(node.id);

        // Visit any Part-type property references
        for (const dep of getDependencies(node)) {
            visit(dep);
        }

        // Visit children as well (to ensure tree traversal)
        if (node.children) {
            for (const child of node.children) {
                visit(child);
            }
        }

        temp.delete(node.id);
        visited.add(node.id);
        result.push(node);
    }

    visit(root);
    return result;
}


function generateNodeCode(node: GameNode): string {
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
            props += `${key}: ${getVarName(value)},`;
        } else if (propDef?.type === 'list' && Array.isArray(value)) {
            // Handle lists of Parts or primitives
            if (propDef.subtype === 'Part') {
            const varNames = value.map((v: any) => v?.id ? getVarName(v) : 'null');
            props += `${key}: [${varNames.join(', ')}],`;
            } else if (propDef.subtype === 'string') {
            const strList = value.map((v: any) => `"${v}"`);
            props += `${key}: [${strList.join(', ')}],`;
            } else {
            props += `${key}: [${value.join(', ')}],`;
            }
        } else if (typeof value === 'string' && !isCode(value, propDef)) {
            props += `${key}: "${value}",`;
        } else {
            props += `${key}: ${value},`;
        }
    }
    code += `const ${varName} = new ${node.type}({ ${props} });`;
    return code;
}
function generateChildAppendCode(node: GameNode): string {
    let code = '';
    const varName = getVarName(node);
    if (node.children && node.children.length > 0) {
        const childrenToAdd = [];
        for (const child of node.children) {
            const childVarName = getVarName(child);
            childrenToAdd.push(childVarName);
        }
        code += `${varName}.addChildren(${childrenToAdd.join(', ')});`;
    }
    return code;
}

function generateGameCode(rootNode: GameNode, start = true): string {
    const sortedNodes = topologicalSort(rootNode);
    let code = '';
    for (const node of sortedNodes) {
        code += generateNodeCode(node);
    }

    for (const node of sortedNodes) {
        code += generateChildAppendCode(node);
    }

    if (rootNode.type === 'Game' && start) {
        const starter = rootNode.properties.starterScene
            ? getVarName(rootNode.properties.starterScene)
            : '';
        code += `${getVarName(rootNode)}.start(${starter});`;
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
