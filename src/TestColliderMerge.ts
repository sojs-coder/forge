import { color } from "bun";
import { Collider, BoxCollider, PolygonCollider, Game, Scene, Layer, GameObject, Transform, Vector, Input, CharacterMovement, Part, ColorRender } from "../engine/engine-core";

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
for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
        if ((x == 0 || y === 0) && Math.random() > 0.2) continue;
        const testObject = new GameObject({
            name: `Test Object (${x + 1}, ${y + 1})`
        });

        const testTransform = new Transform({
            position: new Vector(30+x * 50, 500 + y * 50),
            rotation: 0,
            scale: Vector.From(1)
        });
        const boxCollider = new BoxCollider({
            width: 50,
            height: 50,
            tag: "testObjects",
        });
        const colorRender = new ColorRender({
            color: `red`,
            width: 50,
            height: 50,
        });

        testObject.addChildren(testTransform, boxCollider, colorRender);
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
    speed: 5,
    input: input
});

const colorChanger = new CollisionColorChanger();

player.addChildren(playerTransform, playerCollider, playerRenderer, playerMovement, colorChanger);
l1.addChild(player);

console.log(game);

game.start(s1);