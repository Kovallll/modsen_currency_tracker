import { useEffect, useState } from 'react'

import * as styles from './styles.module.scss'

import { getAllAssets } from '@/api'
import { CurrencyTable } from '@/components/CurrencyTable'
import { defaultAllAssets } from '@/constants'
import { CurrencyAssetsData } from '@/types'

const HomePage = () => {
    const [data, setData] = useState<CurrencyAssetsData[]>(defaultAllAssets)

    useEffect(() => {
        const getData = async () => {
            const data = await getAllAssets()
            setData(data)
        }
        getData()
    }, [])
    return (
        <div className={styles.container}>
            <CurrencyTable currencyData={data} title="Stocks" />
        </div>
    )
}

export default HomePage
