import { lazy, Suspense, useState } from 'react'
import { createPortal } from 'react-dom'

import { CurrencyModalLoader } from '../CurrencyModal/Loader'
import * as styles from './styles.module.scss'

import { currencies } from '@/constants'
import { CurrencyCardData } from '@/types'

const CurrencyModal = lazy(() => import('../CurrencyModal'))

const CurrencyCard = ({ currency, ...props }: CurrencyCardData) => {
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal((prev) => !prev)
    }

    const { title, asset_id, end, start, subtitle, priceUsd } = currency

    const description = { priceUsd, start, end }
    return (
        <>
            <div
                {...props}
                className={styles.container}
                onClick={handleShowModal}
                data-cy="card"
            >
                <div className={styles.image}>{currencies[asset_id]}</div>
                <div className={styles.info}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.subtitle}>{subtitle}</div>
                </div>
            </div>
            {showModal &&
                createPortal(
                    <Suspense fallback={<CurrencyModalLoader />}>
                        <CurrencyModal
                            onClose={handleShowModal}
                            description={description}
                            asset_id={asset_id}
                        />
                    </Suspense>,
                    document.body
                )}
        </>
    )
}

export default CurrencyCard
