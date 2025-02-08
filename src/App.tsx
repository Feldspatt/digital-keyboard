import './App.css'
import {Piano3d} from "./components/piano3d/piano3d.tsx";
import {PerspectiveContext} from "./components/3d/PerspectiveContext/PerspectiveContext.tsx";

function App() {
    return (<>
        {/*<PerspectiveContext/>*/}
        <PerspectiveContext
        >
            <Piano3d/>
        </PerspectiveContext>
        {/*<PianoKeyboard/>*/}
        {/*<Keyboard instrument={Instrument.PIANO}/>*/}
        {/*<Keyboard instrument={Instrument.FLUTE}/>*/}
        {/*<Keyboard instrument={Instrument.VIOLIN}/>*/}
    </>)
}

export default App
