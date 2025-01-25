import './App.css'
import {Instrument} from "./types/Instruments.enum.ts";
import {InstrumentKeyboard} from "./components/InstrumentKeyboard.tsx";


function App() {
    return (<>
        <InstrumentKeyboard instrument={Instrument.PIANO}/>
        {/*<InstrumentKeyboard instrument={Instrument.FLUTE}/>*/}
        {/*<InstrumentKeyboard instrument={Instrument.VIOLIN}/>*/}
    </>)
}

export default App
