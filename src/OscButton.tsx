import {useState} from "react";
import {Sound} from "./model/Sound.ts";

export function OscButton({note, value}: {note: string, value: number}) {
    const [sound] = useState(new Sound(value));
    const [active, setActive] = useState(false);

    const handleMouseEnter = () => {
        toggle()
    }

    const handleMouseLeave = () => {
        toggle()
    }

    const toggle = ()=>{
        sound.toggle()
        setActive(!!sound.currentOscillator)
    }

    return <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={active ? 'active-class' : 'inactive-class'}
        onClick={()=> toggle()}>{note}
    </button>
}