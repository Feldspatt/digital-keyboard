import {playNote} from "../../types/NotePlayer.ts";
import {getFactory} from "../../synth.ts";
import pianoNotes from "../../types/PianoNotes.ts";
import {Instrument} from "../../types/Instruments.enum.ts";
import './PianoKeyboard.css'

export function PianoKeyboard() {
        return (<div>
            <h3>Piano</h3>
            <div className="piano">
                { Object.entries(pianoNotes).map(([key, value]) => {
                    if(value.color === "white"){
                        return (<button type="button" className="white-key" key={`piano_${value.name}`} onMouseEnter={()=> playNote(getFactory(Instrument.PIANO)(value.frequency))}>{key}</button>)

                    }
                    return (<div className="black-placeholder" key={`piano_${value.name}`}>
                        <button
                            type="button"
                            className="black-key"
                            onMouseEnter={()=> playNote(getFactory(Instrument.PIANO)(value.frequency))}>
                        </button>
                    </div>)

                })}
            </div>
        </div>)
}