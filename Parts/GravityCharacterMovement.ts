import { Part } from "./Part";
import { Transform } from "./Children/Transform";
import { Input } from "./Input";
import { Vector } from "../Math/Vector";
import type { Collider } from "./Children/Collider";
import type { BoxCollider } from "./Children/BoxCollider";

export class GravityCharacterMovement extends Part {
    speed: number;
    movementType: 'WASD' | 'ArrowKeys' | 'BOTH';
    input: Input | undefined;
    gravityScale: Vector;
    maxSpeed: number;
    velocity: Vector;
    jumpForce: number;
    facing: Vector;
    waterFraction: number;
    landFraction: number;
    constructor({
        speed = 5,
        movementType = 'WASD',
        input,
        gravityScale,
        maxSpeed,
        jumpForce,
        waterFraction,
        landFraction
    }: {
        speed?: number,
        movementType?: 'WASD' | 'ArrowKeys' | 'BOTH',
        input?: Input,
        gravityScale: Vector,
        maxSpeed: number,
        jumpForce: number,
        waterFraction?: number,
        landFraction?: number;
    }) {
        super({ name: 'GravityCharacterMovement' });
        this.speed = speed;
        this.movementType = movementType;
        this.input = input;
        this.gravityScale = gravityScale;
        this.type = "GravityCharacterMovement";
        this.maxSpeed = maxSpeed;
        this.velocity = new Vector(0, 0);
        this.jumpForce = jumpForce;
        this.facing = new Vector(1, 1);
        this.waterFraction = waterFraction || 0.5; 
        this.landFraction = landFraction || 0.9;
    }

    private getStandingGround(): Collider | null {
        const myCollider = this.siblingOf<Collider>("Collider", "BoxCollider", "PolygonCollider");
        if (!myCollider) return null;

        for (const other of myCollider.collidingWith) {
            if (other.tag === 'ground') {
                const myBox = myCollider as BoxCollider;
                const myTransform = this.sibling<Transform>('Transform')!;
                const myBottom = myTransform.worldPosition.y + (myBox.height * myTransform.scale.y) / 2;
                const groundTop = other.realWorldStart.y;

                if (this.velocity.y >= 0 && myBottom > groundTop - 1) {
                    return other;
                }
            }
        }
        return null;
    }

    private isInWater(): boolean {
        const myCollider = this.siblingOf<Collider>("Collider", "BoxCollider", "PolygonCollider");
        if (!myCollider) return false;

        for (const other of myCollider.collidingWith) {
            if (other.tag === 'water') {
                return true;
            }
        }
        return false;
    }

    act(delta: number): void {
        super.act(delta);
        if (!this.input) {
            if (!this.warned.has("MissingInput"))
                this.top?.warn(`GravityCharacterMovement <${this.name}> (${this.id}) is missing an input property. Please create an input on the scene and pass it.`)
                    ? this.warned.add("MissingInput")
                    : null;
            return;
        }

        const transform = this.sibling<Transform>("Transform");
        if (!transform) return;

        const keys = this.input.downkeys;
        const myCollider = this.siblingOf<Collider>("Collider", "BoxCollider", "PolygonCollider");

        const groundCollider = this.getStandingGround();
        const onGround = !!groundCollider;
        const inWater = this.isInWater();

        const speedMultiplier = inWater ? this.waterFraction : (onGround ? this.landFraction : 1.0);
        const gravityMultiplier = inWater ? this.gravityScale.y : 1.0;
        const jumpForceMultiplier = inWater ? this.jumpForce * this.waterFraction : this.jumpForce;

        // --- Horizontal Movement ---
        let dx = 0;
        if (this.movementType === 'WASD' || this.movementType === 'BOTH') {
            if (keys.has('a')) {
                dx -= this.speed * speedMultiplier;
                this.facing.x = -1;
            }
            if (keys.has('d')) {
                dx += this.speed * speedMultiplier;
                this.facing.x = 1;
            }
        }
        if (this.movementType === 'ArrowKeys' || this.movementType === 'BOTH') {
            if (keys.has('ArrowLeft')) {
                dx -= this.speed * speedMultiplier;
                this.facing.x = -1;
            }
            if (keys.has('ArrowRight')) {
                dx += this.speed * speedMultiplier;
                this.facing.x = 1;
            }
        }

        // Prevent walking into walls
        if (dx !== 0 && myCollider) {
            for (const other of myCollider.collidingWith) {
                if ((other.tag === 'ground' || other.tag === 'block') && other !== groundCollider) {
                    const myBox = myCollider as BoxCollider;
                    const otherBox = other as BoxCollider;
                    const overlapY = Math.min(myBox.realWorldEnd.y, otherBox.realWorldEnd.y) - Math.max(myBox.realWorldStart.y, otherBox.realWorldStart.y);

                    if (overlapY > myBox.height * 0.25) { // It's a wall if vertical overlap is significant
                        const myCenterX = transform.worldPosition.x;
                        const otherCenterX = otherBox.realWorldStart.x + (otherBox.realWorldEnd.x - otherBox.realWorldStart.x) / 2;
                        if (dx > 0 && myCenterX < otherCenterX) {
                            dx = 0; // Moving right into a wall
                        }
                        if (dx < 0 && myCenterX > otherCenterX) {
                            dx = 0; // Moving left into a wall
                        }
                    }
                }
            }
        }
        this.velocity.x = dx;

        // --- Vertical Movement ---
        let isJumping = false;
        if (onGround || inWater) { // Allow jumping from water surface
            if ((this.movementType === 'WASD' || this.movementType === 'BOTH') && keys.has('w')) {
                this.velocity.y = -this.jumpForce * jumpForceMultiplier;
                isJumping = true;
            }
            if ((this.movementType === 'ArrowKeys' || this.movementType === 'BOTH') && keys.has('ArrowUp')) {
                this.velocity.y = -this.jumpForce * jumpForceMultiplier;
                isJumping = true;
            }
        }

        if (!onGround || isJumping) {
            this.velocity.y += this.gravityScale.y * gravityMultiplier * delta;
        } else {
            this.velocity.y = 0;
            const myBox = myCollider as BoxCollider;
            if (myBox && groundCollider) {
                transform.position.y = groundCollider.realWorldStart.y - (myBox.height * transform.scale.y) / 2;
            }
        }

        // --- Clamp Speed & Apply Movement ---
        if (this.velocity.y > this.maxSpeed) {
            this.velocity.y = this.maxSpeed;
        }
        if (Math.abs(this.velocity.x) > this.maxSpeed) {
            this.velocity.x = Math.sign(this.velocity.x) * this.maxSpeed;
        }

        transform.position.addInPlace(this.velocity.multiply(delta));
    }

}