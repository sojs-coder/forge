import { getDebugInfo } from "../helpers";
import { Part } from "./Part";
import { Scene } from "./Scene";
import { SoundManager } from "./SoundManager";

export class Game extends Part {
    canvas: HTMLCanvasElement;
    currentScene?: Scene;
    childrenArray: Scene[];
    devmode: boolean;
    context: CanvasRenderingContext2D;
    showtoolTips: boolean = false;
    hovering?: Part;
    tooltipLocked?: boolean;
    lastMousePosition: { x: number, y: number } = { x: 0, y: 0 };
    scaleFactor: number = 1;
    canvasOffset: { x: number, y: number } = { x: 0, y: 0 };
    messageHook?: (type: "warn" | "error" | "debug", ...args: any[]) => void;
    private _isRunning: boolean = false;
    private _width: number = 800;
    private _height: number = 600;
    private _isPaused: boolean = false;
    private _animationFrameId?: number;
    private _lastUpdateTime: number = 0;

    constructor({ name, canvas, devmode = false, width, height, disableAntiAliasing = false, showtoolTips = false }: { name: string, canvas: HTMLCanvasElement | string, devmode?: boolean, width: number, height: number, disableAntiAliasing?: boolean, showtoolTips?: boolean }) {
        super();
        this.name = name;
        this.showtoolTips = showtoolTips;
        this.childrenArray = [];
        this.canvas = typeof canvas === "string" ? document.getElementById(canvas) as HTMLCanvasElement : canvas;
        this.context = (this.canvas as HTMLCanvasElement).getContext("2d")!;
        this.devmode = devmode;
        this.changeCanvasSize(width, height);

        this.context.imageSmoothingEnabled = !disableAntiAliasing;
        this.debugEmoji = "🎮";
        this.tooltipLocked = false;
        this.top = this;
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

    clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        // Game constructor requires canvas, width, height, name
        // We cannot clone the canvas directly, so we'll create a placeholder
        // The user will need to re-assign a real canvas after cloning
        const clonedGame = new Game({
            name: this.name,
            canvas: document.createElement('canvas'), // Placeholder canvas
            devmode: this.devmode,
            width: this.width,
            height: this.height,
            disableAntiAliasing: !this.context.imageSmoothingEnabled, // Infer from original context
            showtoolTips: this.showtoolTips
        });

        memo.set(this, clonedGame);

        this._cloneProperties(clonedGame, memo);

        // Reset properties that are tied to the DOM or internal state
        clonedGame.canvas = undefined as any; // User must provide a real canvas
        clonedGame.context = undefined as any; // Context will be derived from new canvas
        clonedGame.currentScene = undefined; // Will be set by start() or setScene()
        // clonedGame.childrenArray is handled by _cloneProperties
        clonedGame.hovering = undefined; // Reset hovering part
        clonedGame.tooltipLocked = undefined; // Reset tooltip lock
        clonedGame.lastMousePosition = { x: 0, y: 0 }; // Reset mouse position
        clonedGame.scaleFactor = 1; // Reset scale factor
        clonedGame.canvasOffset = { x: 0, y: 0 }; // Reset canvas offset
        clonedGame.messageHook = undefined; // Clear message hook
        clonedGame._isRunning = false; // Reset running state
        clonedGame._isPaused = false; // Reset paused state
        clonedGame._animationFrameId = undefined; // Clear animation frame ID
        clonedGame._lastUpdateTime = 0; // Reset last update time

        return clonedGame as this;
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
        tooltip.style.pointerEvents = "none";
        tooltip.style.zIndex = "1000";
        document.body.appendChild(tooltip);
        return tooltip;
    }

    addChild(scene: Scene) {
        this.currentScene = this.currentScene || scene;
        scene.setTop(this);
        super.addChild(scene);
    }

    addChildren(...scenes: Scene[]) {
        scenes.forEach(scene => this.addChild(scene));
    }

    start(starterScene: Scene | string) {
        if (typeof starterScene === "string") {
            const scene = this.child<Scene>(starterScene);
            if (scene instanceof Scene) {
                this.currentScene = scene;
            } else {
                this.currentScene = this.childrenArray.find(s => s.name === starterScene);
                if (!this.currentScene) {
                    throw new Error(`Scene with name "${starterScene}" not found in game <${this.name}> (Does not exist as ID either. Please check your references).`);
                }
            }
        } else if (starterScene instanceof Scene) {
            this.currentScene = starterScene;
        } else {
            this.warn("No valid scene provided to start the game. Using the first scene found. Check console for more details");
            this.currentScene = this.childrenArray[0];
            if (!this.currentScene) {
                throw new Error("No scenes available to start the game.");
            }
        }
        this._isRunning = true;
        this._isPaused = false;
        this._lastUpdateTime = performance.now();
        this.onStart();

        SoundManager.startGame();
        this.loop();
    }

    loop() {
        if (!this._isRunning) {
            return;
        }
        if (!this._isPaused && this.currentScene) {
            const now = performance.now();
            const delta = (now - this._lastUpdateTime)
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            if (this.devmode) {
                this.currentScene.calculateLayout();
                this.context.save();
                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.currentScene.debugTreeRender(this.canvas.width / 2, 10, { x: 10, y: 40 });
                this.context.restore();
                this.currentScene.preFrame();
                this.currentScene.act(delta);
                this.currentScene.frameEnd(delta);
                this.updateDebugToolTip();
                this.context.fillStyle = "red";
                this.context.fillRect(this.canvas.width / 2 - 2, this.canvas.height / 2 - 2, 4, 4);
            } else {
                this.currentScene.preFrame();
                this.currentScene.act(delta);
                this.currentScene.frameEnd(delta);
            }
            this._lastUpdateTime = now;
        }

        if (this._isRunning) {
            this._animationFrameId = window.requestAnimationFrame(this.loop.bind(this));
        }
    }

    pause() {
        this._isPaused = true;
        this.debug("Game paused");
        SoundManager.pauseGame();
    }

    resume() {
        this.debug("Game resumed");
        this._isPaused = false;
        SoundManager.resumeGame();
    }

    stop() {
        this._isRunning = false;
        this._isPaused = false;
        if (this._animationFrameId) {
            window.cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = undefined;
        }
        SoundManager.stopGame();

        // Dump everything from memory
        this.childrenArray.forEach(scene => {
            scene.destroy();
        });
    }

    get isRunning(): boolean {
        return this._isRunning;
    }

    get isPaused(): boolean {
        return this._isPaused;
    }

    act(purposeful: boolean | number = false) {
        if (!this.warned.has("ActUsage") && !purposeful) {
            const seen = this.warn(`Act called on Game <${this.name}>. Use start() to begin the game loop. Calling act() directly will run 1 frame of the current scene. This message will appear only once.`);
            if (seen) this.warned.add("ActUsage");
        }
        if (this.currentScene) {
            this.currentScene.act(0);
        } else {
            this.warn(`No current scene set in <${this.name}>, and no available scenes to run as the current scene in game <${this.name}>. Please ensure you have added scenes and/or set a current scene before calling act().`);
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
        } else {
            console.error('Set unknown scene type- neither string nor Scene instance');
            let json;
            try {
                json = JSON.stringify(scene);
            } catch (error: any) {
                json = `<Error Parsing JSON: ${error?.message || 'Error'}>`;
            }
            this.debug(`Trying to set scene to unknown type- neither string nor Scene instance. Got ${typeof scene} - ${json}`);
        }
    }
    warn(...args: any[]) {
        if (this.messageHook && typeof this.messageHook === "function") {
            this.messageHook("warn", ...args);
            return true;
        } else {
            console.warn(`[${this.name}] - WARN`, ...args);
            return false;
        }
    }
    error(...args: any[]) {
        if (this.messageHook && typeof this.messageHook === "function") {
            this.messageHook("error", ...args);
            return true;
        } else {
            console.error(`[${this.name}] - ERROR`, ...args);
            return false;
        }
    }
    debug(...args: any[]) {
        if (this.messageHook && typeof this.messageHook === "function") {
            this.messageHook("debug", ...args);
            return true;
        } else {
            console.debug(`[${this.name}]`, ...args);
            return false;
        }
    }
    updateDebugToolTip() {
        const tooltip = document.getElementById("debug-tooltip");
        if (!tooltip) {
            this.warn("Debug tooltip not found. Ensure it is created in devmode.");
            return;
        }
        if (this.hovering) {
            if (tooltip && this.showtoolTips) {
                try {
                    tooltip.style.left = `${(this.lastMousePosition!.x * this.scaleFactor) + this.canvasOffset.x + 10}px`;
                    tooltip.style.top = `${(this.lastMousePosition!.y * this.scaleFactor) + this.canvasOffset.y + 10}px`;
                    tooltip.style.display = "block";
                    tooltip.innerHTML = getDebugInfo(this.hovering, 0);
                } catch (err) {
                    throw new Error(`Error updating debug tooltip: ${err}`);
                }
            }
        } else {
            tooltip.style.display = "none";
        }
    }
}