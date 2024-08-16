import { Component, createRef } from 'react'
import { createRoot } from 'react-dom/client'
import mapboxgl from 'mapbox-gl'

import * as styles from './styles.module.scss'

import { Marker } from '@/components/Marker'
import { Search } from '@/components/Seacrh'
import bankGeo from '@/constants/banks.json'

mapboxgl.accessToken =
    'pk.eyJ1Ijoia292YWxsbGwiLCJhIjoiY2x6d2Uzc3ZsMGlodzJpcjdrNTRsZmdjNyJ9.tT9Fo2bCLeRGjJWHtNdZpw'
interface BankCardPageState {
    searchValue: string
    initialLng: number
    initialLat: number
    initialZoom: number
    markers: MarkerObject[]
}

interface MarkerObject {
    id: number
    marker: mapboxgl.Marker
}

type BankCardPageProps = object
class BankCardPage extends Component<BankCardPageProps, BankCardPageState> {
    private mapContainer: React.RefObject<HTMLDivElement>
    private map: any

    constructor(props: BankCardPageProps) {
        super(props)
        this.state = {
            searchValue: '',
            initialLng: 27.655596376281522,
            initialLat: 53.93457241600598,
            initialZoom: 11,
            markers: [],
        }
        this.mapContainer = createRef()
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

    componentDidMount() {
        const { initialLng, initialLat, initialZoom } = this.state
        if (this.mapContainer.current) {
            this.map = new mapboxgl.Map({
                container: this.mapContainer.current ?? '',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [initialLng, initialLat],
                zoom: initialZoom,
            })
        }
        this.map.addControl(new mapboxgl.NavigationControl(), 'top-right')

        bankGeo.features.forEach((feature, index) => {
            const markerDiv = document.createElement('div')
            console.log(index)
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
        bankGeo.features.forEach((feature, index) => {
            const isSearch = feature.properties.currencies.find((str) =>
                str
                    .toLocaleLowerCase()
                    .includes(this.state.searchValue.toLocaleLowerCase())
            )

            if (!isSearch) {
                this.state.markers
                    .find((item) => item.id === index)
                    ?.marker.remove()
            } else {
                this.state.markers
                    .find((item) => item.id === index)
                    ?.marker.addTo(this.map)
            }
        })
    }

    componentWillUnmount(): void {
        this.map.remove()
    }

    handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchValue: e.target.value })
    }

    render() {
        const { searchValue } = this.state
        return (
            <div className={styles.container}>
                <div className={styles.search}>
                    <Search
                        text="Search currency in the bank"
                        value={searchValue}
                        handleChange={this.handleChangeSearchValue}
                    />
                </div>
                <div ref={this.mapContainer} className={styles.mapContainer} />
            </div>
        )
    }
}

export default BankCardPage
