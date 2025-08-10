import { Part, type Game } from "../engine-core.ts";
import { findNodeById, state } from "./state.ts";
import type { GameNode } from "./types.ts";


const gameContainer = document.getElementById('game-container')!;
const playButton = document.getElementById('play-button')! as HTMLButtonElement;
const pauseButton = document.getElementById('pause-button')! as HTMLButtonElement;
const stopButton = document.getElementById('stop-button')! as HTMLButtonElement;

export function setupGameControls() {
    playButton.addEventListener('click', async () => {
        const gameCode = generateGameCode(state.gameTree, true);
        // copy game code to clipboard
        // try {
        //     await navigator.clipboard.writeText(gameCode);
        // } catch (err) {
        //     console.error('Failed to copy game code:', err);
        // }
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
            if (state.currentGameInstance) {
                // If there's an existing game instance, stop it before starting a new one
                stopGame();
            }
            const gameFunction = getGameFunction(gameCode);
            state.currentGameInstance = gameFunction();
            if (state.currentGameInstance) {
                (state.currentGameInstance as Game).messageHook = (type: "warn" | "error" | "debug", ...args: any[]) => {
                    const logsDiv = document.getElementById('logs');
                    if (logsDiv) {
                        const logEntry = document.createElement('div');
                        logEntry.className = `log-entry ${type}`;
                        logEntry.textContent = `[${new Date().toISOString()}][${type.toUpperCase()}] ${args.join(' ')}`;
                        logsDiv.appendChild(logEntry);
                        logsDiv.scrollTop = logsDiv.scrollHeight; // Scroll to the bottom
                        if(logsDiv.children.length > 100) {
                            logsDiv.removeChild(logsDiv.children[0]);
                        }
                    }
                };
            }
            state.isGamePaused = false;
            pauseButton.disabled = false;
            pauseButton.textContent = 'Pause';
            stopButton.disabled = false;
        } catch (error: any) {
            const errorDiv = document.createElement('div');
            errorDiv.className = `log-entry error`;
            errorDiv.textContent = `Error: ${error.message}`;
            document.getElementById('logs')?.appendChild(errorDiv);
            // if (canvas) canvas.style.display = 'none';
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
        (state.currentGameInstance as Game).pause();
        state.isGamePaused = true;
        pauseButton.textContent = 'Resume';
    }
}

function resumeGame() {
    if (state.currentGameInstance && state.isGamePaused) {
        (state.currentGameInstance as Game).resume();
        state.isGamePaused = false;
        pauseButton.textContent = 'Pause';
    }
}

function stopGame() {
    if (state.currentGameInstance) {
        (state.currentGameInstance as Game).stop();
        state.currentGameInstance = null;
        state.isGamePaused = false;
        pauseButton.disabled = true;
        pauseButton.textContent = 'Pause';
        stopButton.disabled = true;
        gameContainer.classList.remove('game-active');
        document.getElementById('logs')!.innerHTML = ''; // Clear logs
    }
}

export function updateRender() {
    if (!state.ready || state.currentTab !== 'game') return;
    const canvas = document.getElementById('gamecanvas') as HTMLCanvasElement;
    if (!canvas) {
        throw new Error('Game canvas not found');
    }
    canvas.style.display = '';
    const code = generateGameCode(state.gameTree, false, state.gameTree?.properties?.starterScene);
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
        if (def?.type === 'Part' && value) {
            const depNode = (value.length == 2 && value[1]) ? findNodeById(state.gameTree, value[1]) : value.id ? value : null;
            if (depNode) {
                deps.push(depNode);
            } else {
                console.warn(`Dependency node with ID ${value[1]} not found for property ${key} in node ${node.id}`);
            }
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
        if (propDef?.type === 'Part' && value) {
            if (value.length === 2 && value[1]) {
                props += `${key}: ${getVarNameById(value[1])},`;
            } else if (value.id) {
                props += `${key}: ${getVarName(value)},`;
            }
        } else if (propDef?.type === 'list' && Array.isArray(value)) {
            // Handle lists of Parts or primitives
            if (propDef.subtype === 'Part') {
                const varNames = value.map((v: any) => (v.length == 2 && v[1]) ? getVarNameById(v[1]) : getVarName(v));
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

function generateGameCode(rootNode: GameNode, start = true, starterScene?: string): string {
    const sortedNodes = topologicalSort(rootNode);
    let code = '';
    for (const node of sortedNodes) {
        code += generateNodeCode(node);
    }

    for (const node of sortedNodes) {
        code += generateChildAppendCode(node);
    }

    if (rootNode.type === 'Game' && start) {
        const starter = Array.isArray(rootNode.properties.starterScene)
            ? getVarNameById(rootNode.properties.starterScene[1])
            : '';
        code += `${getVarName(rootNode)}.start(${starter});`;
    } else if (starterScene) {
        const starter = Array.isArray(starterScene)
            ? getVarNameById(starterScene[1])
            : '';
        const rootVarName = getVarName(rootNode);
        code += `${rootVarName}.setScene(${starter});`;
    }

    return code;
}

function getVarNameById(id: string): string {
    return `n${id.replace(/[^a-zA-Z0-9_]/g, '_')}`;
}

function getVarName(node: GameNode): string {
    if (!node || !node.id) return '';
    return getVarNameById(node.id);
}

function isCode(value: string, propDef: any): boolean {
    if (propDef?.type === 'Vector' || propDef?.type === 'list') return true;
    if (value.startsWith('new ') || value.startsWith('{') || value.startsWith('[')) return true;
    return false;
}
