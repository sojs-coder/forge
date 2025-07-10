const nodeDefinitions = {
  "Game": {
    properties: {
      name: { type: "text", default: "NewGame" },
      canvas: { type: "text", default: "gamecanvas", description: "The ID of the canvas you wish to attach the game to." },
      width: { type: "number", default: 800, description: "Width of the game canvas in pixels." },
      height: { type: "number", default: 600, description: "Height of the game canvas in pixels." },
      devmode: { type: "boolean", default: true, description: "Enable developer mode." },
      disableAntiAliasing: { type: "boolean", default: false, description: "Disable anti-aliasing for every object." },
      starterScene: { type: "Part", subType: "Scene", description: "The scene that will be loaded when the game starts." }
    },
    children: ["Scene"]
  },
  "Scene": {
    properties: {
      name: { type: "text", default: "NewScene" }
    },
    children: ["Layer", "GameObject", "Camera", "Input"]
  },
  "Layer": {
    properties: {
      name: { type: "text", default: "NewLayer" }
    },
    children: ["GameObject"]
  },
  "GameObject": {
    properties: {
      name: { type: "text", default: "NewGameObject" },
    },
    children: ["Transform", "BoxCollider", "PolygonCollider", "ColorRender", "SpriteRender", "AnimatedSprite", "TextRender", "Button"]
  },
  "Camera": {
    properties: {
      name: { type: "text", default: "New Camera" },
      position: { type: "Vector", default: "new Vector(0, 0)", description: "Position of the camera in the scene." },
      positionX: { type: "number", default: 0, description: "X position of the camera in the scene." },
      positionY: { type: "number", default: 0, description: "Y position of the camera in the scene." },
      zoom: { type: "Vector", default: "new Vector(1, 1)", description: "Zoom level of the camera." },
      zoomX: { type: "number", default: 1, description: "Horizontal zoom level of the camera." },
      zoomY: { type: "number", default: 1, description: "Vertical zoom level of the camera." }
    }
  },
  "Input": {
    properties: {
      name: { type: "text", default: "Input" }
    }
  },
  "Transform": {
    properties: {
      position: { type: "Vector", default: "new Vector(0, 0)", description: "Position of the object in the scene (from the center of the object)" },
      rotation: { type: "number", default: 0, description: "Rotation of the object in degrees." },
      scale: { type: "Vector", default: "new Vector(1, 1)", description: "Scale of the object." },
    }
  },
  "BoxCollider": {
    properties: {
      width: { type: "number", default: 50, description: "Width of the box collider." },
      height: { type: "number", default: 50, description: "Height of the box collider." }
    }
  },
  "PolygonCollider": {
    properties: {
      vertices: { type: "list", subType: "Vector", default: ["new Vector(0,0)", "new Vector(50,0)", "new Vector(50,50)", "new Vector(0,50)"] }
    }
  },
  "ColorRender": {
    properties: {
      width: { type: "number", default: 50 },
      height: { type: "number", default: 50 },
      color: { type: "color", default: "#FF0000" }
    }
  },
  "SpriteRender": {
    properties: {
      imageSource: { type: "text", default: "" },
      width: { type: "number", default: 50 },
      height: { type: "number", default: 50 }
    }
  },
  "AnimatedSprite": {
    properties: {
      spritesheet: { type: "text", default: "" },
      width: { type: "number", default: 50 },
      height: { type: "number", default: 50 },
      startingAnimation: { type: "text", default: "" }
    }
  },
  "TextRender": {
    properties: {
      name: { type: "text", default: "TextRender" },
      textContent: { type: "text", default: "Hello World" },
      font: { type: "text", default: "24px Arial" },
      align: { type: "text", default: "left" },
      color: { type: "color", default: "#000000" }
    }
  },
  "Button": {
    properties: {
      label: { type: "text", default: "Button" },
      width: { type: "number", default: 100 },
      height: { type: "number", default: 50 },
      backgroundColor: { type: "color", default: "#CCCCCC" },
      color: { type: "color", default: "#000000" },
      font: { type: "text", default: "16px Arial" }
    }
  }
};
