// Create an AudioContext

// Function to play a single note
import { audioContext, masterGain } from './audioHandler.ts';

export function playNoteWithGain(
	frequency: number,
	durationS = 1,
	type: OscillatorType = 'sine'
) {
	const oscillator = audioContext.createOscillator();
	// const gainNode = audioContext.createGain()
	oscillator.type = type;
	oscillator.frequency.value = frequency;
	oscillator.connect(masterGain);

	oscillator.start();
	oscillator.stop(audioContext.currentTime + durationS);
}

export function playChord(
	frequencies: number[],
	duration = 1,
	type: OscillatorType = 'sine'
) {
	for (const frequency of frequencies) {
		playNoteWithGain(frequency, duration, type);
	}
}
