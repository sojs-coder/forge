import { state } from "./state.ts";
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
            // ... other cases like color, list, Part will be added here
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

function formatPropertyKey(text: string, separator = " "): string {
    return text.replace(/[A-Z]|\d+/g, match => separator + match.toUpperCase())
        .replace(new RegExp('^' + separator), '').charAt(0).toUpperCase() + text.slice(1);
}
