import { Part } from "./Part";

export class Sound extends Part {
    audio: HTMLAudioElement;
    playAfterLoad: boolean = false; // Flag to indicate if play should be attempted after load
    private _isLoaded: boolean = false;

    constructor({ name, src, volume = 1, loop = false }: { name: string, src: string, volume?: number, loop?: boolean }) {
        super({ name });
        this.debugEmoji = "🔊";
        this.audio = new Audio(src);
        this.audio.volume = volume;
        this.audio.loop = loop;

        this.audio.addEventListener('canplaythrough', () => {
            this._isLoaded = true;
            this.ready = true;
            if (this.playAfterLoad) {
                this.playAfterLoad = false; // Reset flag
                // Ensure user has interacted with the screen before playing audio
                if (document.readyState === "complete" && (document.hasFocus() || "ontouchstart" in window)) {
                    this.play(); // Attempt to play after load
                } else {
                    const tryPlay = () => {
                        this.play();
                        window.removeEventListener('pointerdown', tryPlay);
                        window.removeEventListener('keydown', tryPlay);
                    };
                    window.addEventListener('pointerdown', tryPlay, { once: true });
                    window.addEventListener('keydown', tryPlay, { once: true });
                }
            }
        });

        this.audio.addEventListener('error', () => {
            this._isLoaded = false;
            this.ready = false;
            console.error(`Failed to load sound <${this.name}> from src: ${src}`);
        });
    }

    play(options: { restart?: boolean, clone?: boolean } = {}) {
        const { restart = false, clone = false } = options;

        if (!this._isLoaded) {
            console.warn(`Sound <${this.name}> is not loaded yet. Cannot play.`);
            this.playAfterLoad = true;
            return;
        }

        if (clone) {
            // Play a new instance (overlap sounds)
            const cloneAudio = this.audio.cloneNode(true) as HTMLAudioElement;
            cloneAudio.volume = this.audio.volume;
            cloneAudio.loop = this.audio.loop;
            cloneAudio.play().catch(e => console.error(`Error playing cloned sound <${this.name}>:`, e));
        } else {
            // Restart current audio if requested
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
        this.audio.volume = Math.max(0, Math.min(1, volume)); // Clamp between 0 and 1
    }

    setLoop(loop: boolean) {
        this.audio.loop = loop;
    }

    act(delta: number) {
        super.act(delta);
        this.hoverbug = `${this.audio.paused ? "⏸️" : "▶️"} V:${this.audio.volume.toFixed(2)} L:${this.audio.loop ? "✅" : "❌"}`;
    }
}
