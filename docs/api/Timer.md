# Timer

**Extends:** [Part](./Part.md)

The `Timer` component provides a simple way to execute a function after a specified duration, with an option to repeat. It's useful for scheduling events, delays, or cooldowns.

## Constructor

`new Timer({ duration, onComplete, repeats })`

-   `duration: number`
    The time in milliseconds after which the `onComplete` callback will be executed.

-   `onComplete: () => void`
    The callback function that will be executed when the timer finishes.

-   `repeats?: boolean`
    If `true`, the timer will automatically reset and restart after `onComplete` is called, creating a repeating timer. If `false`, it will stop after one completion. Defaults to `false`.

## Properties

-   `duration: number`
    The time in milliseconds after which the `onComplete` callback will be executed.

-   `onComplete: () => void`
    The callback function that will be executed when the timer finishes.

-   `repeats: boolean`
    If `true`, the timer will automatically reset and restart after `onComplete` is called, creating a repeating timer. If `false`, it will stop after one completion.

-   `startTime: number`
    The timestamp when the timer was started or last reset.

-   `isRunning: boolean`
    A boolean indicating whether the timer is currently running.

## Methods

-   `start()`
    Starts or restarts the timer.

-   `stop()`
    Stops the timer. It will not call `onComplete` if stopped before completion.

-   `reset()`
    Resets the timer's internal clock to zero without stopping or starting it.

## Examples

### Creating a One-Shot Timer

```javascript
import { GameObject } from './Parts/GameObject';
import { Timer } from './Parts/Timer';

const oneShotTimer = new GameObject({ name: 'OneShotTimer' });
oneShotTimer.addChildren(
    new Timer({
        duration: 3000, // 3 seconds
        onComplete: () => {
            console.log('3 seconds passed!');
            // Example: Show a message, spawn an enemy, etc.
        },
        repeats: false
    })
);

myScene.addChild(oneShotTimer);

// To start the timer (e.g., when the scene loads)
oneShotTimer.child<Timer>('Timer')?.start();
```

### Creating a Repeating Timer

```javascript
import { GameObject } from './Parts/GameObject';
import { Timer } from './Parts/Timer';

let counter = 0;
const repeatingTimer = new GameObject({ name: 'RepeatingTimer' });
repeatingTimer.addChildren(
    new Timer({
        duration: 1000, // Every 1 second
        onComplete: () => {
            counter++;
            console.log(`Repeating timer: ${counter} seconds`);
            if (counter >= 5) {
                repeatingTimer.child<Timer>('Timer')?.stop(); // Stop after 5 seconds
                console.log('Repeating timer stopped.');
            }
        },
        repeats: true
    })
);

myScene.addChild(repeatingTimer);
repeatingTimer.child<Timer>('Timer')?.start();
```