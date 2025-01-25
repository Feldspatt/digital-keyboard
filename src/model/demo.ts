// import {SoundGenerator} from "./musicGenerator.ts";
import { delay, merge } from 'demure';
import { NOTES } from './NOTES.ts';
import { createOscillator, stopOscillator } from './audioHandler.ts';
import { playNoteWithGain } from './test-multi-notes.ts';

// let audioContext: AudioContext;

export function startAudio() {
	// audioContext = new (window.AudioContext)();
}

type SoundLine = {
	note: number;
	delayMs: number;
	done: boolean;
};

async function* noteGenerator(soundline: SoundLine) {
	while (!soundline.done) {
		yield soundline.note;
		const now = performance.now();
		// Calculate the next aligned time based on the interval
		const nextTick = Math.ceil(now / soundline.delayMs) * soundline.delayMs;
		await delay(nextTick - now);
	}
}

export async function obsMusic() {
	const tchak = noteGenerator({
		note: NOTES.A4,
		delayMs: 1000,
		done: false
	});

	const tchik = noteGenerator({
		note: NOTES.E4,
		delayMs: 1000,
		done: false
	});

	// const sound = new SoundGenerator(audioContext)
	const obs = async () => {
		for await (const note of merge(tchik, tchak)) {
			playNoteWithGain(note, 1, 'sine');
		}
	};
	obs();
}

export function playDemo() {

	setInterval(() => {
		const oscillator = createOscillator(NOTES.A4);
		setTimeout(() => {
			stopOscillator(oscillator);
		}, 1000);
	}, 1200);

	setInterval(() => {
		const oscillator = createOscillator(NOTES.E4);
		setTimeout(() => {
			stopOscillator(oscillator);
		}, 1000);
	}, 1500);
}
