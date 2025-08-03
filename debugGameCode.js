const nsz6c0rdvmtxztrprmr7 = new Transform({
    name: "CameraTransform",
    position: new Vector(0, 0),
    rotation: 0,
    scale: new Vector(1, 1),
});
const nslsy9mxjvdvc7rrzgce = new Transform({
    name: "GameObjectTransform",
    position: new Vector(0, 0),
    rotation: 0,
    scale: new Vector(1, 1),
});
const nwsm2u8z3w06kktc74om = new Follow({
    name: "Follow",
    target: nslsy9mxjvdvc7rrzgce,
    offset: new Vector(0, 0),
});
const nze3imzws7obohfcyi37 = new Camera({
    name: "NewCamera",
    position: new Vector(0, 0),
    zoom: new Vector(1, 1),
});
const n7zccpwwd2i2ocmzyy3a = new Input({
    name: "Input",
});
const nduanvcjmjmeiqz7hdjx = new PhysicsEngine({
    name: "PhysicsEngine",
});
const nkn59tmmtycpaqfz3h7g = new PhysicsBody({
    name: "PhysicsBody",
    isStatic: false,
    density: 0.001,
    friction: 0.1,
    restitution: 0,
});
const nbkmizkipafcxxy1x9m0o = new ColorRender({
    name: "ColorRender",
    width: 50,
    height: 50,
    color: "#0040ff",
});
const n01e7dznm9qa0kbgyckk = new Transform({
    name: "Transform_3",
    position: new Vector(-100, 78),
    rotation: 0,
    scale: new Vector(1, 1),
});
const n1f6eisd9pczq24y36m1 = new PolygonCollider({
    name: "PolygonCollider_4",
    vertices: [new Vector(-25, -25), new Vector(25, -25), new Vector(25, 25), new Vector(-25, 25)],
});
const n4mzagfg8c0owamtceko = new GameObject({
    name: "PhysicsBodyTest",
});
const n6zw8vh9knx0ecqcpbam = new ColorRender({
    name: "ColorRender_1",
    width: 50,
    height: 50,
    color: "#00ff7b",
});
const n8fm7jchgg9hix6c1zr = new Transform({
    name: "Transform_2",
    position: new Vector(50, 100),
    rotation: 0,
    scale: new Vector(1, 1),
});
const nh5ml1c9o6fh6fm8zh94 = new GameObject({
    name: "GameObject_4",
});
const ncwvwmjj8mz7zgd4hz3q = new ColorRender({
    name: "ColorRender",
    width: 50,
    height: 50,
    color: "#FF0000",
});
const nckcu3g67fzzvmzoto6 = new CharacterMovement({
    name: "CharacterMovement",
    speed: 5,
    movementType: "WASD",
    input: n7zccpwwd2i2ocmzyy3a,
});
const np7q97molcmnirhz36v6 = new Health({
    name: "Health",
    maxHealth: 100,
});
const nhhzc8569kmcfc6tdxr = new HealthBar({
    name: "HealthBar_5",
    width: 100,
    height: 10,
    color: "#00d5ff",
    backgroundColor: "#ffffff",
    offsetHeight: 50,
});
class HealthTest extends Part {
    constructor({
        name,
        looseHealthPerSecond
    }) {
        super({
            name: name || "HealthTest"
        });
        this.looseHealthPerSecond = looseHealthPerSecond;
        this.lastTickTime = Date.now();
    }

    static properties = {
        name: {
            type: "text",
            default: "HealthTest"
        },
        looseHealthPerSecond: {
            type: "number",
            default: 1
        }
    };
    act() {
        super.act();
        if (Date.now() - this.lastTickTime > 1000) {
            const siblingHealth = this.sibling("Health");
            if (!siblingHealth) {
                throw new Error("HealthTest requires a sibling Health part");
            }
            this.lastTickTime = Date.now();
            siblingHealth.takeDamage(this.looseHealthPerSecond);
        }

    }
}
const nzz4jjci2m9zrrh5zoi = new HealthTest({
    name: "HealthTest_6",
    looseHealthPerSecond: 1,
});
const njso4ymbwz7cj13vz4tw = new GameObject({
    name: "NewGameObject",
});
const nlm0kaufijaldhmrqay1 = new Layer({
    name: "Layer_7",
});
const n20c1mawnycncom7zz0c = new Scene({
    name: "NewScene",
    backgroundColor: "#000000",
});
const ngame_root = new Game({
    name: "MyGame",
    canvas: "gamecanvas",
    width: 800,
    height: 600,
    devmode: true,
    disableAntiAliasing: false,
});
nze3imzws7obohfcyi37.addChildren(nsz6c0rdvmtxztrprmr7, nwsm2u8z3w06kktc74om);
n4mzagfg8c0owamtceko.addChildren(nkn59tmmtycpaqfz3h7g, nbkmizkipafcxxy1x9m0o, n01e7dznm9qa0kbgyckk, n1f6eisd9pczq24y36m1);
nh5ml1c9o6fh6fm8zh94.addChildren(n6zw8vh9knx0ecqcpbam, n8fm7jchgg9hix6c1zr);
njso4ymbwz7cj13vz4tw.addChildren(nslsy9mxjvdvc7rrzgce, ncwvwmjj8mz7zgd4hz3q, nckcu3g67fzzvmzoto6, np7q97molcmnirhz36v6, nhhzc8569kmcfc6tdxr, nzz4jjci2m9zrrh5zoi);
nlm0kaufijaldhmrqay1.addChildren(n4mzagfg8c0owamtceko, nh5ml1c9o6fh6fm8zh94, njso4ymbwz7cj13vz4tw);
n20c1mawnycncom7zz0c.addChildren(nze3imzws7obohfcyi37, n7zccpwwd2i2ocmzyy3a, nduanvcjmjmeiqz7hdjx, nlm0kaufijaldhmrqay1);
ngame_root.addChildren(n20c1mawnycncom7zz0c);