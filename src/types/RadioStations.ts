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
        name: 'Classic Vinyl',
        url: 'https://icecast.walmradio.com:8443/classic_opus'
    },
]

export type RadioStation = {
    name: string
    url: string
}