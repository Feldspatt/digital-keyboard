// Create an AudioContext

// Function to play a single note
import {audioContext, masterGain} from "./audioHandler.ts";

export function playNoteWithGain(frequency: number, durationS = 1, type: OscillatorType = 'sine') {
    const oscillator = audioContext.createOscillator()
    // const gainNode = audioContext.createGain()
    oscillator.type = type
    oscillator.frequency.value = frequency
    // gainNode.gain.value = volume // Reduce volume

    // gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    // gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
    // gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + durationS);

    oscillator.connect(masterGain)

    oscillator.start()
    oscillator.stop(audioContext.currentTime + durationS)
}

export function playChord(frequencies: number[], duration = 1, type: OscillatorType = 'sine') {
    frequencies.forEach((frequency: number) => {
        playNoteWithGain(frequency, duration, type)
    })
}