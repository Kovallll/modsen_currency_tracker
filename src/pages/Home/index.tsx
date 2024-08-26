import * as styles from './styles.module.scss'

import CurrencyTable from '@/pages/Home/Currency/CurrencyTable'

const HomePage = () => {
    return (
        <main className={styles.container}>
            <CurrencyTable title="Stocks" />
        </main>
    )
}

export default HomePage
