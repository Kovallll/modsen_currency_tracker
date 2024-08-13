import { CurrencyCard } from '../CurrencyCard'
import * as styles from './styles.module.scss'

import { CurrencyAssetsData } from '@/types'

interface CurrencyTableProps {
    title: string
    currencyData: CurrencyAssetsData[]
}

export const CurrencyTable = ({ title, currencyData }: CurrencyTableProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.cardsBlock}>
                {currencyData?.map((currency) => (
                    <CurrencyCard currency={currency} key={currency.name} />
                ))}
            </div>
        </div>
    )
}
