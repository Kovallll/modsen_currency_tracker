import { useState } from 'react'
import { createPortal } from 'react-dom'

import { CurrencyModal } from '../CurrencyModal'
import * as styles from './styles.module.scss'

import { currencies } from '@/constants'
import { CurrencyCardData } from '@/types'

export const CurrencyCard = ({ currency }: CurrencyCardData) => {
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal((prev) => !prev)
    }

    const {
        name,
        asset_id,
        data_end,
        data_start,
        data_symbols_count,
        price_usd,
    } = currency

    const description = { price_usd, data_start, data_end }
    return (
        <>
            <div className={styles.container} onClick={handleShowModal}>
                <div className={styles.image}>{currencies[asset_id]}</div>
                <div className={styles.info}>
                    <div className={styles.title}>{name}</div>
                    <div className={styles.subtitle}>{data_symbols_count}</div>
                </div>
            </div>
            {showModal &&
                createPortal(
                    <CurrencyModal
                        onClose={handleShowModal}
                        description={description}
                        asset_id={asset_id}
                    />,
                    document.body
                )}
        </>
    )
}
