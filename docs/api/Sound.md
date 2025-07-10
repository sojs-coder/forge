# Sound

**Extends:** [Part](./Part.md)

The `Sound` component allows you to load and play audio files within your game. It wraps the browser's native `HTMLAudioElement`.

## Properties

-   `audio: HTMLAudioElement`
    The underlying HTML Audio Element. You can access this directly for more advanced control if needed.

-   `_isLoaded: boolean`
    Internal flag indicating if the audio file has successfully loaded and is ready to play.

## Constructor Parameters

-   `name: string`
    The name of the sound part.

-   `src: string`
    The path to the audio file (e.g., `"./assets/music.mp3"`, `"./assets/sfx/jump.wav"`).

-   `volume?: number` (default: `1`)
    The volume of the sound, a value between 0 (silent) and 1 (full volume).

-   `loop?: boolean` (default: `false`)
    If `true`, the sound will loop continuously when played.

## Methods

-   `play(options?: { restart?: boolean, clone?: boolean })`
    Starts playing the sound.
    -   `options.restart`: If `true`, the sound will restart from the beginning if it's already playing. Default is `false`.
    -   `options.clone`: If `true`, it will play a new, overlapping instance of the sound. This is useful for rapid-fire sound effects. Default is `false`.

-   `pause()`
    Pauses the sound at its current playback position.

-   `stop()`
    Stops the sound and resets its playback position to the beginning.

-   `setVolume(volume: number)`
    Sets the volume of the sound. The value will be clamped between 0 and 1.

-   `setLoop(loop: boolean)`
    Sets whether the sound should loop.

## Examples

### Creating and Playing Background Music

```javascript
import { GameObject } from './Parts/GameObject';
import { Sound } from './Parts/Sound';

const backgroundMusic = new GameObject({ name: 'BackgroundMusic' });

backgroundMusic.addChildren(
    new Sound({
        name: 'GameMusic',
        src: './assets/audio/bg_music.mp3',
        volume: 0.5,
        loop: true
    })
);

// Add the GameObject to a scene (e.g., your main menu scene)
myMenuScene.addChild(backgroundMusic);

// To start playing the music (e.g., when the scene starts or a button is clicked)
// You would typically get a reference to the Sound part and call play()
const musicPart = backgroundMusic.children['GameMusic'] as Sound;
musicPart.play();
```

### Playing a Sound Effect on an Event

```javascript
import { GameObject } from './Parts/GameObject';
import { Sound } from './Parts/Sound';
import { Part } from './Parts/Part';

// Assume 'player' is a GameObject
declare const player: GameObject;

// Add a Sound component for the jump sound effect to the player GameObject
player.addChild(
    new Sound({
        name: 'JumpSound',
        src: './assets/audio/jump.wav',
        volume: 0.8,
        loop: false
    })
);

// In a custom PlayerController Part (sibling of the Sound part)
class PlayerController extends Part {
    constructor() { super(); this.name = 'PlayerController'; }

    handleJump() {
        const jumpSound = this.sibling<Sound>('JumpSound');
        if (jumpSound) {
            jumpSound.play(); // Play the jump sound
        }
    }

    act() {
        // Example: if jump key is pressed
        // if (Input.isKeyPressed('Space')) {
        //     this.handleJump();
        // }
    }
}

player.addChild(new PlayerController());
```
