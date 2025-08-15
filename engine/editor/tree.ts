import { state, findNodeById, findParentNode, focus, blur } from "./state.ts";
import { renderProperties } from "./properties.ts";
import { updateRender } from "./game.ts";
import { selectCustomNode } from "./customNodes.ts";
import { switchTab } from "./ui.ts";
import { customPrompt } from "./customPrompt.ts";
import type { GameNode } from "./types.ts";
import type { Key } from "react";

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

    const nodeHeader = document.createElement('div');
    nodeHeader.classList.add('node-header');
    nodeElement.appendChild(nodeHeader);

    const nodeContent = document.createElement('span');
    nodeContent.textContent = node.properties.name || node.type + (node.properties.name ? ' (' + node.type + ')' : '');
    nodeHeader.appendChild(nodeContent);

    if (node.children && node.children.length > 0) {
        const toggle = document.createElement('span');
        toggle.classList.add('node-toggle');
        toggle.textContent = node.expanded ? '▼' : '►';
        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            node.expanded = !node.expanded;
            updateTreeDisplay();
        });
        nodeHeader.prepend(toggle);
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
    nodeElement.addEventListener('drop', (e) => {
        handleDrop(e);
        // Clear all drag-over classes
        document.querySelectorAll('.node-item').forEach(item => {
            item.classList.remove('drag-over-above', 'drag-over-below', 'drag-over-child');
        });
    });

    parentElement.appendChild(nodeElement);

    if (node.children && node.children.length > 0 && node.expanded) {
        const childrenContainer = document.createElement('div');
        childrenContainer.classList.add('node-children');
        nodeElement.appendChild(childrenContainer);
        node.children.forEach(child => {
            // Add parent reference to account for old saves
            child.parent = node.properties.name || node.properties.id; // Ensure parent reference is set
            renderTree(child, childrenContainer)
        });
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
        const allAllowedTypes = [...allowedChildren, ...customNodeTypes].sort();

        const selectContainer = document.createElement('div');
        selectContainer.classList.add('node-select-container');

        let selectedIndex = -1; // -1 means no selection

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search parts...';
        searchInput.classList.add('node-search-input');
        searchInput.addEventListener("focus", focus);
        searchInput.addEventListener("blur", blur);
        selectContainer.appendChild(searchInput);

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('node-options-container');
        selectContainer.appendChild(optionsContainer);

        let currentFilteredTypes: string[] = [];

        const renderOptions = (filter: string) => {
            optionsContainer.innerHTML = '';
            currentFilteredTypes = allAllowedTypes.filter(type => type.toLowerCase().includes(filter.toLowerCase()));

            if (selectedIndex >= currentFilteredTypes.length) {
                selectedIndex = currentFilteredTypes.length > 0 ? 0 : -1;
            }

            currentFilteredTypes.forEach((type, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.classList.add('node-option');
                optionDiv.textContent = type;
                if (index === selectedIndex) {
                    optionDiv.classList.add('selected-option');
                }
                optionDiv.addEventListener('click', () => {
                    addNode(type);
                    selectContainer.remove();
                    removeListeners();
                });
                optionsContainer.appendChild(optionDiv);
            });
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (currentFilteredTypes.length === 0) return;

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                selectedIndex = (selectedIndex + 1) % currentFilteredTypes.length;
                renderOptions(searchInput.value);
                optionsContainer.children[selectedIndex]?.scrollIntoView({ block: 'nearest' });
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                selectedIndex = (selectedIndex - 1 + currentFilteredTypes.length) % currentFilteredTypes.length;
                renderOptions(searchInput.value);
                optionsContainer.children[selectedIndex]?.scrollIntoView({ block: 'nearest' });
            } else if (event.key === 'Enter') {
                event.preventDefault();
                if (selectedIndex !== -1) {
                    addNode(currentFilteredTypes[selectedIndex]);
                    selectContainer.remove();
                    removeListeners();
                }
            } else if (event.key === 'Escape') {
                event.preventDefault();
                selectContainer.remove();
                removeListeners();

            }

        }
        function removeListeners() {
            searchInput.removeEventListener('input', handleInput);
            searchInput.removeEventListener('keydown', handleKeyDown);
            searchInput.removeEventListener('blur', blur);
            searchInput.removeEventListener('focus', focus);
        }
        const handleInput = (event: Event) => {
            selectedIndex = -1; // Reset selection on input change
            renderOptions((event.target as HTMLInputElement).value);
        }
        searchInput.addEventListener('input', handleInput);
        searchInput.addEventListener('keydown', handleKeyDown);

        // Initial render of options
        renderOptions('');

        const addNode = async (nodeType: string) => {
            const newNodeDef = (window as any).nodeDefinitions[nodeType];
            const newProperties: Record<string, any> = {};
            for (const key in newNodeDef.properties) {
                newProperties[key] = newNodeDef.properties[key].default;
            }

            if (newNodeDef.singular) {
                newProperties.name = nodeType;
            } else {
                const defaultName = nodeType + '_' + (state.selectedNode!.children.length + 1);
                const name = await customPrompt(`Enter name for the new ${nodeType}:`, defaultName);
                if (name === null) {
                    return;
                }
                newProperties.name = name.trim() || defaultName;
            }

            const newNode: GameNode = {
                id: shuffle((Date.now().toString(36) + Math.random().toString(36).substring(2)).split('')).join(''),
                type: nodeType,
                properties: newProperties,
                children: [],
                parent: state.selectedNode?.properties.name || state.selectedNode?.id || null // Ensure parent reference is set
            };
            state.selectedNode!.children.push(newNode);
            updateTreeDisplay();
            selectNode(newNode);
        };

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancel-button');
        cancelButton.addEventListener('click', () => {
            selectContainer.remove();
        });
        selectContainer.appendChild(cancelButton);

        document.body.appendChild(selectContainer);
        searchInput.focus();
    });

    treeView.addEventListener('keydown', (event) => {
        const allVisibleNodes: GameNode[] = [];
        const collectVisibleNodes = (node: GameNode) => {
            allVisibleNodes.push(node);
            if (node.expanded && node.children) {
                node.children.forEach(collectVisibleNodes);
            }
        };
        collectVisibleNodes(state.gameTree);

        if (allVisibleNodes.length === 0) return;

        let currentIndex = state.selectedNode ? allVisibleNodes.findIndex(n => n.id === state.selectedNode!.id) : -1;

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (currentIndex < allVisibleNodes.length - 1) {
                selectNode(allVisibleNodes[currentIndex + 1]);
            } else if (currentIndex === -1) {
                selectNode(allVisibleNodes[0]);
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (currentIndex > 0) {
                selectNode(allVisibleNodes[currentIndex - 1]);
            } else if (currentIndex === -1) {
                selectNode(allVisibleNodes[allVisibleNodes.length - 1]);
            }
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            if (state.selectedNode && state.selectedNode.children && state.selectedNode.children.length > 0 && !state.selectedNode.expanded) {
                state.selectedNode.expanded = true;
                updateTreeDisplay();
            }
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            if (state.selectedNode && state.selectedNode.expanded) {
                state.selectedNode.expanded = false;
                updateTreeDisplay();
            } else if (state.selectedNode) {
                const parent = findParentNode(state.gameTree, state.selectedNode.id);
                if (parent) {
                    selectNode(parent);
                }
            }
        } else if (event.key === 'Enter') {
            event.preventDefault();
            // Optionally, trigger some action on Enter, e.g., open properties if not already open
        }
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

    renderProperties(node);
}

export function deleteNode(nodeId: string) {
    const nodeToDelete = findNodeById(state.gameTree, nodeId);
    if (!nodeToDelete) return;

    if (nodeToDelete.id === state.gameTree.id) {
        alert("Cannot delete the root Game node.");
        return;
    }

    const parent = findParentNode(state.gameTree, nodeId);
    if (parent) {
        parent.children = parent.children.filter(child => child.id !== nodeId);
        if (state.selectedNode?.id === nodeId) {
            state.selectedNode = null;
        }
        updateTreeDisplay();
        renderProperties(state.selectedNode!); // Re-render properties panel (empty or for new selection)
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Delete' && state.selectedNode && !state.inputFocused) {
        if (confirm(`Are you sure you want to delete ${state.selectedNode.properties.name}?`)) {
            deleteNode(state.selectedNode.id);
        }
    }
});

function handleDragStart(event: DragEvent) {
    const target = event.target as HTMLElement;
    draggedNode = findNodeById(state.gameTree, target.dataset.nodeId!)
    event.dataTransfer!.effectAllowed = 'copyMove';
    event.dataTransfer!.setData('text/plain', target.dataset.nodeId!);
}

function handleDragOver(event: DragEvent) {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const nodeElement = target.closest('.node-item') as HTMLElement;

    if (!nodeElement || !draggedNode || nodeElement.dataset.nodeId === draggedNode.id) {
        return;
    }

    // Clear previous drag-over classes
    document.querySelectorAll('.node-item').forEach(item => {
        item.classList.remove('drag-over-above', 'drag-over-below', 'drag-over-child');
    });

    const rect = nodeElement.getBoundingClientRect();
    const mouseY = event.clientY;

    if (mouseY < rect.top + rect.height * 0.25) {
        nodeElement.classList.add('drag-over-above');
    } else if (mouseY > rect.bottom - rect.height * 0.25) {
        nodeElement.classList.add('drag-over-below');
    } else {
        nodeElement.classList.add('drag-over-child');
    }

}

function handleDragLeave(event: DragEvent) {
    const target = event.target as HTMLElement;
    const nodeElement = target.closest('.node-item');
    if (nodeElement) {
        nodeElement.classList.remove('drag-over-above', 'drag-over-below', 'drag-over-child');
    }
}

function handleDrop(event: DragEvent) {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const nodeElement = target.closest('.node-item') as HTMLElement;

    if (!nodeElement || !draggedNode || nodeElement.dataset.nodeId === draggedNode.id) {
        return;
    }

    const targetNodeId = nodeElement.dataset.nodeId!;
    const targetNode = findNodeById(state.gameTree, targetNodeId);

    if (!targetNode) return;
    // Prevent dropping a parent onto its child
    let tempNode: GameNode | null = targetNode;
    while (tempNode) {
        if (tempNode.id === draggedNode.id) {
            alert("Cannot drop a parent onto its child.");
            return;
        }
        tempNode = findParentNode(state.gameTree, tempNode.id);
    }

    const oldParent = findParentNode(state.gameTree, draggedNode.id);
    if (!oldParent) return;
    let newParent: GameNode | null = null;
    let insertIndex: number = -1;

    if (nodeElement.classList.contains('drag-over-child')) {
        newParent = targetNode;
        if (!newParent.children) {
            newParent.children = [];
        }
        newParent.expanded = true;
        insertIndex = newParent.children.length;
    } else {
        newParent = findParentNode(state.gameTree, targetNodeId);
        if (!newParent) { return; } // Invalid drop target

        const targetIndex = newParent.children.findIndex(child => child.id === targetNodeId);
        if (targetIndex === -1) { return; }
        if (nodeElement.classList.contains('drag-over-above')) {
            insertIndex = targetIndex;
        } else if (nodeElement.classList.contains('drag-over-below')) {
            insertIndex = targetIndex + 1;
        }
    }
    if (newParent && insertIndex !== -1) {
        const originalIndex = oldParent.children.findIndex(child => child.id === draggedNode?.id);
        if (originalIndex === -1) return;
        // Adjust insert index if moving within the same parent
        if (oldParent === newParent && originalIndex < insertIndex) {
            insertIndex--;
        }

        // Move the node
        oldParent.children.splice(originalIndex, 1);

        // Handle renaming
        let newName = draggedNode.properties.name;
        let counter = 1;
        let originalName = newName.replace(/-\d+$/, '');
        while (newParent.children.some(child => child.properties.name === newName)) {
            newName = `${originalName}-${counter}`;
            counter++;
        }
        draggedNode.properties.name = newName;

        newParent.children.splice(insertIndex, 0, draggedNode);

        updateTreeDisplay();
        selectNode(draggedNode);
    }
}
