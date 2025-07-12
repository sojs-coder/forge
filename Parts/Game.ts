import { getDebugInfo, isPointInPolygon } from "../helpers";
import type { Transform } from "./Children/Transform";
import type { BoxCollider } from "./Children/BoxCollider";
import type { PolygonCollider } from "./Children/PolygonCollider";
import { Layer } from "./Layer";
import { Part } from "./Part";
import { Scene } from "./Scene";
import type { Vector } from "../Math/Vector";

export class Game extends Part {
    canvas: HTMLCanvasElement;
    currentScene?: Scene;
    childrenArray: Scene[];
    hasWarnedActUsage: boolean = false;
    devmode: boolean;
    context: CanvasRenderingContext2D;
    hovering?: Part;
    tooltipLocked?: boolean; // Whether the tooltip is locked (debug only)
    lastMousePosition?: { x: number, y: number }; // Last mouse position for hover tracking (debug only)
    scaleFactor: number = 1; // New property for canvas scaling
    canvasOffset: { x: number, y: number } = { x: 0, y: 0 }; // New property for canvas offset
    private _isRunning: boolean = false;
    private _width: number = 800; // Default width
    private _height: number = 600; // Default height
    private _isPaused: boolean = false;
    private _animationFrameId?: number;
    private _lastUpdateTime: number = 0; // Track the last update time for delta calculations
    constructor({ name, canvas, devmode = false, width, height, disableAntiAliasing = false }: { name: string, canvas: HTMLCanvasElement | string, devmode?: boolean, width: number, height: number, disableAntiAliasing?: boolean }) {
        super();
        this.name = name;
        this.childrenArray = [];
        this.canvas = typeof canvas === "string" ? document.getElementById(canvas) as HTMLCanvasElement : canvas;
        this.context = (this.canvas as HTMLCanvasElement).getContext("2d")!;
        this.devmode = devmode;
        this.changeCanvasSize(width, height);
    
        this.context.imageSmoothingEnabled = !disableAntiAliasing;
        this.debugEmoji = "🎮"; // Default emoji for debugging the game
        this.tooltipLocked = false;
        if (this.devmode) {
            let tooltip = document.getElementById("debug-tooltip");
            if (!tooltip) {
                tooltip = this.createDebugTooltip();
            }
            document.addEventListener("mousemove", (event) => {
                const rect = this.canvas.getBoundingClientRect();
                const clientX = event.clientX - rect.left;
                const clientY = event.clientY - rect.top;
                this.lastMousePosition = {
                    x: (clientX / this.scaleFactor) - (this.canvasOffset.x / this.scaleFactor),
                    y: (clientY / this.scaleFactor) - (this.canvasOffset.y / this.scaleFactor)
                };
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
    changeCanvasSize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
    }
    set width(width: number) {
        this._width = width;
        this.canvas.width = width;
    }
    set height(height: number) {
        this._height = height;
        this.canvas.height = height;
    }
    get width(): number {
        return this._width;
    }
    get height(): number {
        return this._height;
    }
    createDebugTooltip() {
        const tooltip = document.createElement("div");
        tooltip.id = "debug-tooltip";
        tooltip.style.position = "absolute";
        tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        tooltip.style.color = "white";
        tooltip.style.padding = "5px";
        tooltip.style.display = 'none';
        tooltip.style.borderRadius = "5px";
        tooltip.style.pointerEvents = "none"; // Prevent tooltip from blocking mouse events
        tooltip.style.zIndex = "1000"; // Ensure tooltip is above other elements
        document.body.appendChild(tooltip);
        return tooltip;
    }
    addChild(scene: Scene) {
        this.currentScene = this.currentScene || scene; // Set the first scene as the current scene if none is set.
        scene.setTop(this);
        super.addChild(scene);
    }
    addChildren(...scenes: Scene[]) {
        scenes.forEach(scene => this.addChild(scene));
    }

    start(starterScene: Scene | string) {
        if (typeof starterScene === "string") {
            const scene = this.children[starterScene];
            if (scene instanceof Scene) {
                this.currentScene = scene;
            } else {
                // attempt to find scene by name
                this.currentScene = this.childrenArray.find(s => s.name === starterScene);
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
        this._lastUpdateTime = performance.now(); // Initialize last update time
        this.loop();
    }

    loop() {
        if (!this._isRunning) {
            return;
        }
        if (!this._isPaused && this.currentScene) {
            const now = performance.now();
            const delta = Math.min((now - this._lastUpdateTime), 1000 / 60); // Convert to seconds - cap at 60 FPS.. any slower will bug out physics
            // Clear the canvas based on the game's logical dimensions
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (this.devmode) {
                this.currentScene.calculateLayout();
                // Render debug tree at a fixed position, scaled by the inverse of the canvas scale
                this.context.save();
                this.context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform for debug UI
                this.currentScene.debugTreeRender(this.canvas.width / 2, 10, { x: 10, y: 40 });
                this.context.restore();
                this.currentScene.act(delta);
                this.updateDebugToolTip(); // Update tooltip based on current mouse position

                // Draw a center dot (also scaled)
                this.context.fillStyle = "red";
                this.context.fillRect(this.canvas.width / 2 - 2, this.canvas.height / 2 - 2, 4, 4);
            } else {
                this.currentScene.act(delta);
            }
            this._lastUpdateTime = now; // Update last update time for next frame
        }

        if (this._isRunning) {
            this._animationFrameId = window.requestAnimationFrame(this.loop.bind(this));
        }
    }

    pause() {
        this._isPaused = true;
    }

    resume() {
        this._isPaused = false;
    }

    stop() {
        this._isRunning = false;
        this._isPaused = false;
        if (this._animationFrameId) {
            window.cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = undefined;
        }
    }

    get isRunning(): boolean {
        return this._isRunning;
    }

    get isPaused(): boolean {
        return this._isPaused;
    }
    act(purposeful: boolean | number = false) {
        if (!this.hasWarnedActUsage && !purposeful) {
            console.warn(`Act called on Game <${this.name}>. Use start() to begin the game loop. Calling act() directly will run 1 frame of the current scene. This message will appear only once.`);
            this.hasWarnedActUsage = true;
        }
        if (this.currentScene) {
            this.currentScene.act(0);
        } else {
            console.warn(`No current scene set in <${this.name}>, and no available scenes to run as the current scene in game <${this.name}>. Please ensure you have added scenes and/or set a current scene before calling act().`);
        }
    }
    setScene(scene: Scene | string) {
        if (typeof scene === "string") {
            const foundScene = this.childrenArray.find(s => s.name === scene || s.id === scene);
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
                // Adjust tooltip position based on scaled canvas and offset
                tooltip.style.left = `${(this.lastMousePosition!.x * this.scaleFactor) + this.canvasOffset.x + 10}px`;
                tooltip.style.top = `${(this.lastMousePosition!.y * this.scaleFactor) + this.canvasOffset.y + 10}px`;
                tooltip.style.display = "block";
                tooltip.innerHTML = getDebugInfo(this.hovering, 0);
            }
        } else {
            tooltip.style.display = "none"; // Hide tooltip if not hovering over any part
        }
    }

}