import { memo, useContext } from 'react'

import { CurrencyCardLoader } from '../CurrencyCard/Loader'
import { CardWithModal } from './CardWithModal'
import * as styles from './styles.module.scss'

import { AssetsDataContext } from '@/providers/AssetsProvider'
import { CurrencyTableProps } from '@/types'

const CurrencyTable = ({ title, ...props }: CurrencyTableProps) => {
    const context = useContext(AssetsDataContext)
    return (
        <div {...props} className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.cardsBlock}>
                {!context.loading ? (
                    context.assetsData?.map((currency) => (
                        <CardWithModal
                            key={currency.asset_id}
                            currency={currency}
                        />
                    ))
                ) : (
                    <CurrencyCardLoader />
                )}
                {context.error && <p>Ups, Some Error</p>}
            </div>
        </div>
    )
}

export default memo(CurrencyTable)
