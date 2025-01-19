import {useState} from "react";
import {Sound} from "./model/Sound.ts";

export function OscButton({note}: {note: number}){
    const [sound] = useState(new Sound(note));
    const [active, setActive] = useState(false);

    const toggle = ()=>{
        sound.toggle()
        setActive(!!sound.currentOscillator);
    }

    return (<button className={active ? 'active-class' : 'inactive-class'} onClick={()=> toggle()}>{note}</button>)
}