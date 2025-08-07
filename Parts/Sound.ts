import { Part } from "./Part";
import { SoundManager } from "./SoundManager";
export class Sound extends Part {
    audio: HTMLAudioElement;
    webEngine: boolean = false;
    start: boolean = false;
    private _isLoaded: boolean = false;
    private _clones: Set<HTMLAudioElement> = new Set();
    private _wantToPlay: boolean = false;
    private _started: boolean = false; // Track if the sound has been started

    constructor({ name, src, volume = 1, loop = false, webEngine = false, start = false }: { name: string, src: string, volume?: number, loop?: boolean, webEngine?: boolean, start?: boolean }) {
        super({ name });
        this.debugEmoji = "🔊";
        this.audio = new Audio(src);
        this.audio.volume = volume;
        this.audio.loop = loop;
        this.start = start;
        this.webEngine = webEngine;
        this.type = "Sound";
        SoundManager.registerSound(this);

        this.audio.addEventListener('canplaythrough', () => {
            this._isLoaded = true;
            this.ready = true;
            if ((this.start && !this._started) || this._wantToPlay) {
                this._started = true; // Mark as started to prevent multiple starts from changing audio `currentTime`
                this.play();
            }
        });

        this.audio.addEventListener('error', () => {
            this._isLoaded = false;
            this.ready = false;
            this.top?.error(`Failed to load sound <${this.name}> from src: ${src.substring(0, 30)}...`);
        });
    }

    play(options: { restart?: boolean, clone?: boolean } = {}) {
        if (this.webEngine && !SoundManager.getIsGameRunning()) return;
        const { restart = false, clone = false } = options;

        if (!this._isLoaded) {
            this._wantToPlay = true; // Set flag to play later
            return;
        }

        if (clone) {
            const cloneAudio = this.audio.cloneNode(true) as HTMLAudioElement;
            cloneAudio.volume = this.audio.volume;
            cloneAudio.loop = this.audio.loop; // Clones should never loop
            this._wantToPlay = false;
            cloneAudio.play()
                .catch(e => this.top?.error(`Error playing cloned sound <${this.name}>:`, e));
            this._clones.add(cloneAudio);
            cloneAudio.addEventListener('ended', () => {
                this._clones.delete(cloneAudio);
            });
        } else {
            if (restart) {
                this.audio.currentTime = 0;
            }
            this._wantToPlay = false; // Reset play flag
            this.audio.play()
                .catch(e => this.top?.error(`Error playing sound <${this.name}>:`, e));
        }
    }

    pause() {
        this._wantToPlay = false; // Reset play flag
        this.audio.pause();
        this._clones.forEach(clone => clone.pause());
    }

    stop() {
        this.audio.pause();
        this._wantToPlay = false; // Reset play flag (in case we stopped before loaded)
        this.audio.currentTime = 0;
        this._clones.forEach(clone => clone.pause());
        this._clones.clear();
    }

    setVolume(volume: number) {
        this.audio.volume = Math.max(0, Math.min(1, volume));
        this._clones.forEach(clone => {
            clone.volume = this.audio.volume;
        });
    }

    setLoop(loop: boolean) {
        this.audio.loop = loop;
        this._clones.forEach(clone => {
            clone.loop = loop;
        });
    }

    act(delta: number) {
        super.act(delta);
        this.hoverbug = `${this.audio.paused ? "⏸️" : "▶️"} V:${this.audio.volume.toFixed(2)} L:${this.audio.loop ? "✅" : "❌"}`;
    }

    destroy() {
        SoundManager.unregisterSound(this);
        super.destroy();
    }
}
