// helpers.ts
function generateUID() {
  return Math.random().toString(36).substr(2, 9);
}
function drawBox(ctx, x, y, width, height, color = "black") {
  ctx.strokeStyle = color;
  ctx.strokeRect(x, y, width, height);
}
function applyCamera(context, camera) {
  const view = camera.getViewMatrix();
  context.save();
  context.translate(context.canvas.width / 2, context.canvas.height / 2);
  context.translate(view.offset.x, view.offset.y);
  context.scale(view.scale.x, view.scale.y);
}
function resetCamera(context) {
  context.restore();
}
function getDebugInfo(part, depth) {
  if (!part || !part.childrenArray || part.childrenArray.length === 0) {
    return "";
  }
  let info = depth == 0 ? `${part.name} (${part.id})<br>` : "";
  const indent = "--".repeat(depth);
  part.childrenArray.forEach((child) => {
    info += `${indent}${child.name} (${child.id}): ${child.hoverbug || ""}<br>`;
    if (child.childrenArray && child.childrenArray.length > 0) {
      info += getDebugInfo(child, depth + 1);
    }
  });
  return info;
}
function isPointInPolygon(pointX, pointY, polygonVertices) {
  let inside = false;
  for (let i = 0, j = polygonVertices.length - 1;i < polygonVertices.length; j = i++) {
    const xi = polygonVertices[i].x, yi = polygonVertices[i].y;
    const xj = polygonVertices[j].x, yj = polygonVertices[j].y;
    const intersect = yi > pointY !== yj > pointY && pointX < (xj - xi) * (pointY - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function isPointInObject(mouseX, mouseY, child) {
  const transform = child.children["Transform"];
  const position = transform.worldPosition;
  const boxCollider = child.children["BoxCollider"];
  const polygonCollider = child.children["PolygonCollider"];
  let width, height, centerX, centerY;
  if (boxCollider && boxCollider.start && boxCollider.end) {
    const scaledStart = boxCollider.start.multiply(transform.scale);
    const scaledEnd = boxCollider.end.multiply(transform.scale);
    width = scaledEnd.x - scaledStart.x;
    height = scaledEnd.y - scaledStart.y;
    const offsetX = (scaledStart.x + scaledEnd.x) / 2;
    const offsetY = (scaledStart.y + scaledEnd.y) / 2;
    centerX = position.x + offsetX;
    centerY = position.y + offsetY;
  } else if (polygonCollider) {
    width = polygonCollider.realWorldEnd.x - polygonCollider.realWorldStart.x;
    height = polygonCollider.realWorldEnd.y - polygonCollider.realWorldStart.y;
    centerX = (polygonCollider.realWorldStart.x + polygonCollider.realWorldEnd.x) / 2;
    centerY = (polygonCollider.realWorldStart.y + polygonCollider.realWorldEnd.y) / 2;
    if (transform.rotation !== 0) {
      return isPointInPolygon(mouseX, mouseY, polygonCollider.worldVertices);
    }
  } else if (child.width && child.height) {
    width = child.width * transform.scale.x;
    height = child.height * transform.scale.y;
    centerX = position.x;
    centerY = position.y;
  } else {
    width = (child?.superficialWidth || 50) * transform.scale.x;
    height = (child?.superficialHeight || 50) * transform.scale.y;
    centerX = position.x;
    centerY = position.y;
  }
  if (transform.rotation === 0) {
    const left = centerX - width / 2;
    const top = centerY - height / 2;
    return mouseX >= left && mouseX <= left + width && mouseY >= top && mouseY <= top + height;
  } else if (boxCollider) {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const corners = [
      { x: -halfWidth, y: -halfHeight },
      { x: halfWidth, y: -halfHeight },
      { x: halfWidth, y: halfHeight },
      { x: -halfWidth, y: halfHeight }
    ];
    const cos = Math.cos(transform.rotation);
    const sin = Math.sin(transform.rotation);
    const rotatedCorners = corners.map((corner) => {
      const rotatedX = corner.x * cos - corner.y * sin;
      const rotatedY = corner.x * sin + corner.y * cos;
      return {
        x: centerX + rotatedX,
        y: centerY + rotatedY
      };
    });
    let inside = false;
    for (let i = 0, j = rotatedCorners.length - 1;i < rotatedCorners.length; j = i++) {
      if (rotatedCorners[i].y > mouseY !== rotatedCorners[j].y > mouseY && mouseX < (rotatedCorners[j].x - rotatedCorners[i].x) * (mouseY - rotatedCorners[i].y) / (rotatedCorners[j].y - rotatedCorners[i].y) + rotatedCorners[i].x) {
        inside = !inside;
      }
    }
    return inside;
  }
  return false;
}

// Parts/Part.ts
class Part {
  id;
  name;
  children = {};
  childrenArray = [];
  parent;
  top;
  ready = false;
  registrations = {};
  flats = { colliders: [] };
  _layoutWidth = 0;
  context;
  debugEmoji;
  hoverbug;
  _superficialWidth = 0;
  _superficialHeight = 0;
  ties = new Set;
  constructor({ name } = {}) {
    this.id = generateUID();
    this.name = name || "New Object";
    this.children = {};
    this.childrenArray = [];
    this.parent = undefined;
    this.top = undefined;
    this.ready = true;
    this.debugEmoji = "\uD83E\uDDE9";
  }
  tie(target, property, localAttribute) {
    if (!target || !property)
      return;
    if (target.hasOwnProperty(property)) {
      this.ties.add({
        target,
        localAttribute,
        targetAttribute: property
      });
    }
  }
  onclick(event, clicked) {
    this.childrenArray.forEach((child) => {
      if (typeof child.onclick === "function") {
        child.onclick(event, clicked);
      }
    });
  }
  onhover() {
    this.childrenArray.forEach((child) => {
      if (typeof child.onhover === "function") {
        child.onhover();
      }
    });
  }
  onunhover() {
    this.childrenArray.forEach((child) => {
      if (typeof child.onunhover === "function") {
        child.onunhover();
      }
    });
  }
  onmousedown(event) {
    this.childrenArray.forEach((child) => {
      if (typeof child.onmousedown === "function") {
        child.onmousedown(event);
      }
    });
  }
  onmouseup(event) {
    this.childrenArray.forEach((child) => {
      if (typeof child.onmouseup === "function") {
        child.onmouseup(event);
      }
    });
    this.onclick(event, this);
  }
  sibling(name) {
    if (!this.parent) {
      return;
    }
    const sibling = this.parent.children[name];
    if (!sibling) {
      return;
    }
    return sibling;
  }
  setSuperficialDimensions(width, height) {
    this._superficialHeight = height;
    this._superficialWidth = width;
    this.childrenArray.forEach((child) => {
      if (typeof child.setSuperficialDimensions === "function") {
        child.setSuperficialDimensions(width, height);
      }
    });
  }
  onMount(parent) {
    this.parent = parent;
    for (const [k, v] of Object.entries(parent.registrations)) {
      this.setAll(k, v);
    }
  }
  onRegister(attribute, value) {
  }
  onUnregister(attribute, value) {
    switch (attribute) {
      case "parent":
        this.parent = undefined;
        this.registrations.layer.flats.colliders = this.registrations.layer.flats.colliders.filter((c) => c !== this);
        break;
      case "top":
        this.top = undefined;
        break;
      case "layer":
        if (this.registrations.layer) {
          this.registrations.layer.flats.colliders = this.registrations.layer.flats.colliders.filter((c) => c !== this);
        }
        break;
      default:
        break;
    }
  }
  addChild(child) {
    if (this.children[child.name]) {
      console.warn(`Child with name <${child.name}> already exists in <${this.name}>. Skipping addition. (Child has ID <${child.id}>).`);
      return;
    }
    this.childrenArray.push(child);
    this.children[child.name] = child;
    if (this.top) {
      child.setTop(this.top);
    }
    child.onMount(this);
  }
  addChildren(...children) {
    children.forEach((child) => this.addChild(child));
  }
  setTop(top) {
    this.top = top;
    if (this.childrenArray.length > 0) {
      this.childrenArray.forEach((child) => {
        child.setTop(top);
      });
    }
  }
  act() {
    if (!this.ready) {
      return;
    }
    this.ties.forEach((tie) => {
      if (tie.target && tie.target.hasOwnProperty(tie.targetAttribute)) {
        const value = this[tie.localAttribute];
        tie.target[tie.targetAttribute] = value;
      }
    });
    this.childrenArray.forEach((child) => {
      child.act();
    });
  }
  setAll(attribute, value) {
    const current = this.registrations[attribute];
    if (current && current !== value) {
      this.onUnregister(attribute, current);
    }
    if (current !== value) {
      this.onRegister(attribute, value);
    }
    this.registrations[attribute] = value;
    this.childrenArray.forEach((child) => {
      child.setAll(attribute, value);
    });
  }
  calculateLayout(spacing = { x: 10, y: 20 }) {
    if (!this.childrenArray || this.childrenArray.length === 0) {
      this._layoutWidth = 100;
      return this._layoutWidth;
    }
    let totalWidth = 0;
    this.childrenArray.forEach((child) => {
      if (typeof child.calculateLayout === "function") {
        totalWidth += child.calculateLayout(spacing);
      }
    });
    totalWidth += (this.childrenArray.length - 1) * spacing.x;
    this._layoutWidth = totalWidth;
    return totalWidth;
  }
  removeChild(child) {
    if (this.children[child.name]) {
      delete this.children[child.name];
      const index = this.childrenArray.indexOf(child);
      if (index !== -1) {
        this.childrenArray.splice(index, 1);
      }
      child.parent = undefined;
      child.top = undefined;
      child.ready = false;
      child.onUnregister("parent", this);
      child.onUnregister("top", this.top);
    } else {
      console.warn(`Child with name <${child.name}> not found in <${this.name}>. Cannot remove. (Child has ID <${child.id}>).`);
    }
  }
  debugTreeRender(x, y, spacing = { x: 120, y: 80 }) {
    const context = this.context || this.top && this.top.context;
    if (!context)
      return;
    const boxWidth = 100;
    const boxHeight = 40;
    const label = (this.debugEmoji || "") + this.name || this.id || "Node";
    context.fillStyle = "#fff";
    context.strokeStyle = "#000";
    context.lineWidth = 2;
    context.fillRect(x - boxWidth / 2, y, boxWidth, boxHeight);
    context.strokeRect(x - boxWidth / 2, y, boxWidth, boxHeight);
    context.font = "14px sans-serif";
    context.textAlign = "center";
    context.fillStyle = "#000";
    const spriteRender = this;
    const animatedSprite = this;
    if (spriteRender && typeof spriteRender.image === "object" && spriteRender.image instanceof Image) {
      context.drawImage(spriteRender.image, x - 25 / 2, y + 2, 25, 25);
    } else if (animatedSprite && animatedSprite.frames && animatedSprite.currentAnimation && animatedSprite.currentFrameIndex !== undefined) {
      const currentFrame = animatedSprite.frames[animatedSprite.currentAnimation]?.[animatedSprite.currentFrameIndex];
      if (currentFrame && currentFrame instanceof Image) {
        context.drawImage(currentFrame, x - 25 / 2, y + 2, 25, 25);
      } else if (this.debugEmoji) {
        context.font = "20px sans-serif";
        context.fillText(this.debugEmoji, x, y + 22);
      }
    } else if (this.debugEmoji) {
      context.font = "20px sans-serif";
      context.fillText(this.debugEmoji, x, y + 22);
    }
    const labelText = this.name || this.id || "Node";
    context.font = "14px sans-serif";
    context.fillText(labelText, x, y + 38);
    if (this.childrenArray && this.childrenArray.length > 0) {
      const totalWidth = this.childrenArray.reduce((acc, child) => acc + (child._layoutWidth || 100), 0) + spacing.x * (this.childrenArray.length - 1);
      let currentX = x - totalWidth / 2;
      this.childrenArray.forEach((child) => {
        const childWidth = child._layoutWidth || 100;
        const childX = currentX + childWidth / 2;
        const childY = y + boxHeight + spacing.y;
        context.beginPath();
        context.moveTo(x, y + boxHeight);
        context.lineTo(childX, childY);
        context.stroke();
        if (typeof child.debugTreeRender === "function") {
          child.debugTreeRender(childX, childY, spacing);
        }
        currentX += childWidth + spacing.x;
      });
    }
  }
  get superficialHeight() {
    return this._superficialHeight || 50;
  }
  get superficialWidth() {
    return this._superficialWidth || 100;
  }
  set superficialHeight(value) {
    this._superficialHeight = value;
    this.childrenArray.forEach((child) => {
      if (typeof child.setSuperficialDimensions === "function") {
        child.setSuperficialDimensions(this._superficialWidth, value);
      }
    });
  }
  set superficialWidth(value) {
    this._superficialWidth = value;
    this.childrenArray.forEach((child) => {
      if (typeof child.setSuperficialDimensions === "function") {
        child.setSuperficialDimensions(value, this._superficialHeight);
      }
    });
  }
}

// Parts/Scene.ts
class Scene extends Part {
  activeCamera = null;
  constructor({ name }) {
    super();
    this.name = name;
    this.debugEmoji = "\uD83C\uDFDE️";
  }
  act() {
    if (!this.top) {
      console.warn(`Act called on Scene <${this.name}> without a top-level parent. Ensure this scene is added to a Game instance before calling act().`);
    }
    if (this.activeCamera && this.top instanceof Game) {
      const camera = this.activeCamera;
      applyCamera(this.top.context, camera);
    }
    super.act();
    if (this.top instanceof Game && this.activeCamera) {
      resetCamera(this.top.context);
    }
  }
}

// Parts/Game.ts
class Game extends Part {
  canvas;
  currentScene;
  childrenArray;
  hasWarnedActUsage = false;
  devmode;
  context;
  hovering;
  tooltipLocked;
  lastMousePosition;
  _isRunning = false;
  _isPaused = false;
  _animationFrameId;
  constructor({ name, canvas, devmode = false, width, height, disableAntiAliasing = false }) {
    super();
    this.name = name;
    this.childrenArray = [];
    this.canvas = typeof canvas === "string" ? document.getElementById(canvas) : canvas;
    this.context = this.canvas.getContext("2d");
    this.devmode = devmode;
    this.canvas.width = width;
    this.canvas.height = height;
    this.context.imageSmoothingEnabled = !disableAntiAliasing;
    this.debugEmoji = "\uD83C\uDFAE";
    this.tooltipLocked = false;
    if (this.devmode) {
      let tooltip = document.getElementById("debug-tooltip");
      if (!tooltip) {
        tooltip = this.createDebugTooltip();
      }
      document.addEventListener("mousemove", (event) => {
        this.lastMousePosition = { x: event.clientX - this.canvas.offsetLeft, y: event.clientY - this.canvas.offsetTop };
      });
      document.addEventListener("click", (event) => {
        if (tooltip && !this.tooltipLocked) {
          this.tooltipLocked = true;
        } else if (tooltip) {
          this.tooltipLocked = false;
        }
      });
    }
  }
  createDebugTooltip() {
    const tooltip = document.createElement("div");
    tooltip.id = "debug-tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    tooltip.style.color = "white";
    tooltip.style.padding = "5px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.pointerEvents = "none";
    tooltip.style.zIndex = "1000";
    document.body.appendChild(tooltip);
    return tooltip;
  }
  addChild(scene) {
    this.currentScene = this.currentScene || scene;
    scene.setTop(this);
    super.addChild(scene);
  }
  addChildren(...scenes) {
    scenes.forEach((scene) => this.addChild(scene));
  }
  start(starterScene) {
    if (typeof starterScene === "string") {
      const scene = this.children[starterScene];
      if (scene instanceof Scene) {
        this.currentScene = scene;
      } else {
        this.currentScene = this.childrenArray.find((s) => s.name === starterScene);
        if (!this.currentScene) {
          throw new Error(`Scene with name "${starterScene}" not found in game <${this.name}> (Does not exist as ID either. Please check your references).`);
        }
      }
    } else if (starterScene instanceof Scene) {
      this.currentScene = starterScene;
    } else {
      console.warn("No valid scene provided to start the game. Using the first scene found.");
      this.currentScene = this.childrenArray[0];
      if (!this.currentScene) {
        throw new Error("No scenes available to start the game.");
      }
    }
    this._isRunning = true;
    this._isPaused = false;
    this.loop();
  }
  loop() {
    if (!this._isRunning) {
      return;
    }
    if (!this._isPaused && this.currentScene) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.devmode) {
        this.currentScene.calculateLayout();
        this.currentScene.debugTreeRender(this.canvas.width / 2, 10, { x: 10, y: 40 });
        this.currentScene.act();
        this.updateDebugToolTip();
        this.context.fillStyle = "red";
        this.context.fillRect(this.canvas.width / 2 - 2, this.canvas.height / 2 - 2, 4, 4);
      } else {
        this.currentScene.act();
      }
    }
    if (this._isRunning) {
      this._animationFrameId = window.requestAnimationFrame(this.loop.bind(this));
    }
  }
  pause() {
    this._isPaused = true;
    console.log(`Game <${this.name}> paused`);
  }
  resume() {
    this._isPaused = false;
    console.log(`Game <${this.name}> resumed`);
  }
  stop() {
    this._isRunning = false;
    this._isPaused = false;
    if (this._animationFrameId) {
      window.cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = undefined;
    }
    console.log(`Game <${this.name}> stopped`);
  }
  get isRunning() {
    return this._isRunning;
  }
  get isPaused() {
    return this._isPaused;
  }
  act(purposeful = false) {
    if (!this.hasWarnedActUsage && !purposeful) {
      console.warn(`Act called on Game <${this.name}>. Use start() to begin the game loop. Calling act() directly will run 1 frame of the current scene. This message will appear only once.`);
      this.hasWarnedActUsage = true;
    }
    if (this.currentScene) {
      this.currentScene.act();
    } else {
      console.warn(`No current scene set in <${this.name}>, and no available scenes to run as the current scene in game <${this.name}>. Please ensure you have added scenes and/or set a current scene before calling act().`);
    }
  }
  setScene(scene) {
    if (typeof scene === "string") {
      const foundScene = this.childrenArray.find((s) => s.name === scene || s.id === scene);
      if (foundScene) {
        this.currentScene = foundScene;
      } else {
        throw new Error(`Scene with name or ID "${scene}" not found in game <${this.name}>. Please ensure the scene exists and is added to the game.`);
      }
    } else if (scene instanceof Scene) {
      this.currentScene = scene;
    }
  }
  updateDebugToolTip() {
    const tooltip = document.getElementById("debug-tooltip");
    if (!tooltip) {
      console.warn("Debug tooltip not found. Ensure it is created in devmode.");
      return;
    }
    if (this.hovering) {
      if (tooltip) {
        tooltip.style.left = `${(this.lastMousePosition?.x || 0) + 10}px`;
        tooltip.style.top = `${(this.lastMousePosition?.y || 0) + 10}px`;
        tooltip.style.display = "block";
        tooltip.innerHTML = getDebugInfo(this.hovering, 0);
      }
    } else {
      tooltip.style.display = "none";
    }
  }
}

// Parts/Layer.ts
class Layer extends Part {
  constructor({ name }) {
    super();
    this.name = name;
    this.id = generateUID();
    this.debugEmoji = "\uD83D\uDDC2️";
  }
  addChild(gameObject) {
    gameObject.setAll("layer", this);
    super.addChild(gameObject);
  }
  addChildren(...gameObjects) {
    gameObjects.forEach((gameObject) => this.addChild(gameObject));
  }
}

// Parts/GameObject.ts
class GameObject extends Part {
  layer;
  constructor({ name }) {
    super();
    this.name = name;
    this.debugEmoji = "\uD83D\uDD79️";
  }
}

// Math/Vector.ts
class Vector {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(other) {
    if (other instanceof Vector) {
      return new Vector(this.x + other.x, this.y + other.y);
    }
    return new Vector(this.x + other, this.y + other);
  }
  subtract(other) {
    if (other instanceof Vector) {
      return new Vector(this.x - other.x, this.y - other.y);
    }
    return new Vector(this.x - other, this.y - other);
  }
  multiply(other) {
    if (other instanceof Vector) {
      return new Vector(this.x * other.x, this.y * other.y);
    }
    return new Vector(this.x * other, this.y * other);
  }
  divide(other) {
    if (other instanceof Vector) {
      if (other.x === 0 || other.y === 0)
        throw new Error("Cannot divide by zero");
      return new Vector(this.x / other.x, this.y / other.y);
    }
    if (other === 0)
      throw new Error("Cannot divide by zero");
    return new Vector(this.x / other, this.y / other);
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  toString() {
    return `[${this.x}, ${this.y}]`;
  }
  normalize() {
    const len = this.length();
    if (len === 0)
      throw new Error("Cannot normalize zero-length vector");
    return new Vector(this.x / len, this.y / len);
  }
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  static From(scalar) {
    return new Vector(scalar, scalar);
  }
}

// Parts/Children/Transform.ts
class Transform extends Part {
  position;
  worldPosition;
  rotation;
  scale;
  constructor({ position, rotation, scale } = {}) {
    super();
    this.name = "Transform";
    this.position = position || new Vector(0, 0);
    this.worldPosition = this.position;
    this.rotation = rotation || 0;
    this.scale = scale || new Vector(1, 1);
    this.debugEmoji = "\uD83D\uDCD0";
  }
  onMount(parent) {
    super.onMount(parent);
    const grandparentTransform = parent.sibling("Transform");
    if (grandparentTransform) {
      this.worldPosition = this.position.add(grandparentTransform.worldPosition);
    } else {
      this.worldPosition = this.position;
    }
    if (parent.superficialWidth && parent.superficialHeight) {
      this.superficialWidth = parent.superficialWidth;
      this.superficialHeight = parent.superficialHeight;
    }
  }
  act() {
    const grandparentTransform = this.parent?.sibling("Transform");
    if (grandparentTransform) {
      this.worldPosition = this.position.add(grandparentTransform.worldPosition);
    }
    this.hoverbug = `${this.position.toString()} | ${this.worldPosition.toString()} | ${(this.rotation / Math.PI).toFixed(2)}pi | ${this.scale.toString()}`;
  }
}

// Parts/Children/Collider.ts
class Collider extends Part {
  colliding = false;
  collidingWith = new Set;
  constructor() {
    super();
    this.name = "Collider";
  }
  onMount(parent) {
    super.onMount(parent);
    if (!this.sibling("Transform")) {
      console.warn(`Collider <${this.name}> (${this.id}) does not have Transform sibling. Please ensure you add a Transform component before adding a Collider. It will not technically effect functionality, but it is good practice.`);
      return;
    }
  }
  onRegister(attribute, value) {
    super.onRegister(attribute, value);
    if (attribute === "layer") {
      value.flats.colliders.push(this);
    }
  }
  onUnregister(attribute, value) {
    super.onUnregister(attribute, value);
    if (attribute === "layer") {
      const list = value.flats.colliders;
      const index = list.indexOf(this);
      if (index !== -1) {
        list.splice(index, 1);
      }
    }
  }
  act() {
    super.act();
    this.hoverbug = `${this.colliding ? "\uD83D\uDFE5" : "\uD83D\uDFE9"} - ${Array.from(this.collidingWith).map((o) => o.name).join(",")} objects`;
  }
}

// Parts/Children/PolygonCollider.ts
class PolygonCollider extends Collider {
  localVertices;
  worldVertices = [];
  realWorldStart;
  realWorldEnd;
  constructor({ vertices }) {
    super();
    this.name = "PolygonCollider";
    this.localVertices = vertices;
    this.realWorldStart = new Vector(0, 0);
    this.realWorldEnd = new Vector(0, 0);
  }
  onMount(parent) {
    super.onMount(parent);
    if (!this.sibling("Transform")) {
      console.warn(`PolygonCollider <${this.name}> (${this.id}) is not attached to a parent with a Transform component. Please ensure it is mounted to a GameObject with a Transform`);
      return;
    }
    this.updateWorldVertices();
  }
  act() {
    if (!this.sibling("Transform")) {
      console.warn(`PolygonCollider <${this.name}> (${this.id}) is not attached to a parent with a Transform component. Skipping`);
      return;
    }
    this.updateWorldVertices();
    this.colliding = false;
    const layer = this.registrations?.layer;
    const colliders = layer?.flats.colliders || [];
    this.collidingWith = new Set;
    for (const other of colliders) {
      if (other === this)
        continue;
      if (this.checkCollision(other)) {
        this.colliding = true;
        this.collidingWith.add(other);
      }
    }
    if (this.top instanceof Game && this.top.devmode) {
      const ctx = this.top.context;
      if (ctx) {
        ctx.save();
        ctx.strokeStyle = this.colliding ? "rgba(255, 0, 100, 0.8)" : "rgba(0, 255, 100, 0.8)";
        ctx.fillStyle = this.colliding ? "rgba(255, 0, 100, 0.5)" : "rgba(0, 255, 0, 0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.worldVertices[0].x, this.worldVertices[0].y);
        for (let i = 1;i < this.worldVertices.length; i++) {
          ctx.lineTo(this.worldVertices[i].x, this.worldVertices[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }
    super.act();
  }
  updateWorldVertices() {
    const transform = this.sibling("Transform");
    if (!transform) {
      this.worldVertices = [];
      return;
    }
    const position = transform.worldPosition;
    const rotation = transform.rotation;
    const scale = transform.scale;
    this.worldVertices = this.localVertices.map((vertex) => {
      let scaledVertex = vertex.multiply(scale);
      if (rotation !== 0) {
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        scaledVertex = new Vector(scaledVertex.x * cos - scaledVertex.y * sin, scaledVertex.x * sin + scaledVertex.y * cos);
      }
      return position.add(scaledVertex);
    });
    const xs = this.worldVertices.map((v) => v.x);
    const ys = this.worldVertices.map((v) => v.y);
    this.realWorldStart = new Vector(Math.min(...xs), Math.min(...ys));
    this.realWorldEnd = new Vector(Math.max(...xs), Math.max(...ys));
  }
  checkCollision(other) {
    if (other instanceof BoxCollider) {
      return this.checkPolygonVsBox(this, other);
    } else if (other instanceof PolygonCollider) {
      return this.checkPolygonVsPolygon(this, other);
    }
    console.warn("Collision checks are only supported between BoxColliders and PolygonColliders.");
    return false;
  }
  checkPolygonVsPolygon(poly1, poly2) {
    const axes1 = this.getAxes(poly1.worldVertices);
    const axes2 = this.getAxes(poly2.worldVertices);
    const axes = axes1.concat(axes2);
    for (const axis of axes) {
      const projection1 = this.project(poly1.worldVertices, axis);
      const projection2 = this.project(poly2.worldVertices, axis);
      if (!this.overlap(projection1, projection2)) {
        return false;
      }
    }
    return true;
  }
  checkPolygonVsBox(poly, box) {
    const boxVertices = box.rotatedCorners;
    const axes1 = this.getAxes(poly.worldVertices);
    const axes2 = this.getAxes(boxVertices);
    const axes = axes1.concat(axes2);
    for (const axis of axes) {
      const projection1 = this.project(poly.worldVertices, axis);
      const projection2 = this.project(boxVertices, axis);
      if (!this.overlap(projection1, projection2)) {
        return false;
      }
    }
    return true;
  }
  getAxes(vertices) {
    const axes = [];
    for (let i = 0;i < vertices.length; i++) {
      const p1 = vertices[i];
      const p2 = vertices[i === vertices.length - 1 ? 0 : i + 1];
      const edge = p2.subtract(p1);
      const normal = new Vector(-edge.y, edge.x).normalize();
      axes.push(normal);
    }
    return axes;
  }
  project(vertices, axis) {
    let min = axis.dot(vertices[0]);
    let max = min;
    for (let i = 1;i < vertices.length; i++) {
      const p = axis.dot(vertices[i]);
      if (p < min) {
        min = p;
      } else if (p > max) {
        max = p;
      }
    }
    return { min, max };
  }
  overlap(proj1, proj2) {
    return proj1.max >= proj2.min && proj2.max >= proj1.min;
  }
}

// Parts/Children/BoxCollider.ts
class BoxCollider extends Collider {
  start;
  end;
  realWorldStart;
  realWorldEnd;
  rotatedCorners = [];
  constructor({ width, height }) {
    super();
    this.name = "BoxCollider";
    this.start = new Vector(-width / 2, -height / 2);
    this.end = new Vector(width / 2, height / 2);
    this.realWorldStart = this.start;
    this.realWorldEnd = this.end;
  }
  onMount(parent) {
    super.onMount(parent);
    const transform = this.sibling("Transform");
    if (!transform) {
      console.warn(`BoxCollider <${this.name}> (${this.id}) does not have Transform sibling. Skipping`);
      return;
    }
    this.updateRotatedBounds(transform);
  }
  updateRotatedBounds(transform) {
    const scaledStart = this.start.multiply(transform.scale);
    const scaledEnd = this.end.multiply(transform.scale);
    const center = new Vector((scaledStart.x + scaledEnd.x) / 2, (scaledStart.y + scaledEnd.y) / 2);
    const corners = [
      scaledStart,
      new Vector(scaledEnd.x, scaledStart.y),
      scaledEnd,
      new Vector(scaledStart.x, scaledEnd.y)
    ];
    this.rotatedCorners = corners.map((corner) => {
      const rel = corner.subtract(center);
      if (transform.rotation === 0) {
        return transform.worldPosition.add(corner);
      }
      const cos = Math.cos(transform.rotation);
      const sin = Math.sin(transform.rotation);
      const rotated = new Vector(rel.x * cos - rel.y * sin, rel.x * sin + rel.y * cos);
      return transform.worldPosition.add(rotated.add(center));
    });
    const xs = this.rotatedCorners.map((corner) => corner.x);
    const ys = this.rotatedCorners.map((corner) => corner.y);
    this.realWorldStart = new Vector(Math.min(...xs), Math.min(...ys));
    this.realWorldEnd = new Vector(Math.max(...xs), Math.max(...ys));
  }
  checkCollision(other) {
    if (other instanceof BoxCollider) {
      return !(this.realWorldEnd.x < other.realWorldStart.x || this.realWorldStart.x > other.realWorldEnd.x || this.realWorldEnd.y < other.realWorldStart.y || this.realWorldStart.y > other.realWorldEnd.y);
    } else if (other instanceof PolygonCollider) {
      return other.checkCollision(this);
    }
    console.warn("Collision checks are only supported between BoxColliders and PolygonColliders.");
    return false;
  }
  act() {
    const transform = this.sibling("Transform");
    if (!transform) {
      throw new Error(`BoxCollider <${this.name}> (${this.id}) does not have a Transform sibling. Ensure it is mounted to a GameObject with a Transform component.`);
    }
    if (transform.rotation !== 0) {
      console.log("ROTATED");
      const width = this.end.x - this.start.x;
      const height = this.end.y - this.start.y;
      const halfWidth = width / 2;
      const halfHeight = height / 2;
      const vertices = [
        new Vector(-halfWidth, -halfHeight),
        new Vector(halfWidth, -halfHeight),
        new Vector(halfWidth, halfHeight),
        new Vector(-halfWidth, halfHeight)
      ];
      const polygonCollider = new PolygonCollider({ vertices });
      this.parent?.addChild(polygonCollider);
      this.parent?.removeChild(this);
      return;
    }
    this.updateRotatedBounds(transform);
    this.colliding = false;
    const layer = this.registrations?.layer;
    const colliders = layer?.flats.colliders || [];
    this.collidingWith = new Set;
    for (const other of colliders) {
      if (other === this)
        continue;
      if (this.checkCollision(other)) {
        this.colliding = true;
        this.collidingWith.add(other);
      }
    }
    if (this.top instanceof Game && this.top.devmode) {
      if (transform.rotation === 0) {
        drawBox(this.top.context, this.realWorldStart.x, this.realWorldStart.y, this.realWorldEnd.x - this.realWorldStart.x, this.realWorldEnd.y - this.realWorldStart.y, this.colliding ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 255, 0, 0.5)");
      } else {
      }
    }
    super.act();
  }
}

// Parts/Sound.ts
class Sound extends Part {
  audio;
  playAfterLoad = false;
  _isLoaded = false;
  constructor({ name, src, volume = 1, loop = false }) {
    super({ name });
    this.debugEmoji = "\uD83D\uDD0A";
    this.audio = new Audio(src);
    this.audio.volume = volume;
    this.audio.loop = loop;
    this.audio.addEventListener("canplaythrough", () => {
      this._isLoaded = true;
      this.ready = true;
      if (this.playAfterLoad) {
        this.playAfterLoad = false;
        if (document.readyState === "complete" && (document.hasFocus() || ("ontouchstart" in window))) {
          this.play();
        } else {
          const tryPlay = () => {
            this.play();
            window.removeEventListener("pointerdown", tryPlay);
            window.removeEventListener("keydown", tryPlay);
          };
          window.addEventListener("pointerdown", tryPlay, { once: true });
          window.addEventListener("keydown", tryPlay, { once: true });
        }
      }
      console.log(`Sound <${this.name}> loaded successfully.`);
    });
    this.audio.addEventListener("error", () => {
      this._isLoaded = false;
      this.ready = false;
      console.error(`Failed to load sound <${this.name}> from src: ${src}`);
    });
  }
  play(options = {}) {
    const { restart = false, clone = false } = options;
    if (!this._isLoaded) {
      console.warn(`Sound <${this.name}> is not loaded yet. Cannot play.`);
      this.playAfterLoad = true;
      return;
    }
    if (clone) {
      const cloneAudio = this.audio.cloneNode(true);
      cloneAudio.volume = this.audio.volume;
      cloneAudio.loop = this.audio.loop;
      cloneAudio.play().catch((e) => console.error(`Error playing cloned sound <${this.name}>:`, e));
    } else {
      if (restart) {
        this.audio.currentTime = 0;
      }
      this.audio.play().catch((e) => console.error(`Error playing sound <${this.name}>:`, e));
    }
  }
  pause() {
    this.audio.pause();
  }
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
  setVolume(volume) {
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }
  setLoop(loop) {
    this.audio.loop = loop;
  }
  act() {
    super.act();
    this.hoverbug = `${this.audio.paused ? "⏸️" : "▶️"} V:${this.audio.volume.toFixed(2)} L:${this.audio.loop ? "✅" : "❌"}`;
  }
}

// Parts/Input.ts
class Input extends Part {
  key;
  keyup;
  mousemove;
  click;
  downkeys = new Set;
  currentMousePos = { x: 0, y: 0 };
  lastClickPos = null;
  constructor({
    key,
    keyup,
    mousemove,
    click
  }) {
    super();
    this.name = "Input";
    this.debugEmoji = "⌨️";
    this.key = key;
    this.keyup = keyup;
    this.mousemove = mousemove;
    this.click = click;
  }
  onMount(parent) {
    super.onMount(parent);
    if (!this.top || this.parent instanceof Game) {
      throw new Error("Please mount Input to a Scene already attached to a Game. You may attach the same input to multiple scenes if you want to share input handling across them.");
    }
    const canvas = this.top.canvas;
    if (!canvas) {
      throw new Error("Input requires a canvas to be mounted to. Ensure the Game instance has a valid canvas.");
    }
    canvas.addEventListener("mousemove", (event) => {
      const game = this.top;
      const rect = canvas.getBoundingClientRect();
      let mouseX = event.clientX - rect.left;
      let mouseY = event.clientY - rect.top;
      const camera = game.currentScene?.activeCamera;
      if (camera) {
        const view = camera.getViewMatrix();
        const cameraTransform = camera.children["Transform"];
        mouseX = (mouseX - game.canvas.width / 2) / view.scale.x + cameraTransform.worldPosition.x;
        mouseY = (mouseY - game.canvas.height / 2) / view.scale.y + cameraTransform.worldPosition.y;
      }
      this.currentMousePos = { x: mouseX, y: mouseY };
    });
    canvas.addEventListener("click", (event) => {
      const game = this.top;
      const rect = canvas.getBoundingClientRect();
      let mouseX = event.clientX - rect.left;
      let mouseY = event.clientY - rect.top;
      const camera = game.currentScene?.activeCamera;
      if (camera) {
        const view = camera.getViewMatrix();
        const cameraTransform = camera.children["Transform"];
        mouseX = (mouseX - game.canvas.width / 2) / view.scale.x + cameraTransform.worldPosition.x;
        mouseY = (mouseY - game.canvas.height / 2) / view.scale.y + cameraTransform.worldPosition.y;
      }
      this.lastClickPos = { x: mouseX, y: mouseY };
    });
    canvas.addEventListener("mousedown", (event) => {
      const game = this.top;
      if (game.hovering) {
        game.hovering.onmousedown(event);
      }
    });
    canvas.addEventListener("mouseup", (event) => {
      const game = this.top;
      if (game.hovering) {
        game.hovering.onmouseup(event);
      }
    });
    document.addEventListener("keydown", (event) => {
      this.downkeys.add(event.key);
    });
    document.addEventListener("keyup", (event) => {
      this.downkeys.delete(event.key);
      this.keyup(event);
    });
  }
  act() {
    super.act();
    const game = this.top;
    if (!game || !game.currentScene || game.currentScene !== this.parent) {
      return;
    }
    if (this.currentMousePos) {
      const childrenFlat = game.currentScene.childrenArray.flatMap((child) => child.childrenArray);
      childrenFlat.sort((a, b) => {
        const layers = game.currentScene?.childrenArray.filter((l) => l instanceof Layer) || [];
        layers.sort((a2, b2) => {
          const aIndex = game.currentScene?.childrenArray.indexOf(a2) || 0;
          const bIndex = game.currentScene?.childrenArray.indexOf(b2) || 0;
          return aIndex - bIndex;
        });
        return layers.indexOf(a) - layers.indexOf(b);
      });
      const hovered = childrenFlat.find((child) => {
        if (child.children["Transform"]) {
          return isPointInObject(this.currentMousePos.x, this.currentMousePos.y, child);
        }
        return false;
      });
      if (game.hovering && game.hovering !== hovered) {
        game.hovering.onunhover();
        game.hovering = undefined;
      }
      if (hovered && game.hovering !== hovered) {
        game.hovering = hovered;
        hovered.onhover();
      }
    }
    if (this.lastClickPos) {
      const childrenFlat = game.currentScene.childrenArray.flatMap((child) => child.childrenArray);
      childrenFlat.sort((a, b) => {
        const layers = game.currentScene?.childrenArray.filter((l) => l instanceof Layer) || [];
        layers.sort((a2, b2) => {
          const aIndex = game.currentScene?.childrenArray.indexOf(a2) || 0;
          const bIndex = game.currentScene?.childrenArray.indexOf(b2) || 0;
          return aIndex - bIndex;
        });
        return layers.indexOf(a) - layers.indexOf(b);
      });
      const clicked = childrenFlat.find((child) => {
        if (child.children["Transform"]) {
          return isPointInObject(this.lastClickPos.x, this.lastClickPos.y, child);
        }
        return false;
      });
      if (clicked) {
        this.click(new MouseEvent("click"), clicked);
      }
      this.lastClickPos = null;
    }
    this.downkeys.forEach((key) => {
      this.key(new KeyboardEvent("keydown", { key }));
    });
  }
}

// Parts/Children/Renderer.ts
class Renderer extends Part {
  width;
  height;
  facing = new Vector(1, 1);
  disableAntiAliasing = false;
  constructor({ width, height, disableAntiAliasing }) {
    super();
    this.name = "Renderer";
    this.width = width;
    this.height = height;
    this.disableAntiAliasing = disableAntiAliasing || false;
    this.debugEmoji = "\uD83C\uDFA8";
  }
  face(direction) {
    if (direction.x !== -1 && direction.x !== 1 && direction.y !== -1 && direction.y !== 1) {
      throw new Error("Direction must be vector with -1 or 1 in x and y axis");
    }
    this.facing = direction;
  }
}

// Parts/Children/AnimatedSprite.ts
class AnimatedSprite extends Renderer {
  spritesheet;
  spritesheetData;
  loadedSheet;
  frames = {};
  lastFrameTime = 0;
  currentFrameIndex = 0;
  hasWarnedAboutTransform = false;
  width;
  height;
  bouncing = false;
  currentAnimation = "default";
  disableAntiAliasing = false;
  onAnimationComplete;
  constructor({ spritesheet, width, height, startingAnimation, disableAntiAliasing = false, onAnimationComplete }) {
    super({ width, height });
    this.name = "AnimatedSprite";
    this.debugEmoji = "\uD83C\uDF9E️";
    this.spritesheet = spritesheet;
    this.width = width;
    this.height = height;
    this.ready = false;
    this.currentAnimation = startingAnimation || "default";
    this.disableAntiAliasing = disableAntiAliasing;
    this.onAnimationComplete = onAnimationComplete;
  }
  async onMount(parent) {
    super.onMount(parent);
    parent.setSuperficialDimensions(this.width, this.height);
    console.log(this.width, this.height);
    console.log(this.parent);
    const response = await fetch(this.spritesheet);
    if (!response.ok) {
      throw new Error(`Failed to load spritesheet: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.frames || !Array.isArray(data.frames)) {
      throw new Error("Invalid spritesheet format: 'frames' array is missing or not an array.");
    }
    if (!data.meta || !data.meta.image) {
      throw new Error("Invalid spritesheet format: 'meta.image' is missing.");
    }
    if (!data.meta.size || typeof data.meta.size.w !== "number" || typeof data.meta.size.h !== "number") {
      throw new Error("Invalid spritesheet format: 'meta.size' is missing or invalid.");
    }
    if (!data.meta.animations || typeof data.meta.animations !== "object") {
      throw new Error("Invalid spritesheet format: 'meta.animations' is missing or not an object.");
    }
    const image = new Image;
    const relativeToSpritesheet = this.spritesheet.split("/").slice(0, -1).join("/");
    const path = data.meta.image.startsWith("http") ? data.meta.image : new URL(relativeToSpritesheet + "/" + data.meta.image, window.location.href).href;
    image.src = path;
    image.onerror = (err) => {
      console.error(`Failed to load spritesheet image <${data.meta.image}>:`, err);
      this.ready = false;
    };
    this.spritesheetData = data;
    this.frames = Object.fromEntries(Object.keys(data.meta.animations).map((animationName) => [animationName, Array(data.meta.animations[animationName].frames.length).fill(null)]));
    await new Promise((resolve, reject) => {
      image.onload = () => {
        this.loadedSheet = image;
        resolve();
      };
      image.onerror = (err) => {
        console.error(`Failed to load spritesheet image <${data.meta.image}>:`, err);
        this.ready = false;
        reject(err);
      };
    });
    const frameLoadPromises = [];
    for (const animation of Object.keys(this.frames)) {
      this.frames[animation] = new Array(this.frames[animation].length);
      for (let i = 0;i < this.frames[animation].length; i++) {
        const frameIndex = this.spritesheetData?.frames.findIndex((frame2) => frame2.filename === data.meta.animations[animation].frames[i]);
        if (frameIndex === -1) {
          throw new Error(`Frame '${data.meta.animations[animation].frames[i]}' does not exist in spritesheet for animated sprite <${this.name}> attached to ${this.parent?.name}.`);
        }
        const frame = this.frame(frameIndex);
        if (frame) {
          this.frames[animation][i] = frame;
          frameLoadPromises.push(new Promise((resolve, reject) => {
            frame.onload = () => {
              resolve();
            };
            frame.onerror = (err) => {
              console.error(`Failed to load frame at index ${i} for animated sprite <${this.name}>:`, err);
              reject(err);
            };
          }));
        } else {
          throw new Error(`Failed to create frame at index ${i} for animated sprite <${this.name}> attached to ${this.parent?.name}.`);
        }
      }
    }
    if (this.currentAnimation === "default" && this.spritesheetData.meta.startingAnimation) {
      this.currentAnimation = this.spritesheetData.meta.startingAnimation;
    } else if (this.currentAnimation === "default" && Object.keys(this.spritesheetData.meta.animations).length > 0) {
      this.currentAnimation = Object.keys(this.spritesheetData.meta.animations)[0];
    }
    this.ready = true;
  }
  frame(index) {
    if (!this.loadedSheet || !this.spritesheetData) {
      console.warn("AnimatedSprite is not ready or spritesheet data is missing.");
      return null;
    }
    const frameData = this.spritesheetData.frames[index];
    if (!frameData) {
      console.warn(`${this.name} attached to ${this.parent?.name} frame at index ${index} was indexed but does not exist in spritesheet`);
      return null;
    }
    const { x, y, w, h } = frameData.frame;
    const rotated = frameData.rotated;
    const spriteSourceSize = frameData.spriteSourceSize;
    const sourceSize = frameData.sourceSize;
    const canvas = document.createElement("canvas");
    canvas.width = sourceSize.w;
    canvas.height = sourceSize.h;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get canvas context.");
      return null;
    }
    ctx.imageSmoothingEnabled = !this.disableAntiAliasing;
    ctx.save();
    if (rotated) {
      ctx.translate(sourceSize.w / 2, sourceSize.h / 2);
      ctx.rotate(90 * Math.PI / 180);
      ctx.translate(-sourceSize.h / 2, -sourceSize.w / 2);
      ctx.drawImage(this.loadedSheet, x, y, h, w, spriteSourceSize.y, spriteSourceSize.x, spriteSourceSize.h, spriteSourceSize.w);
    } else {
      ctx.drawImage(this.loadedSheet, x, y, w, h, spriteSourceSize.x, spriteSourceSize.y, spriteSourceSize.w, spriteSourceSize.h);
    }
    ctx.restore();
    const string = canvas.toDataURL("image/png");
    const img = new Image;
    img.src = string;
    return img;
  }
  setAnimation(animationName, { loop, bounce } = {}) {
    if (this.spritesheetData && this.spritesheetData.meta.animations[animationName]) {
      this.currentAnimation = animationName;
      this.currentFrameIndex = 0;
      this.bouncing = bounce ?? this.spritesheetData.meta.animations[animationName].bounce ?? false;
      this.lastFrameTime = performance.now();
      if (loop !== undefined) {
        this.spritesheetData.meta.animations[this.currentAnimation].loop = loop;
      }
    } else {
      console.warn(`Animation '${animationName}' does not exist in spritesheet for animated sprite <${this.name}> attached to ${this.parent?.name}.`);
    }
  }
  act() {
    super.act();
    const now = performance.now();
    const delta = now - this.lastFrameTime;
    const duration = this.spritesheetData?.frames[this.currentFrameIndex].duration || 100;
    if (this.ready && this.spritesheetData) {
      if (delta > duration) {
        if (this.spritesheetData.meta.animations[this.currentAnimation].bounce) {
          let direction = this.bouncing ? -1 : 1;
          const animFrames = this.spritesheetData.meta.animations[this.currentAnimation].frames.length;
          if (this.currentFrameIndex + direction < 0 || this.currentFrameIndex + direction >= animFrames) {
            this.bouncing = !this.bouncing;
            direction *= -1;
          }
          this.currentFrameIndex += direction;
          if (this.currentFrameIndex < 0)
            this.currentFrameIndex = 0;
          if (this.currentFrameIndex >= animFrames)
            this.currentFrameIndex = animFrames - 1;
        } else {
          const animFrames = this.spritesheetData.meta.animations[this.currentAnimation].frames.length;
          const shouldLoop = this.spritesheetData.meta.animations[this.currentAnimation].loop !== false;
          if (shouldLoop) {
            const wasAtLastFrame = this.currentFrameIndex === animFrames - 1;
            this.currentFrameIndex = (this.currentFrameIndex + 1) % animFrames;
            if (wasAtLastFrame && this.onAnimationComplete) {
              this.onAnimationComplete(this.currentAnimation, this);
            }
          } else {
            if (this.currentFrameIndex < animFrames - 1) {
              this.currentFrameIndex++;
            } else if (this.currentFrameIndex === animFrames - 1 && this.onAnimationComplete) {
              this.onAnimationComplete(this.currentAnimation, this);
            }
          }
        }
        this.lastFrameTime = now;
      }
      const transform = this.sibling("Transform");
      if (!transform) {
        if (!this.hasWarnedAboutTransform) {
          console.warn(`AnimatedSprite <${this.name}> attached to ${this.parent?.name} does not have a Transform component. Skipping rendering. This will only show once.`);
          this.hasWarnedAboutTransform = true;
        }
        return;
      }
      if (!this.top) {
        throw new Error(`AnimatedSprite <${this.name}> is not attached to a top-level parent. Ensure it is added to a Game, Scene, or Layer before rendering.`);
      }
      if (this.top.context) {
        this.top.context.imageSmoothingEnabled = !this.disableAntiAliasing;
        const position = transform.worldPosition;
        const frame = this.frames[this.currentAnimation][this.currentFrameIndex];
        if (frame) {
          this.top.context.save();
          this.top.context.translate(position.x, position.y);
          this.top.context.rotate(transform.rotation);
          this.top.context.imageSmoothingEnabled = !this.disableAntiAliasing;
          this.top.context.scale(transform.scale.x * this.facing.x, transform.scale.y * this.facing.y);
          this.top.context.drawImage(frame, -this.width / 2, -this.height / 2, this.width, this.height);
          this.top.context.restore();
        } else {
          console.warn(`Frame (${this.currentAnimation}) index ${this.currentFrameIndex} does not exist for animated sprite <${this.name}> attached to ${this.parent?.name}.`);
        }
      } else {
        throw new Error(`AnimatedSprite <${this.name}> attached to ${this.parent?.name} does not have a context to render to. Ensure it is added to a Game, Scene, or Layer with a game ancestor.`);
      }
    }
    const barHeight = 15;
    const barWidth = 6;
    const progress = delta / duration;
    this.hoverbug = `${this.ready ? "✅" : "❌"} ${this.spritesheetData?.meta.animations[this.currentAnimation].loop ? "\uD83D\uDD01" : ""}` + `<div style="display:inline-block; width:${barWidth}px; height:${barHeight}px; background:linear-gradient(to top, dodgerblue ${progress * 100}%, #ccc ${progress * 100}%); border-radius:3px; border:1px solid #888; vertical-align:middle;border-radius:0px"></div> ` + `${this.frames[this.currentAnimation]?.map((frame, i) => {
      if (!frame)
        return "";
      frame.style.cssText = `display:inline-block; margin-right:2px;width:10px; height:10px; border: 1px solid ${i === this.currentFrameIndex ? "green" : "white"};`;
      return frame.outerHTML;
    }).join("") || ""}` + `${this.currentAnimation} ${this.bouncing ? "\uD83D\uDD04" : ""}`;
  }
}

// Parts/Children/ColorRender.ts
class ColorRender extends Renderer {
  color;
  constructor({ width, height, color }) {
    super({ width, height });
    this.name = "ColorRender";
    this.color = color;
    this.debugEmoji = "\uD83C\uDFA8";
  }
  onMount(parent) {
    super.onMount(parent);
    if (!this.sibling("Transform")) {
      console.warn(`ColorRender <${this.name}> does not have a Transform sibling. Please ensure you add a Transform component before adding others.`);
      return;
    }
    parent.setSuperficialDimensions(this.width, this.height);
  }
  act() {
    super.act();
    if (!this.top) {
      throw new Error(`ColorRender <${this.name}> is not attached to a top-level parent. Ensure it is added to a Game instance or Scene before rendering.`);
    }
    if (!(this.top instanceof Game)) {
      throw new Error(`ColorRender <${this.name}> is not attached to a Game instance. Ensure it is added to a Game, Scene, or Layer with a game ancestor.`);
    }
    const transform = this.sibling("Transform");
    if (!transform) {
      console.warn(`ColorRender <${this.name}> does not have a Transform sibling. Skipping rendering.`);
      return;
    }
    const position = transform.worldPosition;
    const rotation = transform.rotation;
    this.top.context.save();
    this.top.context.translate(position.x, position.y);
    this.top.context.rotate(rotation);
    this.top.context.scale(transform.scale.x * this.facing.x, transform.scale.y * this.facing.y);
    this.top.context.fillStyle = this.color;
    this.top.context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    this.top.context.restore();
    this.hoverbug = `Color: ${this.color}`;
  }
}

// Parts/Children/TextRender.ts
class TextRender extends Renderer {
  textContent;
  font;
  align;
  color;
  constructor({ name, textContent, font, align, color }) {
    super({ width: 0, height: 0, disableAntiAliasing: true });
    this.name = name;
    this.textContent = textContent;
    this.font = font;
    this.align = align || "left";
    this.color = color || "black";
    this.debugEmoji = "\uD83C\uDD70️";
  }
  onMount(parent) {
    super.onMount(parent);
    this.updateSuperficialDimensions();
  }
  updateSuperficialDimensions() {
    if (this.top && this.top.context) {
      const context = this.top.context;
      context.font = this.font;
      const metrics = context.measureText(this.textContent);
      this._superficialWidth = metrics.width;
      this._superficialHeight = parseInt(this.font) || 20;
      this.width = this._superficialWidth;
      this.height = this._superficialHeight;
    }
  }
  setText(text) {
    this.textContent = text;
    this.updateSuperficialDimensions();
  }
  act() {
    super.act();
    const transform = this.sibling("Transform");
    if (!transform) {
      console.warn(`Text <${this.name}> (${this.id}) does not have a Transform sibling. Skipping rendering.`);
      return;
    }
    if (!this.top) {
      throw new Error(`Text <${this.name}> (${this.id}) is not attached to a top-level parent. Ensure it is added to a Game instance or Scene before rendering.`);
    }
    const context = this.top.context;
    const position = transform.worldPosition;
    const rotation = transform.rotation;
    const scale = transform.scale;
    if (!context) {
      throw new Error(`Text <${this.name}> (${this.id}) requires a valid context to render. Ensure it is mounted to a Game instance with a canvas.`);
    }
    context.save();
    context.font = this.font;
    context.textAlign = this.align;
    context.fillStyle = this.color;
    context.translate(position.x, position.y);
    context.rotate(rotation);
    context.scale(scale.x, scale.y);
    context.fillText(this.textContent, 0, 0);
    context.restore();
    this.hoverbug = `${this.textContent} (${this._superficialWidth}x${this._superficialHeight})`;
  }
}

// Parts/Children/Button.ts
class Button extends Renderer {
  styles;
  isHovered = false;
  isActive = false;
  onClickHandler;
  constructor({ label, onClick, styles }) {
    super({ width: styles?.default?.width ?? 100, height: styles?.default?.height ?? 50, disableAntiAliasing: true });
    this.name = label;
    this.onClickHandler = onClick;
    this.styles = styles;
    this.onclick = (event, input) => {
      if (this.onClickHandler) {
        this.onClickHandler();
      }
      event.stopPropagation();
      event.preventDefault();
    };
    this.onhover = () => {
      this.isHovered = true;
      console.log(`Button ${this.name} hovered`);
    };
    this.onunhover = () => {
      this.isHovered = false;
      this.isActive = false;
      console.log(`Button ${this.name} unhovered`);
    };
    this.onmousedown = (event) => {
      if (event.button === 0) {
        this.isActive = true;
      }
    };
    this.onmouseup = (event) => {
      if (event.button === 0) {
        this.isActive = false;
      }
    };
  }
  onMount(parent) {
    super.onMount(parent);
    if (!this.sibling("Transform")) {
      console.warn(`Button <${this.name}> (${this.id}) does not have Transform sibling. Please ensure you add a Transform component before adding a Button.`);
    }
    if (this.parent instanceof Scene && !this.parent.sibling("Input")) {
      this.parent.addChild(new Input({
        key: () => {
        },
        keyup: () => {
        },
        mousemove: () => {
        },
        click: () => {
        }
      }));
    }
    const defaultStyle = this.styles?.default;
    this.superficialWidth = defaultStyle?.width ?? 100;
    this.superficialHeight = defaultStyle?.height ?? 50;
  }
  act() {
    super.act();
    if (!this.top) {
      throw new Error(`Button <${this.name}> is not attached to a top-level parent. Ensure it is added to a Game instance or Scene before rendering.`);
    }
    const transform = this.sibling("Transform");
    if (!transform) {
      throw new Error(`Button <${this.name}> does not have a Transform sibling. Ensure it is mounted to a GameObject with a Transform component.`);
    }
    const position = transform.worldPosition;
    const rotation = transform.rotation;
    const scale = transform.scale;
    const ctx = this.top.context;
    if (!ctx) {
      throw new Error(`Button <${this.name}> requires a valid context to render. Ensure it is mounted to a Game instance with a canvas.`);
    }
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(rotation);
    ctx.scale(scale.x, scale.y);
    const defaultStyle = this.styles?.default || {};
    let effectiveStyle = { ...defaultStyle };
    if (this.isHovered && this.styles?.hover) {
      effectiveStyle = { ...effectiveStyle, ...this.styles.hover };
    }
    if (this.isActive && this.styles?.active) {
      effectiveStyle = { ...effectiveStyle, ...this.styles.active };
    }
    const borderRadius = effectiveStyle.borderRadius ?? 5;
    const borderWidth = effectiveStyle.borderWidth ?? 2;
    const borderColor = effectiveStyle.borderColor ?? "#000000";
    const backgroundColor = effectiveStyle.backgroundColor ?? "#CCCCCC";
    const color = effectiveStyle.color ?? "#000000";
    const font = effectiveStyle.font ?? "16px Arial";
    const width = effectiveStyle.width ?? 100;
    const height = effectiveStyle.height ?? 50;
    this.width = effectiveStyle.width ?? width;
    this.height = effectiveStyle.height ?? height;
    const w = width;
    const h = height;
    const r = Math.min(borderRadius, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(-w / 2 + r, -h / 2);
    ctx.lineTo(w / 2 - r, -h / 2);
    ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    ctx.lineTo(w / 2, h / 2 - r);
    ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    ctx.lineTo(-w / 2 + r, h / 2);
    ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    ctx.lineTo(-w / 2, -h / 2 + r);
    ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    ctx.closePath();
    ctx.fillStyle = backgroundColor;
    ctx.fill();
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.stroke();
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.save();
    ctx.clip();
    ctx.fillText(this.name, 0, 0);
    ctx.restore();
    ctx.restore();
    this.hoverbug = `Hovered: ${this.isHovered ? "\uD83D\uDFE2" : "\uD83D\uDD34"}`;
  }
}

// src/EnemyMovement.ts
class EnemyMovement extends Part {
  direction;
  nextFlip;
  minX;
  maxX;
  gameWidth;
  speed = 2;
  constructor(gameWidth, speed = 2) {
    super();
    this.minX = 0;
    this.gameWidth = gameWidth;
    this.maxX = gameWidth;
    this.speed = speed;
    this.name = "EnemyMovement";
    this.direction = 1;
    this.nextFlip = Date.now() + 1000 + (Math.random() - 0.5) * 500;
  }
  onMount(parent) {
    super.onMount(parent);
    this.minX = 0;
    this.maxX = this.gameWidth - this.superficialWidth;
  }
  act() {
    const now = Date.now();
    if (now >= this.nextFlip) {
      this.direction = Math.random() < 0.5 ? 1 : -1;
      this.nextFlip = now + 1000 + (Math.random() - 0.5) * 500;
    }
    const transform = this.sibling("Transform");
    if (!transform) {
      console.warn(`EnemyMovement <${this.name}> (${this.id}) does not have Transform sibling. Skipping movement.`);
      return;
    }
    transform.position.x += this.direction * this.speed;
    if (transform.position.x < this.minX) {
      transform.position.x = this.minX;
      this.direction = 1;
    } else if (transform.position.x > this.maxX) {
      transform.position.x = this.maxX;
      this.direction = -1;
    }
  }
}

// src/Target.ts
class Target extends GameObject {
  constructor(nameAppend, position) {
    super({ name: "Target" + nameAppend });
    this.addChildren(new Transform({ position, scale: Vector.From(1) }), new ColorRender({ width: 20, height: 20, color: "red" }), new BoxCollider({ width: 20, height: 20 }));
  }
}

// src/ScoreCounter.ts
class ScoreCounter extends Part {
  score = 0;
  scoreText = "Game Over! Final Score: 0";
  textRender;
  transform;
  constructor() {
    super({ name: "ScoreCounter" });
    this.transform = new Transform({ position: new Vector(10, 30) });
    this.textRender = new TextRender({
      name: "ScoreText",
      textContent: `Score: ${this.score}`,
      font: "24px Arial",
      align: "left"
    });
    this.addChildren(this.transform, this.textRender);
  }
  addScore(points) {
    this.score += points;
    this.textRender.textContent = `Score: ${this.score}`;
    this.scoreText = `Game Over! Final Score: ${this.score}`;
  }
  reset() {
    this.score = 0;
    this.textRender.textContent = `Score: ${this.score}`;
    this.scoreText = `Game Over! Final Score: ${this.score}`;
  }
  get finalScore() {
    return this.score;
  }
}

// src/main.ts
var GAME_WIDTH = window.innerWidth;
var GAME_HEIGHT = window.innerHeight;
var PLAYER_SPEED = 5;
var JUMP_FORCE = 15;
var GRAVITY = 0.8;
var ENEMY_SPEED = 3;
var PLATFORM_HEIGHT = 50;
var MONSTER_BASE_HEIGHT = 27;
var MONSTER_SCALE = 3;
var MONSTER_SCALED_HEIGHT = MONSTER_BASE_HEIGHT * MONSTER_SCALE;
var gameOver = false;
var game = new Game({ name: "Monster Run", canvas: "game-canvas", width: GAME_WIDTH, height: GAME_HEIGHT, devmode: false, disableAntiAliasing: true });
var scene1 = new Scene({ name: "Game Scene" });
var gameLayer = new Layer({ name: "Game Layer" });
var backgroundLayer = new Layer({ name: "Background Layer" });
scene1.addChild(backgroundLayer);
backgroundLayer.addChildren(new Transform({ position: new Vector(GAME_WIDTH / 2, GAME_HEIGHT / 2) }), new ColorRender({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  color: "lightblue"
}));
game.addChild(scene1);
scene1.addChild(gameLayer);
var scoreCounter = new ScoreCounter;
gameLayer.addChild(scoreCounter);
var targets = [];
var monster = new GameObject({ name: "Monster" });
monster.addChildren(new Transform({ position: new Vector(20, 0), scale: Vector.From(3) }), new AnimatedSprite({
  spritesheet: "TestAssets/monster.json",
  width: 17,
  height: 27,
  startingAnimation: "idle"
}), new BoxCollider({ width: 17, height: 27 }));
monster.addChild(new Sound({
  name: "JumpSound",
  src: "TestAssets/jump.mp3",
  loop: false,
  volume: 1
}));
var PLAYER_START_Y = GAME_HEIGHT - PLATFORM_HEIGHT - MONSTER_SCALED_HEIGHT / 2;
monster.children["Transform"].position.y = PLAYER_START_Y;
gameLayer.addChild(monster);
var platform = new GameObject({ name: "Platform" });
platform.addChildren(new Transform({ position: new Vector(GAME_WIDTH / 2, GAME_HEIGHT - PLATFORM_HEIGHT / 2) }), new ColorRender({ width: GAME_WIDTH, height: PLATFORM_HEIGHT, color: "brown" }), new BoxCollider({ width: GAME_WIDTH, height: PLATFORM_HEIGHT }));
gameLayer.addChild(platform);
var enemies = [];
for (let i = 0;i < 3; i++) {
  const enemy = new GameObject({ name: `Blue Man ${i + 1}` });
  enemy.addChildren(new Transform({ position: new Vector(GAME_WIDTH / 4 + i * (GAME_WIDTH / 4), GAME_HEIGHT - PLATFORM_HEIGHT / 2 - 45) }), new ColorRender({ width: 30, height: 40, color: "blue" }), new BoxCollider({ width: 30, height: 40 }), new EnemyMovement(GAME_WIDTH, ENEMY_SPEED));
  gameLayer.addChild(enemy);
  enemies.push(enemy);
}

class GameLogic extends Part {
  isJumping = true;
  velocityY = 0;
  onMount(parent) {
    super.onMount(parent);
  }
  act() {
    if (gameOver)
      return;
    const monsterTransform = monster.children["Transform"];
    const monsterCollider = monster.children["BoxCollider"];
    const animatedSprite = monster.children["AnimatedSprite"];
    if (this.isJumping) {
      this.velocityY += GRAVITY;
      monsterTransform.position.y += this.velocityY;
      if (animatedSprite.currentAnimation !== "idle") {
        animatedSprite.setAnimation("idle");
      }
    }
    if (monsterCollider.collidingWith.has(platform.children["BoxCollider"]) && this.velocityY > 0) {
      this.isJumping = false;
      this.velocityY = 0;
      monsterTransform.position.y = PLAYER_START_Y;
    }
    for (let i2 = targets.length - 1;i2 >= 0; i2--) {
      const target = targets[i2];
      const targetCollider = target.children["BoxCollider"];
      if (monsterCollider.collidingWith.has(targetCollider)) {
        scoreCounter.addScore(10);
        this.sibling("CoinCollect")?.play({ clone: true });
        gameLayer.removeChild(target);
        targets.splice(i2, 1);
      }
    }
    if (Math.random() < 0.01 && targets.length < 5) {
      const randomX = Math.random() * (GAME_WIDTH - 40) + 20;
      const randomY = Math.random() * (GAME_HEIGHT - PLATFORM_HEIGHT - 100) + 50;
      const newTarget = new Target(Math.random().toString(16).substring(2, 8), new Vector(randomX, GAME_HEIGHT - PLATFORM_HEIGHT - 20));
      gameLayer.addChild(newTarget);
      targets.push(newTarget);
    }
    var i = 0;
    for (const enemy of enemies) {
      i++;
      const enemyTransform = enemy.children["Transform"];
      const enemyCollider = enemy.children["BoxCollider"];
      if (monsterCollider.collidingWith.has(enemyCollider)) {
        this.top?.setScene("Game Over Scene");
        gameOver = true;
        console.log("Game Over! You hit an enemy!");
        return;
      }
    }
    super.act();
  }
}
var gameLogicInstance = new GameLogic({ name: "Game Logic" });
scene1.addChild(gameLogicInstance);
scene1.addChild(new Sound({
  name: "CoinCollect",
  src: "TestAssets/coin.mp3",
  loop: false
}));
scene1.addChild(new Sound({
  name: "BackgroundMusic",
  src: "TestAssets/background.mp3",
  loop: true,
  volume: 0.5
}));
scene1.children["BackgroundMusic"].play({ restart: true });
scene1.addChild(new Input({
  key: (event) => {
    const monsterTransform = monster.children["Transform"];
    const animatedSprite = monster.children["AnimatedSprite"];
    switch (event.key) {
      case "ArrowLeft":
        monsterTransform.position.x -= PLAYER_SPEED;
        if (monsterTransform.position.x - monster._superficialWidth < 0) {
          monsterTransform.position.x = monster._superficialWidth;
        }
        animatedSprite.face(new Vector(-1, 1));
        if (animatedSprite.currentAnimation !== "walk" && !gameLogicInstance.isJumping) {
          animatedSprite.setAnimation("walk", { loop: true });
        }
        break;
      case "ArrowRight":
        monsterTransform.position.x += PLAYER_SPEED;
        if (monsterTransform.position.x > GAME_WIDTH - monster.superficialWidth) {
          monsterTransform.position.x = GAME_WIDTH - monster.superficialWidth;
        }
        animatedSprite.face(new Vector(1, 1));
        if (animatedSprite.currentAnimation !== "walk" && !gameLogicInstance.isJumping) {
          animatedSprite.setAnimation("walk", { loop: true });
        }
        break;
      case " ":
        if (!gameLogicInstance.isJumping) {
          const jumpSound = monster.children["JumpSound"];
          jumpSound.play({ clone: true });
          gameLogicInstance.isJumping = true;
          gameLogicInstance.velocityY = -JUMP_FORCE;
          animatedSprite.setAnimation("idle");
        }
        break;
    }
  },
  keyup: (event) => {
    const animatedSprite = monster.children["AnimatedSprite"];
    if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && !gameLogicInstance.isJumping) {
      animatedSprite.setAnimation("idle");
    }
  },
  mousemove: (event, input) => {
  },
  click: (event, input) => {
  }
}));
var gameOverScene = new Scene({ name: "Game Over Scene" });
var gameOverLayer = new Layer({ name: "Game Over Layer" });
gameOverScene.addChild(gameOverLayer);
var gameOverText = new GameObject({ name: "Game Over Text" });
var gameOverRender = new TextRender({
  name: "Game Over Text",
  textContent: `Game Over! Final Score: ${scoreCounter.score}`,
  align: "center",
  font: "48px Arial"
});
scoreCounter.tie(gameOverRender, "textContent", "scoreText");
gameOverText.addChildren(gameOverRender, new Transform({ position: new Vector(GAME_WIDTH / 2, GAME_HEIGHT / 2) }));
gameOverLayer.addChild(gameOverText);
var restartButton = new GameObject({ name: "Restart Button" });
restartButton.addChildren(new Transform({ position: new Vector(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100) }), new Button({
  label: "Restart",
  onClick: () => {
    gameOver = false;
    game.setScene(scene1);
    monster.children["Transform"].position.x = 10;
    monster.children["Transform"].position.y = PLAYER_START_Y;
    gameLogicInstance.isJumping = true;
    gameLogicInstance.velocityY = 0;
    enemies.forEach((enemy, index) => {
      const enemyTransform = enemy.children["Transform"];
      enemyTransform.position.x = GAME_WIDTH / 4 + index * (GAME_WIDTH / 4);
    });
    monster.children["BoxCollider"].collidingWith.clear();
    scoreCounter.reset();
    targets.forEach((target) => gameLayer.removeChild(target));
    targets = [];
  },
  styles: {
    default: {
      backgroundColor: "#4CAF50",
      color: "white",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#388E3C",
      width: 150,
      height: 60,
      font: "24px Arial"
    },
    hover: {
      backgroundColor: "#45A049",
      borderColor: "#2E8B57"
    },
    active: {
      backgroundColor: "#367C39",
      borderColor: "#1B5E20"
    }
  }
}));
gameOverLayer.addChild(restartButton);
game.addChild(gameOverScene);
gameOverScene.addChild(new Input({
  key: () => {
  },
  keyup: () => {
  },
  mousemove: () => {
  },
  click: (event, input) => {
  }
}));
game.calculateLayout();
game.start(scene1);
