import { Part } from "./Part";
import { Transform } from "./Children/Transform";
import { BoxCollider } from "./Children/BoxCollider";
import { PolygonCollider } from "./Children/PolygonCollider";
import { PhysicsEngine } from "./PhysicsEngine";
import { Vector } from "../Math/Vector";
import { Bodies, Body, World } from "matter-js";
import type { Scene } from "./Scene";

export class PhysicsBody extends Part {
    body: Body | null = null;
    isStatic: boolean;
    density: number;
    friction: number;
    restitution: number;
    initialized: boolean;

    constructor({ isStatic = false, density = 0.001, friction = 0.1, restitution = 0 }: { isStatic?: boolean, density?: number, friction?: number, restitution?: number }) {
        super({ name: 'PhysicsBody' });
        this.isStatic = isStatic;
        this.density = density;
        this.friction = friction;
        this.restitution = restitution;
        this.debugEmoji = "🏋️";
        this.initialized = false;
        this.type = 'PhysicsBody';
    }
    initialize() {
        if (this.initialized) return; // Prevent re-initialization
        this.initialized = true;
        const transform = this.sibling<Transform>("Transform");
        const collider = this.sibling<BoxCollider | PolygonCollider>("BoxCollider") || this.sibling<PolygonCollider>("PolygonCollider");
        const engine = (this.registrations.scene as Scene).child<PhysicsEngine>("PhysicsEngine");

        if (!transform) {
            console.warn(`PhysicsBody <${this.name}> requires a Transform sibling.`);
            return;
        }
        if (!collider) {
            console.warn(`PhysicsBody <${this.name}> requires a BoxCollider or PolygonCollider sibling.`);
            return;
        }
        if (!engine) {
            console.warn(`PhysicsBody <${this.name}> requires a PhysicsEngine in the current scene.`);
            return;
        }

        // Create the body based on the collider type
        this.body = (Bodies.fromVertices as any)(
            transform.worldPosition.x,
            transform.worldPosition.y,
            [collider.vertices.map(v => v.toObject())],
            {
                isStatic: this.isStatic,
                density: this.density,
                friction: this.friction,
                restitution: this.restitution,
                angle: transform.rotation
            }
        );
        if (this.body) {
            Body.setAngle(this.body, transform.rotation);
            this.body.label = this.name; // Set label for easier debugging
            World.add(engine.world, this.body);
        } else {
            console.warn(`Failed to create body for PhysicsBody <${this.name}>. Ensure the collider is properly defined.`);
        }

    }
    onMount(parent: Part) {
        super.onMount(parent);

    }

    act(delta: number) {
        super.act(delta);
        if (!this.initialized) {
            this.initialize();
        }
        if (!this.body) {
            console.warn(`PhysicsBody <${this.name}> has no body initialized. Ensure it is mounted with a Transform and Collider.`);
            return;
        }
        if (this.body && !this.isStatic) {
            const transform = this.sibling<Transform>("Transform");
            if (transform) {
                transform.moveTo(new Vector(this.body.position.x, this.body.position.y));
                transform.setRotation(this.body.angle);
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