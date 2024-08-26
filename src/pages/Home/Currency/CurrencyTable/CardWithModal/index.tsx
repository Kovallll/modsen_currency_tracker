import { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'

import CurrencyCard from '@/pages/Home/Currency/CurrencyCard'
import CurrencyModal from '@/pages/Home/Currency/CurrencyModal'
import { CurrencyAssetsData } from '@/types'

export interface CardWithModal {
    currency: CurrencyAssetsData
}

export const CardWithModal = ({ currency }: CardWithModal) => {
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = useCallback((isShow: boolean) => {
        setShowModal(isShow)
    }, [])

    return (
        <>
            <CurrencyCard
                asset_id={currency.asset_id}
                subtitle={currency.subtitle}
                title={currency.title}
                key={currency.title}
                onClick={handleShowModal}
            />
            {showModal &&
                createPortal(
                    <CurrencyModal
                        onClose={handleShowModal}
                        end={currency.end}
                        priceUsd={currency.priceUsd}
                        start={currency.start}
                        asset_id={currency.asset_id}
                    />,
                    document.body
                )}
        </>
    )
}
