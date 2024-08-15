import * as styles from './styles.module.scss'

import { CurrencyTable } from '@/containers/CurrencyTable'

const HomePage = () => {
    const data = JSON.parse(
        localStorage.getItem('assetsData') ?? JSON.stringify([])
    )
    return (
        <div className={styles.container}>
            <CurrencyTable currencyData={data} title="Stocks" />
        </div>
    )
}

export default HomePage
