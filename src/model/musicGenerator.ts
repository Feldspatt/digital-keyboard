export class SoundGenerator {
	constructor(private audioContext: AudioContext) {}

	// Play a beep sound with specified frequency and duration
	async beep(frequency = 440, duration = 200, volume = 0.5) {
		const oscillator = this.audioContext.createOscillator();
		const gainNode = this.audioContext.createGain();

		oscillator.frequency.value = frequency;
		oscillator.type = 'sine'; // 'sine', 'square', 'sawtooth', 'triangle'

		// gainNode.gain.value = volume // Reduce volume

		// Add a small ramp to avoid clicking sound
		gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
		gainNode.gain.linearRampToValueAtTime(
			volume,
			this.audioContext.currentTime + 0.01
		);
		gainNode.gain.linearRampToValueAtTime(
			0,
			this.audioContext.currentTime + duration / 1000
		);

		oscillator.connect(gainNode);
		gainNode.connect(this.audioContext.destination);

		oscillator.start();
		oscillator.stop(this.audioContext.currentTime + duration / 1000);

		return new Promise((resolve) => {
			setTimeout(resolve, duration);
		});
	}

	// Play a note by name (e.g., "A4", "C#5")
	async playNote(note: number, duration = 200) {
		const frequency = note;
		return this.beep(frequency, duration);
	}

	// Play a sequence of notes
	async playMelody(notes: number[] = [], duration = 200) {
		for (const note of notes) {
			await this.playNote(note, duration);
		}
	}
}
