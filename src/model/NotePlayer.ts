export class NotePlayer {
    private audioContext: AudioContext;

    constructor() {
        this.audioContext = new AudioContext();
    }

    private applyEnvelope(
        gainNode: GainNode,
        amplitude: number,
        enveloppe: Enveloppe,
        startTime: number,
    ): void {
        const duration = enveloppe.attack + enveloppe.decay + enveloppe.sustain + enveloppe.sustain
        const attackEnd = startTime + enveloppe.attack
        const decayEnd = attackEnd + enveloppe.decay
        const releaseStart = decayEnd + enveloppe.sustain

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(enveloppe.attack.gain, attackEnd);
        gainNode.gain.linearRampToValueAtTime(amplitude * enveloppe.sustain, decayEnd);
        gainNode.gain.setValueAtTime(amplitude * enveloppe.sustain, releaseStart);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
    }

    generateNote(note: Note): { masterGain: GainNode; oscillators: OscillatorNode[] } {
        const { amplitude, enveloppe, harmonics, oscillatorType = 'sine' } = note;

        const currentTime = this.audioContext.currentTime;
        const masterGain = this.audioContext.createGain();
        const oscillators: OscillatorNode[] = [];

        for (const harmonic of harmonics) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.type = oscillatorType;
            oscillator.frequency.setValueAtTime(harmonic.frequency, currentTime);

            const harmonicAmplitude = amplitude * harmonic.gain;
            this.applyEnvelope(gainNode, harmonicAmplitude, enveloppe, currentTime);

            oscillator.connect(gainNode);
            gainNode.connect(masterGain);
            oscillators.push(oscillator);
        }

        return { masterGain, oscillators };
    }

    playNoteGraph(masterGain: GainNode, oscillators: OscillatorNode[], startTime: number, duration: number): void {
        masterGain.connect(this.audioContext.destination);


        for (const oscillator of oscillators) {
            oscillator.start(startTime);
        }
        for (const oscillator of oscillators) {
            oscillator.stop(startTime + duration);
        }

        // Clean up after playback
        for (const oscillator of oscillators) {
            oscillator.onended = () => {
                oscillator.disconnect();
            };
        }
        masterGain.gain.setValueAtTime(0, startTime + duration);
    }

    playInstant(note: Note) {
        const { masterGain, oscillators}  = this.generateNote(note)
        this.playNoteGraph(masterGain, oscillators, this.audioContext.currentTime, 5000)
    }
}
