import { state, findNodeById, findParentNode } from "./state.ts";
import { renderProperties } from "./properties.ts";
import { updateRender } from "./game.ts";
import { selectCustomNode } from "./customNodes.ts";
import { switchTab } from "./ui.ts";
import type { GameNode } from "./types.ts";

const treeView = document.getElementById('tree-view')!;
let draggedNode: GameNode | null = null;

export function updateTreeDisplay() {
    treeView.innerHTML = '';
    renderTree(state.gameTree, treeView);
    updateRender();
}

function renderTree(node: GameNode, parentElement: HTMLElement) {
    const nodeElement = document.createElement('div');
    nodeElement.classList.add('node-item');
    nodeElement.dataset.nodeId = node.id;
    nodeElement.dataset.nodeType = node.type;
    nodeElement.draggable = true;

    const nodeContent = document.createElement('span');
    nodeContent.textContent = node.properties.name || node.type + (node.properties.name ? ' (' + node.type + ')' : '');
    nodeElement.appendChild(nodeContent);

    if (node.children && node.children.length > 0) {
        const toggle = document.createElement('span');
        toggle.classList.add('node-toggle');
        toggle.textContent = node.expanded ? '▼' : '►';
        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            node.expanded = !node.expanded;
            updateTreeDisplay();
        });
        nodeElement.prepend(toggle);
    }

    if (node === state.selectedNode) {
        nodeElement.classList.add('selected');
    }

    nodeElement.addEventListener('click', (event) => {
        event.stopPropagation();
        selectNode(node);
    });

    nodeElement.addEventListener('dragstart', handleDragStart);
    nodeElement.addEventListener('dragover', handleDragOver);
    nodeElement.addEventListener('dragleave', handleDragLeave);
    nodeElement.addEventListener('drop', handleDrop);

    parentElement.appendChild(nodeElement);

    if (node.children && node.children.length > 0 && node.expanded) {
        const childrenContainer = document.createElement('div');
        childrenContainer.classList.add('node-children');
        nodeElement.appendChild(childrenContainer);
        node.children.forEach(child => renderTree(child, childrenContainer));
    }
}

const addNodeButton = document.getElementById('add-node-button')!;

export function setupTreeControls() {
    addNodeButton.addEventListener('click', () => {
        if (!state.selectedNode) {
            alert('Please select a parent node first.');
            return;
        }

        const allowedChildren = (window as any).nodeDefinitions[state.selectedNode.type]?.children || [];
        const customNodeTypes = Object.keys((window as any).nodeDefinitions).filter(key => (window as any).nodeDefinitions[key].code);
        const allAllowedTypes = [...allowedChildren, ...customNodeTypes];

        const selectContainer = document.createElement('div');
        selectContainer.classList.add('node-select-container');

        const select = document.createElement('select');
        allAllowedTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            select.appendChild(option);
        });
        selectContainer.appendChild(select);

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Add';
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        confirmButton.classList.add('confirm-button');
        cancelButton.classList.add('cancel-button');
        cancelButton.addEventListener('click', () => {
            selectContainer.remove();
        });
        confirmButton.addEventListener('click', () => {
            const nodeType = select.value;
            const newNodeDef = (window as any).nodeDefinitions[nodeType];
            const newProperties: Record<string, any> = {};
            for (const key in newNodeDef.properties) {
                newProperties[key] = newNodeDef.properties[key].default;
            }

            if (!newProperties.name) {
                newProperties.name = nodeType + '_' + (state.selectedNode!.children.length + 1);
            }

            const newNode: GameNode = {
                id: shuffle((Date.now().toString(36) + Math.random().toString(36).substring(2)).split('')).join(''),
                type: nodeType,
                properties: newProperties,
                children: []
            };
            state.selectedNode!.children.push(newNode);
            updateTreeDisplay();
            selectNode(newNode);
            selectContainer.remove();
        });
        selectContainer.appendChild(confirmButton);
        selectContainer.appendChild(cancelButton);
        document.body.appendChild(selectContainer);
        confirmButton.focus();
    });
}

function shuffle(array: any[]) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

export function selectNode(node: GameNode) {
    if (state.selectedNode) {
        const prevSelected = document.querySelector(`[data-node-id="${state.selectedNode.id}"]`);
        if (prevSelected) {
            prevSelected.classList.remove('selected');
        }
    }
    state.selectedNode = node;
    const newSelected = document.querySelector(`[data-node-id="${state.selectedNode.id}"]`);
    if (newSelected) {
        newSelected.classList.add('selected');
    }

    if ((window as any).nodeDefinitions[node.type] && (window as any).nodeDefinitions[node.type].code) {
        renderProperties(node);
        switchTab('editor');
        setTimeout(() => {
            selectCustomNode(node.type, 'custom');
        }, 100);
    } else {
        renderProperties(node);
    }
}

function handleDragStart(event: DragEvent) {
    const target = event.target as HTMLElement;
    draggedNode = findNodeById(state.gameTree, target.dataset.nodeId!)
    event.dataTransfer!.effectAllowed = 'copyMove';
    event.dataTransfer!.setData('text/plain', target.dataset.nodeId!);
}

function handleDragOver(event: DragEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('node-item') || target.closest('.node-item')) {
        event.preventDefault();
        event.dataTransfer!.dropEffect = 'move';
        const nodeElement = target.classList.contains('node-item') ? target : target.closest('.node-item')!;
        nodeElement.classList.add('drag-over');
    }
}

function handleDragLeave(event: DragEvent) {
    const target = event.target as HTMLElement;
    const nodeElement = target.classList.contains('node-item') ? target : target.closest('.node-item');
    if (nodeElement) {
        nodeElement.classList.remove('drag-over');
    }
}

function handleDrop(event: DragEvent) {
    event.preventDefault();
    const target = event.target as HTMLElement;
    target.classList.remove('drag-over');

    const droppedNodeId = event.dataTransfer!.getData('text/plain');
    const targetNodeId = target.dataset.nodeId!;
    const targetNode = findNodeById(state.gameTree, targetNodeId);

    if (!draggedNode || !targetNode || draggedNode.id === targetNode.id) {
        return;
    }

    let tempNode: GameNode | null = targetNode;
    while (tempNode) {
        if (tempNode.id === draggedNode.id) {
            alert("Cannot drop a parent onto its child.");
            return;
        }
        tempNode = findParentNode(state.gameTree, tempNode.id);
    }

    const oldParent = findParentNode(state.gameTree, draggedNode.id);
    if (oldParent) {
        oldParent.children = oldParent.children.filter(child => child.id !== draggedNode.id);
    }

    if (!targetNode.children) {
        targetNode.children = [];
    }
    targetNode.children.push(draggedNode);

    updateTreeDisplay();
    selectNode(draggedNode);
}
