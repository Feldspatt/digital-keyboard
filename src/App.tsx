import './App.css'
import {NOTES} from "./model/NOTES.ts";
import {OscButton} from "./OscButton.tsx";

function App() {
    return (
    <>{ Object.entries(NOTES).map(([note, value])=> (<OscButton note={note} value={value}/>))}</>
  )
}

export default App
