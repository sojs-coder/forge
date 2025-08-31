import { Part } from "./Part";
import { Scene } from "./Scene";
import { SoundManager } from "./SoundManager";

export class Game extends Part {
    canvas: HTMLCanvasElement;
    currentScene?: Scene;
    childrenArray: Scene[];
    devmode: boolean;
    context: CanvasRenderingContext2D;
    hovering?: Part;
    scaleFactor: number = 1;
    canvasOffset: { x: number, y: number } = { x: 0, y: 0 };
    messageHook?: (type: "warn" | "error" | "debug", ...args: any[]) => void;
    showFrameStats: "BASIC" | "EXTENDED" | "ADVANCED" | "PERFORMANCE_HUD" = "BASIC";
    frameBuffer: number[] = [];
    maxFrameBufferLength = 60 * 5; // last 5s worth of frames

    private _minFrameTime = Number.POSITIVE_INFINITY;
    private _maxFrameTime = 0;
    private _droppedFrames = 0;
    private _isRunning: boolean = false;
    private _width: number = 800;
    private _height: number = 600;
    private _isPaused: boolean = false;
    private _animationFrameId?: number;
    private _lastUpdateTime: number = 0;

    constructor({ name, canvas, devmode = false, width, height, disableAntiAliasing = false, showtoolTips = false, showFrameStats = "BASIC" }: { name: string, canvas: HTMLCanvasElement | string, devmode?: boolean, width: number, height: number, disableAntiAliasing?: boolean, showtoolTips?: boolean, showFrameStats?: "BASIC" | "EXTENDED" | "ADVANCED" | "PERFORMANCE_HUD"}) {
        super({ name });
        this.type = "Game";
        this.childrenArray = [];
        this.showFrameStats = showFrameStats;
        this.canvas = typeof canvas === "string" ? document.getElementById(canvas) as HTMLCanvasElement : canvas;
        this.context = (this.canvas as HTMLCanvasElement).getContext("2d")!;
        this.devmode = devmode;
        this.changeCanvasSize(width, height);

        this.context.imageSmoothingEnabled = !disableAntiAliasing;
        this.debugEmoji = "🎮";
        this.top = this;
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
        });

        memo.set(this, clonedGame);

        this._cloneProperties(clonedGame, memo);

        // Reset properties that are tied to the DOM or internal state
        clonedGame.canvas = undefined as any; // User must provide a real canvas
        clonedGame.context = undefined as any; // Context will be derived from new canvas
        clonedGame.currentScene = undefined; // Will be set by start() or setScene()
        // clonedGame.childrenArray is handled by _cloneProperties
        clonedGame.hovering = undefined; // Reset hovering part
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
        if (!this._isRunning) return;

        if (!this._isPaused && this.currentScene) {
            const now = performance.now();
            const delta = (now - this._lastUpdateTime);
            this._lastUpdateTime = now;

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            if (this.devmode) {
                this.currentScene.calculateLayout();
                this.context.save();
                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.currentScene.debugTreeRender(this.canvas.width / 2, 10, { x: 10, y: 40 });
                this.context.restore();
            }

            this.currentScene.preFrame();
            this.currentScene.act(delta);
            this.currentScene.frameEnd(delta);

            // --- PERFORMANCE TRACKING ---
            this.frameBuffer.push(delta);
            if (this.frameBuffer.length > this.maxFrameBufferLength) {
                this.frameBuffer.shift();
            }
            this._minFrameTime = Math.min(this._minFrameTime, delta);
            this._maxFrameTime = Math.max(this._maxFrameTime, delta);

            // Dropped frame if > 32ms (half of 60Hz)
            if (delta > 32) this._droppedFrames++;

            this.renderFrameStats();
        }

        if (this._isRunning) {
            this._animationFrameId = window.requestAnimationFrame(this.loop.bind(this));
        }
    }

    getColliderCount(activeOnly: boolean = false): number {
        const layers = this.currentScene?.childrenArray || [];
        let c = 0;
        for (const layer of layers) {
            if (!activeOnly) {
                const colliders = layer.flats.colliders.length;
                c += colliders;
            } else {
                const colliders = layer.flats.colliders.filter(col => col.active).length;
                c += colliders;
            }
        }

        return c;

    }

    private renderFrameStats() {
        if (!this.showFrameStats) return;
        const FADE_BACKGROUND = 0.5;
        const avgDelta = this.frameBuffer.reduce((a, b) => a + b, 0) / this.frameBuffer.length;
        const avgFPS = 1000 / avgDelta;
        const sorted = [...this.frameBuffer].sort((a, b) => a - b);
        const p95 = sorted[Math.floor(sorted.length * 0.95)];
        const p99 = sorted[Math.floor(sorted.length * 0.99)];
        const minFrameTime = sorted[0];
        const maxFrameTime = sorted[sorted.length - 1];

        // Prepare stats lines
        let lines: string[] = [];
        const levels = ["BASIC", "EXTENDED", "ADVANCED", "PERFORMANCE_HUD"];
        const levelIndex = levels.indexOf(this.showFrameStats);

        if (levelIndex >= 0) lines.push(`FPS: ${avgFPS.toFixed(2)}`);
        if (levelIndex >= 1) lines.push(`Frame Time: ${avgDelta.toFixed(2)} ms`);
        if (levelIndex >= 2) {
            lines.push(`Min: ${minFrameTime.toFixed(2)} (${this._minFrameTime.toFixed(2)} AT) ms`);
            lines.push(`Max: ${maxFrameTime.toFixed(2)} (${this._maxFrameTime.toFixed(2)} AT) ms`);
        }
        if (levelIndex >= 3) {
            lines.push(`p95 Frame: ${p95.toFixed(2)} ms`);
            lines.push(`p99 Frame: ${p99.toFixed(2)} ms`);
            const droppedPct = (this._droppedFrames / (this.frameBuffer.length || 1)) * 100;
            lines.push(`Dropped Frames: ${droppedPct.toFixed(1)}%`);
            const perfMem = (performance as any).memory;
            if (perfMem) {
                const usedMB = (perfMem.usedJSHeapSize / 1048576).toFixed(1);
                const totalMB = (perfMem.totalJSHeapSize / 1048576).toFixed(1);
                lines.push(`Heap: ${usedMB} MB / ${totalMB} MB`);
            }
            if (this.currentScene) {
                lines.push(`Colliders: ${this.getColliderCount()}`);
                lines.push(`Active colliders: ${this.getColliderCount(true)}`);
            }
        }

        // Calculate box size
        const fontSize = 12;
        const lineHeight = 20;
        const padding = 8;
        this.context.font = `${fontSize}px Arial`;
        let maxWidth = 0;
        for (const line of lines) {
            const width = this.context.measureText(line).width;
            if (width > maxWidth) maxWidth = width;
        }
        let boxHeight = lines.length * lineHeight + padding * 2;
        let boxWidth = maxWidth + padding * 2;
        let boxX = 6;
        let boxY = 6;

        // Draw background box
        this.context.globalAlpha = FADE_BACKGROUND;
        this.context.fillStyle = "#000";
        this.context.fillRect(boxX, boxY, boxWidth, boxHeight);
        this.context.globalAlpha = 1.0;

        // Draw text
        this.context.fillStyle = "white";
        let y = boxY + padding + fontSize;
        for (const line of lines) {
            this.context.fillText(line, boxX + padding, y);
            y += lineHeight;
        }


        // Draw chart if PERFORMANCE_HUD
        if (levelIndex >= 3) {
            const chartWidth = 200;
            const chartHeight = 80;
            const chartX = boxX + padding;
            const chartY = boxY + boxHeight + 10;

            // Find min and max for scaling, but zoom out a bit to reduce minor oscillations
            const minFrameTimeChart = Math.min(...this.frameBuffer);
            const maxFrameTimeChart = Math.max(...this.frameBuffer);

            // Add a margin to "zoom out" the chart
            const margin = Math.max(2, (maxFrameTimeChart - minFrameTimeChart) * 0.2);
            const chartMin = Math.max(0, minFrameTimeChart - margin);
            const chartMax = maxFrameTimeChart + margin;

            // Add a small epsilon to avoid division by zero
            const range = Math.max(1, chartMax - chartMin);

            // Draw background
            this.context.globalAlpha = FADE_BACKGROUND;
            this.context.fillStyle = "#000";
            this.context.fillRect(chartX - padding, chartY - padding, chartWidth + padding * 2, chartHeight + padding * 2);
            this.context.globalAlpha = 1;


            // Draw frame time line
            this.context.strokeStyle = "white";
            this.context.beginPath();
            this.frameBuffer.forEach((frameTime, index) => {
                const x = chartX + (index / (this.maxFrameBufferLength - 1)) * chartWidth;
                // Scale so that chartMin is at bottom, chartMax is at top
                const yVal = chartY + chartHeight - ((frameTime - chartMin) / range) * chartHeight;
                if (index === 0) {
                    this.context.moveTo(x, yVal);
                } else {
                    this.context.lineTo(x, yVal);
                }
            });
            this.context.stroke();
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
}