const treeView = document.getElementById('tree-view');
const propertyEditorContainer = document.getElementById('property-editor-container');
const propertyEditor = document.getElementById('property-editor');
const addNodeButton = document.getElementById('add-node-button');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');
const gameContainer = document.getElementById('game-container');
const gameTab = document.getElementById('game-tab');
const editorTab = document.getElementById('editor-tab');
const nodeEditorContainer = document.getElementById('node-editor-container');
const customNodesList = document.getElementById('custom-nodes-list');
const customNodesContainer = document.getElementById('custom-nodes-container');
const saveNodeButton = document.getElementById('save-node-button');
const newNodeButton = document.getElementById('new-node-button');
const minifyOpts = {
  compress: {
    dead_code: false,
    unused: false,
    side_effects: false,
  },
  mangle: true,
  format: {
    wrap_func_args: false,
  }
};


let ready = false;
let selectedNode = null;
let currentGameInstance = null;
let isGamePaused = false;
let currentTab = 'game';
let selectedCustomNode = null;
let centerEditor = null; // CodeMirror instance for center panel
let customNodeEditTimes = {}; // Track last edit times for custom nodes
let gameTree = {
  id: 'game_root',
  name: 'Game',
  type: 'Game',
  properties: {
    name: 'MyGame',
    canvas: 'gamecanvas',
    width: 800,
    height: 600,
    devmode: true,
    disableAntiAliasing: false
  },
  children: []
};
const canvas = document.getElementById("gamecanvas");
canvas.width = gameTree.properties.width;
canvas.height = gameTree.properties.height;
const context = canvas.getContext("2d");
context.font = "16px Arial";
context.textAlign = "center";
context.fillStyle = "white";
const loadingText = "Loading engine...";
context.fillText(loadingText, canvas.width / 2, canvas.height / 2);
// Make engine classes globally available
import("./bundle.js").then(engineModule => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  Object.assign(window, engineModule);
  ready = true;
  const successText = "Engine loaded successfully.";
  context.textAlign = "center";
  context.fillText(successText, canvas.width / 2, canvas.height / 2);

  // Initialize center panel CodeMirror editor
  initializeCenterEditor();

  // Initialize custom nodes list
  updateCustomNodesList();
});

function renderTree(node, parentElement) {
  const nodeElement = document.createElement('div');
  nodeElement.classList.add('node-item');
  nodeElement.dataset.nodeId = node.id;
  nodeElement.dataset.nodeType = node.type; // Store the type for drag and drop
  nodeElement.draggable = true; // Make nodes draggable

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
      updateTreeDisplay(); // Re-render to reflect expanded/collapsed state
    });
    nodeElement.prepend(toggle);
  }

  if (node === selectedNode) {
    nodeElement.classList.add('selected');
  }

  nodeElement.addEventListener('click', (event) => {
    event.stopPropagation();
    selectNode(node);
  });

  // Drag and Drop Event Listeners for hierarchy
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

let draggedNode = null;

function handleDragStart(event) {
  draggedNode = findNodeById(gameTree, event.target.dataset.nodeId);
  event.dataTransfer.effectAllowed = 'copyMove'; // Allow both copy and move
  event.dataTransfer.setData('text/plain', event.target.dataset.nodeId); // We don't need the type bc we can use find node and validate from that
}

function handleDragOver(event) {
  // Only handle drag over for tree nodes, not input fields
  if (event.target.classList.contains('node-item') || event.target.closest('.node-item')) {
    event.preventDefault(); // Allow drop
    event.dataTransfer.dropEffect = 'move';

    const nodeElement = event.target.classList.contains('node-item') ? event.target : event.target.closest('.node-item');
    if (nodeElement) {
      nodeElement.classList.add('drag-over');
    }
  }
}

function handleDragLeave(event) {
  const nodeElement = event.target.classList.contains('node-item') ? event.target : event.target.closest('.node-item');
  if (nodeElement) {
    nodeElement.classList.remove('drag-over');
  }
}

function handleDrop(event) {
  event.preventDefault();
  event.target.classList.remove('drag-over');

  const droppedNodeId = event.dataTransfer.getData('text/plain');
  const targetNodeId = event.target.dataset.nodeId;
  const targetNode = findNodeById(gameTree, targetNodeId);


  if (!draggedNode || !targetNode || draggedNode.id === targetNode.id) {
    console.log('Invalid drop: draggedNode or targetNode is null, or same node.');
    return;
  }

  // Prevent dropping a parent onto its child
  let tempNode = targetNode;
  while (tempNode) {
    if (tempNode.id === draggedNode.id) {
      alert("Cannot drop a parent onto its child.");
      return;
    }
    tempNode = findParentNode(gameTree, tempNode.id);
  }

  // Remove dragged node from its original parent
  const oldParent = findParentNode(gameTree, draggedNode.id);
  if (oldParent) {
    oldParent.children = oldParent.children.filter(child => child.id !== draggedNode.id);
  }

  // Add dragged node to the new parent's children
  if (!targetNode.children) {
    targetNode.children = [];
  }
  targetNode.children.push(draggedNode);

  updateTreeDisplay();
  selectNode(draggedNode); // Re-select the dragged node after moving
}

function findNodeById(node, id) {
  if (node.id === id) {
    return node;
  }
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

function findParentNode(parentNode, targetId) {
  if (parentNode.children) {
    for (const child of parentNode.children) {
      if (child.id === targetId) {
        return parentNode;
      }
      const found = findParentNode(child, targetId);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

function updateTreeDisplay() {
  treeView.innerHTML = '';
  renderTree(gameTree, treeView);
  updateRender();
}


function selectNode(node) {
  if (selectedNode) {
    const prevSelected = document.querySelector(`[data-node-id="${selectedNode.id}"]`);
    if (prevSelected) {
      prevSelected.classList.remove('selected');
    }
  }
  selectedNode = node;
  const newSelected = document.querySelector(`[data-node-id="${selectedNode.id}"]`);
  if (newSelected) {
    newSelected.classList.add('selected');
  }

  // Check if the selected node is a custom node and automatically switch to editor tab
  if (nodeDefinitions[node.type] && nodeDefinitions[node.type].code) {
    renderProperties(node);
    // Switch to editor tab
    switchTab('editor');

    // Select the custom node in the custom nodes list
    setTimeout(() => {
      selectCustomNode(node.type, 'custom');
    }, 100);
  } else {
    // Show properties for built-in nodes
    renderProperties(node);
  }
}

function renderProperties(node) {
  propertyEditor.innerHTML = '';
  if (!node) return;

  const definition = nodeDefinitions[node.type];
  if (!definition) return;

  // Create error message element
  const errorMsg = document.createElement('span');
  errorMsg.style.color = 'red';
  errorMsg.style.fontSize = '0.7em';
  errorMsg.style.display = 'none';
  for (const key in definition.properties) {
    const group = document.createElement('div');
    group.classList.add("property-group");
    // Create row container for label and input
    const row = document.createElement('div');
    row.classList.add("property-group-row");
    const left = document.createElement("div");
    const right = document.createElement("div");
    left.className = "left";
    right.className = "right";

    const propDef = definition.properties[key];
    const label = document.createElement('label');
    label.textContent = formatPropertyKey(key) + ':';

    let input = document.createElement('input');
    input.type = propDef.type;

    if (propDef.type === 'Part') {
      input.type = 'text'; // Render as text input
      input.readOnly = true;
      input.placeholder = `Drag a ${propDef.subType || 'Part'} here`;
      console.log("Render props for", node);
      input.value = node.properties[key] ? (node.properties[key].properties.name) + ' (' + node.properties[key].type + ')' : '';
      input.dataset.propertyKey = key; // Add this line

      // Add drag and drop listeners for Part properties
      input.addEventListener('dragenter', (event) => {
        event.preventDefault();
      });

      input.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.stopPropagation(); // Stop event bubbling

        // Check if we have valid data being dragged
        const hasTextData = event.dataTransfer.types.includes('text/plain');
        if (hasTextData) {
          event.dataTransfer.dropEffect = 'copy';
          input.classList.add('drag-over-input');
        } else {
          event.dataTransfer.dropEffect = 'none';
        }
      });
      input.addEventListener('dragleave', (event) => {
        // Only remove the class if we're actually leaving the input (not going to a child)
        if (!input.contains(event.relatedTarget)) {
          input.classList.remove('drag-over-input');
        }
      });
      input.addEventListener('drop', (event) => {
        event.preventDefault();
        event.stopPropagation(); // Stop event bubbling
        input.classList.remove('drag-over-input');

        const droppedNodeId = event.dataTransfer.getData('text/plain');

        if (!droppedNodeId) {
          console.warn('No node ID found in drop data');
          return;
        }

        const droppedNode = findNodeById(gameTree, droppedNodeId);
        if (droppedNode) {
          if (droppedNode.type !== propDef.subType) {
            console.warn('Dropped node type mismatch:', droppedNode.type, propDef.subType);
            alert(`This property only accepts ${propDef.subType} nodes.`);
            return;
          }
          console.log(droppedNode)
          node.properties[key] = droppedNode; // Assign the dropped node object
          input.value = droppedNode.properties.name + ' (' + droppedNode.type + ')';
        } else {
          console.warn('Could not find node with ID:', droppedNodeId);
        }
      });
    } else if (propDef.type === 'boolean') {
      input.type = 'checkbox';
      input.checked = !!node.properties[key];
      input.addEventListener('change', (event) => {
        node.properties[key] = event.target.checked;
        // Update hierarchy view if name changes
        if (key === 'name') {
          updateTreeDisplay();
        }
      });
    } else if (propDef.type === 'Vector') {
      // Create Vector input container
      const vectorContainer = document.createElement('div');
      vectorContainer.classList.add('vector-container');
      vectorContainer.style.display = 'flex';
      vectorContainer.style.alignItems = 'center';

      // Parse existing value or use default
      let xValue = 0, yValue = 0;
      const currentValue = node.properties[key] || propDef.default;
      if (currentValue) {
        const match = currentValue.match(/new\s+Vector\s*\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)/);
        if (match) {
          xValue = parseFloat(match[1]);
          yValue = parseFloat(match[2]);
        }
      }

      // Create X input
      const xLabel = document.createElement('span');
      xLabel.textContent = 'X:';
      xLabel.style.minWidth = '15px';
      const xInput = document.createElement('input');
      xInput.type = 'number';
      xInput.value = xValue;
      xInput.step = 'any';
      xInput.style.flex = '1';

      // Create Y input
      const yLabel = document.createElement('span');
      yLabel.textContent = 'Y:';
      yLabel.style.minWidth = '15px';
      const yInput = document.createElement('input');
      yInput.type = 'number';
      yInput.value = yValue;
      yInput.step = 'any';
      yInput.style.flex = '1';

      // Update function to sync both inputs to the property
      const updateVectorProperty = () => {
        const x = parseFloat(xInput.value) || 0;
        const y = parseFloat(yInput.value) || 0;
        node.properties[key] = `new Vector(${x}, ${y})`;
        if (key === 'name') {
          updateTreeDisplay();
        }
      };

      xInput.addEventListener('change', updateVectorProperty);
      yInput.addEventListener('change', updateVectorProperty);

      vectorContainer.appendChild(xLabel);
      vectorContainer.appendChild(xInput);
      vectorContainer.appendChild(yLabel);
      vectorContainer.appendChild(yInput);

      // Replace the input with the vector container
      input = vectorContainer;
    } else if (propDef.type === 'list') {
      input.type = 'text';
      if (propDef.subType === 'Vector') {
        input.placeholder = 'Click + to add Vectors with X/Y inputs';
      } else {
        input.placeholder = `List of ${propDef.subType || 'values'}`;
      }
      input.value = node.properties[key] !== undefined ? node.properties[key] : propDef.default;

      // Add a button to open visual list editor
      const editButton = document.createElement('span');
      editButton.textContent = '►';;
      editButton.title = 'Open visual editor';
      editButton.classList.add('edit-list-button');
      editButton.addEventListener('click', () => {
        toggleListDrawer(node, key, propDef, input, group, editButton);
      });
      left.appendChild(editButton);

      // Add validation for list format
      input.addEventListener('input', (event) => {
        const value = event.target.value;
        if (propDef.subType === 'Vector') {
          // Validate list of Vectors: "new Vector(x, y), new Vector(x, y), ..."
          const vectorListPattern = /^new\s+Vector\s*\(\s*[-+]?\d*\.?\d+\s*,\s*[-+]?\d*\.?\d+\s*\)(\s*,\s*new\s+Vector\s*\(\s*[-+]?\d*\.?\d+\s*,\s*[-+]?\d*\.?\d+\s*\))*$/;
          if (value && !vectorListPattern.test(value)) {
            input.style.borderColor = 'red';
            input.title = 'Format: new Vector(x, y), new Vector(x, y), ... (comma-separated)';
          } else {
            input.style.borderColor = '';
            input.title = '';
          }
        }
      });

      input.addEventListener('change', (event) => {
        node.properties[key] = event.target.value;
        if (key === 'name') {
          updateTreeDisplay();
        }
      });

      // Add the edit button to the row
      row.appendChild(editButton);
    } else if (propDef.type === 'color') {
      input.type = 'color';
      input.value = node.properties[key] !== undefined ? node.properties[key] : propDef.default;
      input.addEventListener('change', (event) => {
        node.properties[key] = event.target.value;
        if (key === 'name') {
          updateTreeDisplay();
        }
      });
    } else {
      input.value = node.properties[key] !== undefined ? node.properties[key] : propDef.default;
      // Add pattern validation and error message
      input.pattern = "[a-zA-Z0-9_]+"; // Allow only alphanumeric and underscore characters


      if (propDef.type === 'number') {
        input.type = 'number';
      }
      input.addEventListener('change', (event) => {
        let value = event.target.value;
        if (propDef.type === 'number') {
          value = parseFloat(value);
          console.log(value);
        }
        node.properties[key] = value;
        // Update hierarchy view if name changes
        if (key === 'name') {
          updateTreeDisplay();
        }
      });

      input.addEventListener('input', (event) => {
        if (!input.value.match(/^[a-zA-Z0-9_]*$/) && input.type !== "number") { // Allow empty string too
          input.style.borderColor = 'red';
          errorMsg.textContent = 'Invalid format. Only letters, numbers, and underscores allowed.';
          errorMsg.style.display = 'inline';
        } else {
          input.style.borderColor = '';
          errorMsg.style.display = 'none';
        }
      });
    }
    input.addEventListener('input', () => {
      updateRender();
    })
    input.addEventListener('change', () => {
      updateRender();
    })
    left.appendChild(label);
    right.appendChild(input);
    row.appendChild(left);
    row.appendChild(right);
    group.appendChild(row);
    propertyEditor.appendChild(group);
  }
  propertyEditor.appendChild(errorMsg);

}

function formatPropertyKey(text, separator = " ") {
  // Replace all capital letters and group of numbers by the
  // separator followed by lowercase version of the match
  var text = text.replace(/[A-Z]|\d+/g, function (match) {
    return separator + match.toUpperCase();
  });

  // Remove first separator (to avoid _hello_world name)
  return text.replace(new RegExp('^' + separator), '').charAt(0).toUpperCase() + text.slice(1);
}

addNodeButton.addEventListener('click', () => {
  if (!selectedNode) {
    alert('Please select a parent node first.');
    return;
  }

  const allowedChildren = nodeDefinitions[selectedNode.type].children;
  const customNodeTypes = Object.keys(nodeDefinitions).filter(key => nodeDefinitions[key].code);
  const allAllowedTypes = [...(allowedChildren || []), ...customNodeTypes];

  // Create a dropdown for node type selection
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
    selectContainer.remove(); // Close the dropdown
  });
  confirmButton.addEventListener('click', () => {
    const nodeType = select.value;
    const newNodeDef = nodeDefinitions[nodeType];
    const newProperties = {};
    for (const key in newNodeDef.properties) {
      newProperties[key] = newNodeDef.properties[key].default;
    }

    // Set a default name if not already set
    if (!newProperties.name) {
      newProperties.name = nodeType + '_' + (selectedNode.children.length + 1);
    }

    const newNode = {
      id: shuffle((Date.now().toString(36) + Math.random().toString(36).substring(2)).split('')).join(''), // Generate a unique ID
      type: nodeType,
      properties: newProperties, // Use the properties directly, not nested
      children: []
    };
    selectedNode.children.push(newNode);
    updateTreeDisplay(); // Rebuild the tree after adding a new node
    selectNode(newNode);
    selectContainer.remove(); // Close the dropdown
  });
  selectContainer.appendChild(confirmButton);
  selectContainer.appendChild(cancelButton);
  document.body.appendChild(selectContainer);
  confirmButton.focus();
});

playButton.addEventListener('click', async () => {
  const gameCode = generateGameCode(gameTree, true); // Set to true to start the game
  console.log(gameCode);

  // Remove any existing game canvas
  const existingCanvas = document.getElementById('gamecanvas');
  if (existingCanvas) {
    existingCanvas.remove();
  }

  // Stop current game if running
  if (currentGameInstance) {
    stopGame();
  }

  // Create a new canvas directly in the game container
  const canvas = document.createElement('canvas');
  canvas.id = gameTree.properties.canvas;
  canvas.width = gameTree.properties.width;
  canvas.height = gameTree.properties.height;
  canvas.style.border = '1px solid #ccc';
  canvas.style.display = 'block';
  canvas.style.margin = '0 auto';
  gameContainer.innerHTML = '';
  gameContainer.appendChild(canvas);

  try {
    console.log('Generated game code:', gameCode);
    const gameFunction = getGameFunction(gameCode);
    console.log('Game function created successfully');

    currentGameInstance = gameFunction();
    console.log('Game instance created:', currentGameInstance);

    isGamePaused = false;

    // Update UI
    if (pauseButton) {
      pauseButton.disabled = false;
      pauseButton.textContent = 'Pause';
    }
    if (stopButton) {
      stopButton.disabled = false;
    }

    console.log('Game started successfully:', currentGameInstance);

  } catch (error) {
    console.error('Error starting game:', error);
    console.error('Error stack:', error.stack);
    gameContainer.innerHTML = `<div style="color: red; padding: 20px;">Error starting game: ${error.message}<br><br>Check console for details.</div>`;
  }
});

// Add pause/resume functionality
if (pauseButton) {
  pauseButton.addEventListener('click', () => {
    if (currentGameInstance) {
      if (isGamePaused) {
        resumeGame();
      } else {
        pauseGame();
      }
    }
  });
}

// Add stop functionality
if (stopButton) {
  stopButton.addEventListener('click', () => {
    if (currentGameInstance) {
      stopGame();
    }
  });
}
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
function getGameFunction(gameCode) {
  // Execute the generated game code
  let codeToRun = `
  (() => {
      ${gameCode}
      return ${getVarName(gameTree)}})();
    `;
  if (typeof minify_sync === 'function') {
    console.log(codeToRun)
    const minifiedObj = minify_sync(codeToRun, minifyOpts);
    codeToRun = minifiedObj.code;
  }
  console.log(codeToRun)
  const gameFunction = new Function(`return ${codeToRun}`);
  return gameFunction;
}
function pauseGame() {
  if (currentGameInstance && !isGamePaused) {
    currentGameInstance.pause();
    isGamePaused = true;
    if (pauseButton) {
      pauseButton.textContent = 'Resume';
    }
    console.log('Game paused');
  }
}

function resumeGame() {
  if (currentGameInstance && isGamePaused) {
    currentGameInstance.resume();
    isGamePaused = false;
    if (pauseButton) {
      pauseButton.textContent = 'Pause';
    }
    console.log('Game resumed');
  }
}

function stopGame() {
  if (currentGameInstance) {
    currentGameInstance.stop();
    currentGameInstance = null;
    isGamePaused = false;
    if (pauseButton) {
      pauseButton.disabled = true;
      pauseButton.textContent = 'Pause';
    }
    if (stopButton) {
      stopButton.disabled = true;
    }
    console.log('Game stopped');
  }
}

function generateGameCode(node, start = true) {
  let code = '';
  const varName = getVarName(node);

  // Include custom node code if it's a custom type
  if (nodeDefinitions[node.type] && nodeDefinitions[node.type].code) {
    code += nodeDefinitions[node.type].code + '\n';
  }

  if (node.type === 'Game') {
    code += `const ${varName} = new Game({
      name: "${node.properties.name}",
      canvas: document.getElementById("${node.properties.canvas}"),
      width: ${node.properties.width},
      height: ${node.properties.height},
      devmode: ${node.properties.devmode},
      disableAntiAliasing: ${node.properties.disableAntiAliasing}
    });\n`;
    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        code += generateGameCode(child);
        code += `${varName}.addChild(${getVarName(child)});\n`;
      }
    }
    // Always call start() if this is the main game generation
    if (start) {
      code += `${varName}.start(${getVarName(node.properties.starterScene) || ""});\n`;
    }
  } else if (node.type === 'Scene') {
    code += `const ${varName} = new Scene({ name: "${node.properties.name}" });\n`;
    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        code += generateGameCode(child);
        code += `${varName}.addChild(${getVarName(child)});\n`;
      }
    }
  } else if (node.type === 'Layer') {
    code += `const ${varName} = new Layer({ name: "${node.properties.name}" });\n`;
    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        code += generateGameCode(child);
        code += `${varName}.addChild(${getVarName(child)});\n`;
      }
    }
  } else if (node.type === 'GameObject') {
    code += `const ${varName} = new GameObject({ name: "${node.properties.name}" });\n`;
    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        code += generateGameCode(child);
        code += `${varName}.addChild(${getVarName(child)});\n`;
      }
    }
  } else if (node.type === 'Camera') {
    const position = node.properties.position || `new Vector(${node.properties.positionX || 0}, ${node.properties.positionY || 0})`;
    const zoom = node.properties.zoom || `new Vector(${node.properties.zoomX || 1}, ${node.properties.zoomY || 1})`;

    code += `const ${varName} = new Camera({
      name: "${node.properties.name}",
      position: ${position},
      zoom: ${zoom}
    });\n`;
  } else if (node.type === 'Input') {
    code += `const ${varName} = new Input({
      key: () => {}, // Placeholder
      keyup: () => {}, // Placeholder
      mousemove: () => {}, // Placeholder
      click: () => {} // Placeholder
    });\n`;
  } else if (node.type === 'Transform') {
    const position = node.properties.position;
    const scale = node.properties.scale;

    code += `const ${varName} = new Transform({
      position: ${position},
      rotation: ${node.properties.rotation || 0},
      scale: ${scale}
    });\n`;
  } else if (node.type === 'BoxCollider') {
    code += `const ${varName} = new BoxCollider({
      width: ${node.properties.width},
      height: ${node.properties.height}
    });\n`;
  } else if (node.type === 'PolygonCollider') {
    code += `const ${varName} = new PolygonCollider({
      vertices: [${node.properties.vertices}] // Vertices are expected as a string that evaluates to Vector objects
    });\n`;
  } else if (node.type === 'ColorRender') {
    code += `const ${varName} = new ColorRender({
      width: ${node.properties.width},
      height: ${node.properties.height},
      color: "${node.properties.color}"
    });\n`;
  } else if (node.type === 'SpriteRender') {
    code += `const ${varName} = new SpriteRender({
      imageSource: "${node.properties.imageSource}",
      width: ${node.properties.width},
      height: ${node.properties.height}
    });\n`;
  } else if (node.type === 'AnimatedSprite') {
    code += `const ${varName} = new AnimatedSprite({
      spritesheet: "${node.properties.spritesheet}",
      width: ${node.properties.width},
      height: ${node.properties.height},
      startingAnimation: "${node.properties.startingAnimation}"
    });\n`;
  } else if (node.type === 'TextRender') {
    code += `const ${varName} = new TextRender({
      name: "${node.properties.name}",
      textContent: "${node.properties.textContent}",
      font: "${node.properties.font}",
      align: "${node.properties.align}",
      color: "${node.properties.color}"
    });\n`;
  } else if (node.type === 'Button') {
    code += `const ${varName} = new Button({
      label: "${node.properties.label}",
      onClick: () => { console.log('Button clicked!'); }, // Placeholder for onClick
      styles: {
        default: {
          backgroundColor: "${node.properties.backgroundColor}",
          color: "${node.properties.color}",
          width: ${node.properties.width},
          height: ${node.properties.height},
          font: "${node.properties.font}"
        }
      }
    });\n`;
  } else {
    // Handle custom nodes
    const customNodeDef = nodeDefinitions[node.type];
    if (customNodeDef && customNodeDef.code) {
      let constructorArgs = '';
      for (const propKey in node.properties) {
        const propDef = customNodeDef.properties ? customNodeDef.properties[propKey] : undefined; // Safely get propDef
        let propValue = node.properties[propKey];

        // Special handling for properties that are expected to be code (like Vector or custom objects)
        if (propDef && (propDef.type === 'code' || propDef.type === 'Vector' || propDef.type === 'list')) {
          // These types should be evaluated as code, not strings
          constructorArgs += `${propKey}: ${propValue}, `;
        } else if (typeof propValue === 'string') {
          propValue = `"${propValue}"`;
          constructorArgs += `${propKey}: ${propValue}, `;
        } else if (propDef && propDef.type === 'Part') { // Handle Part type properties
          if (propValue && propValue.id) {
            const targetVarName = getVarName(propValue);
            constructorArgs += `${propKey}: ${targetVarName}, `;
          } else {
            constructorArgs += `${propKey}: null, `;
          }
        } else {
          constructorArgs += `${propKey}: ${propValue}, `;
        }
      }
      constructorArgs = `{${constructorArgs.slice(0, -2)}}`; // Remove trailing comma
      code += `const ${varName} = new ${node.type}(${constructorArgs});\n`;
    }
  }
  return code;
}
function getVarName(node) {
  if (!node || !node.id) {
    if (!node) return '';
    console.warn('Node or node ID is undefined, returning hash');
    // do sha256, base 64 encode, and return the first 10 characters
    return btoa(sha256(node ? node.toString() : 'undefined').slice(0, 10));
  }
  // Use a unique variable name based on the node's unique id
  // This guarantees no repetition unless two nodes are the exact same object (same id)
  return `n${node.id.replace(/[^a-zA-Z0-9_]/g, '_')}`;
}
async function updateRender() {
  if (!ready) return;

  // Only update render if we're in the game tab and have a running instance
  if (currentTab === 'game') {
    const code = generateGameCode(gameTree, false); // Set to false to avoid starting the game again
    const func = getGameFunction(code);
    currentGameInstance = func();
    try {
      // For live preview, we can re-render the current frame
      if (typeof currentGameInstance.act === 'function') {
        currentGameInstance.act(true);
      }
    } catch (error) {
      console.warn('Error in updateRender:', error);
    }
  }
}

// Initial render
updateTreeDisplay();
selectNode(gameTree);

// Initialize with game tab active
switchTab('game');

// Visual List Editor Drawer functionality
function toggleListDrawer(node, key, propDef, inputField, propertyGroup, editButton) {
  // Check if drawer already exists
  const existingDrawer = propertyGroup.querySelector('.list-editor-drawer');

  if (existingDrawer) {
    // Close the drawer
    existingDrawer.classList.remove('expanded');
    existingDrawer.classList.add('collapsed');
    setTimeout(() => {
      existingDrawer.remove();
    }, 300); // Wait for animation to complete
    return;
  }

  // Create drawer container
  const drawerContainer = document.createElement('div');
  drawerContainer.classList.add('list-editor-drawer', 'collapsed');

  // Create header
  const header = document.createElement('div');
  header.classList.add('list-editor-header');

  const title = document.createElement('span');
  title.textContent = `Edit ${formatPropertyKey(key)} List`;

  header.appendChild(title);
  drawerContainer.appendChild(header);

  // Create list editor area
  const listEditor = document.createElement('div');
  listEditor.classList.add('list-editor');
  drawerContainer.appendChild(listEditor);

  // Create buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.display = 'flex';
  buttonsContainer.style.gap = '8px';
  drawerContainer.appendChild(buttonsContainer);

  // Add existing items to the list editor
  const existingItems = node.properties[key] || [];
  existingItems.forEach((item, index) => {
    if (item.trim()) {
      addListItem(listEditor, item.trim(), index, propDef.subType);
    }
  });

  // Add "Add Item" button
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Item';
  addButton.classList.add('add-button');
  addButton.style.flex = '1';
  addButton.addEventListener('click', () => {
    addListItem(listEditor, '', listEditor.children.length, propDef.subType);
  });
  buttonsContainer.appendChild(addButton);

  // Add "Save" button
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.classList.add('save-button');
  saveButton.style.flex = '1';
  saveButton.addEventListener('click', () => {
    const newList = [];
    listEditor.querySelectorAll('.list-item').forEach(item => {
      if (propDef.subType === 'Vector') {
        const xInput = item.querySelector('.vector-x');
        const yInput = item.querySelector('.vector-y');
        if (xInput && yInput) {
          const x = parseFloat(xInput.value) || 0;
          const y = parseFloat(yInput.value) || 0;
          newList.push(`new Vector(${x}, ${y})`);
        }
      } else {
        const itemValue = item.querySelector('input').value;
        if (itemValue) {
          newList.push(itemValue);
        }
      }
    });
    node.properties[key] = newList;
    inputField.value = newList.length + " item" + (newList.length === 1 ? "" : "s"); // Update the input field value
    // Close the drawer
    editButton.textContent = '►'; // Reset the button text
    drawerContainer.classList.remove('expanded');
    drawerContainer.classList.add('collapsed');
    setTimeout(() => {
      drawerContainer.remove();
    }, 300);

    updateTreeDisplay();
  });
  buttonsContainer.appendChild(saveButton);

  // Add drawer to property group
  propertyGroup.appendChild(drawerContainer);

  // Trigger animation to expand
  setTimeout(() => {
    drawerContainer.classList.remove('collapsed');
    drawerContainer.classList.add('expanded');
  }, 10);

  // Add a single item to the list editor
  function addListItem(container, value = '', index, subType) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('list-item');
    itemDiv.style.display = 'flex';
    itemDiv.style.alignItems = 'center';
    itemDiv.style.marginBottom = '5px';
    itemDiv.style.gap = '5px';

    if (subType === 'Vector') {
      // Parse Vector value if provided
      let xValue = 0, yValue = 0;
      if (value) {
        const match = value.match(/new\s+Vector\s*\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)/);
        if (match) {
          xValue = parseFloat(match[1]);
          yValue = parseFloat(match[2]);
        }
      }

      // Create X input
      const xLabel = document.createElement('span');
      xLabel.textContent = 'X:';
      xLabel.style.minWidth = '15px';
      xLabel.style.fontSize = '0.9em';

      const xInput = document.createElement('input');
      xInput.type = 'number';
      xInput.value = xValue;
      xInput.step = 'any';
      xInput.classList.add('vector-x');
      xInput.style.width = '60px';

      // Create Y input
      const yLabel = document.createElement('span');
      yLabel.textContent = 'Y:';
      yLabel.style.minWidth = '15px';
      yLabel.style.fontSize = '0.9em';

      const yInput = document.createElement('input');
      yInput.type = 'number';
      yInput.value = yValue;
      yInput.step = 'any';
      yInput.classList.add('vector-y');
      yInput.style.width = '60px';

      itemDiv.appendChild(xLabel);
      itemDiv.appendChild(xInput);
      itemDiv.appendChild(yLabel);
      itemDiv.appendChild(yInput);
    } else {
      // Regular text input for non-Vector types
      const input = document.createElement('input');
      input.type = 'text';
      input.value = value;
      input.placeholder = 'Enter value';
      input.style.flex = '1';

      itemDiv.appendChild(input);
    }

    const removeButton = document.createElement('button');
    removeButton.textContent = '❌';
    removeButton.classList.add('remove-button');
    removeButton.style.cursor = 'pointer';
    removeButton.addEventListener('click', () => {
      itemDiv.remove();
    });

    itemDiv.appendChild(removeButton);
    container.appendChild(itemDiv);
  }
}

// Initialize center panel CodeMirror editor
function initializeCenterEditor() {
  const editorElement = document.getElementById('node-code-editor');
  centerEditor = CodeMirror(editorElement, {
    lineNumbers: true,
    mode: "javascript",
    theme: "dracula",
    value: `class MyCustomNode extends Part {
  constructor({ myProperty, myNumber, myBoolean, myVec }) {
    super({ name: "MyCustomNode" });
    this.myProperty = myProperty;
    this.myNumber = myNumber;
    this.myBoolean = myBoolean;
    this.myVec = myVec;
  }

  // Define properties accessible from the editor
  static properties = {
    myProperty: { type: "text", default: "default" },
    myNumber: { type: "number", default: 0 },
    myBoolean: { type: "boolean", default: false },
    myVec: { type: "Vector", default: "new Vector(0,0)" }
  };

  act() {
    super.act();
    // Your custom logic here
  }
}`
  });
}

// Tab switching functionality
gameTab.addEventListener('click', () => {
  switchTab('game');
});

editorTab.addEventListener('click', () => {
  switchTab('editor');
});

function switchTab(tab) {
  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

  if (tab === 'game') {
    gameTab.classList.add('active');
    gameContainer.classList.add('active');
    treeView.classList.remove('hidden');
    customNodesList.classList.remove('active');
    addNodeButton.style.display = 'block';
  } else if (tab === 'editor') {
    editorTab.classList.add('active');
    nodeEditorContainer.classList.add('active');
    treeView.classList.add('hidden');
    customNodesList.classList.add('active');
    addNodeButton.style.display = 'none';

    // Refresh the center editor when switching to editor tab
    if (centerEditor) {
      setTimeout(() => centerEditor.refresh(), 10);
    }
  }

  currentTab = tab;
}

// Update custom nodes list
function updateCustomNodesList() {
  customNodesContainer.innerHTML = '';

  // Get user-defined custom nodes and sort by last edit time
  const customNodes = Object.keys(nodeDefinitions)
    .filter(type => nodeDefinitions[type].code)
    .sort((a, b) => {
      const timeA = customNodeEditTimes[a] || 0;
      const timeB = customNodeEditTimes[b] || 0;
      return timeB - timeA; // Most recently edited first
    });

  // Add user-defined custom nodes first
  if (customNodes.length > 0) {
    const customHeader = document.createElement('div');
    customHeader.classList.add('nodes-section-header');
    customHeader.textContent = 'Custom Nodes';
    customNodesContainer.appendChild(customHeader);

    customNodes.forEach(type => {
      const nodeItem = document.createElement('div');
      nodeItem.classList.add('custom-node-item', 'user-defined');
      nodeItem.innerHTML = `
        <div class="node-type">${type}</div>
        <div class="node-description">Custom node</div>
      `;
      nodeItem.addEventListener('click', () => selectCustomNode(type, 'custom'));
      customNodesContainer.appendChild(nodeItem);
    });
  }

  // Add section header for built-in templates
  const builtinHeader = document.createElement('div');
  builtinHeader.classList.add('nodes-section-header');
  builtinHeader.textContent = 'Templates to Extend';
  customNodesContainer.appendChild(builtinHeader);

  // Add built-in node types that can be customized
  const builtinTypes = ['Part', 'GameObject', 'Transform', 'Renderer', 'Collider'];
  builtinTypes.forEach(type => {
    const nodeItem = document.createElement('div');
    nodeItem.classList.add('custom-node-item', 'builtin');
    nodeItem.innerHTML = `
      <div class="node-type">${type}</div>
      <div class="node-description">Built-in template</div>
    `;
    nodeItem.addEventListener('click', () => selectCustomNode(type, 'builtin'));
    customNodesContainer.appendChild(nodeItem);
  });
}

function selectCustomNode(nodeType, category) {
  // Update selected custom node
  document.querySelectorAll('.custom-node-item').forEach(item => item.classList.remove('selected'));

  // Find and select the clicked item
  const clickedItem = Array.from(customNodesContainer.children).find(item => {
    const typeElement = item.querySelector('.node-type');
    return typeElement && typeElement.textContent === nodeType;
  });
  if (clickedItem) {
    clickedItem.classList.add('selected');
  }

  selectedCustomNode = { type: nodeType, category };

  // Update editor title
  document.getElementById('node-editor-title').textContent = `Editing: ${nodeType}`;

  // Load code into center editor
  if (centerEditor) {
    if (category === 'custom' && nodeDefinitions[nodeType] && nodeDefinitions[nodeType].code) {
      centerEditor.setValue(nodeDefinitions[nodeType].code);
    } else {
      // Load template for built-in types or new custom nodes
      const template = generateNodeTemplate(nodeType, category);
      centerEditor.setValue(template);
    }
  }
}

function generateNodeTemplate(nodeType, category) {
  if (category === 'builtin') {
    return `class Custom${nodeType} extends ${nodeType} {
  constructor({ name, ...props }) {
    super({ name: name || "Custom${nodeType}", ...props });
    // Add custom properties here
  }

  // Define properties accessible from the editor
  static properties = {
    name: { type: "text", default: "Custom${nodeType}" },
    // Add more properties here
  };

  act() {
    super.act();
    // Your custom logic here
  }
}`;
  } else {
    return `class ${nodeType} extends Part {
  constructor({ name, myProperty, myNumber, myBoolean, myVec }) {
    super({ name: name || "${nodeType}" });
    this.myProperty = myProperty;
    this.myNumber = myNumber;
    this.myBoolean = myBoolean;
    this.myVec = myVec;
  }

  // Define properties accessible from the editor
  static properties = {
    name: { type: "text", default: "${nodeType}" },
    myProperty: { type: "text", default: "default" },
    myNumber: { type: "number", default: 0 },
    myBoolean: { type: "boolean", default: false },
    myVec: { type: "Vector", default: "new Vector(0,0)" }
  };

  act() {
    super.act();
    // Your custom logic here
  }
}`;
  }
}

// Save node functionality for center editor
saveNodeButton.addEventListener('click', () => {
  if (!selectedCustomNode) {
    alert('Please select a node to edit first.');
    return;
  }

  const code = centerEditor.getValue();

  // Basic parsing for custom node name and properties
  const nameMatch = code.match(/class\s+(\w+)\s+extends\s+\w+/);

  if (!nameMatch) {
    alert('Invalid custom node format. Please define a class extending a valid parent class.');
    return;
  }

  const customNodeName = nameMatch[1];

  try {
    // Extract properties from the custom node code
    const propertiesExtract = `class Part { constructor() {}} class GameObject extends Part {} class Transform extends Part {} class Renderer extends Part {} class Collider extends Part {}\n\n${code}\n\n${customNodeName}.properties`;
    const customProperties = eval(propertiesExtract);

    // Update edit time
    customNodeEditTimes[customNodeName] = Date.now();

    // Update existing custom node or create new
    if (nodeDefinitions[customNodeName]) {
      nodeDefinitions[customNodeName].code = code;
      nodeDefinitions[customNodeName].properties = customProperties;
      alert(`Custom node '${customNodeName}' updated!`);
    } else {
      nodeDefinitions[customNodeName] = {
        properties: customProperties,
        code: code,
        children: [] // Custom nodes can have any children for now
      };
      alert(`Custom node '${customNodeName}' created!`);
    }

    // Update the custom nodes list
    updateCustomNodesList();

    // If we're editing a different name than selected, select the new one
    if (customNodeName !== selectedCustomNode.type) {
      setTimeout(() => {
        const newNodeItem = Array.from(customNodesContainer.children).find(item => {
          const typeElement = item.querySelector('.node-type');
          return typeElement && typeElement.textContent === customNodeName;
        });
        if (newNodeItem) {
          newNodeItem.click();
        }
      }, 100);
    }

  } catch (error) {
    alert(`Error parsing node properties: ${error.message}`);
  }
});

// New node functionality
newNodeButton.addEventListener('click', () => {
  const newNodeName = 'NewCustomNode';
  selectedCustomNode = { type: newNodeName, category: 'custom' };
  document.getElementById('node-editor-title').textContent = `Creating: ${newNodeName}`;

  // Clear selection in list
  document.querySelectorAll('.custom-node-item').forEach(item => item.classList.remove('selected'));

  // Load template
  if (centerEditor) {
    const template = generateNodeTemplate(newNodeName, 'custom');
    centerEditor.setValue(template);
  }

  // Set edit time for new node
  customNodeEditTimes[newNodeName] = Date.now();
});
