import './App.css'
import {CustomNoteInput} from "./components/CustomNoteInput.tsx";
import {NotePlayer} from "./model/NotePlayer.ts";
import {getBass, getPiano, getSaxo} from "./note-builder.ts";
import {NOTES} from "./model/NOTES.ts";

const notePlayer = new NotePlayer()

function App() {
    return (<>
        <CustomNoteInput note={getPiano(440)} notePlayer={notePlayer}/>
        <CustomNoteInput note={getSaxo(440)} notePlayer={notePlayer}/>
        <CustomNoteInput note={getBass(NOTES.C2)} notePlayer={notePlayer}/>

    </>)
}

export default App
