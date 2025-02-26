export const radioStations: RadioStation[] = [
    {
        name: 'Adroit Jazz Underground',
        url: 'https://icecast.walmradio.com:8443/jazz'
    },
    {
        name: 'Old Time Radio',
        url: 'https://icecast.walmradio.com:8443/otr'
    },
    {
        name: 'Synthetic FM - Italo Disco New Generation',
        url: 'http://stream.syntheticfm.com:8030/stream'
    },
    {
        name: 'Classic Vinyl',
        url: 'https://icecast.walmradio.com:8443/classic_opus'
    },
    {
        name: 'WALM 2 HD Opus',
        url: 'https://icecast.walmradio.com:8443/walm2_opus',
    }
]

export type RadioStation = {
    name: string
    url: string
}