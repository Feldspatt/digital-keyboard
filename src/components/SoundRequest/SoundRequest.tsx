import './SoundRequest.css'
import {useEffect, useRef} from "react";

export function SoundRequest() {
    const ref= useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if(ref.current){
            setTimeout(()=> {
                if(ref.current) ref.current.style.transform= 'translate3d(-50%,0,0)'
            },1500)
        }

        const clickHandler = ()=>{
            document.removeEventListener('click', clickHandler)
            if(ref.current){
                ref.current.style.transform= 'translate3d(-50%, 150%,0)'
            }

        }
        document.addEventListener('click', clickHandler)
    }, []);

    return (<button ref={ref} type="button" className={"soundAllower"}>Click anywhere to allow sound</button>)
}