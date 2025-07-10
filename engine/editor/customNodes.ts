import { state } from "./state.ts";
import { nodeDefinitions } from "./definitions.ts";
import type { GameNode } from "./types.ts";

const customNodesContainer = document.getElementById('custom-nodes-container')!;
const saveNodeButton = document.getElementById('save-node-button')! as HTMLButtonElement;
const newNodeButton = document.getElementById('new-node-button')! as HTMLButtonElement;
const nodeEditorTitle = document.getElementById('node-editor-title')!;

let centerEditor: any; // CodeMirror instance

export function setEditor(editor: any) {
    centerEditor = editor;
}

export function setupCustomNodes() {
    updateCustomNodesList();

    saveNodeButton.addEventListener('click', () => {
        if (!state.selectedCustomNode) {
            alert('Please select a node to edit first.');
            return;
        }
        const code = centerEditor.getValue();
        const nameMatch = code.match(/class\s+(\w+)\s+extends\s+\w+/);
        if (!nameMatch) {
            alert('Invalid custom node format.');
            return;
        }
        const customNodeName = nameMatch[1];
        try {
            const propertiesExtract = `class Part { constructor() {}} class GameObject extends Part {} class Transform extends Part {} class Renderer extends Part {} class Collider extends Part {}\n\n${code}\n\n${customNodeName}.properties`;
            const customProperties = eval(propertiesExtract);

            state.customNodeEditTimes[customNodeName] = Date.now();

            nodeDefinitions[customNodeName] = {
                properties: customProperties,
                code: code,
                children: []
            };
            alert(`Custom node '${customNodeName}' saved!`);
            updateCustomNodesList();

            if (customNodeName !== state.selectedCustomNode.type) {
                setTimeout(() => selectCustomNode(customNodeName, 'custom'), 100);
            }
        } catch (error: any) {
            alert(`Error parsing node properties: ${error.message}`);
        }
    });

    newNodeButton.addEventListener('click', () => {
        const newNodeName = 'NewCustomNode';
        selectCustomNode(newNodeName, 'custom');
        nodeEditorTitle.textContent = `Creating: ${newNodeName}`;
        document.querySelectorAll('.custom-node-item').forEach(item => item.classList.remove('selected'));
        if (centerEditor) {
            centerEditor.setValue(generateNodeTemplate(newNodeName, 'custom'));
        }
        state.customNodeEditTimes[newNodeName] = Date.now();
    });
}

export function updateCustomNodesList() {
    customNodesContainer.innerHTML = '';
    const customNodes = Object.keys(nodeDefinitions)
        .filter(type => nodeDefinitions[type].code)
        .sort((a, b) => (state.customNodeEditTimes[b] || 0) - (state.customNodeEditTimes[a] || 0));

    if (customNodes.length > 0) {
        const header = document.createElement('div');
        header.className = 'nodes-section-header';
        header.textContent = 'Custom Nodes';
        customNodesContainer.appendChild(header);
        customNodes.forEach(type => createNodeItem(type, 'Custom node', 'custom'));
    }

    const builtinHeader = document.createElement('div');
    builtinHeader.className = 'nodes-section-header';
    builtinHeader.textContent = 'Templates to Extend';
    customNodesContainer.appendChild(builtinHeader);
    ['Part', 'GameObject', 'Transform', 'Renderer', 'Collider', 'Sound'].forEach(type => {
        createNodeItem(type, 'Built-in template', 'builtin');
    });
}

function createNodeItem(type: string, description: string, category: 'custom' | 'builtin') {
    const nodeItem = document.createElement('div');
    nodeItem.className = `custom-node-item ${category === 'custom' ? 'user-defined' : 'builtin'}`;
    nodeItem.innerHTML = `<div class="node-type">${type}</div><div class="node-description">${description}</div>`;
    nodeItem.addEventListener('click', () => selectCustomNode(type, category));
    customNodesContainer.appendChild(nodeItem);
}

export function selectCustomNode(nodeType: string, category: 'custom' | 'builtin') {
    document.querySelectorAll('.custom-node-item').forEach(item => item.classList.remove('selected'));
    const clickedItem = Array.from(customNodesContainer.children).find(item => {
        const typeElement = item.querySelector('.node-type');
        return typeElement && typeElement.textContent === nodeType;
    });
    if (clickedItem) clickedItem.classList.add('selected');

    state.selectedCustomNode = { type: nodeType, category };
    nodeEditorTitle.textContent = `Editing: ${nodeType}`;

    if (centerEditor) {
        const code = (category === 'custom' && nodeDefinitions[nodeType]?.code) 
            ? nodeDefinitions[nodeType].code 
            : generateNodeTemplate(nodeType, category);
        centerEditor.setValue(code);
    }
}

function generateNodeTemplate(nodeType: string, category: string): string {
    const parentClass = category === 'builtin' ? nodeType : 'Part';
    return `class ${nodeType} extends ${parentClass} {
  constructor({ name, ...props }) {
    super({ name: name || "${nodeType}", ...props });
    // Add custom properties here
  }

  static properties = {
    name: { type: "text", default: "${nodeType}" },
    // Add more properties here
  };

  act() {
    super.act();
    // Your custom logic here
  }
}`;
}