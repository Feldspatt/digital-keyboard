import {playNote} from "../../types/NotePlayer.ts";
import {getFactory} from "../../synth.ts";
import pianoNotes from "../../types/PianoNotes.ts";
import {Instrument} from "../../types/Instruments.enum.ts";
import './piano3d.css'
import Key from "../key_perspective/Key.tsx";

export function Piano3d() {
    return (<div>
        <h3>Piano</h3>
        <div
            className="wrapper"
        ><div className={"piano"}>
            { Object.entries(pianoNotes).map(([key, value]) => {
                if(value.color === "white"){
                    return (<Key key={key} color={value.color} onMouseEnter={()=> playNote(getFactory(Instrument.PIANO)(value.frequency))}/>)

                }
                return (<div className="black-placeholder" key={`piano_${value.name}`}>
                    <Key key={key} color={value.color} onMouseEnter={()=> playNote(getFactory(Instrument.PIANO)(value.frequency))}/>
                </div>)

            })}
        </div></div>
    </div>)
}