import React, { useEffect, useState } from 'react'

import { SelectCurrency } from '../SelectCurrency'
import * as styles from './styles.module.scss'

import { getAssetRate } from '@/api'
import CloseIcon from '@/assets/icons/close.svg'
import { Currencies, defaultRate } from '@/constants'
import { CurrencyRateData, DescriptionData } from '@/types'

interface CurrencyModalProps {
    onClose: () => void
    description: DescriptionData
    asset_id: Currencies
}

export const CurrencyModal = ({
    onClose,
    description,
    asset_id,
}: CurrencyModalProps) => {
    const [rateData, setRateData] = useState<CurrencyRateData>(defaultRate)
    const { asset_id_base, rates } = rateData
    useEffect(() => {
        const getData = async () => {
            const data = await getAssetRate(asset_id)
            setRateData(data)
        }
        getData()
    }, [asset_id])

    const { price_usd, data_start, data_end } = description
    return (
        <div className={styles.container}>
            <div className={styles.window}>
                <button className={styles.close} onClick={onClose}>
                    <CloseIcon />
                </button>
                <div className={styles.content}>
                    <div className={styles.title}>Convert {asset_id_base}</div>
                    <div className={styles.description}>
                        <p>price_usd: {price_usd.toFixed(7)}</p>
                        <p>data_start: {data_start}</p>
                        <p>data_end: {data_end}</p>
                    </div>
                    <div className={styles.currencies}>
                        <SelectCurrency>
                            {rates.map(({ rate, asset_id_quote }) => (
                                <option key={asset_id_quote}>
                                    <p>
                                        {`${asset_id_quote}: ${rate.toFixed(4)}`}
                                    </p>
                                </option>
                            ))}
                        </SelectCurrency>
                    </div>
                </div>
            </div>
        </div>
    )
}
