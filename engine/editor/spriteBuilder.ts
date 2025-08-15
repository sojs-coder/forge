import JSZip from 'jszip';
import { customPrompt } from './customPrompt';

interface Shape {
    id: string;
    type: DrawingTool | 'image';
    color: string;
    thickness: number;
    points?: Array<{ x: number, y: number }>;
    radius?: number;
    image?: HTMLImageElement;
    width?: number;
    height?: number;
}

interface Frame {
    name: string;
    image: HTMLImageElement;
    shapes: Shape[];
    duration?: number;
}

interface SpriteSheetData {
    frames: Array<{
        filename: string;
        frame: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
        rotated?: boolean;
        trimmed?: boolean;
        spriteSourceSize?: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
        sourceSize?: {
            w: number;
            h: number;
        };
        duration?: number;
    }>;
    meta: {
        image: string;
        size: {
            w: number;
            h: number;
        };
        startingAnimation?: string;
        startingFrame?: string;
        animations: {
            [animationName: string]: {
                frames: string[];
                loop?: boolean;
                bounce?: boolean;
            };
        };
    }
}

type DrawingTool = 'pencil' | 'line' | 'circle' | 'polygon' | 'cursor' | 'select' | 'image';

class SpriteBuilder {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private drawingCanvas: HTMLCanvasElement;
    private drawingCtx: CanvasRenderingContext2D;
    private previewCanvas: HTMLCanvasElement;
    private previewCtx: CanvasRenderingContext2D;

    private createFrameButton: HTMLButtonElement;
    private exportButton: HTMLButtonElement;
    private addAnimationButton: HTMLButtonElement;
    private overlayButton: HTMLButtonElement;
    private frameWidthInput: HTMLInputElement;
    private frameHeightInput: HTMLInputElement;
    private framesList: HTMLDivElement;
    private animationsList: HTMLDivElement;
    private animationPreviewModal: HTMLDivElement;
    private animationPreviewCanvas: HTMLCanvasElement;
    private animationPreviewCtx: CanvasRenderingContext2D;
    private closeModalButton: HTMLSpanElement;

    // Drawing tools UI
    private drawingToolsContainer: HTMLDivElement;
    private pencilToolButton: HTMLButtonElement;
    private lineToolButton: HTMLButtonElement;
    private circleToolButton: HTMLButtonElement;
    private polygonToolButton: HTMLButtonElement;
    private imageToolButton: HTMLButtonElement;
    private cursorToolButton: HTMLButtonElement;
    private selectToolButton: HTMLButtonElement;
    private colorPicker: HTMLInputElement;
    private thicknessInput: HTMLInputElement;
    private antiAliasingCheckbox: HTMLInputElement;
    private saveDrawingButton: HTMLButtonElement;
    private cancelDrawingButton: HTMLButtonElement;
    private lightBackgroundCheckBox: HTMLInputElement
    private lightBackground: boolean;

    private frames: Frame[] = [];
    private animations: { [name: string]: { frames: string[], loop?: boolean, bounce?: boolean } } = {};
    private selectedAnimation: string | null = null;
    private currentDrawingTool: DrawingTool | null = null;
    private isDrawing = false;
    private startX = 0;
    private startY = 0;
    private initialMouseX = 0;
    private initialMouseY = 0;
    private offsetX = 0;
    private offsetY = 0;
    private activeControlPointIndex: number = -1;
    private isModifyingShape: boolean = false;
    private polygonPoints: Array<{ x: number, y: number }> = [];
    private animationInterval: ReturnType<typeof setInterval> | null = null;
    private activelyEditing: Shape | null = null;
    private overlayFrame: Frame | null = null;
    private selectedShape: Shape | null = null;
    private selectedShapes: Shape[] = [];
    private selectionBox: { x: number, y: number, w: number, h: number } | null = null;
    private isDraggingSelection = false;
    private dragStartPos: { x: number, y: number } = { x: 0, y: 0 };
    private draggedFrameName: string | null = null;

    private _selectedFrame: Frame | null = null;

    constructor() {
        this.canvas = document.getElementById('sprite-canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.drawingCanvas = document.createElement('canvas');
        this.drawingCtx = this.drawingCanvas.getContext('2d')!;
        this.previewCanvas = document.createElement('canvas');
        this.previewCtx = this.previewCanvas.getContext('2d')!;

        this.createFrameButton = document.getElementById('create-frame-button') as HTMLButtonElement;
        this.exportButton = document.getElementById('export-button') as HTMLButtonElement;
        this.addAnimationButton = document.getElementById('add-animation-button') as HTMLButtonElement;
        this.overlayButton = document.getElementById('overlay-frame-button') as HTMLButtonElement;
        this.frameWidthInput = document.getElementById('frame-width') as HTMLInputElement;
        this.frameHeightInput = document.getElementById('frame-height') as HTMLInputElement;
        this.framesList = document.getElementById('frames-list') as HTMLDivElement;
        this.animationsList = document.getElementById('animations-list') as HTMLDivElement;
        this.animationPreviewModal = document.getElementById('animation-preview-modal') as HTMLDivElement;
        this.animationPreviewCanvas = document.getElementById('animation-preview-canvas') as HTMLCanvasElement;
        this.animationPreviewCtx = this.animationPreviewCanvas.getContext('2d')!;
        this.closeModalButton = document.querySelector('.close-button') as HTMLSpanElement;
        this.lightBackgroundCheckBox = document.getElementById('light-background-checkbox') as HTMLInputElement;
        this.lightBackground = this.lightBackgroundCheckBox.checked;

        // Drawing tools UI
        this.drawingToolsContainer = document.getElementById('drawing-tools') as HTMLDivElement;
        this.pencilToolButton = document.getElementById('draw-tool-pencil') as HTMLButtonElement;
        this.lineToolButton = document.getElementById('draw-tool-line') as HTMLButtonElement;
        this.circleToolButton = document.getElementById('draw-tool-circle') as HTMLButtonElement;
        this.polygonToolButton = document.getElementById('draw-tool-polygon') as HTMLButtonElement;
        this.imageToolButton = document.getElementById('draw-tool-image') as HTMLButtonElement;
        this.cursorToolButton = document.getElementById('draw-tool-cursor') as HTMLButtonElement;
        this.selectToolButton = document.getElementById('draw-tool-select') as HTMLButtonElement;
        this.colorPicker = document.getElementById('color-picker') as HTMLInputElement;
        this.thicknessInput = document.getElementById('thickness-input') as HTMLInputElement;
        this.antiAliasingCheckbox = document.getElementById('anti-aliasing-checkbox') as HTMLInputElement;
        this.saveDrawingButton = document.getElementById('save-drawing-button') as HTMLButtonElement;
        this.cancelDrawingButton = document.getElementById('cancel-drawing-button') as HTMLButtonElement;

        this.init();
    }
    get selectedFrame(): Frame | null {
        return this._selectedFrame;
    }
    set selectedFrame(frame: Frame | null) {
        const old = this._selectedFrame;
        if (old) {
            document.querySelector(`.frame[data-frame-name="${old.name}"]`)?.classList.remove('selected');
        }
        this._selectedFrame = frame;
        document.querySelector(`.frame[data-frame-name="${frame?.name}"]`)?.classList.add('selected');
    }
    private init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.createFrameButton.addEventListener('click', () => this.createFrame());
        this.exportButton.addEventListener('click', () => this.exportSpriteSheet());
        this.addAnimationButton.addEventListener('click', () => this.addAnimation());
        this.overlayButton.addEventListener('click', () => this.selectOverlayFrame());
        this.closeModalButton.addEventListener('click', () => this.closePreviewModal());
        this.lightBackgroundCheckBox.addEventListener('change', () => {
            this.lightBackground = this.lightBackgroundCheckBox.checked;
            this.redrawScaledCanvas();
        });

        this.frameWidthInput.addEventListener('change', () => this.updateDrawingCanvasSize());
        this.frameHeightInput.addEventListener('change', () => this.updateDrawingCanvasSize());

        // Drawing tools listeners
        this.pencilToolButton.addEventListener('click', () => this.setDrawingTool('pencil'));
        this.lineToolButton.addEventListener('click', () => this.setDrawingTool('line'));
        this.circleToolButton.addEventListener('click', () => this.setDrawingTool('circle'));
        this.polygonToolButton.addEventListener('click', () => this.setDrawingTool('polygon'));
        this.imageToolButton.addEventListener('click', () => this.importImageAsShape());
        this.cursorToolButton.addEventListener('click', () => this.setDrawingTool('cursor'));
        this.selectToolButton.addEventListener('click', () => this.setDrawingTool('select'));
        this.saveDrawingButton.addEventListener('click', () => this.saveDrawing());
        this.cancelDrawingButton.addEventListener('click', () => this.toggleDrawingMode(false));
        this.antiAliasingCheckbox.addEventListener('change', () => this.setAntiAliasing());

        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', (e) => this.stopDrawing(e));
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));

        this.renderFrames();
        this.renderAnimations();
    }

    private updateDrawingCanvasSize() {
        const newWidth = parseInt(this.frameWidthInput.value);
        const newHeight = parseInt(this.frameHeightInput.value);

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.drawingCanvas.width;
        tempCanvas.height = this.drawingCanvas.height;
        const tempCtx = tempCanvas.getContext('2d')!;
        tempCtx.drawImage(this.drawingCanvas, 0, 0);

        this.drawingCanvas.width = newWidth;
        this.drawingCanvas.height = newHeight;

        this.drawingCtx.drawImage(tempCanvas, 0, 0);

        this.previewCanvas.width = newWidth;
        this.previewCanvas.height = newHeight;

        this.redrawScaledCanvas();
        this.redrawShapes();
    }

    private resizeCanvas() {
        const centerPanel = document.getElementById('center-panel')!;
        this.canvas.width = centerPanel.clientWidth;
        this.canvas.height = centerPanel.clientHeight;
        this.drawingCanvas.width = parseInt(this.frameWidthInput.value);
        this.drawingCanvas.height = parseInt(this.frameHeightInput.value);
        this.previewCanvas.width = this.drawingCanvas.width;
        this.previewCanvas.height = this.drawingCanvas.height;
        this.redrawScaledCanvas();
        this.redrawShapes();
    }

    private redrawScaledCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        const scale = Math.min(this.canvas.width / this.drawingCanvas.width, this.canvas.height / this.drawingCanvas.height);
        const x = (this.canvas.width / 2) - (this.drawingCanvas.width * scale / 2);
        const y = (this.canvas.height / 2) - (this.drawingCanvas.height * scale / 2);
        // Draw a checkerboard background for transparency
        const checkerSize = (this.drawingCanvas.width < 50 && this.drawingCanvas.height < 50) ? 1 : 10;
        for (let yi = 0; yi < this.drawingCanvas.height; yi += checkerSize) {
            for (let xi = 0; xi < this.drawingCanvas.width; xi += checkerSize) {
                if (((Math.floor(xi / checkerSize) + Math.floor(yi / checkerSize)) % 2) === 0) {
                    this.ctx.fillStyle = this.lightBackground ? '#fff' : '#111'; // black or white
                } else {
                    this.ctx.fillStyle = this.lightBackground ? '#ccc' : '#222'; // light grey or dark   grey
                }
                this.ctx.fillRect((xi * scale) + x, (yi * scale) + y, checkerSize * scale, checkerSize * scale);
            }
        }

        this.ctx.imageSmoothingEnabled = this.antiAliasingCheckbox.checked;
        this.drawingCtx.imageSmoothingEnabled = this.antiAliasingCheckbox.checked;
        this.ctx.drawImage(this.drawingCanvas, x, y, this.drawingCanvas.width * scale, this.drawingCanvas.height * scale);
        this.ctx.drawImage(this.previewCanvas, x, y, this.previewCanvas.width * scale, this.previewCanvas.height * scale);
        this.drawOverlayElements(scale, x, y);
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, this.drawingCanvas.width * scale, this.drawingCanvas.height * scale);
    }

    private getMousePos(e: MouseEvent): { x: number, y: number } {
        const rect = this.canvas.getBoundingClientRect();
        const scale = Math.min(this.canvas.width / this.drawingCanvas.width, this.canvas.height / this.drawingCanvas.height);
        const x = (this.canvas.width - this.drawingCanvas.width * scale) / 2;
        const y = (this.canvas.height - this.drawingCanvas.height * scale) / 2;

        return {
            x: (e.clientX - rect.left - x) / scale,
            y: (e.clientY - rect.top - y) / scale
        };
    }

    private isPointInShape(point: { x: number, y: number }, shape: Shape): boolean {
        const scale = Math.min(this.canvas.width / this.drawingCanvas.width, this.canvas.height / this.drawingCanvas.height);
        const tolerance = 8 / scale;

        switch (shape.type) {
            case 'image':
                if (!shape.points || !shape.width || !shape.height) return false;
                return point.x >= shape.points[0].x - tolerance &&
                    point.x <= shape.points[0].x + shape.width + tolerance &&
                    point.y >= shape.points[0].y - tolerance &&
                    point.y <= shape.points[0].y + shape.height + tolerance;
            case 'circle':
                if (!shape.points || shape.points.length === 0 || shape.radius === undefined) return false;
                const circleCenter = shape.points[0];
                const dist = Math.sqrt(Math.pow(point.x - circleCenter.x, 2) + Math.pow(point.y - circleCenter.y, 2));
                return dist <= shape.radius + tolerance;
            case 'line':
            case 'pencil':
            case 'polygon':
                if (!shape.points || shape.points.length < 2) return false;

                let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                shape.points.forEach(p => {
                    minX = Math.min(minX, p.x);
                    minY = Math.min(minY, p.y);
                    maxX = Math.max(maxX, p.x);
                    maxY = Math.max(maxY, p.y);
                });

                minX -= shape.thickness / 2 + tolerance;
                minY -= shape.thickness / 2 + tolerance;
                maxX += shape.thickness / 2 + tolerance;
                maxY += shape.thickness / 2 + tolerance;

                return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
            default:
                return false;
        }
    }

    private isPointInControlPoint(point: { x: number, y: number }, controlPoint: { x: number, y: number }): boolean {
        const scale = Math.min(this.canvas.width / this.drawingCanvas.width, this.canvas.height / this.drawingCanvas.height);
        const tolerance = 10 / scale;
        const dist = Math.sqrt(Math.pow(point.x - controlPoint.x, 2) + Math.pow(point.y - controlPoint.y, 2));
        return dist <= tolerance;
    }

    private getResizeCursor(angle: number): string {
        return 'all-scroll';
    }

    private getShapeBounds(shape: Shape): { minX: number, minY: number, maxX: number, maxY: number } | null {
        if (!shape.points || shape.points.length === 0) return null;

        if (shape.type === 'image') {
            if (!shape.width || !shape.height) return null;
            return {
                minX: shape.points[0].x,
                minY: shape.points[0].y,
                maxX: shape.points[0].x + shape.width,
                maxY: shape.points[0].y + shape.height
            };
        }

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        if (shape.type === 'circle' && shape.radius !== undefined) {
            const centerX = shape.points[0].x;
            const centerY = shape.points[0].y;
            minX = centerX - shape.radius;
            minY = centerY - shape.radius;
            maxX = centerX + shape.radius;
            maxY = centerY + shape.radius;
        } else {
            shape.points.forEach(p => {
                minX = Math.min(minX, p.x);
                minY = Math.min(minY, p.y);
                maxX = Math.max(maxX, p.x);
                maxY = Math.max(maxY, p.y);
            });
        }
        return { minX, minY, maxX, maxY };
    }

    private async createFrame() {
        if (!this.selectedAnimation) {
            alert('Please select an animation first.');
            return;
        }

        const frameName = await customPrompt('Enter frame name:', '');
        if (frameName) {
            const frameWidth = parseInt(this.frameWidthInput.value);
            const frameHeight = parseInt(this.frameHeightInput.value);
            const newCanvas = document.createElement('canvas');
            newCanvas.width = frameWidth;
            newCanvas.height = frameHeight;
            const newCtx = newCanvas.getContext('2d')!;
            newCtx.fillStyle = 'rgba(0,0,0,0)';
            newCtx.fillRect(0, 0, frameWidth, frameHeight);

            const image = new Image();
            image.src = newCanvas.toDataURL();
            const newFrame: Frame = { name: frameName, image, shapes: [] };
            this.frames.push(newFrame);
            this.selectedFrame = newFrame;

            this.animations[this.selectedAnimation].frames.push(frameName);
            this.drawingCtx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
            this.drawingCtx.drawImage(newFrame.image, 0, 0);
            this.redrawShapes();
            this.toggleDrawingMode(true);
            this.renderFrames();
            this.renderAnimations();
            this.framesList.querySelector(`.frame[data-frame-name="${newFrame.name}"]`)?.classList.add('selected');
        }
    }

    private importImageAsShape() {
        if (!this.selectedFrame) {
            alert('Please select a frame first to add the image to.');
            return;
        }
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        const newShape: Shape = {
                            id: Math.random().toString(36).substring(2, 9),
                            type: 'image',
                            image: img,
                            points: [{
                                x: (this.drawingCanvas.width - img.width) / 2,
                                y: (this.drawingCanvas.height - img.height) / 2
                            }],
                            width: img.width,
                            height: img.height,
                            color: '', 
                            thickness: 0
                        };
                        this.addShape(newShape);
                        this.setDrawingTool('cursor');
                        this.selectedShape = newShape;
                        this.redrawShapes();
                        this.updateFrameGutter();
                    };
                    img.src = e.target?.result as string;
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    }

    private renderFrames(framesToShow?: Frame[]) {
        this.framesList.innerHTML = '';
        const frames = framesToShow || this.frames;
        frames.forEach((frame) => {
            const frameElement = document.createElement('div');
            frameElement.className = 'frame';
            frameElement.dataset.frameName = frame.name;
            frameElement.draggable = true;

            frameElement.addEventListener('dragstart', (e) => this.handleFrameDragStart(e, frame.name));
            frameElement.addEventListener('dragover', (e) => this.handleFrameDragOver(e));
            frameElement.addEventListener('drop', (e) => this.handleFrameDrop(e, frame.name));
            frameElement.addEventListener('dragleave', (e) => {
                (e.currentTarget as HTMLElement).classList.remove('drag-over-above', 'drag-over-below');
            });

            const img = new Image();
            img.src = frame.image.src;
            img.width = 50;
            img.height = 50;
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                this.selectedFrame = frame;
                this.drawingCtx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
                this.drawingCtx.drawImage(frame.image, 0, 0);
                this.redrawShapes();
                this.toggleDrawingMode(true);
            });

            const nameElement = document.createElement('div');
            nameElement.textContent = frame.name;
            nameElement.classList.add('frame-name')


            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.onclick = () => {
                const link = document.createElement('a');
                link.download = frame.name;
                link.href = frame.image.src;
                link.click();
            };

            const duplicateButton = document.createElement('button');
            duplicateButton.textContent = 'Duplicate';
            duplicateButton.onclick = () => {
                this.duplicateFrame(frame);
            };

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
                if (confirm(`Are you sure you want to delete frame "${frame.name}"?`)) {
                    this.deleteFrame(frame.name);
                }
            };

            frameElement.appendChild(img);
            frameElement.appendChild(nameElement);
            frameElement.appendChild(saveButton);
            frameElement.appendChild(duplicateButton);
            frameElement.appendChild(deleteButton);
            this.framesList.appendChild(frameElement);
        });

    }

    private async addAnimation() {
        const animationName = await customPrompt('Enter animation name:', '');
        if (animationName && !this.animations[animationName]) {
            this.animations[animationName] = { frames: [], loop: true, bounce: false };
            this.selectedAnimation = animationName;
            this.renderAnimations();
            this.renderFrames([]); // Clear the frame gutter
        }
    }

    private renderAnimations() {
        this.animationsList.innerHTML = '';
        for (const animationName in this.animations) {
            const animation = this.animations[animationName];
            const animationElement = document.createElement('div');
            animationElement.className = 'animation';
            animationElement.style.padding = '10px';
            animationElement.style.borderBottom = '1px solid #ccc';

            const nameElement = document.createElement('h3');
            nameElement.textContent = animationName;
            nameElement.style.cursor = 'pointer';
            nameElement.addEventListener('click', () => {
                if (this.selectedAnimation === animationName) {
                    this.selectedAnimation = null;
                    this.renderFrames();
                } else {
                    this.selectedAnimation = animationName;
                    const animationFrames = animation.frames.map(frameName => {
                        return this.frames.find(f => f.name === frameName)!;
                    });
                    this.renderFrames(animationFrames);
                }
                this.renderAnimations();
            });

            if (this.selectedAnimation === animationName) {
                animationElement.style.backgroundColor = '#3e4451';
                nameElement.style.color = '#61afef';
            }

            const propertiesContainer = document.createElement('div');
            propertiesContainer.style.display = 'flex';
            propertiesContainer.style.flexDirection = 'column';

            const loopContainer = document.createElement('div');
            const loopCheckbox = document.createElement('input');
            loopCheckbox.type = 'checkbox';
            loopCheckbox.checked = animation.loop || false;
            loopCheckbox.onchange = () => {
                animation.loop = loopCheckbox.checked;
            };
            loopContainer.appendChild(new Text('Loop: '));
            loopContainer.appendChild(loopCheckbox);
            propertiesContainer.appendChild(loopContainer);

            const bounceContainer = document.createElement('div');
            const bounceCheckbox = document.createElement('input');
            bounceCheckbox.type = 'checkbox';
            bounceCheckbox.checked = animation.bounce || false;
            bounceCheckbox.onchange = () => {
                animation.bounce = bounceCheckbox.checked;
            };
            bounceContainer.appendChild(new Text('Bounce: '));
            bounceContainer.appendChild(bounceCheckbox);
            propertiesContainer.appendChild(bounceContainer);

            const previewButton = document.createElement('button');
            previewButton.textContent = 'Preview';
            previewButton.onclick = () => {
                this.previewAnimation(animationName);
            };
            propertiesContainer.appendChild(previewButton);

            const framesContainer = document.createElement('div');
            framesContainer.style.display = 'flex';
            framesContainer.style.flexWrap = 'wrap';

            animation.frames.forEach(frameName => {
                const frame = this.frames.find(f => f.name === frameName);
                if (frame) {
                    const frameContainer = document.createElement('div');
                    frameContainer.style.display = 'flex';
                    frameContainer.style.flexDirection = 'column';
                    const frameImg = new Image();
                    frameImg.src = frame.image.src;
                    frameImg.width = 30;
                    frameImg.height = 30;
                    frameImg.style.margin = '2px';
                    frameContainer.appendChild(frameImg);

                    const durationInput = document.createElement('input');
                    durationInput.type = 'number';
                    durationInput.value = (frame.duration || 100).toString();
                    durationInput.style.width = '50px';
                    durationInput.onchange = () => {
                        frame.duration = parseInt(durationInput.value);
                    };
                    frameContainer.appendChild(durationInput);

                    framesContainer.appendChild(frameContainer);
                }
            });

            animationElement.appendChild(nameElement);
            animationElement.appendChild(propertiesContainer);
            animationElement.appendChild(framesContainer);
            this.animationsList.appendChild(animationElement);
        }
    }

    private previewAnimation(animationName: string) {
        this.animationPreviewModal.style.display = 'flex';
        const animation = this.animations[animationName];
        const animationFrames = animation.frames.map(frameName => {
            return this.frames.find(f => f.name === frameName)!;
        }).filter(Boolean);

        if (animationFrames.length === 0) {
            return;
        }

        let frameIndex = 0;
        if (this.animationInterval) {
            clearTimeout(this.animationInterval as any);
        }

        const showFrame = () => {
            const frame = animationFrames[frameIndex];
            this.animationPreviewCtx.clearRect(0, 0, this.animationPreviewCanvas.width, this.animationPreviewCanvas.height);
            this.animationPreviewCtx.drawImage(frame.image, 0, 0);

            let nextIndex = frameIndex + 1;
            if (nextIndex >= animationFrames.length) {
                if (animation.loop) {
                    nextIndex = 0;
                } else {
                    return;
                }
            }
            frameIndex = nextIndex;
            this.animationInterval = setTimeout(showFrame, frame.duration || 100);
        };

        showFrame();
    }

    private closePreviewModal() {
        this.animationPreviewModal.style.display = 'none';
        if (this.animationInterval) {
            clearTimeout(this.animationInterval as any);
        }
    }

    private async exportSpriteSheet() {
        if (this.frames.length === 0) {
            alert('No frames to export.');
            return;
        }

        const zip = new JSZip();
        const frameWidth = parseInt(this.frameWidthInput.value);
        const frameHeight = parseInt(this.frameHeightInput.value);

        const spriteSheetCanvas = document.createElement('canvas');
        const spriteSheetCtx = spriteSheetCanvas.getContext('2d')!;

        spriteSheetCanvas.width = this.frames.length * frameWidth;
        spriteSheetCanvas.height = frameHeight;

        const spriteSheetData: SpriteSheetData = {
            frames: [],
            meta: {
                image: 'spritesheet.png',
                size: {
                    w: spriteSheetCanvas.width,
                    h: spriteSheetCanvas.height
                },
                animations: this.animations
            }
        };

        let currentX = 0;
        this.frames.forEach(frame => {
            spriteSheetCtx.drawImage(frame.image, currentX, 0, frameWidth, frameHeight);
            spriteSheetData.frames.push({
                filename: frame.name,
                frame: {
                    x: currentX,
                    y: 0,
                    w: frameWidth,
                    h: frameHeight
                },
                rotated: false,
                trimmed: false,
                spriteSourceSize: { x: 0, y: 0, w: frameWidth, h: frameHeight },
                sourceSize: { w: frameWidth, h: frameHeight },
                duration: frame.duration
            });
            currentX += frameWidth;
        });

        zip.file('spritesheet.json', JSON.stringify(spriteSheetData, null, 2));

        spriteSheetCanvas.toBlob(blob => {
            if (blob) {
                zip.file('spritesheet.png', blob);
                zip.generateAsync({ type: 'blob' }).then(content => {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(content);
                    link.download = 'spritesheet.zip';
                    link.click();
                });
            }
        });
    }

    private toggleDrawingMode(active: boolean) {
        if (active) {
            this.currentDrawingTool = 'pencil';
            this.drawingToolsContainer.style.display = 'block';
        } else {
            this.currentDrawingTool = null;
            this.drawingToolsContainer.style.display = 'none';
        }
        this.updateToolHighlights();
    }

    private setDrawingTool(tool: DrawingTool) {
        this.currentDrawingTool = tool;
        this.polygonPoints = [];
        this.selectedShape = null;
        this.selectedShapes = [];
        this.updateToolHighlights();
        this.redrawShapes();
    }

    private updateToolHighlights() {
        this.pencilToolButton.classList.toggle('selected', this.currentDrawingTool === 'pencil');
        this.lineToolButton.classList.toggle('selected', this.currentDrawingTool === 'line');
        this.circleToolButton.classList.toggle('selected', this.currentDrawingTool === 'circle');
        this.polygonToolButton.classList.toggle('selected', this.currentDrawingTool === 'polygon');
        this.imageToolButton.classList.toggle('selected', this.currentDrawingTool === 'image');
        this.cursorToolButton.classList.toggle('selected', this.currentDrawingTool === 'cursor');
        this.selectToolButton.classList.toggle('selected', this.currentDrawingTool === 'select');
    }

    private setAntiAliasing() {
        this.redrawScaledCanvas();
    }
    private updateActivelyEditing() {
        if (!this.activelyEditing || !this.activelyEditing.points || !this.selectedFrame) {
            console.error('No active editing session, or no points, or no selected frame');
            return;
        }
        const reference = this.selectedFrame?.shapes.find(s => s.id === this.activelyEditing?.id);
        if (reference) {
            reference.points = [...this.activelyEditing.points!];
        } else {
            this.addShape({ ...this.activelyEditing })
        }
    }
    private startDrawing(e: MouseEvent) {
        if (!this.currentDrawingTool) return;
        this.isDrawing = true;
        const pos = this.getMousePos(e);
        this.startX = pos.x;
        this.startY = pos.y;
        this.previewCtx.clearRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);

        if (this.currentDrawingTool === 'select') {
            this.isDraggingSelection = false;
            if (this.selectedShapes.length > 0) {
                const bounds = this.getMultipleShapesBounds(this.selectedShapes);
                if (bounds && pos.x >= bounds.minX && pos.x <= bounds.maxX && pos.y >= bounds.minY && pos.y <= bounds.maxY) {
                    this.isDraggingSelection = true;
                    this.dragStartPos = pos;
                } else {
                    this.selectedShapes = [];
                    this.selectionBox = { x: pos.x, y: pos.y, w: 0, h: 0 };
                }
            } else {
                this.selectionBox = { x: pos.x, y: pos.y, w: 0, h: 0 };
            }
            this.redrawShapes();
        } else if (this.currentDrawingTool === 'cursor') {
            this.initialMouseX = pos.x;
            this.initialMouseY = pos.y;
            this.isModifyingShape = false;
            this.activeControlPointIndex = -1;

            if (this.selectedFrame) {
                if (this.selectedShape) {
                    if (this.selectedShape.type === 'image') {
                        // To be implemented: resize handles for images
                    } else if (this.selectedShape.type === 'circle' && this.selectedShape.points && this.selectedShape.radius !== undefined) {
                        const centerX = this.selectedShape.points[0].x;
                        const centerY = this.selectedShape.points[0].y;
                        const controlX = centerX + this.selectedShape.radius;
                        const controlY = centerY;
                        if (this.isPointInControlPoint(pos, { x: controlX, y: controlY })) {
                            this.isModifyingShape = true;
                            this.activeControlPointIndex = 0;
                        }
                    } else if ((this.selectedShape.type === 'polygon') && this.selectedShape.points) {
                        for (let i = 0; i < this.selectedShape.points.length; i++) {
                            if (this.isPointInControlPoint(pos, this.selectedShape.points[i])) {
                                this.isModifyingShape = true;
                                this.activeControlPointIndex = i;
                                break;
                            }
                        }
                    }
                }

                if (!this.isModifyingShape) {
                    this.selectedShape = null;
                    for (let i = this.selectedFrame.shapes.length - 1; i >= 0; i--) {
                        const shape = this.selectedFrame.shapes[i];
                        if (shape && this.isPointInShape(pos, shape)) {
                            this.selectedShape = shape;
                            if (shape.points && shape.points.length > 0) {
                                this.offsetX = pos.x - shape.points[0].x;
                                this.offsetY = pos.y - shape.points[0].y;
                            }
                            break;
                        }
                    }
                }
            }
            this.redrawShapes();
        } else if (this.currentDrawingTool === 'polygon') {
            if (!this.activelyEditing) {
                this.activelyEditing = {
                    id: Math.random().toString(36).substring(2, 9),
                    type: "polygon",
                    points: [],
                    color: this.colorPicker.value,
                    thickness: parseInt(this.thicknessInput.value)
                };
            }
            this.activelyEditing.points?.push({ x: pos.x, y: pos.y });
            this.updateActivelyEditing();
            this.redrawShapes();
        } else if (this.currentDrawingTool === 'pencil') {
            this.activelyEditing = {
                id: Math.random().toString(36).substring(2, 9),
                type: this.currentDrawingTool,
                points: [],
                color: this.colorPicker.value,
                thickness: parseInt(this.thicknessInput.value)
            }
            this.activelyEditing.points?.push({ x: pos.x, y: pos.y });
        }
    }

    private draw(e: MouseEvent) {
        if (!this.isDrawing || !this.currentDrawingTool) return;

        const pos = this.getMousePos(e);

        if (this.currentDrawingTool === 'select') {
            if (this.isDraggingSelection) {
                const dx = pos.x - this.dragStartPos.x;
                const dy = pos.y - this.dragStartPos.y;
                this.selectedShapes.forEach(shape => {
                    if (shape.points) {
                        shape.points.forEach(p => {
                            p.x += dx;
                            p.y += dy;
                        });
                    }
                });
                this.dragStartPos = pos;
                this.redrawShapes();
            } else if (this.selectionBox) {
                this.selectionBox.w = pos.x - this.selectionBox.x;
                this.selectionBox.h = pos.y - this.selectionBox.y;
                this.redrawShapes();
            }
        } else if (this.currentDrawingTool === 'cursor' && this.selectedShape) {
            let cursorChanged = false;
            // Logic for resizing images would go here

            if (this.isModifyingShape) {
                if (this.selectedShape.type === 'circle' && this.selectedShape.points) {
                    const centerX = this.selectedShape.points[0].x;
                    const centerY = this.selectedShape.points[0].y;
                    this.selectedShape.radius = Math.sqrt(Math.pow(pos.x - centerX, 2) + Math.pow(pos.y - centerY, 2));
                } else if ((this.selectedShape.type === 'line' || this.selectedShape.type === 'polygon') && this.selectedShape.points) {
                    this.selectedShape.points[this.activeControlPointIndex].x = pos.x;
                    this.selectedShape.points[this.activeControlPointIndex].y = pos.y;
                }
            } else if (!cursorChanged) {
                if (this.selectedShape.points && this.selectedShape.points.length > 0) {
                    const targetX = pos.x - this.offsetX;
                    const targetY = pos.y - this.offsetY;

                    const diffX = targetX - this.selectedShape.points[0].x;
                    const diffY = targetY - this.selectedShape.points[0].y;

                    this.selectedShape.points.forEach(p => {
                        p.x += diffX;
                        p.y += diffY;
                    });
                }
                this.canvas.style.cursor = 'grab';
                cursorChanged = true;
            }

            if (!cursorChanged) {
                this.canvas.style.cursor = 'default';
            }

            this.redrawShapes();
        } else {
            this.previewCtx.strokeStyle = this.colorPicker.value;
            this.previewCtx.fillStyle = this.colorPicker.value;
            this.previewCtx.lineWidth = parseInt(this.thicknessInput.value);

            switch (this.currentDrawingTool) {
                case 'pencil':
                    this.previewCtx.globalCompositeOperation = 'source-over';
                    this.previewCtx.beginPath();
                    this.previewCtx.moveTo(this.startX, this.startY);
                    this.previewCtx.lineTo(pos.x, pos.y);
                    this.previewCtx.stroke();
                    if (!this.activelyEditing) console.error('No active editing session');
                    this.activelyEditing?.points?.push({ x: pos.x, y: pos.y });
                    this.startX = pos.x;
                    this.startY = pos.y;
                    break;
                case 'line':
                case 'circle':
                    this.drawLivePreview(e);
                    break;
            }
        }
        this.redrawScaledCanvas();
    }

    private drawLivePreview(e: MouseEvent) {
        const pos = this.getMousePos(e);
        this.previewCtx.globalCompositeOperation = 'source-over';
        this.previewCtx.clearRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
        switch (this.currentDrawingTool) {
            case 'line':
                this.previewCtx.beginPath();
                this.previewCtx.moveTo(this.startX, this.startY);
                this.previewCtx.lineTo(pos.x, pos.y);
                this.previewCtx.stroke();
                break;
            case 'circle':
                const radius = Math.sqrt(Math.pow(pos.x - this.startX, 2) + Math.pow(pos.y - this.startY, 2));
                this.previewCtx.beginPath();
                this.previewCtx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
                this.previewCtx.fill();
                break;
        }
    }

    private stopDrawing(e?: MouseEvent) {
        if (!this.isDrawing) return;
        this.isDrawing = false;

        if (this.currentDrawingTool === 'select') {
            this.isDraggingSelection = false;
            if (this.selectionBox) {
                this.selectShapesInBox();
            }
            this.selectionBox = null;
            this.redrawShapes();
            this.updateFrameGutter();
            return;
        }

        this.isModifyingShape = false;
        this.activeControlPointIndex = -1;

        if (!e) return;

        const pos = this.getMousePos(e);

        this.drawingCtx.globalCompositeOperation = 'source-over';
        let shape: Shape | null = null;

        const defaultSize = this.drawingCanvas.width * 0.3;

        if (this.currentDrawingTool === 'line') {
            const distance = Math.sqrt(Math.pow(pos.x - this.startX, 2) + Math.pow(pos.y - this.startY, 2));
            if (distance < 1) {
                const endX = this.startX + defaultSize;
                const endY = this.startY;
                shape = {
                    id: Math.random().toString(36).substring(2, 9),
                    type: 'line',
                    color: this.colorPicker.value,
                    thickness: parseInt(this.thicknessInput.value),
                    points: [{ x: this.startX, y: this.startY }, { x: endX, y: endY }]
                };
            } else {
                shape = {
                    id: Math.random().toString(36).substring(2, 9),
                    type: 'line',
                    color: this.colorPicker.value,
                    thickness: parseInt(this.thicknessInput.value),
                    points: [{ x: this.startX, y: this.startY }, { x: pos.x, y: pos.y }]
                };
            }
        } else if (this.currentDrawingTool === 'circle') {
            const radius = Math.sqrt(Math.pow(pos.x - this.startX, 2) + Math.pow(pos.y - this.startY, 2));
            if (radius < 1) {
                shape = {
                    id: Math.random().toString(36).substring(2, 9),
                    type: 'circle',
                    color: this.colorPicker.value,
                    thickness: parseInt(this.thicknessInput.value),
                    points: [{ x: this.startX, y: this.startY }],
                    radius: defaultSize / 2
                };
            } else {
                shape = {
                    id: Math.random().toString(36).substring(2, 9),
                    type: 'circle',
                    color: this.colorPicker.value,
                    thickness: parseInt(this.thicknessInput.value),
                    points: [{ x: this.startX, y: this.startY }],
                    radius: radius
                };
            }
        } else if (this.currentDrawingTool === 'pencil') {
            shape = this.activelyEditing || {
                id: Math.random().toString(36).substring(2, 9),
                type: this.currentDrawingTool,
                color: this.colorPicker.value,
                thickness: parseInt(this.thicknessInput.value),
                points: this.polygonPoints
            };
        } else if (this.currentDrawingTool === 'polygon') {
            this.previewCtx.clearRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
            return;
        }

        if (shape) {
            this.addShape(shape);
            this.redrawShapes();
            this.previewCtx.clearRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
            this.updateFrameGutter();

            this.setDrawingTool('cursor');
            this.selectedShape = shape;
            this.redrawShapes();
        }

        this.activelyEditing = null;
        if (this.currentDrawingTool === 'pencil') {
            this.polygonPoints = [];
        }
    }

    private finishPolygon(e: KeyboardEvent) {
        if (this.currentDrawingTool !== 'polygon' || !this.activelyEditing) return;
        const id = this.activelyEditing.id;
        this.activelyEditing = null;
        this.polygonPoints = [];
        this.setDrawingTool('cursor');
        this.selectedShape = this.selectedFrame?.shapes.find(shape => shape.id === id) || null;
        this.redrawShapes();
        this.updateFrameGutter();
    }

    private addShape(shape: Shape) {
        if (this.selectedFrame) {
            this.selectedFrame.shapes.push(shape);
        }
    }

    private redrawShapes() {
        this.drawingCtx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
        if (this.overlayFrame) {
            this.drawingCtx.save();
            this.drawingCtx.globalAlpha = 0.5;
            this.drawingCtx.drawImage(this.overlayFrame.image, 0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
            this.drawingCtx.restore();
        }
        if (this.selectedFrame) {
            this.selectedFrame.shapes.forEach(shape => {
                this.drawingCtx.strokeStyle = shape.color;
                this.drawingCtx.fillStyle = shape.color;
                this.drawingCtx.lineWidth = shape.thickness;
                this.drawingCtx.globalCompositeOperation = 'source-over';

                switch (shape.type) {
                    case 'image':
                        if (shape.image && shape.points && shape.width && shape.height) {
                            this.drawingCtx.drawImage(shape.image, shape.points[0].x, shape.points[0].y, shape.width, shape.height);
                        }
                        break;
                    case 'pencil':
                    case 'line':
                    case 'polygon':
                        this.drawingCtx.beginPath();
                        this.drawingCtx.moveTo(shape.points![0].x, shape.points![0].y);
                        for (let i = 1; i < shape.points!.length; i++) {
                            this.drawingCtx.lineTo(shape.points![i].x, shape.points![i].y);
                        }
                        if (shape.type === 'polygon') {
                            this.drawingCtx.closePath();
                            this.drawingCtx.fill();
                        } else {
                            this.drawingCtx.stroke();
                        }
                        break;
                    case 'circle':
                        this.drawingCtx.beginPath();
                        this.drawingCtx.arc(shape.points![0].x, shape.points![0].y, shape.radius!, 0, 2 * Math.PI);
                        this.drawingCtx.fill();
                        break;
                }


            });
        }
        this.redrawScaledCanvas();
    }

    private drawOverlayElements(scale: number, offsetX: number, offsetY: number) {
        const ctx = this.ctx;

        if (this.selectedFrame) {
            this.selectedFrame.shapes.forEach(shape => {
                const bounds = this.getShapeBounds(shape);
                if (bounds) {
                    const isOutside = bounds.minX < 0 || bounds.minY < 0 || bounds.maxX > this.drawingCanvas.width || bounds.maxY > this.drawingCanvas.height;

                    if (isOutside) {
                        ctx.strokeStyle = 'orange';
                        ctx.lineWidth = 2;
                        ctx.setLineDash([2, 2]);

                        const scaledMinX = bounds.minX * scale + offsetX;
                        const scaledMinY = bounds.minY * scale + offsetY;
                        const scaledWidth = (bounds.maxX - bounds.minX) * scale;
                        const scaledHeight = (bounds.maxY - bounds.minY) * scale;
                        ctx.strokeRect(scaledMinX, scaledMinY, scaledWidth, scaledHeight);
                        ctx.setLineDash([]);
                    }
                }
            });
        }

        if (this.selectionBox) {
            ctx.strokeStyle = '#61afef';
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 2]);
            ctx.strokeRect(
                this.selectionBox.x * scale + offsetX,
                this.selectionBox.y * scale + offsetY,
                this.selectionBox.w * scale,
                this.selectionBox.h * scale
            );
            ctx.setLineDash([]);
        }

        if (this.selectedShapes.length > 0) {
            const bounds = this.getMultipleShapesBounds(this.selectedShapes);
            if (bounds) {
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.strokeRect(
                    bounds.minX * scale + offsetX,
                    bounds.minY * scale + offsetY,
                    (bounds.maxX - bounds.minX) * scale,
                    (bounds.maxY - bounds.minY) * scale
                );
                ctx.setLineDash([]);
            }
        } else if (this.selectedShape) {
            const shape = this.selectedShape;

            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);

            switch (shape.type) {
                case 'image':
                    if (shape.points && shape.width && shape.height) {
                        ctx.strokeRect(
                            shape.points[0].x * scale + offsetX,
                            shape.points[0].y * scale + offsetY,
                            shape.width * scale,
                            shape.height * scale
                        );
                    }
                    break;
                case 'circle':
                    if (shape.points && shape.radius !== undefined) {
                        const centerX = shape.points[0].x * scale + offsetX;
                        const centerY = shape.points[0].y * scale + offsetY;
                        const radius = shape.radius * scale;
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                        ctx.stroke();
                    }
                    break;
                case 'line':
                case 'pencil':
                case 'polygon':
                    if (shape.points && shape.points.length > 0) {
                        ctx.beginPath();
                        ctx.moveTo(shape.points[0].x * scale + offsetX, shape.points[0].y * scale + offsetY);
                        for (let i = 1; i < shape.points.length; i++) {
                            ctx.lineTo(shape.points[i].x * scale + offsetX, shape.points[i].y * scale + offsetY);
                        }
                        if (shape.type === 'polygon') {
                            ctx.closePath();
                        }
                        ctx.stroke();
                    }
                    break;
            }
            ctx.setLineDash([]);

            ctx.fillStyle = 'blue';
            const controlPointRadius = 3;

            if (shape.type === 'circle' && shape.points && shape.radius !== undefined) {
                const centerX = shape.points[0].x * scale + offsetX;
                const centerY = shape.points[0].y * scale + offsetY;
                const controlX = (shape.points[0].x + shape.radius) * scale + offsetX;
                const controlY = shape.points[0].y * scale + offsetY;
                ctx.beginPath();
                ctx.arc(controlX, controlY, controlPointRadius, 0, 2 * Math.PI);
                ctx.fill();
            } else if ((shape.type === 'line' || shape.type === 'polygon') && shape.points) {
                shape.points.forEach(p => {
                    ctx.beginPath();
                    ctx.arc(p.x * scale + offsetX, p.y * scale + offsetY, controlPointRadius, 0, 2 * Math.PI);
                    ctx.fill();
                });
            }
        }
    }

    private updateFrameGutter() {
        if (this.selectedFrame) {
            const frameInGutter = this.framesList.querySelector(`[data-frame-name="${this.selectedFrame.name}"]`);
            if (frameInGutter) {
                const img = frameInGutter.querySelector('img')!;
                const newImage = new Image();
                newImage.src = this.drawingCanvas.toDataURL();
                this.selectedFrame.image = newImage;
                img.src = newImage.src;
            }
        }
    }

    private saveDrawing() {
        if (this.selectedFrame) {
            this.updateFrameGutter();
            this.toggleDrawingMode(false);
        }
    }

    private async selectOverlayFrame() {
        const frameName = await customPrompt('Enter name of frame to overlay:', '');
        if (frameName) {
            const frameToOverlay = this.frames.find(f => f.name === frameName);
            if (frameToOverlay) {
                this.overlayFrame = frameToOverlay;
                this.redrawShapes();
            } else {
                alert('Frame not found.');
            }
        }
    }

    private async duplicateFrame(frameToDuplicate: Frame) {
        const newFrameName = await customPrompt('Enter new name for duplicated frame:', `${frameToDuplicate.name}_copy`);
        if (newFrameName && !this.frames.some(f => f.name === newFrameName)) {
            const newImage = new Image();
            newImage.src = frameToDuplicate.image.src;
            const newShapes = frameToDuplicate.shapes.map(shape => ({ ...shape }));
            newShapes.forEach(shape => {
                if (shape.points) {
                    shape.points = shape.points.map(p => ({ ...p }));
                }
            });

            const duplicatedFrame: Frame = {
                name: newFrameName,
                image: newImage,
                shapes: newShapes,
                duration: frameToDuplicate.duration
            };
            this.frames.push(duplicatedFrame);
            this.renderFrames();
            if (this.selectedAnimation) {
                this.animations[this.selectedAnimation].frames.push(newFrameName);
                this.renderAnimations();
            }
        } else if (newFrameName) {
            alert('Frame with that name already exists or name is empty.');
        }
    }

    private handleKeyDown(e: KeyboardEvent) {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
            return;
        }

        if (e.altKey) {
            e.preventDefault();
            switch (e.key.toLowerCase()) {
                case 'p': this.setDrawingTool('pencil'); break;
                case 'l': this.setDrawingTool('line'); break;
                case 'c': this.setDrawingTool('circle'); break;
                case 'o': this.setDrawingTool('polygon'); break;
                case 'i': this.importImageAsShape(); break;
                case 's': this.setDrawingTool('select'); break;
            }
        }

        if (e.key === 'Delete' || e.key === 'Backspace') {
            if (this.selectedShapes.length > 0 && this.selectedFrame) {
                this.selectedFrame.shapes = this.selectedFrame.shapes.filter(
                    shape => !this.selectedShapes.includes(shape)
                );
                this.selectedShapes = [];
                this.redrawShapes();
                this.updateFrameGutter();
            } else if (this.selectedShape && this.selectedFrame) {
                const index = this.selectedFrame.shapes.indexOf(this.selectedShape);
                if (index > -1) {
                    this.selectedFrame.shapes.splice(index, 1);
                    this.selectedShape = null;
                    this.redrawShapes();
                    this.updateFrameGutter();
                }
            }
        } else if (e.key === 'Enter' && this.activelyEditing && this.currentDrawingTool == 'polygon') {
            this.finishPolygon(e);
        }
    }

    private deleteFrame(frameName: string) {
        const frameIndex = this.frames.findIndex(f => f.name === frameName);
        if (frameIndex > -1) {
            this.frames.splice(frameIndex, 1);
        }

        for (const animName in this.animations) {
            const anim = this.animations[animName];
            const frameInAnimIndex = anim.frames.indexOf(frameName);
            if (frameInAnimIndex > -1) {
                anim.frames.splice(frameInAnimIndex, 1);
            }
        }

        if (this.selectedFrame?.name === frameName) {
            this.selectedFrame = null;
            this.drawingCtx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
            this.redrawScaledCanvas();
            this.toggleDrawingMode(false);
        }

        this.renderFrames();
        this.renderAnimations();
    }

    private handleFrameDragStart(e: DragEvent, frameName: string) {
        this.draggedFrameName = frameName;
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
        }
    }

    private handleFrameDragOver(e: DragEvent) {
        e.preventDefault();
        const target = (e.currentTarget as HTMLElement);
        const rect = target.getBoundingClientRect();
        const isFirstHalf = e.clientY - rect.top < rect.height / 2;

        if (isFirstHalf) {
            target.classList.add('drag-over-above');
            target.classList.remove('drag-over-below');
        } else {
            target.classList.add('drag-over-below');
            target.classList.remove('drag-over-above');
        }
    }

    private handleFrameDrop(e: DragEvent, targetFrameName: string) {
        e.preventDefault();
        if (!this.draggedFrameName || this.draggedFrameName === targetFrameName) {
            return;
        }

        const target = (e.currentTarget as HTMLElement);
        target.classList.remove('drag-over-above', 'drag-over-below');

        const frameListName = this.selectedAnimation ? this.animations[this.selectedAnimation].frames : this.frames.map(f => f.name);

        const draggedIndex = frameListName.indexOf(this.draggedFrameName);
        let targetIndex = frameListName.indexOf(targetFrameName);

        const rect = target.getBoundingClientRect();
        const isFirstHalf = e.clientY - rect.top < rect.height / 2;
        if (!isFirstHalf) {
            targetIndex++;
        }

        if (draggedIndex > -1) {
            const [draggedItem] = frameListName.splice(draggedIndex, 1);
            if (targetIndex > draggedIndex) {
                targetIndex--;
            }
            frameListName.splice(targetIndex, 0, draggedItem);
        }

        if (this.selectedAnimation) {
            this.renderFrames(this.animations[this.selectedAnimation].frames.map(name => this.frames.find(f => f.name === name)!));
            this.renderAnimations();
        } else {
            const reorderedFrames: Frame[] = [];
            frameListName.forEach(name => {
                const frame = this.frames.find(f => f.name === name);
                if (frame) reorderedFrames.push(frame);
            });
            this.frames = reorderedFrames;
            this.renderFrames();
        }

        this.draggedFrameName = null;
    }

    private selectShapesInBox() {
        if (!this.selectionBox || !this.selectedFrame) return;

        const { x, y, w, h } = this.selectionBox;
        const selX1 = Math.min(x, x + w);
        const selY1 = Math.min(y, y + h);
        const selX2 = Math.max(x, x + w);
        const selY2 = Math.max(y, y + h);

        this.selectedShapes = this.selectedFrame.shapes.filter(shape => {
            const bounds = this.getShapeBounds(shape);
            if (!bounds) return false;
            return bounds.minX < selX2 && bounds.maxX > selX1 && bounds.minY < selY2 && bounds.maxY > selY1;
        });
        this.selectedShape = null;
    }

    private getMultipleShapesBounds(shapes: Shape[]): { minX: number, minY: number, maxX: number, maxY: number } | null {
        if (shapes.length === 0) return null;

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        shapes.forEach(shape => {
            const bounds = this.getShapeBounds(shape);
            if (bounds) {
                minX = Math.min(minX, bounds.minX);
                minY = Math.min(minY, bounds.minY);
                maxX = Math.max(maxX, bounds.maxX);
                maxY = Math.max(maxY, bounds.maxY);
            }
        });

        if (minX === Infinity) return null;

        return { minX, minY, maxX, maxY };
    }
}

new SpriteBuilder();