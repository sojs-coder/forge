import type { NodeDefinition } from "./types.ts";

export const nodeDefinitions: Record<string, NodeDefinition> = {
    "Game": {
        properties: {
            name: { type: "text", default: "NewGame", description: "The name of the game." },
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
            name: { type: "text", default: "NewScene", description: "The name of the scene." },
            backgroundColor: { type: "color", default: "#000000", description: "Background color of the scene." }
        },
        children: ["Layer", "GameObject", "Camera", "Input", "ParallaxLayer", "Sound", "PhysicsEngine"]
    },
    "Layer": {
        properties: {
            name: { type: "text", default: "NewLayer", description: "The name of the layer." }
        },
        children: ["GameObject"]
    },
    "GameObject": {
        properties: {
            name: { type: "text", default: "NewGameObject", description: "The name of the game object." },
        },
        children: ["Transform", "BoxCollider", "PolygonCollider", "ColorRender", "SpriteRender", "AnimatedSprite", "TextRender", "Button", "Sound", "Health", "Timer", "Spawner", "Follow", "CharacterMovement", "PhysicsEngine", "Rotator", "Scaler", "Projectile", "AreaTrigger", "ParticleEmitter", "WaypointFollower", "CameraShake", "HealthBar", "PhysicsBody"]
    },
    "Camera": {
        properties: {
            name: { type: "text", default: "NewCamera", description: "The name of the camera." },
            position: { type: "Vector", default: "new Vector(0, 0)", description: "Position of the camera in the scene." },
            zoom: { type: "Vector", default: "new Vector(1, 1)", description: "Zoom level of the camera." },
        },
        children: ["Transform","Follow"],
        singular: true
    },
    "Input": {
        properties: {
            name: { type: "text", default: "Input", description: "The name of the input component." }
        },
        singular: true
    },
    "Transform": {
        properties: {
            name: { type: "text", default: "Transform", description: "The name of the transform component." },
            position: { type: "Vector", default: "new Vector(0, 0)", description: "Position of the object in the scene (from the center of the object)." },
            rotation: { type: "number", default: 0, description: "Rotation of the object in radians." },
            scale: { type: "Vector", default: "new Vector(1, 1)", description: "Scale of the object." },
        },
        singular: true
    },
    "BoxCollider": {
        properties: {
            name: { type: "text", default: "BoxCollider", description: "The name of the box collider." },
            width: { type: "number", default: 50, description: "Width of the box collider." },
            height: { type: "number", default: 50, description: "Height of the box collider." }
        },
        singular: true
    },
    "PolygonCollider": {
        properties: {
            name: { type: "text", default: "PolygonCollider", description: "The name of the polygon collider." },
            vertices: { type: "list", subType: "Vector", default: ["new Vector(-25,-25)", "new Vector(25,-25)", "new Vector(25,25)", "new Vector(-25,25)"], description: "Vertices of the polygon." }
        },
        singular: true
    },
    "ColorRender": {
        properties: {
            name: { type: "text", default: "ColorRender", description: "The name of the color renderer." },
            width: { type: "number", default: 50, description: "Width of the color renderer." },
            height: { type: "number", default: 50, description: "Height of the color renderer." },
            color: { type: "color", default: "#FF0000", description: "Color of the renderer." }
        },
        singular: true
    },
    "SpriteRender": {
        properties: {
            name: { type: "text", default: "SpriteRender", description: "The name of the sprite renderer." },
            imageSource: { type: "file", fileType: "image", default: "", description: "Path to the image source." },
            width: { type: "number", default: 50, description: "Width of the sprite." },
            height: { type: "number", default: 50, description: "Height of the sprite." },
            facing: { type: "Vector", default: "new Vector(1, 1)", description: "Direction to face. Use -1 to flip." }
        },
        singular: true
    },
    "AnimatedSprite": {
        properties: {
            name: { type: "text", default: "AnimatedSprite", description: "The name of the animated sprite." },
            spritesheet: { type: "file", fileType: "json", default: "", description: "Path to the spritesheet JSON." },
            spritesheetImage: { type: "file", fileType: "image", default: "", description: "The image file for the spritesheet." },
            width: { type: "number", default: 50, description: "Width of the animated sprite." },
            height: { type: "number", default: 50, description: "Height of the animated sprite." },
            startingAnimation: { type: "text", default: "", description: "Starting animation name." },
            disableAntiAliasing: { type: "boolean", default: false, description: "Disable anti-aliasing for this sprite." },
            facing: { type: "Vector", default: "new Vector(1, 1)", description: "Direction to face. Use -1 to flip." },
            webEngine: { type: "boolean", default: true, description: "Set to true if this is running in a web engine context.", dontShow: true },
        },
        singular: true
    },
    "TextRender": {
        properties: {
            name: { type: "text", default: "TextRender", description: "The name of the text renderer." },
            textContent: { type: "text", default: "Hello World", description: "The text content to display." },
            font: { type: "text", default: "24px Arial", description: "Font style for the text." },
            align: { type: "text", default: "left", description: "Text alignment (left, center, right)." },
            color: { type: "color", default: "#000000", description: "Color of the text." }
        },
        singular: true
    },
    "Button": {
        properties: {
            name: { type: "text", default: "Button", description: "The name of the button." },
            label: { type: "text", default: "Button", description: "The label displayed on the button." },
            width: { type: "number", default: 100, description: "Width of the button." },
            height: { type: "number", default: 50, description: "Height of the button." },
            backgroundColor: { type: "color", default: "#CCCCCC", description: "Background color of the button." },
            color: { type: "color", default: "#000000", description: "Text color of the button." },
            font: { type: "text", default: "16px Arial", description: "Font style for the button label." },
            clickSound: { type: "Part", subType: "Sound", description: "Sound to play on click." },
            hoverSound: { type: "Part", subType: "Sound", description: "Sound to play on hover." },
            activeSound: { type: "Part", subType: "Sound", description: "Sound to play on active." }
        },
        singular: true
    },
    "Sound": {
        properties: {
            name: { type: "text", default: "NewSound", description: "The name of the sound." },
            src: { type: "file", fileType: "audio", default: "", description: "Path to the audio file." },
            volume: { type: "number", default: 1, description: "Volume of the sound (0-1)." },
            loop: { type: "boolean", default: false, description: "Whether the sound should loop." },
            start: { type: "boolean", default: false, description: "Whether to start playing immediately after loading." },
            webEngine: { type: "boolean", default: true, description: "Set to true if this is running in a web engine context (editor).", dontShow: true }
        }
    },
    "Health": {
        properties: {
            name: { type: "text", default: "Health", description: "The name of the health component." },
            maxHealth: { type: "number", default: 100, description: "Maximum health points." }
        },
        singular: true
    },
    "Timer": {
        properties: {
            name: { type: "text", default: "Timer", description: "The name of the timer." },
            duration: { type: "number", default: 1000, description: "Duration of the timer in milliseconds." },
            repeats: { type: "boolean", default: false, description: "Whether the timer should repeat." }
        },
        singular: true
    },
    "Spawner": {
        properties: {
            name: { type: "text", default: "Spawner", description: "The name of the spawner." },
            objectToSpawn: { type: "Part", subType: "GameObject", description: "The GameObject to spawn." },
            spawnRate: { type: "number", default: 1000, description: "Time in milliseconds between spawns." },
            maxSpawns: { type: "number", default: 10, description: "Maximum number of objects to spawn." }
        },
        singular: true
    },
    "Follow": {
        properties: {
            name: { type: "text", default: "Follow", description: "The name of the follow component." },
            target: { type: "Part", subType: "Transform", description: "The Transform to follow." },
            offset: { type: "Vector", default: "new Vector(0, 0)", description: "Offset from the target's position." },
            interpolationSpeed: { type: "number", default: 1, description: "Speed of interpolation towards the target's position." }
        },
        singular: true
    },
    "CharacterMovement": {
        properties: {
            name: { type: "text", default: "CharacterMovement", description: "The name of the character movement component." },
            speed: { type: "number", default: 5, description: "Movement speed." },
            movementType: { type: "enum", default: "WASD", options: ["WASD", "ArrowKeys", "BOTH"], description: "Type of movement controls to use." },
            input: { type: "Part", subType: "Input", description: "The Input part to use for movement." }
        },
        singular: true
    },
    "ParallaxLayer": {
        properties: {
            name: { type: "text", default: "ParallaxLayer", description: "The name of the parallax layer." },
            parallaxFactor: { type: "number", default: 0.5, description: "Factor determining parallax movement (0-1)." }
        },
        children: ["GameObject"]
    },
    "PhysicsEngine": {
        properties: {
            name: { type: "text", default: "PhysicsEngine", description: "The name of the physics engine." },
            gravity: { type: "Vector", default: "new Vector(0, 1)", description: "Gravity vector applied to all physics bodies." },
        },
        singular: true
    },
    "Rotator": {
        properties: {
            name: { type: "text", default: "Rotator", description: "The name of the rotator component." },
            rotationSpeed: { type: "number", default: 0.05, description: "Speed of rotation in radians per frame." }
        },
        singular: true
    },
    "Scaler": {
        properties: {
            name: { type: "text", default: "Scaler", description: "The name of the scaler component." },
            scaleSpeed: { type: "Vector", default: "new Vector(0.01, 0.01)", description: "Rate at which the object scales." },
            minScale: { type: "Vector", default: "new Vector(0.5, 0.5)", description: "Minimum scale of the object." },
            maxScale: { type: "Vector", default: "new Vector(1.5, 1.5)", description: "Maximum scale of the object." }
        },
        singular: true
    },
    "Projectile": {
        properties: {
            name: { type: "text", default: "Projectile", description: "The name of the projectile." },
            speed: { type: "number", default: 10, description: "Speed of the projectile." },
            direction: { type: "Vector", default: "new Vector(1, 0)", description: "Direction of the projectile." },
            damage: { type: "number", default: 10, description: "Damage inflicted by the projectile." }
        },
        singular: true
    },
    "AreaTrigger": {
        properties: {
            name: { type: "text", default: "AreaTrigger", description: "The name of the area trigger." }
        },
        singular: true
    },
    "ParticleEmitter": {
        properties: {
            name: { type: "text", default: "ParticleEmitter", description: "The name of the particle emitter." },
            particleColor: { type: "color", default: "#FFFFFF", description: "Color of the particles." },
            particleSize: { type: "number", default: 5, description: "Size of the particles." },
            particleSpeed: { type: "number", default: 2, description: "Speed of the particles." },
            particleLifetime: { type: "number", default: 60, description: "Lifetime of the particles in frames." },
            emissionRate: { type: "number", default: 100, description: "Delay in milliseconds between emissions." },
            maxParticles: { type: "number", default: 100, description: "Maximum number of particles." },
            range: { type: "list", subType: "number", default: ["0", "6.283185307179586"], description: "Range in radians for emission direction." }
        },
        singular: true
    },
    "WaypointFollower": {
        properties: {
            name: { type: "text", default: "WaypointFollower", description: "The name of the waypoint follower." },
            waypoints: { type: "list", subType: "Vector", default: ["new Vector(0,0)", "new Vector(100,0)", "new Vector(100,100)", "new Vector(0,100)"], description: "List of waypoints to follow." },
            speed: { type: "number", default: 5, description: "Speed of movement between waypoints." }
        },
        singular: true
    },
    "CameraShake": {
        properties: {
            name: { type: "text", default: "CameraShake", description: "The name of the camera shake component." },
            intensity: { type: "number", default: 5, description: "Intensity of the camera shake." },
            duration: { type: "number", default: 60, description: "Duration of the camera shake in frames." }
        },
        singular: true
    },
    "HealthBar": {
        properties: {
            name: { type: "text", default: "HealthBar", description: "The name of the health bar." },
            width: { type: "number", default: 100, description: "Width of the health bar." },
            height: { type: "number", default: 10, description: "Height of the health bar." },
            color: { type: "color", default: "green", description: "Color of the health bar." },
            offsetHeight: { type: "number", default: 0, description: "Offset from the parent GameObject's position." },
            backgroundColor: { type: "color", default: "red", description: "Background color of the health bar." }
        },
        singular: true
    },
    "PhysicsBody": {
        properties: {
            name: { type: "text", default: "PhysicsBody", description: "The name of the physics body." },
            isStatic: { type: "boolean", default: false, description: "Whether the body is static (unmovable)." },
            density: { type: "number", default: 0.001, description: "Density of the body." },
            friction: { type: "number", default: 0.1, description: "Friction of the body." },
            restitution: { type: "number", default: 0, description: "Restitution (bounciness) of the body." }
        },
        singular: true
    }
};
