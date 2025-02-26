import './App.css'
import {Piano3d} from "./components/piano3d/piano3d.tsx";
import {PerspectiveContext} from "./components/3d/PerspectiveContext/PerspectiveContext.tsx";
import {SoundRequest} from "./components/SoundRequest/SoundRequest.tsx";

function App() {
    return (<>
        <SoundRequest/>
        <PerspectiveContext>
            <Piano3d/>
        </PerspectiveContext>
    </>)
}

export default App
