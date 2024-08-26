import { Component, createRef, lazy, Suspense } from 'react'

import * as styles from './styles.module.scss'

import { Search } from '@/components/Seacrh'
import { Currencies } from '@/constants'
import { MapLoader } from '@/pages/BankCard/Map/Map/Loader'
import { BankCardPageProps, BankCardPageState } from '@/types'

const Map = lazy(() => import('./Map/Map'))

class BankCardPage extends Component<BankCardPageProps, BankCardPageState> {
    private mapContainer: React.RefObject<HTMLDivElement>

    constructor(props: BankCardPageProps) {
        super(props)
        this.state = {
            searchValue: '',
        }
        this.mapContainer = createRef()
    }

    handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchValue: e.target.value })
    }

    handleChangePopupValue = (value: Currencies) => {
        this.setState({ searchValue: value })
    }

    render() {
        const { searchValue } = this.state

        return (
            <main className={styles.container}>
                <Search
                    text="Search currency in the bank"
                    searchValue={searchValue}
                    handleChange={this.handleChangeSearchValue}
                    handleChangePopupValue={this.handleChangePopupValue}
                    className={styles.search}
                />
                <Suspense fallback={<MapLoader />}>
                    <Map
                        searchValue={searchValue}
                        mapContainer={this.mapContainer}
                    />
                </Suspense>
            </main>
        )
    }
}

export default BankCardPage
