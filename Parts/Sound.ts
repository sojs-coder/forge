import { Part } from "./Part";
import { SoundManager } from "./SoundManager";
export class Sound extends Part {
    audio: HTMLAudioElement;
    webEngine: boolean = false;
    start: boolean = false;
    private _isLoaded: boolean = false;
    private _clones: Set<HTMLAudioElement> = new Set();
    private _wantToPlay: boolean = false;
    private _paused: boolean = false; // Track if the sound is paused
    private _started: boolean = false; // Track if the sound has been started
    private _wasMainAudioPlaying: boolean = false; // Track if main audio was playing when paused
    private _playingClonesWhenPaused: Set<HTMLAudioElement> = new Set(); // Track which clones were playing when paused
    private _hasEndedListener: boolean = false; // Track if ended listener is attached
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
    clone(memo = new Map()): this {
        if (memo.has(this)) {
            return memo.get(this);
        }

        const clonedSound = new Sound({
            name: this.name,
            src: this.audio.src,
            volume: this.audio.volume,
            loop: this.audio.loop,
            webEngine: this.webEngine,
            start: this.start
        });

        memo.set(this, clonedSound);

        this._cloneProperties(clonedSound, memo);

        // Reset internal state variables (already done by constructor, but explicitly for clarity)
        clonedSound._isLoaded = false;
        clonedSound._clones = new Set();
        clonedSound._wantToPlay = false;
        clonedSound._paused = false;
        clonedSound._started = false;
        clonedSound._wasMainAudioPlaying = false;
        clonedSound._playingClonesWhenPaused = new Set();
        clonedSound._hasEndedListener = false;

        // Unregister the original sound and register the cloned sound with the SoundManager
        // This should be done after the clone is fully constructed and its properties are set.
        SoundManager.unregisterSound(this);
        SoundManager.registerSound(clonedSound);

        return clonedSound as this;
    }

    play(options: { restart?: boolean, clone?: boolean } = {}) {
        if (this.webEngine && !SoundManager.getIsGameRunning()) return;
        const { restart = false, clone = false } = options;

        if (!this._isLoaded) {
            this._wantToPlay = true; // Set flag to play later
            return;
        }
        this._paused = false;
        this._started = true;
        if (clone) {
            const cloneAudio = this.audio.cloneNode(true) as HTMLAudioElement;
            cloneAudio.volume = this.audio.volume;
            cloneAudio.loop = false; // Clones should never loop to prevent infinite overlaps
            this._wantToPlay = false;
            cloneAudio.play()
                .catch(e => this.top?.error(`Error playing cloned sound <${this.name}>:`, e));
            this._clones.add(cloneAudio);
            const handleCloneEnded = () => {
                this._clones.delete(cloneAudio);
                cloneAudio.removeEventListener('ended', handleCloneEnded);
                if (this._clones.size === 0) {
                    this._paused = false; // Reset paused state when no clones are left
                    this._started = false; // Reset started state when no clones are left
                }
            };
            cloneAudio.addEventListener('ended', handleCloneEnded);
        } else {
            if (restart) {
                this.audio.currentTime = 0;
            }
            this._wantToPlay = false; // Reset play flag
            this.audio.play()
                .catch(e => this.top?.error(`Error playing sound <${this.name}>:`, e));
            
            // Only add ended listener once
            if (!this._hasEndedListener) {
                this._hasEndedListener = true;
                this.audio.addEventListener('ended', () => {
                    this._paused = false;
                    this._started = false; // Reset started state when sound ends
                    this._clones.forEach(clone => {
                        clone.pause();
                    });
                    this._clones.clear(); // Clear clones when sound ends
                });
            }
        }
    }

    pause() {
        if (!this._paused && this._started) {
            this._paused = true; // Set paused state
            this._wantToPlay = false; // Reset play flag
            
            // Track which audio elements were actually playing
            this._wasMainAudioPlaying = !this.audio.paused;
            this._playingClonesWhenPaused.clear();
            this._clones.forEach(clone => {
                if (!clone.paused) {
                    this._playingClonesWhenPaused.add(clone);
                }
            });
            
            this.audio.pause();
            this._clones.forEach(clone => clone.pause());
        } 
    }
    resume() {
        if (this._paused) {
            this._paused = false; // Reset paused state
            
            // Only resume the main audio if it was playing when paused
            if (this._wasMainAudioPlaying) {
                this.audio.play()
                    .catch(e => this.top?.error(`Error resuming sound <${this.name}>:`, e));
            }
            
            // Only resume clones that were playing when paused
            this._playingClonesWhenPaused.forEach(clone => {
                // Check if clone still exists in our clones set (might have been cleaned up)
                if (this._clones.has(clone)) {
                    clone.play()
                        .catch(e => this.top?.error(`Error resuming cloned sound <${this.name}>:`, e));
                }
            });
            
            // Clear the tracking sets after resuming
            this._playingClonesWhenPaused.clear();
            this._wasMainAudioPlaying = false;
        }

    }
    stop() {
        this._paused = false; // Reset paused state
        this._started = false; // Reset started state
        this._wasMainAudioPlaying = false; // Reset tracking state
        this._playingClonesWhenPaused.clear(); // Clear tracking state
        this.audio.pause();
        this._wantToPlay = false; // Reset play flag (in case we stopped before loaded)
        this.audio.currentTime = 0;
        this._clones.forEach(clone => clone.pause());
        this._clones.clear();
    }

    setVolume(volume: number) {
        const clampedVolume = Math.max(0, Math.min(1, volume));
        // Only update if volume actually changed
        if (this.audio.volume !== clampedVolume) {
            this.audio.volume = clampedVolume;
            this._clones.forEach(clone => {
                clone.volume = clampedVolume;
            });
        }
    }

    setLoop(loop: boolean) {
        // Only update if loop setting actually changed
        if (this.audio.loop !== loop) {
            this.audio.loop = loop;
            // Note: Don't update clones as they should never loop
        }
    }

    act(delta: number) {
        super.act(delta);
        this.hoverbug = `${this.audio.paused ? "⏸️" : "▶️"} V:${this.audio.volume.toFixed(2)} L:${this.audio.loop ? "✅" : "❌"}`;
    }

    destroy() {
        // Stop all audio and clean up state
        this.stop();
        
        // Clean up main audio element
        this.audio.src = '';
        this.audio.load(); // Reset audio element
        
        SoundManager.unregisterSound(this);
        super.destroy();
    }
}
