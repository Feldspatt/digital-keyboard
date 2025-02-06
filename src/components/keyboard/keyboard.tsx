import type {Instrument} from "../../types/Instruments.enum.ts";
import {NOTES} from "../../types/NOTES.ts";
import {playNote} from "../../types/NotePlayer.ts";
import {getFactory} from "../../synth.ts";
import './keyboard.css'

type InstrumentKeyboardProps = {
    instrument: Instrument
}

export function Keyboard({ instrument }: InstrumentKeyboardProps) {
    return (<div>
        <h3>{instrument}</h3>
        <div className="keyboard">
        { Object.entries(NOTES).map(([key, value]) => {
            return (<button type="button" className="white-note" key={`${instrument}_${key}`} onMouseEnter={()=> playNote(getFactory(instrument)(value))}>{key}</button>)
        })}
        </div>
            </div>)
}