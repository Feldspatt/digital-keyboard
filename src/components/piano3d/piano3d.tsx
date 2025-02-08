import './piano3d.css'
import Cuboid from "../3d/Cuboid/Cuboid.tsx";
import type {PianoNote} from "../../types/PianoNotes.ts";
import pianoNotes from "../../types/PianoNotes.ts";
import {getFactory, synth} from "../../synth.ts";
import {Instrument} from "../../types/Instruments.enum.ts";
import {playNote} from "../../types/NotePlayer.ts";

export function Piano3d() {
    const map = getMap(pianoNotes)

    return (<>
        <div className={"piano"}>
            { Object.entries(pianoNotes).filter(([_,note]) => note.color === "white").map(([key, value]) => {
                const blackNote = map.get(value)
                return (<div className={"wrapper"} key={key}>
                    <Cuboid onMouseEnter={()=>playNote(getFactory(Instrument.PIANO)(value.frequency))} className={"key white"} width={30} height={15} depth={200}/>
                    {blackNote && <span className={"black-wrapper"}>
                        <Cuboid onMouseEnter={()=>playNote(getFactory(Instrument.PIANO)(blackNote.frequency))} className={"key black"} width={15} height={15} depth={100}/>
                    </span>}
                </div>)})}
        </div>
        </>)
}

function getMap(notes: PianoNote[]) {
    const map = new Map<PianoNote, PianoNote>()

    let lastWhiteNote: PianoNote | null = null
    for(const note of notes) {
        if(note.color === 'white'){
            lastWhiteNote = note
        } else if(note.color === 'black'){
            if(lastWhiteNote){
                map.set(lastWhiteNote, note)
            }
        }
    }

    return map
}