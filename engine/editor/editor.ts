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
});
