import { GameObject } from "../Parts/GameObject";
import { Transform } from "../Parts/Children/Transform";
import { ColorRender } from "../Parts/Children/ColorRender";
import { BoxCollider } from "../Parts/Children/BoxCollider";
import { Vector } from "../Math/Vector";
import { Part } from "../Parts/Part";
import { Game } from "../Parts/Game";
import { BoxCollider as PlayerBoxCollider } from "../Parts/Children/BoxCollider"; // Alias for clarity

export class Target extends GameObject {
    constructor(nameAppend: string, position: Vector) {
        super({ name: "Target" + nameAppend });
        this.addChildren(
            new Transform({ position: position, scale: Vector.From(1) }),
            new ColorRender({ width: 20, height: 20, color: 'red' }),
            new BoxCollider({ width: 20, height: 20 })
        );
    }
}

export class TargetLogic extends Part {
    private target: GameObject;
    private player: GameObject;
    private onCollect: (target: GameObject) => void;

    constructor(target: GameObject, player: GameObject, onCollect: (target: GameObject) => void) {
        super({ name: "TargetLogic" });
        this.target = target;
        this.player = player;
        this.onCollect = onCollect;
    }

    act() {
        if (!this.top) return; // Ensure it's mounted

        const targetCollider = this.target.children["BoxCollider"] as BoxCollider;
        const playerCollider = this.player.children["BoxCollider"] as PlayerBoxCollider;

        if (targetCollider && playerCollider && targetCollider.collidingWith.has(playerCollider)) {
            this.onCollect(this.target);
        }
        super.act();
    }
}