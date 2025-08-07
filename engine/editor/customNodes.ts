import { state } from "./state.ts";
import { nodeDefinitions } from "./definitions.ts";
import type { CustomNodeRow, GameNode, NodeDefinition } from "./types.ts";
import { pleaseLogin, prompt, showNotification } from "./notification.ts";
import { supabase } from "./supabase.ts";

const customNodesContainer = document.getElementById('custom-nodes-container')!;
const saveNodeButton = document.getElementById('save-node-button')! as HTMLButtonElement;
const newNodeButton = document.getElementById('new-node-button')! as HTMLButtonElement;
const shareNodeButton = document.getElementById('share-node-button')! as HTMLButtonElement;
const nodeEditorTitle = document.getElementById('node-editor-title')!;

let centerEditor: any; // CodeMirror instance

export function setEditor(editor: any) {
    centerEditor = editor;
}

export function setupCustomNodes() {
    updateCustomNodesList();

    saveNodeButton.addEventListener('click', saveCustomNode)

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
  static singular = true; // Indicates this node should only have one instance per parent
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

function saveCustomNode(): NodeDefinition | undefined {
    if (!state.selectedCustomNode) {
        showNotification('Please select a node to edit first.', 'error');
        return;
    }
    const code = centerEditor.getValue();
    const nameMatch = code.match(/class\s+(\w+)\s+extends\s+\w+/);
    if (!nameMatch) {
        showNotification('Invalid custom node format.', 'error');
        return;
    }
    const customNodeName = nameMatch[1];
    try {
        const propertiesExtract = `class Part { constructor() {}} class GameObject extends Part {} class Transform extends Part {} class Renderer extends Part {} class Collider extends Part {}\n\n${code}\n\n${customNodeName}.properties`;
        const singularExtract = `class Part { constructor() {}} class GameObject extends Part {} class Transform extends Part {} class Renderer extends Part {} class Collider extends Part {}\n\n${code}\n\n${customNodeName}.singular`;
        const customProperties = eval(propertiesExtract);
        const isSingular = eval(singularExtract);

        state.customNodeEditTimes[customNodeName] = Date.now();

        nodeDefinitions[customNodeName] = {
            properties: customProperties,
            code: code,
            children: [],
            singular: isSingular
        };
        showNotification(`Custom node '${customNodeName}' saved!`, 'success');
        updateCustomNodesList();

        if (customNodeName !== state.selectedCustomNode.type) {
            setTimeout(() => selectCustomNode(customNodeName, 'custom'), 100);
        }

        return nodeDefinitions[customNodeName];
    } catch (error: any) {
        showNotification(`Error parsing node properties: ${error.message}`, 'error');
    }
}
async function shareCustomNode() {
    const gameNode = saveCustomNode();
    if (!gameNode) {
        showNotification('No custom node to share.', 'error');
        return;
    }
    if (!gameNode.code) {
        showNotification('Custom node code is empty. Please save it first.', 'error');
        return;
    }

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
        pleaseLogin();
        showNotification('You must be logged in to share custom nodes.', 'info');
        return;
    }

    const modal = document.getElementById('share-node-modal')!;
    const nameInput = document.getElementById('share-node-name')! as HTMLInputElement;
    const descriptionInput = document.getElementById('share-node-description')! as HTMLTextAreaElement;
    const showcaseInput = document.getElementById('share-node-showcase')! as HTMLInputElement;
    const documentationInput = document.getElementById('share-node-documentation')! as HTMLInputElement;
    const submitButton = document.getElementById('share-node-submit')!;
    const cancelButton = document.getElementById('share-node-cancel')!;

    const nameMatch = gameNode.code.match(/class\s+(\w+)\s+extends/);
    const nodeName = nameMatch ? nameMatch[1] : 'UnknownPart';
    nameInput.value = nodeName;

    modal.style.display = 'block';

    const closeAndCleanup = () => {
        modal.style.display = 'none';
        descriptionInput.value = '';
        showcaseInput.value = '';
        documentationInput.value = '';
        submitButton.onclick = null;
        cancelButton.onclick = null;
    };

    cancelButton.onclick = closeAndCleanup;

    submitButton.onclick = async () => {
        const description = descriptionInput.value;
        const showcaseFiles = showcaseInput.files;
        const documentationFile = documentationInput.files?.[0];

        if (!description) {
            showNotification('Please enter a description.', 'error');
            return;
        }
        if (showcaseFiles && showcaseFiles.length > 5) {
            showNotification('You can upload a maximum of 5 showcase files.', 'error');
            return;
        }

        showNotification('Sharing custom node...', 'info');

        const userId = user.id;
        const partPath = `${userId}/${nodeName}`;

        let featured_image: string | undefined;
        const showcase_files: string[] = [];

        if (showcaseFiles) {
            for (const file of Array.from(showcaseFiles)) {
                const url = await uploadFile(file, `${partPath}/showcase/${new Date().getTime()}-${Math.random().toString(36).substring(2, 15)}-${file.name}`);
                if (url) {
                    showcase_files.push(url);
                    if (!featured_image) {
                        featured_image = url;
                    }
                }
            }
        }

        let documentation_file: string | undefined;
        if (documentationFile) {
            documentation_file = await uploadFile(documentationFile, `${partPath}/documentation.md`);
        }

        const shareData: CustomNodeRow = {
            code: gameNode.code!,
            name: nodeName,
            description: description,
            upvotes: 0,
            anon: false,
            singular: gameNode.singular || false,
            properties: gameNode.properties,
            featured_image,
            showcase_files,
            documentation_file,
            owner: userId
        };

        const { data: existing, error: existingError } = await supabase
            .from('custom_nodes')
            .select('id, upvotes')
            .eq('owner', userId)
            .eq('name', nodeName)
            .single();

        if (existingError && existingError.code !== 'PGRST116') { // Ignore 'not found' error
            console.error('Error checking for existing node:', existingError);
            showNotification('Failed to share custom node. Please try again.', 'error');
            return;
        }

        if (existing) {
            // Update existing node
            const { data, error: updateError } = await supabase
                .from('custom_nodes')
                .update({ ...shareData, upvotes: existing.upvotes })
                .eq('id', existing.id)
                .select()
                .single();
            if (updateError) {
                console.error('Error updating custom node:', updateError);
                showNotification('Failed to update custom node. Please try again.', 'error');
            } else {
                showNotification(`Custom node '${data.name}' updated successfully!`, 'success');
                updateCustomNodesList();
            }
        } else {
            // Insert new node
            const { data, error: insertError } = await supabase
                .from('custom_nodes')
                .insert([shareData])
                .select()
                .single();
            if (insertError) {
                console.error('Error sharing custom node:', insertError);
                showNotification('Failed to share custom node. Please try again.', 'error');
            } else {
                showNotification(`Custom node '${data.name}' shared successfully!`, 'success');
                updateCustomNodesList();
            }
        }

        closeAndCleanup();
    };
}

async function uploadFile(file: File, path: string): Promise<string | undefined> {
    const { data, error } = await supabase.storage
        .from('part-files')
        .upload(path, file, { upsert: true });

    if (error) {
        console.error('Error uploading file:', error);
        showNotification(`Failed to upload file: ${file.name}`, 'error');
        return undefined;
    }

    const { data: { publicUrl } } = supabase.storage.from('part-files').getPublicUrl(path);
    return publicUrl;
}



shareNodeButton.addEventListener('click', shareCustomNode);
