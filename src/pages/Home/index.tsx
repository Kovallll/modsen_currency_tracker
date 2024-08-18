import { useContext } from 'react'

import * as styles from './styles.module.scss'

import { CurrencyTable } from '@/components/CurrencyTable'
import { AssetsDataContext } from '@/providers/AssetsProvider'

const HomePage = () => {
    const assetsData = useContext(AssetsDataContext)

    return (
        <div className={styles.container}>
            <CurrencyTable currencyData={assetsData} title="Stocks" />
        </div>
    )
}

export default HomePage
