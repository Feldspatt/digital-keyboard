import './Radio.css'
import Cuboid from "../3d/Cuboid/Cuboid.tsx";
import type {RadioStation} from "../../types/RadioStations.ts";
import {radioStations} from "../../types/RadioStations.ts";
import {useEffect, useRef, useState} from "react";


export type RadioProps = {
    stations?: RadioStation[]
}

export function Radio({ stations= radioStations }: RadioProps) {
    const [activeStation, setActiveStation] = useState<RadioStation>(radioStations[0])
    const audioRef= useRef<HTMLAudioElement>(null)

    async function playStream(station: RadioStation) {
        console.log('audio url:', station.url)
        if(audioRef.current){
            audioRef.current.src=station.url
            await audioRef.current.play()
        } else throw new Error(`${station.name} is not a valid audio.`)
    }

    const onPlayButtonPressed = (value: boolean)=>{
        if(value && audioRef.current){
            audioRef.current?.play().then()
        } else {
            audioRef.current?.pause()
        }
    }

    const onStationChanged = (index: number) => {
        if(audioRef.current){
            audioRef.current.pause()
            const station = stations[Math.min(index, stations.length - 1)]
            audioRef.current.src = station.url
            audioRef.current.play().then()
        }
    }

    return (<div className={"radio"}>
        {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
        <audio ref={audioRef} />
        <Cuboid/>
        <input type={'range'} max={stations.length-1} min={0} onChange={(event)=> onStationChanged(event.target.value as unknown as number)}/>
        <input type={'checkbox'} onChange={(event)=> onPlayButtonPressed(event.target.checked)}/>
    </div>)
}