import { useEffect, useState } from 'react'

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

const CurrencyModal = ({
    onClose,
    description,
    asset_id,
    ...props
}: CurrencyModalProps) => {
    const [rateData, setRateData] = useState<CurrencyRateData>(defaultRate)

    useEffect(() => {
        const getData = async () => {
            const data = await getAssetRate(asset_id)
            setRateData(data)
        }
        getData()
    }, [asset_id])

    const { asset_id_base, rates } = rateData
    const { priceUsd, start, end } = description
    return (
        <div {...props} className={styles.container}>
            <div className={styles.window} data-cy="modal">
                <button className={styles.close} onClick={onClose}>
                    <CloseIcon />
                </button>
                <div className={styles.content}>
                    <div className={styles.title}>Convert {asset_id_base}</div>
                    <div className={styles.description}>
                        <p>price usd: {priceUsd.toFixed(7)}</p>
                        <p>start: {start}</p>
                        <p>end: {end}</p>
                    </div>
                    <div className={styles.currencies}>
                        <SelectCurrency>
                            {rates.map(({ rate, asset_id_quote }) => (
                                <option key={asset_id_quote}>
                                    {`${asset_id_quote}: ${rate.toFixed(4)}`}
                                </option>
                            ))}
                        </SelectCurrency>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrencyModal
