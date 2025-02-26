import './Radio.css'
import {useEffect, useRef, useState} from "react";
import type {RadioStation} from "../../types/RadioStations.ts";
import {radioStations} from "../../types/RadioStations.ts";
import Cuboid from "../3d/Cuboid/Cuboid.tsx";


export type RadioProps = {
    stations?: RadioStation[]
}

export function Radio({ stations= radioStations }: RadioProps) {
    const audioRef= useRef<HTMLAudioElement>(null)
    const [frequency, setFrequency] = useState(2)
    const [shouldPlay, setShouldPlay] = useState(false)

    useEffect(() => {
        if(!audioRef.current) return

        if(!shouldPlay) audioRef.current.pause()
        else {
            audioRef.current.pause()
            const station = stations[Math.min(Math.round(frequency), stations.length - 1)]
            audioRef.current.src = station.url
            audioRef.current.play().then()
        }
    }, [frequency, stations, shouldPlay])

    return (<div className={"radio"}>
        {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
        <audio ref={audioRef} />
        <Cuboid/>
        <input
            type={'range'}
            value={frequency}
            max={stations.length-1}
            step={0.01} min={0}
            onChange={(event)=> setFrequency(event.target.value as unknown as number)}
        />
        <input
            type={'checkbox'}
            onChange={(event)=> setShouldPlay(event.target.checked)}
        />
    </div>)
}