import { state } from "./state.ts";
import { updateTreeDisplay, selectNode, setupTreeControls } from "./tree.ts";
import { setupGameControls } from "./game.ts";
import { setupCustomNodes, setEditor } from "./customNodes.ts";
import { setupUI } from "./ui.ts";
import { nodeDefinitions } from "./definitions.ts";

declare const CodeMirror: any;

(window as any).nodeDefinitions = nodeDefinitions;

const canvas = document.getElementById("gamecanvas") as HTMLCanvasElement;
const context = canvas.getContext("2d")!;

function showLoadingMessage(message: string) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "16px Arial";
    context.textAlign = "center";
    context.fillStyle = "white";
    context.fillText(message, canvas.width / 2, canvas.height / 2);
}

showLoadingMessage("Loading engine...");

// Custom Alert Function
function customAlert(message: any) {
    const alertMessage = document.getElementById('custom-alert-message')!;
    const alertBox = document.getElementById('custom-alert')!;
    alertMessage.innerHTML = ''; // Clear previous content

    if (typeof message === 'object' && message !== null) {
        // Render as table if it's an object
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '10px';

        for (const key in message) {
            if (Object.prototype.hasOwnProperty.call(message, key)) {
                const row = table.insertRow();
                const cell1 = row.insertCell();
                const cell2 = row.insertCell();
                cell1.textContent = key;
                cell2.textContent = JSON.stringify(message[key], null, 2);
                cell1.style.border = '1px solid #444';
                cell2.style.border = '1px solid #444';
                cell1.style.padding = '8px';
                cell2.style.padding = '8px';
                cell1.style.textAlign = 'left';
                cell2.style.textAlign = 'left';
                cell1.style.backgroundColor = '#333';
            }
        }
        alertMessage.appendChild(table);
    } else {
        // Try to parse as JSON string, otherwise display as plain text
        try {
            const parsedMessage = JSON.parse(message || '');
            if (typeof parsedMessage === 'object' && parsedMessage !== null) {
                const table = document.createElement('table');
                table.style.width = '100%';
                table.style.borderCollapse = 'collapse';
                table.style.marginTop = '10px';

                for (const key in parsedMessage) {
                    if (Object.prototype.hasOwnProperty.call(parsedMessage, key)) {
                        const row = table.insertRow();
                        const cell1 = row.insertCell();
                        const cell2 = row.insertCell();
                        cell1.textContent = key;
                        cell2.textContent = JSON.stringify(parsedMessage[key], null, 2);
                        cell1.style.border = '1px solid #444';
                        cell2.style.border = '1px solid #444';
                        cell1.style.padding = '8px';
                        cell2.style.padding = '8px';
                        cell1.style.textAlign = 'left';
                        cell2.style.textAlign = 'left';
                        cell1.style.backgroundColor = '#333';
                    }
                }
                alertMessage.appendChild(table);
            } else {
                alertMessage.textContent = message || '';
            }
        } catch (e) {
            alertMessage.textContent = message || '';
        }
    }
    alertBox.style.display = 'flex';
}

// Override native alert
window.alert = customAlert;

const alertCloseButton = document.getElementById('custom-alert-close')!;
const alertBox = document.getElementById('custom-alert')!;

alertCloseButton.onclick = () => {
    alertBox.style.display = 'none';
};

const leftPanel = document.getElementById('left-panel')!;
const rightPanel = document.getElementById('right-panel')!;
const centerPanel = document.getElementById('center-panel')!;
const leftResizer = document.getElementById('left-resizer')!;
const rightResizer = document.getElementById('right-resizer')!;
const mainContent = document.getElementById('main-content')!;

// Set initial panel widths
leftPanel.style.width = `${window.innerWidth / 4}px`;
rightPanel.style.width = `${window.innerWidth / 4}px`;
centerPanel.style.width = `${window.innerWidth / 2}px`;

let isResizingLeft = false;
let isResizingRight = false;

const MIN_PANEL_WIDTH = 150;

function startResize(e: MouseEvent, type: 'left' | 'right') {
    if (type === 'left') {
        isResizingLeft = true;
    } else {
        isResizingRight = true;
    }
    mainContent.style.cursor = 'ew-resize';
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
}

function resize(e: MouseEvent) {
    if (isResizingLeft) {
        const newLeftWidth = e.clientX;
        if (newLeftWidth >= MIN_PANEL_WIDTH && newLeftWidth <= mainContent.offsetWidth - rightPanel.offsetWidth - MIN_PANEL_WIDTH) {
            leftPanel.style.width = `${newLeftWidth}px`;
        }
    } else if (isResizingRight) {
        const newRightWidth = mainContent.offsetWidth - e.clientX;
        if (newRightWidth >= MIN_PANEL_WIDTH && newRightWidth <= mainContent.offsetWidth - leftPanel.offsetWidth - MIN_PANEL_WIDTH) {
            rightPanel.style.width = `${newRightWidth}px`;
        }
    }
    resizeCanvas();
}

function stopResize() {
    isResizingLeft = false;
    isResizingRight = false;
    mainContent.style.cursor = '';
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
}

leftResizer.addEventListener('mousedown', (e) => startResize(e, 'left'));
rightResizer.addEventListener('mousedown', (e) => startResize(e, 'right'));

function resizeCanvas() {
    const gameContainer = document.getElementById('game-container')!;
    const gameCanvas = document.getElementById('gamecanvas')! as HTMLCanvasElement;

    const containerWidth = gameContainer.offsetWidth;
    const containerHeight = gameContainer.offsetHeight;

    const gameWidth = state.gameTree.properties.width;
    const gameHeight = state.gameTree.properties.height;

    let scale = 1;
    let newCanvasWidth = gameWidth;
    let newCanvasHeight = gameHeight;

    // Calculate scale to fit within container while maintaining aspect ratio
    if (gameWidth > containerWidth || gameHeight > containerHeight) {
        const widthRatio = containerWidth / gameWidth;
        const heightRatio = containerHeight / gameHeight;
        scale = Math.min(widthRatio, heightRatio);

        newCanvasWidth = gameWidth * scale;
        newCanvasHeight = gameHeight * scale;
    }

    gameCanvas.style.width = `${newCanvasWidth}px`;
    gameCanvas.style.height = `${newCanvasHeight}px`;

    // Set the actual drawing buffer size to the game's original dimensions
    // This ensures that the game renders at its intended resolution
    gameCanvas.width = gameWidth;
    gameCanvas.height = gameHeight;

    // Apply the scaling transformation to the rendering context
    // This makes everything drawn on the canvas appear scaled up/down
    context.setTransform(scale, 0, 0, scale, 0, 0);

    // Update the game instance with the new scale for input handling
    if (state.currentGameInstance) {
        (state.currentGameInstance as any).scaleFactor = scale;
        (state.currentGameInstance as any).canvasOffset = {
            x: (containerWidth - newCanvasWidth) / 2,
            y: (containerHeight - newCanvasHeight) / 2
        };
    }
}

// Initial resize and resize on window resize
window.addEventListener('resize', resizeCanvas);

import("../bundle.js").then(engineModule => {
    Object.assign(window, engineModule);
    state.ready = true;
    showLoadingMessage("Engine loaded successfully.");

    const editorElement = document.getElementById('node-code-editor')!;
    const centerEditor = CodeMirror(editorElement, {
        lineNumbers: true,
        mode: "javascript",
        theme: "dracula",
        value: `// Select or create a custom node to start editing`
    });

    setEditor(centerEditor);
    setupUI(centerEditor);
    setupCustomNodes();
    setupGameControls();
    setupTreeControls();
    updateTreeDisplay();
    selectNode(state.gameTree);
    resizeCanvas(); // Call resizeCanvas after gameTree is loaded and selected
});
