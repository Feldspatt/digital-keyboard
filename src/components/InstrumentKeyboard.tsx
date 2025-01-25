import type {Instrument} from "../types/Instruments.enum.ts";
import {NOTES} from "../types/NOTES.ts";
import {playNote} from "../types/NotePlayer.ts";
import { synth} from "../synth.ts";

type InstrumentKeyboardProps = {
    instrument: Instrument
}

export function InstrumentKeyboard({ instrument }: InstrumentKeyboardProps) {
    return (<>
        { Object.entries(NOTES).map(([key, value]) => {
            return (<button key={`${instrument}_${key}`} onMouseEnter={()=> playNote(synth[instrument]?.(value))}>{key}</button>)
        })}
            </>)
}