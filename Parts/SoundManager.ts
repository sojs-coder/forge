
import { Sound } from "./Sound";

class SoundManagerController {
    private static instance: SoundManagerController;
    private sounds: Sound[] = [];
    private isGameRunning: boolean = false;

    private constructor() {}

    public static getInstance(): SoundManagerController {
        if (!SoundManagerController.instance) {
            SoundManagerController.instance = new SoundManagerController();
        }
        return SoundManagerController.instance;
    }

    public registerSound(sound: Sound): void {
        if (!this.sounds.includes(sound)) {
            this.sounds.push(sound);
        }
    }

    public unregisterSound(sound: Sound): void {
        sound.stop(); // Stop the sound before unregistering
        this.sounds = this.sounds.filter(s => s !== sound);
    }
    public pauseGame(): void {
        this.isGameRunning = false;
        this.sounds.forEach(sound => sound.pause());
    }
    public resumeGame(): void {
        this.isGameRunning = true;
        this.sounds.forEach(sound => sound.resume());
    }

    public startGame(): void {
        this.isGameRunning = true;
    }
    public unregisterAllSounds(): void {
        this.sounds.forEach(sound => sound.stop());
        this.sounds = [];
    }
    public stopGame(): void {
        this.isGameRunning = false;
        this.sounds.forEach(sound => sound.stop());
        // Dump sounds from memory
        SoundManager.unregisterAllSounds();
    }

    public getIsGameRunning(): boolean {
        return this.isGameRunning;
    }
}

export const SoundManager = SoundManagerController.getInstance();
