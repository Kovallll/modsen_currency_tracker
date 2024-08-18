import { lazy, Suspense } from 'react'

import * as styles from './styles.module.scss'

import { CurrencyCardLoader } from '@/components/CurrencyCard/Loader'
import { CurrencyAssetsData } from '@/types'

const CurrencyCard = lazy(() => import('@/components/CurrencyCard'))
interface CurrencyTableProps {
    title: string
    currencyData: CurrencyAssetsData[]
}

export const CurrencyTable = ({
    title,
    currencyData,
    ...props
}: CurrencyTableProps) => {
    return (
        <div {...props} className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.cardsBlock}>
                {currencyData?.map((currency) => (
                    <Suspense
                        key={currency.asset_id}
                        fallback={<CurrencyCardLoader />}
                    >
                        <CurrencyCard
                            currency={currency}
                            key={currency.title}
                        />
                    </Suspense>
                ))}
            </div>
        </div>
    )
}
