import './App.css'
import {Instrument} from "./types/Instruments.enum.ts";
import {Keyboard} from "./components/keyboard/keyboard.tsx";


function App() {
    return (<>
        <Keyboard instrument={Instrument.PIANO}/>
        <Keyboard instrument={Instrument.FLUTE}/>
        <Keyboard instrument={Instrument.VIOLIN}/>
    </>)
}

export default App
