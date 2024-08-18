import { PureComponent } from 'react'
import { createRoot } from 'react-dom/client'
import mapboxgl from 'mapbox-gl'

import * as styles from './styles.module.scss'

import { Marker } from '@/components/Marker'
import bankGeo from '@/constants/banks.json'

mapboxgl.accessToken =
    'pk.eyJ1Ijoia292YWxsbGwiLCJhIjoiY2x6d2Uzc3ZsMGlodzJpcjdrNTRsZmdjNyJ9.tT9Fo2bCLeRGjJWHtNdZpw'

interface MapProps extends React.InputHTMLAttributes<HTMLDivElement> {
    mapContainer: React.RefObject<HTMLDivElement>
    searchValue: string
}
interface MapState {
    initialLng: number
    initialLat: number
    initialZoom: number
    markers: MarkerObject[]
}

interface MarkerObject {
    id: number
    marker: mapboxgl.Marker
}

class Map extends PureComponent<MapProps, MapState> {
    private map: any
    constructor(props: MapProps) {
        super(props)
        this.state = {
            initialLng: 27.655596376281522,
            initialLat: 53.93457241600598,
            initialZoom: 5.2,
            markers: [],
        }
    }

    componentDidMount() {
        const { initialLng, initialLat, initialZoom } = this.state
        const { mapContainer } = this.props

        if (mapContainer.current) {
            this.map = new mapboxgl.Map({
                container: mapContainer.current ?? '',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [initialLng, initialLat],
                zoom: initialZoom,
            })
        }
        this.map.addControl(new mapboxgl.NavigationControl(), 'top-right')

        bankGeo.features.forEach((feature, index) => {
            const markerDiv = document.createElement('div')

            createRoot(markerDiv).render(
                <Marker onClick={this.markerClicked} feature={feature} />
            )

            const marker = new mapboxgl.Marker(markerDiv, {
                anchor: 'bottom',
            })
                .setLngLat(feature.geometry.coordinates)
                .addTo(this.map)

            this.handleUpdateMarkers({ id: index, marker })
        })
    }

    componentDidUpdate() {
        const { markers } = this.state
        const { searchValue } = this.props

        bankGeo.features.forEach((feature, index) => {
            const isSearch = feature.properties.currencies.find((str) =>
                str
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase())
            )

            if (!isSearch) {
                markers.find((item) => item.id === index)?.marker.remove()
            } else {
                markers
                    .find((item) => item.id === index)
                    ?.marker.addTo(this.map)
            }
        })
    }

    componentWillUnmount(): void {
        this.map.remove()
    }

    markerClicked = (title: string) => {
        window.alert(title)
    }

    handleUpdateMarkers = (data: MarkerObject) => {
        this.setState((state) => {
            return {
                markers: [
                    ...state.markers,
                    { id: data.id, marker: data.marker },
                ],
            }
        })
    }
    render() {
        const { mapContainer } = this.props
        return <div ref={mapContainer} className={styles.mapContainer} />
    }
}

export default Map
