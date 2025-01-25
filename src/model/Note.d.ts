type Note = {
    frequency: number
    amplitude: number
    duration: number  // Total note duration
    envelope: Envelope
    oscillatorType: OscillatorType
    harmonics: Harmonic[]
    filter?: {
        type: BiquadFilterType
        frequency: number
        Q?: number
        gain?: number
    }
    effects?: {
        delay?: {
            delayTime: number
            feedback: number
        }
        reverb?: {
            decay: number
            preDelay: number
        }
    }
}

type Harmonic = {
    frequency: number
    gain: number
}

type Envelope = {
    attack: {
        duration: number
        gain: number
    }
    decay: {
        duration: number
        gain: number
    }
    sustain: {
        duration: number
        gain: number
    }
    release: {
        duration: number
        gain: number
    }
}