import { Collider, BoxCollider, PolygonCollider, Game, Scene, Layer, GameObject, Transform, Vector, Input, CharacterMovement, Part, ColorRender, Camera, Follow } from "../engine/engine-core";

const game = new Game({
    name: "My game",
    canvas: "can",
    width: window.innerWidth,
    height: window.innerHeight,
    showFrameStats: "PERFORMANCE_HUD",
});


const s1 = new Scene({
    name: "S1",
});

const l1 = new Layer({
    name: "L1"
});


s1.addChild(l1);


game.addChild(s1);




// Missing borders
for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
        if ((x == 0 || y === 0) && Math.random() > 0.2) continue;
        const testObject = new GameObject({
            name: `Test Object (${x + 1}, ${y + 1})`
        });
        const wh = Math.floor(Math.random() * 500) + 10;
        const testTransform = new Transform({
            position: new Vector(30 + x * wh, 500 + y * wh),
            rotation: 0,
            scale: Vector.From(1)
        });
        // Generate a random convex n-gon (n=3-8)
        const n = Math.floor(Math.random() * 6) + 3; // 3 to 8
        const angleStep = (Math.PI * 2) / n;
        const radius = wh / 2;
        const center = new Vector(0, 0);
        // Add a small random offset to each vertex for variety, but keep convex
        const vertices: Vector[] = [];
        for (let i = 0; i < n; i++) {
            const angle = i * angleStep + Math.random() * (angleStep * 0.15);
            const r = radius * (0.7 + Math.random() * 0.6); // 0.7r to 1.3r
            vertices.push(new Vector(
                Math.cos(angle) * r,
                Math.sin(angle) * r
            ));
        }
        const polyCollider = new PolygonCollider({
            vertices,
        });
        const colorRender = new ColorRender({
            color: `red`,
            width: wh,
            height: wh,
        });

        testObject.addChildren(testTransform, polyCollider);
        l1.addChild(testObject);
    }
}

for (let x = 0; x < 10; x++) {
    const testObject = new GameObject({
        name: `Test D- Object (${x + 1})`
    });

    const testTransform = new Transform({
        position: new Vector(300 + x * 25, 100 + x * 25),
        rotation: 0,
        scale: Vector.From(1)
    });
    const colorRender = new ColorRender({
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
        width: 50,
        height: 50,
    });
    const boxCollider = new BoxCollider({
        width: 50,
        height: 50,
        tag: "testObjects",
    });

    testObject.addChildren(testTransform, boxCollider, colorRender);
    l1.addChild(testObject);
}

const input = new Input({
    key: () => {},
    keyup: () => {},
    mousemove: () => {},
    click: () => {},
});
s1.addChild(input);

class CollisionColorChanger extends Part {
    private collider: Collider | undefined;
    private renderer: ColorRender | undefined;
    private originalColor: string = 'blue';

    onMount(part: Part) {
        super.onMount(part);
        this.collider = this.siblingOf<Collider>("Collider");
        console.log(this.collider)
        this.renderer = this.sibling<ColorRender>("ColorRender");
        console.log(this.renderer);
        if (this.renderer) {
            this.originalColor = this.renderer.color;
        }
    }

    act(delta: number) {
        super.act(delta);
        if (this.collider && this.renderer) {
            if (this.collider.colliding) {
                this.renderer.color = 'red';
            } else {
                this.renderer.color = this.originalColor;
            }
        }
    }
}

const player = new GameObject({
    name: "Player"
});

const playerTransform = new Transform({
    position: new Vector(100, 100)
});

const playerCollider = new BoxCollider({
    width: 50,
    height: 50,
});

const playerRenderer = new ColorRender({
    width: 50,
    height: 50,
    color: "blue"
});

const playerMovement = new CharacterMovement({
    speed: 0.5,
    input: input
});

const camera = new Camera({ name: "Cam" });
const follow = new Follow({
    target: playerTransform,
    interpolationSpeed: 0.01
});

camera.addChild(follow);
const cameraTransform = new Transform({ position: new Vector(0, 0) });
camera.addChild(cameraTransform);
s1.addChild(camera);


const colorChanger = new CollisionColorChanger();

player.addChildren(playerTransform, playerCollider, playerRenderer, playerMovement, colorChanger);
l1.addChild(player);

console.log(game);

game.start(s1);