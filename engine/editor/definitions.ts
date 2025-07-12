import type { NodeDefinition } from "./types.ts";

export const nodeDefinitions: Record<string, NodeDefinition> = {
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
            name: { type: "text", default: "NewScene" },
            backgroundColor: { type: "color", default: "#000000", description: "Background color of the scene." }
        },
        children: ["Layer", "GameObject", "Camera", "Input", "ParallaxLayer", "Sound", "PhysicsEngine"]
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
        children: ["Transform", "BoxCollider", "PolygonCollider", "ColorRender", "SpriteRender", "AnimatedSprite", "TextRender", "Button", "Sound", "Health", "Timer", "Spawner", "Follow", "CharacterMovement", "PhysicsEngine", "Rotator", "Scaler", "Projectile", "AreaTrigger", "ParticleEmitter", "WaypointFollower", "CameraShake", "HealthBar", "PhysicsBody"]
    },
    "Camera": {
        properties: {
            name: { type: "text", default: "NewCamera" },
            position: { type: "Vector", default: "new Vector(0, 0)", description: "Position of the camera in the scene." },
            zoom: { type: "Vector", default: "new Vector(1, 1)", description: "Zoom level of the camera." },
        },
        children: ["Transform","Follow"]
    },
    "Input": {
        properties: {
            name: { type: "text", default: "Input" }
        }
    },
    "Transform": {
        properties: {
            name: { type: "text", default: "Transform" },
            position: { type: "Vector", default: "new Vector(0, 0)", description: "Position of the object in the scene (from the center of the object)" },
            rotation: { type: "number", default: 0, description: "Rotation of the object in degrees." },
            scale: { type: "Vector", default: "new Vector(1, 1)", description: "Scale of the object." },
        },
        singular: true
    },
    "BoxCollider": {
        properties: {
            name: { type: "text", default: "BoxCollider" },
            width: { type: "number", default: 50, description: "Width of the box collider." },
            height: { type: "number", default: 50, description: "Height of the box collider." }
        },
        singular: true
    },
    "PolygonCollider": {
        properties: {
            name: { type: "text", default: "PolygonCollider" },
            vertices: { type: "list", subType: "Vector", default: ["new Vector(-25,-25)", "new Vector(25,-25)", "new Vector(25,25)", "new Vector(-25,25)"] }
        },
        singular: true
    },
    "ColorRender": {
        properties: {
            name: { type: "text", default: "ColorRender" },
            width: { type: "number", default: 50 },
            height: { type: "number", default: 50 },
            color: { type: "color", default: "#FF0000" }
        },
        singular: true
    },
    "SpriteRender": {
        properties: {
            name: { type: "text", default: "SpriteRender" },
            imageSource: { type: "file", fileType: "image", default: "" },
            width: { type: "number", default: 50 },
            height: { type: "number", default: 50 },
            facing: { type: "Vector", default: "new Vector(1, 1)", description: "Direction to face. Use -1 to flip." }
        },
        singular: true
    },
    "AnimatedSprite": {
        properties: {
            name: { type: "text", default: "AnimatedSprite" },
            spritesheet: { type: "file", fileType: "json", default: "" },
            spritesheetImage: { type: "file", fileType: "image", default: "", description: "The image file for the spritesheet." },
            width: { type: "number", default: 50 },
            height: { type: "number", default: 50 },
            startingAnimation: { type: "text", default: "" },
            disableAntiAliasing: { type: "boolean", default: false, description: "Disable anti-aliasing for this sprite." },
            facing: { type: "Vector", default: "new Vector(1, 1)", description: "Direction to face. Use -1 to flip." },
            webEngine: { type: "boolean", default: true, description: "Set to true if this is running in a web engine context.", dontShow: true },
        },
        singular: true
    },
    "TextRender": {
        properties: {
            name: { type: "text", default: "TextRender" },
            textContent: { type: "text", default: "Hello World" },
            font: { type: "text", default: "24px Arial" },
            align: { type: "text", default: "left" },
            color: { type: "color", default: "#000000" }
        },
        singular: true
    },
    "Button": {
        properties: {
            name: { type: "text", default: "Button" },
            label: { type: "text", default: "Button" },
            width: { type: "number", default: 100 },
            height: { type: "number", default: 50 },
            backgroundColor: { type: "color", default: "#CCCCCC" },
            color: { type: "color", default: "#000000" },
            font: { type: "text", default: "16px Arial" },
            clickSound: { type: "Part", subType: "Sound", description: "Sound to play on click." },
            hoverSound: { type: "Part", subType: "Sound", description: "Sound to play on hover." },
            activeSound: { type: "Part", subType: "Sound", description: "Sound to play on active." }
        },
        singular: true
    },
    "Sound": {
        properties: {
            name: { type: "text", default: "NewSound" },
            src: { type: "file", fileType: "audio", default: "" },
            volume: { type: "number", default: 1 },
            loop: { type: "boolean", default: false }
        }
    },
    "Health": {
        properties: {
            name: { type: "text", default: "Health" },
            maxHealth: { type: "number", default: 100 }
        }
    },
    "Timer": {
        properties: {
            name: { type: "text", default: "Timer" },
            duration: { type: "number", default: 1000 },
            repeats: { type: "boolean", default: false }
        }
    },
    "Spawner": {
        properties: {
            name: { type: "text", default: "Spawner" },
            objectToSpawn: { type: "Part", subType: "GameObject", description: "The GameObject to spawn." },
            spawnRate: { type: "number", default: 1000 },
            maxSpawns: { type: "number", default: 10 }
        }
    },
    "Follow": {
        properties: {
            name: { type: "text", default: "Follow" },
            target: { type: "Part", subType: "Transform", description: "The Part to follow." },
            offset: { type: "Vector", default: "new Vector(0, 0)", description: "Offset from the target's position." }
        }
    },
    "CharacterMovement": {
        properties: {
            name: { type: "text", default: "CharacterMovement" },
            speed: { type: "number", default: 5 },
            movementType: { type: "enum", default: "WASD", options: ["WASD", "ArrowKeys", "BOTH"], description: "Type of movement controls to use." },
            input: { type: "Part", subType: "Input", description: "The Input part to use for movement." }
        }
    },
    "ParallaxLayer": {
        properties: {
            name: { type: "text", default: "ParallaxLayer" },
            parallaxFactor: { type: "number", default: 0.5 }
        }
    },
    "PhysicsEngine": {
        properties: {
            name: { type: "text", default: "PhysicsEngine" },
            gravity: { type: "Vector", default: "new Vector(0, 1)", description: "Gravity vector applied to all physics bodies." },
        }
    },
    "Rotator": {
        properties: {
            name: { type: "text", default: "Rotator" },
            rotationSpeed: { type: "number", default: 0.05 }
        }
    },
    "Scaler": {
        properties: {
            name: { type: "text", default: "Scaler" },
            scaleSpeed: { type: "Vector", default: "new Vector(0.01, 0.01)" },
            minScale: { type: "Vector", default: "new Vector(0.5, 0.5)" },
            maxScale: { type: "Vector", default: "new Vector(1.5, 1.5)" }
        }
    },
    "Projectile": {
        properties: {
            name: { type: "text", default: "Projectile" },
            speed: { type: "number", default: 10 },
            direction: { type: "Vector", default: "new Vector(1, 0)" },
            damage: { type: "number", default: 10 }
        }
    },
    "AreaTrigger": {
        properties: {
            name: { type: "text", default: "AreaTrigger" }
        }
    },
    "ParticleEmitter": {
        properties: {
            name: { type: "text", default: "ParticleEmitter" },
            particleColor: { type: "color", default: "#FFFFFF" },
            particleSize: { type: "number", default: 5 },
            particleSpeed: { type: "number", default: 2 },
            particleLifetime: { type: "number", default: 60 },
            emissionRate: { type: "number", default: 100 },
            maxParticles: { type: "number", default: 100 }
        }
    },
    "WaypointFollower": {
        properties: {
            name: { type: "text", default: "WaypointFollower" },
            waypoints: { type: "list", subType: "Vector", default: ["new Vector(0,0)", "new Vector(100,0)", "new Vector(100,100)", "new Vector(0,100)"] },
            speed: { type: "number", default: 5 }
        }
    },
    "CameraShake": {
        properties: {
            name: { type: "text", default: "CameraShake" },
            intensity: { type: "number", default: 5 },
            duration: { type: "number", default: 60 }
        }
    },
    "HealthBar": {
        properties: {
            name: { type: "text", default: "HealthBar" },
            width: { type: "number", default: 100 },
            height: { type: "number", default: 10 },
            color: { type: "color", default: "green" },
            offsetHeight: { type: "number", default: 0, description: "Offset from the parent GameObject's position." },
            backgroundColor: { type: "color", default: "red" }
        }
    },
    "PhysicsBody": {
        properties: {
            name: { type: "text", default: "PhysicsBody" },
            isStatic: { type: "boolean", default: false },
            density: { type: "number", default: 0.001 },
            friction: { type: "number", default: 0.1 },
            restitution: { type: "number", default: 0 }
        }
    }
};
