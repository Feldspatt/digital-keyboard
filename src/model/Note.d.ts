type Note = {
    frequency: number
    amplitude: number
    enveloppe: Enveloppe
    oscillatorType: OscillatorType
    harmonics: { frequency: number, gain: number }[]
}

type Enveloppe = {
    attack: number,
    decay: number,
    sustain: number,
    release: number,
}