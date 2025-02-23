import './App.css'
import {Piano3d} from "./components/piano3d/piano3d.tsx";
import {PerspectiveContext} from "./components/3d/PerspectiveContext/PerspectiveContext.tsx";
import {Radio} from "./components/Radio/Radio.tsx";

function App() {
    return (<>
        <Radio/>
        <PerspectiveContext>
            <Piano3d/>
        </PerspectiveContext>
    </>)
}

export default App
