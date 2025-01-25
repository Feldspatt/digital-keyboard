import { createOscillator, stopOscillator } from './audioHandler.ts';

export class Sound {
	currentOscillator: OscillatorNode | null = null;

	constructor(private note: number) {}

	toggle() {
		if (this.currentOscillator) {
			stopOscillator(this.currentOscillator);
			this.currentOscillator = null;
		} else {
			this.currentOscillator = createOscillator(this.note);
		}
	}
}
