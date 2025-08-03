
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
        this.sounds = this.sounds.filter(s => s !== sound);
    }

    public startGame(): void {
        this.isGameRunning = true;
        this.sounds.forEach(sound => {
            if (sound.start) {
                sound.play();
            }
        });
    }

    public stopGame(): void {
        this.isGameRunning = false;
        this.sounds.forEach(sound => sound.stop());
    }

    public getIsGameRunning(): boolean {
        return this.isGameRunning;
    }
}

export const SoundManager = SoundManagerController.getInstance();
