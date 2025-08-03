import { Part } from "./Part";
import { SoundManager } from "./SoundManager";

export class Sound extends Part {
    audio: HTMLAudioElement;
    webEngine: boolean = false;
    start: boolean = false;
    private _isLoaded: boolean = false;

    constructor({ name, src, volume = 1, loop = false, webEngine = false, start = false }: { name: string, src: string, volume?: number, loop?: boolean, webEngine?: boolean, start?: boolean }) {
        super({ name });
        this.debugEmoji = "🔊";
        this.audio = new Audio(src);
        this.audio.volume = volume;
        this.audio.loop = loop;
        this.start = start;
        this.webEngine = webEngine;

        SoundManager.registerSound(this);

        this.audio.addEventListener('canplaythrough', () => {
            this._isLoaded = true;
            this.ready = true;
        });

        this.audio.addEventListener('error', () => {
            this._isLoaded = false;
            this.ready = false;
            console.error(`Failed to load sound <${this.name}> from src: ${src}`);
        });
    }

    play(options: { restart?: boolean, clone?: boolean } = {}) {
        if (this.webEngine && !SoundManager.getIsGameRunning()) return;

        const { restart = false, clone = false } = options;

        if (!this._isLoaded) {
            console.warn(`Sound <${this.name}> is not loaded yet. Cannot play.`);
            return;
        }

        if (clone) {
            const cloneAudio = this.audio.cloneNode(true) as HTMLAudioElement;
            cloneAudio.volume = this.audio.volume;
            cloneAudio.loop = this.audio.loop;
            cloneAudio.play().catch(e => console.error(`Error playing cloned sound <${this.name}>:`, e));
        } else {
            if (restart) {
                this.audio.currentTime = 0;
            }
            this.audio.play().catch(e => console.error(`Error playing sound <${this.name}>:`, e));
        }
    }

    pause() {
        this.audio.pause();
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    setVolume(volume: number) {
        this.audio.volume = Math.max(0, Math.min(1, volume));
    }

    setLoop(loop: boolean) {
        this.audio.loop = loop;
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
