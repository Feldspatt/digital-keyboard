import {Instrument} from "./types/Instruments.enum.ts";
import {buildFluteNote, buildPianoNote, buildViolinNote} from "./types/NotePlayer.ts";

export const synth = {
    [Instrument.VIOLIN]: buildViolinNote,
    [Instrument.PIANO]: buildPianoNote,
    [Instrument.FLUTE]: buildFluteNote,


}