const audioContext = new AudioContext()
const compressor = audioContext.createDynamicsCompressor();
compressor.connect(audioContext.destination);

// Configure the compressor settings
compressor.threshold.setValueAtTime(-24, audioContext.currentTime); // Threshold in dB
compressor.knee.setValueAtTime(30, audioContext.currentTime);       // Smooth compression curve
compressor.ratio.setValueAtTime(12, audioContext.currentTime);      // Compression ratio
compressor.attack.setValueAtTime(0.003, audioContext.currentTime);  // Attack time in seconds
compressor.release.setValueAtTime(0.25, audioContext.currentTime);

export function buildViolinNote(frequency: number): Note {
    return {
        frequency,
        amplitude: 0.5,
        duration: 1,
        oscillatorType: 'sawtooth',
        harmonics: [
            { frequency: frequency * 2, gain: 0.3 },
            { frequency: frequency * 3, gain: 0.2 },
            { frequency: frequency * 4, gain: 0.1 }
        ],
        filter: {
            type: 'bandpass',
            frequency: frequency * 2,
            Q: 5  // High resonance for more texture
        },
        envelope: {
            attack: { duration: 0.1, gain: 1 },    // Quick, intense start
            decay: { duration: 0.2, gain: 0.8 },   // Slight taper
            sustain: { duration: 0.5, gain: 0.6 }, // Slightly unstable sustain
            release: { duration: 0.2, gain: 0 }    // Gradual fade-out
        }
    };
}

export function buildDrumHihatNote(frequency = 7250): Note{
    return {
        frequency: frequency || 1000,
        amplitude: 0.3,
        duration: 0.05,
        oscillatorType: 'triangle',
        harmonics: [
            { frequency: 2000, gain: 0.2 },
            { frequency: 3000, gain: 0.1 }
        ],
        envelope: {
            attack: { duration: 0.01, gain: 1 },
            decay: { duration: 0.04, gain: 0 },
            sustain: { duration: 0, gain: 0 },
            release: { duration: 0.01, gain: 0 }
        },
        filter: {
            type: 'highpass',
            frequency: 5000
        }
    }
}

export function buildFluteNote(frequency: number): Note {
    return {
        frequency,
        amplitude: 0.4,
        duration: 1,
        oscillatorType: 'sine',
        envelope: {
            attack: { duration: 0.05, gain: 1 },
            decay: { duration: 0.1, gain: 0.9 },
            sustain: { duration: 0.7, gain: 0.7 },
            release: { duration: 0.15, gain: 0 }
        },
        harmonics: [
            { frequency: frequency * 2, gain: 0.1 },
            { frequency: frequency * 3, gain: 0.05 }
        ],
        filter: {
            type: 'lowpass',
            frequency: frequency * 2
        }
    };
}

export function buildDrumKickNote(frequency = 235): Note {
    return {
        frequency: frequency || 80,
        amplitude: 0.7,
        duration: 0.2,
        oscillatorType: 'sine',
        harmonics: [
            { frequency: 40, gain: 0.3 },
            { frequency: 120, gain: 0.1 }
        ],
        envelope: {
            attack: { duration: 0.01, gain: 1 },
            decay: { duration: 0.15, gain: 0 },
            sustain: { duration: 0, gain: 0 },
            release: { duration: 0.05, gain: 0 }
        },
        filter: {
            type: 'lowpass',
            frequency: 200
        }
    }
}

export function buildDrumSnareNote(frequency= 220): Note {
    return {
            frequency: frequency || 200,
            amplitude: 0.5,
            duration: 0.1,
            oscillatorType: 'sawtooth',
            harmonics: [
                { frequency: 100, gain: 0.2 },
                { frequency: 300, gain: 0.1 }
            ],
            envelope: {
                attack: { duration: 0.01, gain: 1 },
                decay: { duration: 0.08, gain: 0 },
                sustain: { duration: 0, gain: 0 },
                release: { duration: 0.05, gain: 0 }
            },
            filter: {
                type: 'bandpass',
                frequency: 1000
            }
        }
}

export function buildPianoNote(frequency: number): Note {
    return {
        frequency,
        amplitude: 0.5,
        duration: 0.5,
        oscillatorType: 'sine',
        envelope: {
            attack: { duration: 0.01, gain: 1 },
            decay: { duration: 0.1, gain: 0.7 },
            sustain: { duration: 0.3, gain: 0.5 },
            release: { duration: 0.1, gain: 0 }
        },
        harmonics: [
            { frequency: frequency * 2, gain: 0.2 },
            { frequency: frequency * 3, gain: 0.1 }
        ],
        filter: {
            type: 'lowpass',
            frequency: 2000
        }
    };
}

export function playNote(note: Note, destination?: AudioNode) {

    // Create oscillator
    const oscillator = audioContext.createOscillator();
    oscillator.type = note.oscillatorType;
    oscillator.frequency.setValueAtTime(note.frequency, audioContext.currentTime);

    // Create gain node for main amplitude and envelope
    const mainGain = audioContext.createGain();
    mainGain.gain.setValueAtTime(note.amplitude, audioContext.currentTime);


    // Apply envelope
    const now = audioContext.currentTime;
    mainGain.gain.setValueAtTime(0, now);
    mainGain.gain.linearRampToValueAtTime(
        note.envelope.attack.gain * note.amplitude,
        now + note.envelope.attack.duration
    );
    mainGain.gain.linearRampToValueAtTime(
        note.envelope.decay.gain * note.amplitude,
        now + note.envelope.attack.duration + note.envelope.decay.duration
    );
    mainGain.gain.setValueAtTime(
        note.envelope.sustain.gain * note.amplitude,
        now + note.envelope.attack.duration + note.envelope.decay.duration
    );
    mainGain.gain.linearRampToValueAtTime(
        0,
        now + note.duration
    );

    // Handle harmonics
    const harmonicOscillators = note.harmonics.map(harmonic => {
        const harmonicOsc = audioContext.createOscillator();
        const harmonicGain = audioContext.createGain();

        harmonicOsc.type = oscillator.type;
        harmonicOsc.frequency.setValueAtTime(harmonic.frequency, audioContext.currentTime);
        harmonicGain.gain.setValueAtTime(harmonic.gain, audioContext.currentTime);

        harmonicOsc.connect(harmonicGain);
        harmonicGain.connect(mainGain);

        return harmonicOsc;
    });

    // Apply filter if specified
    let filterNode: BiquadFilterNode | undefined;
    if (note.filter) {
        filterNode = audioContext.createBiquadFilter();
        filterNode.type = note.filter.type;
        filterNode.frequency.setValueAtTime(note.filter.frequency, audioContext.currentTime);
        if (note.filter.Q !== undefined) {
            filterNode.Q.setValueAtTime(note.filter.Q, audioContext.currentTime);
        }
        if (note.filter.gain !== undefined) {
            filterNode.gain.setValueAtTime(note.filter.gain, audioContext.currentTime);
        }
    }

    // Setup effects chain
    let lastNode: AudioNode = mainGain;

    // Add filter if exists
    if (filterNode) {
        mainGain.connect(filterNode);
        lastNode = filterNode;
    }

    // Add delay effect
    if (note.effects?.delay) {
        const delayNode = audioContext.createDelay();
        const delayGain = audioContext.createGain();

        delayNode.delayTime.setValueAtTime(note.effects.delay.delayTime, audioContext.currentTime);
        delayGain.gain.setValueAtTime(note.effects.delay.feedback, audioContext.currentTime);

        lastNode.connect(delayNode);
        delayNode.connect(delayGain);
        delayGain.connect(delayNode);
        lastNode = delayNode;
    }

    // Connect to destination
    const finalDestination = destination || compressor;
    lastNode.connect(finalDestination);

    // Start oscillators
    oscillator.connect(mainGain);
    oscillator.start(now);
    for (const h of harmonicOscillators) {
        h.start(now);
    }

    // Stop oscillators
    oscillator.stop(now + note.duration);
    for (const h of harmonicOscillators) {
        h.stop(now + note.duration);
    }
}