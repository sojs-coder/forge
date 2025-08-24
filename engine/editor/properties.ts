import { state, findNodeById, blur, focus } from "./state.ts";
import { deleteNode } from "./tree.ts";
import { updateRender } from "./game.ts";
import { updateTreeDisplay } from "./tree.ts";
import type { GameNode, PropertyDefinition } from "./types.ts";

const propertyEditor = document.getElementById('property-editor')!;
export function renderProperties(node: GameNode) {
    propertyEditor.innerHTML = '';
    if (!node) return;

    const definition = (window as any).nodeDefinitions[node.type];
    if (!definition) return;

    const errorMsg = document.createElement('span');
    errorMsg.style.color = 'red';
    errorMsg.style.fontSize = '0.7em';
    errorMsg.style.display = 'none';

    for (const key in definition.properties) {
        const group = document.createElement('div');
        group.classList.add("property-group");
        const row = document.createElement('div');
        row.classList.add("property-group-row");
        const left = document.createElement("div");
        const right = document.createElement("div");
        left.className = "left";
        right.className = "right";

        const propDef: PropertyDefinition = definition.properties[key];
        const label = document.createElement('label');
        label.textContent = formatPropertyKey(key) + ':';

        if (propDef.description) {
            left.addEventListener('mouseover', (e) => {
                showTooltip(e, propDef.description!);
            });
            left.addEventListener('mouseout', hideTooltip);
        }

        let input: HTMLElement;
        if (propDef.dontShow) {
            // Skip properties that should not be shown
            continue;
        }
        switch (propDef.type) {
            case 'boolean':
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = !!node.properties[key];
                checkbox.addEventListener('change', (event) => {
                    node.properties[key] = (event.target as HTMLInputElement).checked;
                    if (key === 'name') updateTreeDisplay();
                });
                input = checkbox;
                break;
            case 'Vector':
                input = createVectorInput(node, key, propDef);
                break;
            case 'file':
                input = createFileInput(node, key, propDef);
                break;
            case 'Part':
                input = createPartInput(node, key, propDef);
                break;
            case 'color':
                input = createColorInput(node, key, propDef);
                break;
            case 'list':
                input = createListInput(node, key, propDef);
                break;
            case 'enum':
                const select = document.createElement('select');
                propDef.options?.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.textContent = option;
                    select.appendChild(optionElement);
                });
                select.value = node.properties[key] !== undefined ? node.properties[key] : propDef.default;
                select.addEventListener('change', (event) => {
                    node.properties[key] = (event.target as HTMLSelectElement).value;
                    if (key === 'name') updateTreeDisplay();
                });
                input = select;
                break;
            default: // text, number
                const textInput = document.createElement('input');
                textInput.type = propDef.type === 'number' ? 'number' : 'text';
                textInput.value = node.properties[key] !== undefined ? node.properties[key] : propDef.default;
                textInput.addEventListener('change', (event) => {
                    let value: string | number = (event.target as HTMLInputElement).value;
                    if (propDef.type === 'number') {
                        value = parseFloat(value);
                    }
                    node.properties[key] = value;
                    if (key === 'name') updateTreeDisplay();
                });
                input = textInput;
        }

        input.addEventListener('change', () => updateRender());

        left.appendChild(label);
        right.appendChild(input);
        row.appendChild(left);
        row.appendChild(right);
        group.appendChild(row);
        propertyEditor.appendChild(group);
    }
    propertyEditor.appendChild(errorMsg);

    // Add Delete button
    if (node.id !== state.gameTree.id) { // Prevent deleting the root Game node
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Node';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete ${node.properties.name}?`)) {
                deleteNode(node.id);
            }
        });
        propertyEditor.appendChild(deleteButton);
    }
}
function createPartInput(node: GameNode, key: string, propDef: PropertyDefinition, tertiaryType?: string, listIndex?: number): HTMLElement {
    console.log(node, key, propDef, tertiaryType, listIndex);
    const partContainer = document.createElement('div');
    partContainer.classList.add('part-property-container');
    let name = '(none)', id = null;
    if (node.properties[key]) {
        try {
            if (typeof listIndex === "number") {
                [name, id] = node.properties[key][listIndex];
            } else {
                [name, id] = node.properties[key];
            }
        } catch (error) {
            name = 'DEP+' + node.properties[key].properties.name;
            id = node.properties[key].id;
        }
    }

    const partDisplay = document.createElement('span');
    partDisplay.classList.add('part-name-display');
    partDisplay.textContent = name ? name : '(None)';
    partDisplay.draggable = true; // Make it draggable
    partDisplay.dataset.partPropertyKey = key; // Store the key for drop target

    partDisplay.addEventListener('dragover', (e) => {
        e.preventDefault();
        partDisplay.classList.add('drag-over-input');
    });
    partDisplay.addEventListener('dragleave', () => {
        partDisplay.classList.remove('drag-over-input');
    });
    partDisplay.addEventListener('drop', (e) => {
        e.preventDefault();
        partDisplay.classList.remove('drag-over-input');
        const droppedNodeId = e.dataTransfer?.getData('text/plain');
        if (droppedNodeId) {
            const droppedNode = findNodeById(state.gameTree, droppedNodeId);
            if (droppedNode) {
                // If the subType is 'Part', allow any node to be assigned
                if (
                    ((!tertiaryType) || tertiaryType === "Part") && (
                        propDef.tertiaryType === "Part"
                    )
                ) {
                    if (propDef.type == "Part") {
                        node.properties[key] = [droppedNode.properties.name, droppedNode.id];
                    } else if (propDef.type == "list" && typeof listIndex === "number") {
                        node.properties[key][listIndex] = [droppedNode.properties.name, droppedNode.id];
                    }
                    updateTreeDisplay();
                    renderProperties(node); // Re-render to update display
                } else {
                    // Check if the dropped node is compatible with the subType
                    const allowedTypes = getAllowedSubtypes(tertiaryType ? tertiaryType : propDef.subType!);
                    if (allowedTypes.includes(droppedNode.type)) {
                        if (propDef.type == "Part") {
                            node.properties[key] = [droppedNode.properties.name, droppedNode.id];
                        } else if (propDef.type == "list" && typeof listIndex === "number") {
                            node.properties[key][listIndex] = [droppedNode.properties.name, droppedNode.id];
                        }
                        updateTreeDisplay();
                        renderProperties(node); // Re-render to update display
                    } else {
                        alert(`Cannot assign ${droppedNode.type} to ${tertiaryType ? tertiaryType : propDef.subType} property.`);
                    }
                }
            }
        }
    });

    partDisplay.addEventListener('click', () => {
        createNodeSelectionPopup(node, key, propDef.subType!, propDef.tertiaryType, listIndex); // Open selection popup
    });

    const clearButton = document.createElement('button');
    clearButton.textContent = 'X';
    clearButton.classList.add('clear-part-button');
    clearButton.title = 'Clear assignment';
    clearButton.addEventListener('click', () => {
        node.properties[key] = null;
        updateTreeDisplay();
        renderProperties(node); // Re-render to update display
    });

    partContainer.append(partDisplay, clearButton);
    return partContainer;
}
function createFileInput(node: GameNode, key: string, propDef: PropertyDefinition): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('file-input-container');

    const fileTypeAccepts = {
        image: 'image/*',
        audio: 'audio/*',
        video: 'video/*',
        json: 'application/json'
    };
    // Existing behavior for other file types
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    if (propDef.fileType) {
        fileInput.accept = fileTypeAccepts[propDef.fileType] || '';
    }
    fileInput.style.display = 'none'; // Hide default input
    const fileNameSymbol = (`${node.id}-${key}`); // Unique symbol for this node and property
    const fileName = state.fileNames.get(fileNameSymbol) || '';
    const currentFileName = (fileName) ? (fileName.substring(0, 20)) : 'No file selected';
    const displaySpan = document.createElement('span');
    displaySpan.textContent = currentFileName;

    const selectButton = document.createElement('button');
    selectButton.textContent = 'Select File';
    selectButton.onclick = () => fileInput.click();

    fileInput.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                node.properties[key] = e.target?.result;
                displaySpan.textContent = file.name;
                updateRender();
            };
            // Store the file name in a symbol to avoid conflicts
            state.fileNames.set(fileNameSymbol, file.name); // Store the file name
            reader.readAsDataURL(file);
        }
    });
    container.append(displaySpan, selectButton, fileInput);

    return container;
}

function createVectorInput(node: GameNode, key: string, propDef: PropertyDefinition): HTMLElement {
    const vectorContainer = document.createElement('div');
    vectorContainer.classList.add('vector-container');
    vectorContainer.style.display = 'flex';
    vectorContainer.style.alignItems = 'center';

    let xValue = 0, yValue = 0;
    const currentValue = node.properties[key] || propDef.default;
    if (currentValue) {
        const match = currentValue.match(/new\s+Vector\s*\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)/);
        if (match) {
            xValue = parseFloat(match[1]);
            yValue = parseFloat(match[2]);
        }
    }

    const xLabel = document.createElement('span');
    xLabel.textContent = 'X:';
    const xInput = document.createElement('input');
    xInput.type = 'number';
    xInput.value = xValue.toString();
    xInput.step = 'any';

    const yLabel = document.createElement('span');
    yLabel.textContent = 'Y:';
    const yInput = document.createElement('input');
    yInput.type = 'number';
    yInput.value = yValue.toString();
    yInput.step = 'any';

    const updateVectorProperty = () => {
        const x = parseFloat(xInput.value) || 0;
        const y = parseFloat(yInput.value) || 0;
        node.properties[key] = `new Vector(${x}, ${y})`;
        if (key === 'name') updateTreeDisplay();
    };

    xInput.addEventListener('change', updateVectorProperty);
    yInput.addEventListener('change', updateVectorProperty);

    vectorContainer.append(xLabel, xInput, yLabel, yInput);
    return vectorContainer;
}
interface HTMLInputElementWithAlpha extends HTMLInputElement {
    alpha?: boolean; // Custom property to indicate if alpha channel is allowed
    colorspace?: 'srgb' | 'display-p3'; // Custom property for colorspace
}
function createColorInput(node: GameNode, key: string, propDef: PropertyDefinition): HTMLElement {
    const colorInput = document.createElement('input') as HTMLInputElementWithAlpha;
    colorInput.type = 'color';
    colorInput.alpha = true; // Allow alpha channel
    colorInput.value = node.properties[key] !== undefined ? node.properties[key] : propDef.default;
    colorInput.style.width = '80px'; // Make the input wider
    colorInput.addEventListener('input', (event) => {
        node.properties[key] = (event.target as HTMLInputElement).value;
    });
    return colorInput;
}

function createListInput(node: GameNode, key: string, propDef: PropertyDefinition): HTMLElement {
    const listContainer = document.createElement('div');
    listContainer.classList.add('list-container');

    const getDefaultItem = () => {
        if (Array.isArray(propDef.default) && propDef.default.length > 0) {
            return propDef.default[0];
        }
        if (propDef.subType === 'Vector') return 'new Vector(0,0)';
        if (propDef.subType === 'number') return 0;
        return '';
    };

    const renderListItems = () => {
        listContainer.innerHTML = '';
        let currentList: (string | number | [string, string])[] = node.properties[key];
        // If property is undefined, use default if available
        if (currentList === undefined) {
            if (Array.isArray(propDef.default)) {
                currentList = [...propDef.default];
            } else {
                currentList = [];
            }
            node.properties[key] = currentList;
        }

        currentList.forEach((item: any, index: number) => {
            const itemRow = document.createElement('div');
            itemRow.classList.add('list-item-row');

            let itemInput: HTMLElement;
            if (propDef.subType === 'Vector') {
                const vectorItemContainer = document.createElement('div');
                vectorItemContainer.classList.add('vector-item-container');

                const xMatch = item.match(/new\s+Vector\s*\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)/);
                let xValue = xMatch ? parseFloat(xMatch[1]) : 0;
                let yValue = xMatch ? parseFloat(xMatch[2]) : 0;

                const xLabel = document.createElement('span');
                xLabel.textContent = 'X:';

                const xInput = document.createElement('input');
                xInput.type = 'number';
                xInput.value = xValue.toString();
                xInput.step = 'any';
                xInput.addEventListener('change', () => {
                    currentList[index] = `new Vector(${parseFloat(xInput.value) || 0}, ${parseFloat(yInput.value) || 0})`;
                    node.properties[key] = [...currentList];
                    updateRender();
                });

                const yLabel = document.createElement('span');
                yLabel.textContent = 'Y:';

                const yInput = document.createElement('input');
                yInput.type = 'number';
                yInput.value = yValue.toString();
                yInput.step = 'any';
                yInput.addEventListener('change', () => {
                    currentList[index] = `new Vector(${parseFloat(xInput.value) || 0}, ${parseFloat(yInput.value) || 0})`;
                    node.properties[key] = [...currentList];
                    updateRender();
                });

                vectorItemContainer.append(xLabel, xInput, yLabel, yInput);
                itemInput = vectorItemContainer;
            } else if (propDef.subType === 'number') {
                const numberItemInput = document.createElement('input');
                numberItemInput.type = 'number';
                numberItemInput.value = item !== undefined ? item : '';
                numberItemInput.step = 'any';
                numberItemInput.addEventListener('change', () => {
                    currentList[index] = parseFloat(numberItemInput.value) || 0;
                    node.properties[key] = [...currentList];
                    updateRender();
                });
                itemInput = numberItemInput;
            } else if (propDef.subType === 'Part') {
                const partItemInput = createPartInput(node, key, propDef, propDef.tertiaryType || "Part", index);
                itemInput = partItemInput;
            } else {
                const textItemInput = document.createElement('input');
                textItemInput.type = 'text';
                textItemInput.value = item;
                textItemInput.addEventListener('change', () => {
                    currentList[index] = textItemInput.value;
                    node.properties[key] = [...currentList];
                    updateRender();
                });
                itemInput = textItemInput;
            }

            const removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.addEventListener('click', () => {
                currentList.splice(index, 1);
                node.properties[key] = [...currentList];
                updateRender();
                renderListItems();
            });

            itemRow.append(itemInput, removeButton);
            listContainer.appendChild(itemRow);
        });

        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.addEventListener('click', () => {
            let newItemDefault: any;
            if (Array.isArray(propDef.default) && propDef.default.length > currentList.length) {
                newItemDefault = propDef.default[currentList.length];
            } else {
                newItemDefault = getDefaultItem();
            }
            node.properties[key] = [...(node.properties[key] || []), newItemDefault];
            updateRender();
            renderListItems();
        });
        listContainer.appendChild(addButton);
    };

    renderListItems();
    return listContainer;
}

function formatPropertyKey(text: string, separator = " "): string {
    return text.replace(/[A-Z]|\d+/g, match => separator + match.toUpperCase())
        .replace(new RegExp('^' + separator), '').charAt(0).toUpperCase() + text.slice(1);
}

function getAllowedSubtypes(baseType: string): string[] {
    console.log("Getting allowed subtypes for:", baseType);
    const allowed = new Set<string>();
    allowed.add(baseType);

    // Recursively find all types that extend baseType
    for (const type in (window as any).nodeDefinitions) {
        const def = (window as any).nodeDefinitions[type];
        if (def.code) {
            // Parse the code to find the extended class
            const extendsMatch = def.code.match(/class\s+\w+\s+extends\s+(\w+)/);
            if (extendsMatch && extendsMatch[1] === baseType) {
                allowed.add(type);
            }
        }
    }
    return Array.from(allowed);
}

function createNodeSelectionPopup(targetNode: GameNode, targetKey: string, subType: string, tertiaryType?: string, listIndex?: number) {
    const popup = document.createElement('div');
    popup.classList.add('node-selection-popup');

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = `Search ${subType}s...`;
    searchInput.classList.add('node-search-input');
    popup.appendChild(searchInput);

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('node-options-container');
    popup.appendChild(optionsContainer);

    let allNodes: GameNode[] = [];
    let filteredNodes: GameNode[] = [];
    let selectedIndex = -1;

    const collectNodes = (node: GameNode) => {
        if (
            (!tertiaryType || tertiaryType === 'Part') && (
                subType === 'Part')) {
            allNodes.push(node);
        } else {
            const allowedTypes = getAllowedSubtypes(tertiaryType ? tertiaryType : subType);
            if (allowedTypes.includes(node.type)) {
                allNodes.push(node);
            }
        }
        node.children.forEach(collectNodes);
    };
    collectNodes(state.gameTree);

    const renderOptions = (filter: string) => {
        optionsContainer.innerHTML = '';
        filteredNodes = allNodes.filter(node =>
            node.properties.name.toLowerCase().includes(filter.toLowerCase()) ||
            node.type.toLowerCase().includes(filter.toLowerCase())
        );

        if (selectedIndex >= filteredNodes.length) {
            selectedIndex = filteredNodes.length > 0 ? 0 : -1;
        }

        filteredNodes.forEach((node, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('node-option');
            optionDiv.textContent = `${node.parent ? node.parent + "." : ''}${node.properties.name} (${node.type})`;
            if (index === selectedIndex) {
                optionDiv.classList.add('selected-option');
            }
            optionDiv.addEventListener('click', () => {
                if (typeof listIndex === "number") {
                    targetNode.properties[targetKey][listIndex] = [node.properties.name, node.id];
                } else {
                    targetNode.properties[targetKey] = [node.properties.name, node.id];
                }
                document.body.removeChild(popup);
                updateTreeDisplay();
                renderProperties(targetNode);
                removeListeners();
            });
            optionsContainer.appendChild(optionDiv);
        });
    };
    const handleInput = (event: Event) => {
        selectedIndex = -1;
        renderOptions((event.target as HTMLInputElement).value);
    }
    const handleKeyDown = (event: KeyboardEvent) => {
        if (filteredNodes.length === 0) return;

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            selectedIndex = (selectedIndex + 1) % filteredNodes.length;
            renderOptions(searchInput.value);
            optionsContainer.children[selectedIndex]?.scrollIntoView({ block: 'nearest' });
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            selectedIndex = (selectedIndex - 1 + filteredNodes.length) % filteredNodes.length;
            renderOptions(searchInput.value);
            optionsContainer.children[selectedIndex]?.scrollIntoView({ block: 'nearest' });
        } else if (event.key === 'Enter') {
            event.preventDefault();
            if (selectedIndex !== -1) {
                if (typeof listIndex === "number") {
                    targetNode.properties[targetKey][listIndex] = [filteredNodes[selectedIndex].properties.name, filteredNodes[selectedIndex].id];
                } else {
                    targetNode.properties[targetKey] = [filteredNodes[selectedIndex].properties.name, filteredNodes[selectedIndex].id];
                }
                document.body.removeChild(popup);
                removeListeners();
                updateTreeDisplay();
                renderProperties(targetNode);
            }
        } else if (event.key === 'Escape') {
            event.preventDefault();
            removeListeners();
            document.body.removeChild(popup);
        }
    }
    searchInput.addEventListener('keydown', handleKeyDown);
    searchInput.addEventListener('input', handleInput);
    searchInput.addEventListener('blur', blur);
    searchInput.addEventListener('focus', focus);
    function removeListeners() {
        searchInput.removeEventListener('keydown', handleKeyDown);
        searchInput.removeEventListener('input', handleInput);
        searchInput.removeEventListener('blur', blur);
        searchInput.removeEventListener('focus', focus);
    }
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('cancel-button');
    cancelButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });
    popup.appendChild(cancelButton);

    document.body.appendChild(popup);
    searchInput.focus();
    renderOptions('');
}

let tooltipTimeout: NodeJS.Timeout | null = null;
const tooltip = document.createElement('div');
tooltip.id = 'property-tooltip';
tooltip.style.cssText = `
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
`;
document.body.appendChild(tooltip);

function showTooltip(event: MouseEvent, text: string) {
    if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
    }
    tooltip.textContent = text;
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
    tooltip.style.opacity = '1';
}

function hideTooltip() {
    tooltipTimeout = setTimeout(() => {
        tooltip.style.opacity = '0';
    }, 100); // Small delay before hiding
}