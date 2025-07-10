import { Part } from "./Part";
import { Transform } from "./Children/Transform";
import { BoxCollider } from "./Children/BoxCollider";
import { PolygonCollider } from "./Children/PolygonCollider";
import { PhysicsEngine } from "./PhysicsEngine";
import { Bodies, Body, World } from "matter-js";

export class PhysicsBody extends Part {
    body: Body | null = null;
    isStatic: boolean;
    density: number;
    friction: number;
    restitution: number;

    constructor({ name, isStatic = false, density = 0.001, friction = 0.1, restitution = 0 }: { name?: string, isStatic?: boolean, density?: number, friction?: number, restitution?: number }) {
        super({ name: name || 'PhysicsBody' });
        this.isStatic = isStatic;
        this.density = density;
        this.friction = friction;
        this.restitution = restitution;
        this.debugEmoji = "🏋️";
    }

    onMount(parent: Part) {
        super.onMount(parent);
        const transform = this.sibling<Transform>("Transform");
        const boxCollider = this.sibling<BoxCollider>("BoxCollider");
        const polygonCollider = this.sibling<PolygonCollider>("PolygonCollider");
        const physicsEngine = this.top?.currentScene?.sibling<PhysicsEngine>("PhysicsEngine");

        if (!transform) {
            console.warn(`PhysicsBody <${this.name}> requires a Transform sibling.`);
            return;
        }
        if (!physicsEngine) {
            console.warn(`PhysicsBody <${this.name}> requires a PhysicsEngine in the current scene.`);
            return;
        }

        if (boxCollider) {
            this.body = Bodies.rectangle(
                transform.worldPosition.x,
                transform.worldPosition.y,
                boxCollider.end.x - boxCollider.start.x,
                boxCollider.end.y - boxCollider.start.y,
                {
                    isStatic: this.isStatic,
                    density: this.density,
                    friction: this.friction,
                    restitution: this.restitution
                }
            );
        } else if (polygonCollider) {
            // Matter.js expects vertices relative to the body's center
            const vertices = polygonCollider.localVertices.map(v => ({ x: v.x, y: v.y }));
            this.body = Bodies.fromVertices(
                transform.worldPosition.x,
                transform.worldPosition.y,
                [vertices],
                {
                    isStatic: this.isStatic,
                    density: this.density,
                    friction: this.friction,
                    restitution: this.restitution
                }
            );
        }

        if (this.body) {
            World.add(physicsEngine.world, this.body);
        }
    }

    act() {
        super.act();
        if (this.body && !this.isStatic) {
            const transform = this.sibling<Transform>("Transform");
            if (transform) {
                transform.position.x = this.body.position.x;
                transform.position.y = this.body.position.y;
                transform.rotation = this.body.angle;
            }
        }
        this.hoverbug = `Static: ${this.isStatic ? "✅" : "❌"}`;
    }

    onUnmount() {
        const physicsEngine = this.top?.currentScene?.sibling<PhysicsEngine>("PhysicsEngine");
        if (this.body && physicsEngine) {
            World.remove(physicsEngine.world, this.body);
        }
        super.onUnmount();
    }
}