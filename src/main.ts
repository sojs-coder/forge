import { Game } from '../Parts/Game';
import { Scene } from '../Parts/Scene';
import { Layer } from '../Parts/Layer';
import { GameObject } from '../Parts/GameObject';

import { Transform } from '../Parts/Children/Transform';
import { BoxCollider } from '../Parts/Children/BoxCollider';
import { Vector } from '../Math/Vector';
import { Camera } from '../Parts/Camera';
import { Sound } from '../Parts/Sound';
import { Input } from '../Parts/Input';
import { AnimatedSprite } from '../Parts/Children/AnimatedSprite';
import { ColorRender } from '../Parts/Children/ColorRender';
import { Part } from '../Parts/Part';
import { TextRender } from '../Parts/Children/TextRender';
import { Button } from '../Parts/Children/Button';
import { EnemyMovement } from './EnemyMovement';
import { Target, TargetLogic } from './Target';
import { ScoreCounter } from './ScoreCounter';

// Game Constants
const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;
const PLAYER_SPEED = 5;
const JUMP_FORCE = 15;
const GRAVITY = 0.8;
const ENEMY_SPEED = 3;
const PLATFORM_HEIGHT = 50;
const MONSTER_BASE_HEIGHT = 27; // Base height of the monster sprite in pixels
const MONSTER_SCALE = 3;
const MONSTER_SCALED_HEIGHT = MONSTER_BASE_HEIGHT * MONSTER_SCALE; // Scaled height of the monster sprite

let gameOver = false;


const game = new Game({ name: 'Monster Run', canvas: 'game-canvas', width: GAME_WIDTH, height: GAME_HEIGHT, devmode: false, disableAntiAliasing: true });

const scene1 = new Scene({ name: 'Game Scene' });
const gameLayer = new Layer({ name: 'Game Layer' });
const backgroundLayer = new Layer({ name: 'Background Layer' });
scene1.addChild(backgroundLayer);
backgroundLayer.addChildren(
    new Transform({ position: new Vector(GAME_WIDTH / 2, GAME_HEIGHT / 2) }),
    new ColorRender({
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        color: 'lightblue',
    })
);

game.addChild(scene1);
scene1.addChild(gameLayer);

const scoreCounter = new ScoreCounter();
gameLayer.addChild(scoreCounter);
let targets: Target[] = [];

// Player (Monster)
const monster = new GameObject({ name: 'Monster' });
monster.addChildren(
    new Transform({ position: new Vector(20, 0), scale: Vector.From(3) }),
    new AnimatedSprite({
        spritesheet: "TestAssets/monster.json",
        width: 17,
        height: 27,
        startingAnimation: "idle",
    }),
    new BoxCollider({ width: 17, height: 27 })
);
monster.addChild(
    new Sound({
        name: 'JumpSound',
        src: 'TestAssets/jump.mp3',
        loop: false,
        volume: 1,
    })
)
const PLAYER_START_Y = GAME_HEIGHT - PLATFORM_HEIGHT - (MONSTER_SCALED_HEIGHT / 2);
(monster.child<Transform>('Transform') as Transform).position.y = PLAYER_START_Y;
gameLayer.addChild(monster);

// Platform
const platform = new GameObject({ name: 'Platform' });
platform.addChildren(
    new Transform({ position: new Vector(GAME_WIDTH / 2, GAME_HEIGHT - (PLATFORM_HEIGHT / 2)) }),
    new ColorRender({ width: GAME_WIDTH, height: PLATFORM_HEIGHT, color: 'brown' }),
    new BoxCollider({ width: GAME_WIDTH, height: PLATFORM_HEIGHT })
);
gameLayer.addChild(platform);

// Enemies (Blue Men)
const enemies: GameObject[] = [];
for (let i = 0; i < 3; i++) {
    const enemy = new GameObject({ name: `Blue Man ${i + 1}` });
    enemy.addChildren(
        new Transform({ position: new Vector(GAME_WIDTH / 4 + i * (GAME_WIDTH / 4), GAME_HEIGHT - (PLATFORM_HEIGHT / 2) - 45) }),
        new ColorRender({ width: 30, height: 40, color: 'blue' }),
        new BoxCollider({ width: 30, height: 40 }),
        new EnemyMovement(GAME_WIDTH, ENEMY_SPEED) // Custom part for enemy movement
    );
    gameLayer.addChild(enemy);
    enemies.push(enemy);
}

// Game Logic Part
class GameLogic extends Part {
    isJumping: boolean = true; // Start with jumping to simulate initial fall
    velocityY: number = 0;
    onMount(parent: Part) {
        super.onMount(parent);
    }

    act(delta: number) {
        if (gameOver) return;

        const monsterTransform = monster.child<Transform>('Transform') as Transform;
        const monsterCollider = monster.child<BoxCollider>('BoxCollider') as BoxCollider;
        const animatedSprite = monster.child<AnimatedSprite>('AnimatedSprite') as AnimatedSprite;

        // Apply gravity    
        if (this.isJumping) {
            this.velocityY += GRAVITY;
            monsterTransform.position.y += this.velocityY;
            if (animatedSprite.currentAnimation !== "idle") {
                animatedSprite.setAnimation("idle");
            }
        }

        // Check for landing on platform
        if (monsterCollider.collidingWith.has(platform.child<BoxCollider>('BoxCollider') as BoxCollider) && this.velocityY > 0) {
            this.isJumping = false;
            this.velocityY = 0;
            monsterTransform.position.y = PLAYER_START_Y; // Snap to platform level
        }

        // Go through targets
        for (let i = targets.length - 1; i >= 0; i--) {
            const target = targets[i];
            const targetCollider = target.child<BoxCollider>('BoxCollider') as BoxCollider;
            if (monsterCollider.collidingWith.has(targetCollider)) {
                scoreCounter.addScore(10);
                this.sibling<Sound>('CoinCollect')?.play({ clone: true });
                gameLayer.removeChild(target);
                targets.splice(i, 1);
            }
        }

        // Spawn new targets randomly
        if (Math.random() < 0.01 && targets.length < 5) { // Adjust spawn rate and max targets as needed
            const randomX = Math.random() * (GAME_WIDTH - 40) + 20;
            const randomY = Math.random() * (GAME_HEIGHT - PLATFORM_HEIGHT - 100) + 50; // Avoid spawning on platform or too high
            const newTarget = new Target(Math.random().toString(16).substring(2, 8), new Vector(randomX, GAME_HEIGHT - PLATFORM_HEIGHT - 20));
            gameLayer.addChild(newTarget);
            targets.push(newTarget);
        }

        // Go through enemies
        var i = 0;
        for (const enemy of enemies) {
            i++;
            const enemyCollider = enemy.child<BoxCollider>('BoxCollider') as BoxCollider;
            if (monsterCollider.collidingWith.has(enemyCollider)) {
                this.top?.setScene("Game Over Scene");
                gameOver = true;
                return;
            }
        }

        super.act(delta);
    }
}

const gameLogicInstance = new GameLogic({ name: "Game Logic" });
scene1.addChild(gameLogicInstance);
scene1.addChild(new Sound({
    name: 'CoinCollect',
    src: 'TestAssets/coin.mp3',
    loop: false,
}));
scene1.addChild(new Sound({
    name: 'BackgroundMusic',
    src: 'TestAssets/background.mp3',
    loop: true,
    volume: 0.5,
}));
(scene1.child<Sound>('BackgroundMusic') as Sound).play({ restart: true });

scene1.addChild(new Input({
    key: (event) => {
        const monsterTransform = monster.child<Transform>('Transform') as Transform;
        const animatedSprite = monster.child<AnimatedSprite>('AnimatedSprite') as AnimatedSprite;

        switch (event.key) {
            case 'ArrowLeft':
                monsterTransform.position.x -= PLAYER_SPEED;
                if (monsterTransform.position.x - monster._superficialWidth < 0) {
                    monsterTransform.position.x = monster._superficialWidth; // Prevent going out of bounds
                }
                animatedSprite.face(new Vector(-1, 1));
                if (animatedSprite.currentAnimation !== "walk" && !gameLogicInstance.isJumping) {
                    animatedSprite.setAnimation("walk", { loop: true });
                }
                break;
            case 'ArrowRight':
                monsterTransform.position.x += PLAYER_SPEED;
                if (monsterTransform.position.x > GAME_WIDTH - monster.superficialWidth) { // Use monster's superficialWidth
                    monsterTransform.position.x = GAME_WIDTH - monster.superficialWidth; // Prevent going out of bounds
                }
                animatedSprite.face(new Vector(1, 1));
                if (animatedSprite.currentAnimation !== "walk" && !gameLogicInstance.isJumping) {
                    animatedSprite.setAnimation("walk", { loop: true });
                }
                break;
            case ' ': // Spacebar for jump
                if (!gameLogicInstance.isJumping) {
                    const jumpSound = monster.child<Sound>('JumpSound') as Sound;
                    jumpSound.play({ clone: true });
                    gameLogicInstance.isJumping = true;
                    gameLogicInstance.velocityY = -JUMP_FORCE;
                    animatedSprite.setAnimation("idle"); // Set to idle during jump
                }
                break;
        }
    },
    keyup: (event) => {
        const animatedSprite = monster.child<AnimatedSprite>('AnimatedSprite') as AnimatedSprite;
        if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && !gameLogicInstance.isJumping) {
            animatedSprite.setAnimation("idle");
        }
    },
    mousemove: (event, input) => { },
    click: (event, input) => { },
}));

const gameOverScene = new Scene({ name: 'Game Over Scene' });
const gameOverLayer = new Layer({ name: 'Game Over Layer' });
gameOverScene.addChild(gameOverLayer);

const gameOverText = new GameObject({ name: "Game Over Text" });
const gameOverRender = new TextRender({
    name: "Game Over Text",
    textContent: `Game Over! Final Score: ${scoreCounter.score}`,
    align: "center",
    font: "48px Arial",
});
scoreCounter.tie(gameOverRender, 'textContent', "scoreText");
gameOverText.addChildren(gameOverRender, new Transform({ position: new Vector(GAME_WIDTH / 2, GAME_HEIGHT / 2) }));
gameOverLayer.addChild(gameOverText);

const restartButton = new GameObject({ name: "Restart Button" });
restartButton.addChildren(
    new Transform({ position: new Vector(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100) }),
    new Button({
        label: "Restart",
        onClick: () => {
            gameOver = false;
            game.setScene(scene1);
            (monster.child<Transform>('Transform') as Transform).position.x = 10;
            (monster.child<Transform>('Transform') as Transform).position.y = PLAYER_START_Y;
            gameLogicInstance.isJumping = true;
            gameLogicInstance.velocityY = 0;
            enemies.forEach((enemy, index) => {
                const enemyTransform = enemy.child<Transform>('Transform') as Transform;
                enemyTransform.position.x = GAME_WIDTH / 4 + index * (GAME_WIDTH / 4);
            });
            // Clear any lingering collision states for the monster
            (monster.child<BoxCollider>('BoxCollider') as BoxCollider).collidingWith.clear();
            // Reset score and remove targets
            scoreCounter.reset();
            targets.forEach(target => gameLayer.removeChild(target));
            targets = [];

        },
        styles: {
            default: {
                backgroundColor: "#4CAF50",
                color: "white",
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#388E3C",
                width: 150,
                height: 60,
                font: "24px Arial",
            },
            hover: {
                backgroundColor: "#45A049",
                borderColor: "#2E8B57",
            },
            active: {
                backgroundColor: "#367C39",
                borderColor: "#1B5E20",
            },
        },
    })
);




// const furtherCollisionTesting = new GameObject({ name: "Further Collision Testing" });
// furtherCollisionTesting.addChildren(
//     new Transform({ position: new Vector(GAME_WIDTH / 2, GAME_HEIGHT - PLATFORM_HEIGHT - 100), rotation: Math.PI / 4 }),
//     new ColorRender({ width: 50, height: 50, color: 'red' }),
//     new BoxCollider({ width: 50, height: 50 }),
//     new TextRender({
//         name: "Collision Test Text",
//         textContent: "Collision Test",
//         align: "center",
//         font: "13px Arial",
//         color: "black",
//     })
// );
// gameLayer.addChild(furtherCollisionTesting);
gameOverLayer.addChild(restartButton);
game.addChild(gameOverScene);
gameOverScene.addChild(new Input({
    key: () => { },
    keyup: () => { },
    mousemove: () => { },
    click: (event, input) => { },
}));
// Player movement, bounds checking, and enemy movement/collision logic
// These are now handled by the Input key handler and the main game loop's act calls on game objects.
game.calculateLayout();
// game.act();
game.start(scene1);