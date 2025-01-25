type Harmonic = { frequency: number; gain: number };

function generateHarmonics(frequency: number, gains: number[]): Harmonic[] {
    return gains.map((gain, index) => ({
        frequency: frequency * (index + 1),
        gain
    }));
}

function createNote(
    frequency: number,
    enveloppe: Enveloppe,
    harmonicGains: number[],
    oscillatorType: OscillatorType = 'sine', // Default to 'sine'
    amplitude= 0.5,
    duration = 1
): Note {
    return {
        frequency,
        amplitude,
        duration,
        enveloppe,
        harmonics: generateHarmonics(frequency, harmonicGains),
        oscillatorType
    };
}


export function getSaxo(frequency: number): Note {
    return createNote(
        frequency,
        { attack: 0.05, decay: 0.1, sustain: 0.6, release: 0.2 },
        [1.0, 0.4, 0.3, 0.2, 0.1],
        'square', // Saxo sound characteristic
        0.5,
        1,
    );
}

export function getPiano(frequency: number): Note {
    return createNote(
        frequency,
        { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.1 },
        [1.0, 0.5, 0.25, 0.125],
        'triangle', // Piano sound characteristic
        0.5,
        0.5,
    );
}

export function getBass(frequency: number): Note {
    return createNote(
        frequency,
        { attack: 0.01, decay: 0.1, sustain: 0.7, release: 0.1 },
        [1.0, 0.7, 0.4],
        'sawtooth', // Bass sound characteristic
        0.6,
        1,
    );
}
