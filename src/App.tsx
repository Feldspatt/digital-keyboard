import './App.css'
import {NOTES} from "./model/NOTES.ts";
import {OscButton} from "./OscButton.tsx";

function App() {
    return (
    <>
    {
        Object.values(NOTES).map(note=> (<OscButton note={note}/>))
    }
    </>
  )
}

export default App
