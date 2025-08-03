import { Part } from "./Part";

export class Timer extends Part {
    duration: number;
    onComplete: () => void;
    repeats: boolean;
    private startTime: number = 0;
    private isRunning: boolean = false;

    constructor({ duration, onComplete, repeats = false }: { duration: number, onComplete: () => void, repeats?: boolean }) {
        super({ name: 'Timer' });
        this.duration = duration;
        this.onComplete = onComplete;
        this.repeats = repeats;
        this.debugEmoji = "⏱️";
        this.type = "Timer";
    }

    start() {
        this.startTime = Date.now();
        this.isRunning = true;
    }

    stop() {
        this.isRunning = false;
    }

    reset() {
        this.startTime = Date.now();
    }

    act(delta: number) {
        super.act(delta);
        if (this.isRunning) {
            const now = Date.now();
            if (now - this.startTime >= this.duration) {
                this.onComplete();
                if (this.repeats) {
                    this.reset();
                } else {
                    this.stop();
                }
            }
        }
        this.hoverbug = `${this.isRunning ? "▶️" : "⏸️"} ${this.repeats ? "🔁" : ""}`;
    }
}