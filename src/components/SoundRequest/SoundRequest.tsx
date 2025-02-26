import './SoundRequest.css'
import * as React from "react";

export function SoundRequest() {
    const [soundAllowed, setSoundAllowed] = React.useState(false);

    return (<>{!soundAllowed ? (<button type="button" onClick={()=>setSoundAllowed(true)} className={"soundAllower"}>Click anywhere to allow sound</button>):''}</>)
}