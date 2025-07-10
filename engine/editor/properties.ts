import { state, findNodeById } from "./state.ts";
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

        let input: HTMLElement;

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
                const partContainer = document.createElement('div');
                partContainer.classList.add('part-property-container');

                const currentPartId = node.properties[key];
                const currentPart = currentPartId ? findNodeById(state.gameTree, currentPartId) : null;

                const partDisplay = document.createElement('span');
                partDisplay.classList.add('part-name-display');
                partDisplay.textContent = currentPart ? currentPart.properties.name : '(None)';
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
                            // Check if the dropped node is compatible with the subType
                            const allowedTypes = getAllowedSubtypes(propDef.subType!);
                            if (allowedTypes.includes(droppedNode.type)) {
                                node.properties[key] = droppedNode.id;
                                updateTreeDisplay();
                                renderProperties(node); // Re-render to update display
                            } else {
                                alert(`Cannot assign ${droppedNode.type} to ${propDef.subType} property.`);
                            }
                        }
                    }
                });

                partDisplay.addEventListener('click', () => {
                    createNodeSelectionPopup(node, key, propDef.subType!); // Open selection popup
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
                input = partContainer;
                break;
            case 'color':
                input = createColorInput(node, key, propDef);
                break;
            case 'list':
                input = createListInput(node, key, propDef);
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

        input.addEventListener('input', () => updateRender());
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

function createFileInput(node: GameNode, key: string, propDef: PropertyDefinition): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('file-input-container');

    const fileTypeAccepts = {
        image: 'image/*',
        audio: 'audio/*',
        video: 'video/*',
        json: 'application/json'
    };

    if (node.type === 'AnimatedSprite' && key === 'spritesheet') {
        // Custom handling for AnimatedSprite spritesheet
        const jsonInput = document.createElement('input');
        jsonInput.type = 'file';
        jsonInput.accept = fileTypeAccepts.json;
        jsonInput.style.display = 'none'; // Hide default input

        const jsonButton = document.createElement('button');
        jsonButton.textContent = node.properties[key] ? 'Change Spritesheet JSON' : 'Select Spritesheet JSON';
        jsonButton.onclick = () => jsonInput.click();

        const jsonFileNameSpan = document.createElement('span');
        jsonFileNameSpan.textContent = node.properties[key] ? ' (Loaded)' : '';

        container.append(jsonButton, jsonFileNameSpan);

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('spritesheet-image-container');
        imageContainer.style.marginTop = '10px';
        container.appendChild(imageContainer);

        const updateImageInput = (spritesheetDataUrl: string | null) => {
            imageContainer.innerHTML = '';
            if (spritesheetDataUrl) {
                try {
                    const decodedJson = JSON.parse(atob(spritesheetDataUrl.split(',')[1]));
                    if (decodedJson.meta && decodedJson.meta.image) {
                        const imageInput = document.createElement('input');
                        imageInput.type = 'file';
                        imageInput.accept = fileTypeAccepts.image;
                        imageInput.style.display = 'none';

                        const imageButton = document.createElement('button');
                        imageButton.textContent = node.properties.spritesheetImage ? 'Change Spritesheet Image' : 'Select Spritesheet Image';
                        imageButton.onclick = () => imageInput.click();

                        const imageFileNameSpan = document.createElement('span');
                        imageFileNameSpan.textContent = node.properties.spritesheetImage ? ' (Loaded)' : '';

                        imageInput.addEventListener('change', (event) => {
                            const file = (event.target as HTMLInputElement).files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    node.properties.spritesheetImage = e.target?.result;
                                    imageButton.textContent = 'Change Spritesheet Image';
                                    imageFileNameSpan.textContent = ' (Loaded)';
                                    updateRender();
                                };
                                reader.readAsDataURL(file);
                            }
                        });
                        imageContainer.append(imageButton, imageFileNameSpan);
                    }
                } catch (e) {
                    console.error("Error parsing spritesheet JSON:", e);
                }
            }
        };

        jsonInput.addEventListener('change', (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    node.properties[key] = e.target?.result;
                    jsonButton.textContent = 'Change Spritesheet JSON';
                    jsonFileNameSpan.textContent = ' (Loaded)';
                    updateImageInput(e.target?.result as string);
                    updateRender();
                };
                reader.readAsDataURL(file);
            }
        });

        // Initial call to set up image input if JSON is already present
        updateImageInput(node.properties[key]);

    } else {
        // Existing behavior for other file types
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        if (propDef.fileType) {
            fileInput.accept = fileTypeAccepts[propDef.fileType] || '';
        }

        const currentFileName = node.properties[key] ? (node.properties[key].substring(0, 30) + '...') : 'No file selected';
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
                reader.readAsDataURL(file);
            }
        });
        container.append(displaySpan, selectButton, fileInput);
    }

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

function createColorInput(node: GameNode, key: string, propDef: PropertyDefinition): HTMLElement {
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = node.properties[key] !== undefined ? node.properties[key] : propDef.default;
    colorInput.addEventListener('change', (event) => {
        node.properties[key] = (event.target as HTMLInputElement).value;
        updateRender();
    });
    return colorInput;
}

function createListInput(node: GameNode, key: string, propDef: PropertyDefinition): HTMLElement {
    const listContainer = document.createElement('div');
    listContainer.classList.add('list-container');

    const renderListItems = () => {
        listContainer.innerHTML = '';
        const currentList = node.properties[key] || [];

        currentList.forEach((item: any, index: number) => {
            const itemRow = document.createElement('div');
            itemRow.classList.add('list-item-row');

            let itemInput: HTMLElement;
            if (propDef.subType === 'Vector') {
                // Assuming Vector subType for now, similar to createVectorInput
                const vectorItemContainer = document.createElement('div');
                const xMatch = item.match(/new\s+Vector\s*\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)/);
                let xValue = xMatch ? parseFloat(xMatch[1]) : 0;
                let yValue = xMatch ? parseFloat(xMatch[2]) : 0;

                const xInput = document.createElement('input');
                xInput.type = 'number';
                xInput.value = xValue.toString();
                xInput.step = 'any';
                xInput.addEventListener('change', () => {
                    currentList[index] = `new Vector(${parseFloat(xInput.value) || 0}, ${parseFloat(yInput.value) || 0})`;
                    node.properties[key] = [...currentList];
                    updateRender();
                });

                const yInput = document.createElement('input');
                yInput.type = 'number';
                yInput.value = yValue.toString();
                yInput.step = 'any';
                yInput.addEventListener('change', () => {
                    currentList[index] = `new Vector(${parseFloat(xInput.value) || 0}, ${parseFloat(yInput.value) || 0})`;
                    node.properties[key] = [...currentList];
                    updateRender();
                });

                vectorItemContainer.append('X:', xInput, 'Y:', yInput);
                itemInput = vectorItemContainer;
            } else {
                // Default to text input for other subTypes
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
            const newItemDefault = propDef.subType === 'Vector' ? 'new Vector(0,0)' : '';
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

function createNodeSelectionPopup(targetNode: GameNode, targetKey: string, subType: string) {
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
        const allowedTypes = getAllowedSubtypes(subType);
        if (allowedTypes.includes(node.type)) {
            allNodes.push(node);
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
            optionDiv.textContent = `${node.properties.name} (${node.type})`;
            if (index === selectedIndex) {
                optionDiv.classList.add('selected-option');
            }
            optionDiv.addEventListener('click', () => {
                targetNode.properties[targetKey] = node.id;
                document.body.removeChild(popup);
                updateTreeDisplay();
                renderProperties(targetNode);
            });
            optionsContainer.appendChild(optionDiv);
        });
    };

    searchInput.addEventListener('input', (event) => {
        selectedIndex = -1;
        renderOptions((event.target as HTMLInputElement).value);
    });

    searchInput.addEventListener('keydown', (event) => {
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
                targetNode.properties[targetKey] = filteredNodes[selectedIndex].id;
                document.body.removeChild(popup);
                updateTreeDisplay();
                renderProperties(targetNode);
            }
        } else if (event.key === 'Escape') {
            event.preventDefault();
            document.body.removeChild(popup);
        }
    });

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
