import {Instrument} from "./types/Instruments.enum.ts";
import {buildFluteNote, buildPianoNote, buildViolinNote} from "./types/NotePlayer.ts";

export const synth = {
    [Instrument.VIOLIN]: buildViolinNote,
    [Instrument.PIANO]: buildPianoNote,
    [Instrument.FLUTE]: buildFluteNote,
}

export function getFactory(instrument: Instrument): (frequency:number)=>Note {
    switch (instrument) {
        case Instrument.PIANO:
            return buildPianoNote
        case Instrument.FLUTE:
            return buildFluteNote
        case Instrument.VIOLIN:
            return buildViolinNote
        default:
            throw new Error('instrument note factory not implemented')
    }
}