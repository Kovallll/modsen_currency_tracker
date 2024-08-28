import { PureComponent } from 'react'
import { createRoot } from 'react-dom/client'
import mapboxgl from 'mapbox-gl'

import * as styles from './styles.module.scss'

import { initialLat, initialLng, initialZoom, mapStyle } from '@/constants'
import bankGeo from '@/constants/banks.json'
import { Marker } from '@/pages/BankCard/Map/Marker'
import { MapProps, MapState, MarkerObject } from '@/types'

mapboxgl.accessToken =
    'pk.eyJ1Ijoia292YWxsbGwiLCJhIjoiY2x6d2Uzc3ZsMGlodzJpcjdrNTRsZmdjNyJ9.tT9Fo2bCLeRGjJWHtNdZpw'

class Map extends PureComponent<MapProps, MapState> {
    private map: any
    constructor(props: MapProps) {
        super(props)
        this.state = {
            markers: [],
        }
    }

    componentDidMount() {
        const { mapContainer } = this.props

        if (mapContainer.current) {
            this.map = new mapboxgl.Map({
                container: mapContainer.current ?? '',
                style: mapStyle,
                center: [initialLng, initialLat],
                zoom: initialZoom,
            })
        }
        this.map.addControl(new mapboxgl.NavigationControl(), 'top-right')

        bankGeo.features.forEach((feature, index) => {
            const markerDiv = document.createElement('div')

            createRoot(markerDiv).render(<Marker feature={feature} />)

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
