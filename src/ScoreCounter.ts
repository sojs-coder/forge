import { Part } from "../Parts/Part";
import { Transform } from "../Parts/Children/Transform";
import { TextRender } from "../Parts/Children/TextRender";
import { Vector } from "../Math/Vector";

export class ScoreCounter extends Part {
    score: number = 0;
    scoreText: string = "Game Over! Final Score: 0";
    private textRender: TextRender;
    private transform: Transform;

    constructor() {
        super({ name: "ScoreCounter" });
        this.transform = new Transform({ position: new Vector(10, 30) });
        this.textRender = new TextRender({
            name: "ScoreText",
            textContent: `Score: ${this.score}`,
            font: "24px Arial",
            align: "left"
        });
        this.addChildren(this.transform, this.textRender);
    }

    addScore(points: number) {
        this.score += points;
        this.textRender.textContent = `Score: ${this.score}`;
        this.scoreText = `Game Over! Final Score: ${this.score}`;
    }

    reset() {
        this.score = 0;
        this.textRender.textContent = `Score: ${this.score}`;
        this.scoreText = `Game Over! Final Score: ${this.score}`;
    }

    get finalScore(): number {
        return this.score;
    }
}