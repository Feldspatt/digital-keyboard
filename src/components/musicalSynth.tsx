import {NOTES} from "../model/NOTES.ts";
import {OscButton} from "../OscButton.tsx";

export function musicalSynth() {
    return (<>{ Object.entries(NOTES).map(([note, value])=> (<OscButton key={note} note={note} value={value}/>))}</>)

}