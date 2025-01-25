import './App.css'
import {buildPianoNote, playNote} from "./model/NotePlayer.ts";

const note = buildPianoNote(440)

function App() {
    return (<>
        <button onClick={()=> playNote(note)}>0</button>

    </>)
}

export default App
