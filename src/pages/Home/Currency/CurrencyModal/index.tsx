import { memo, useEffect, useRef, useState } from 'react'

import { SelectCurrency } from '../SelectCurrency'
import { Convert } from './Convert'
import { Description } from './Description'
import { ErrorModal } from './ErrorModal'
import { CurrencyModalLoader } from './Loader'
import * as styles from './styles.module.scss'

import { getAssetRate } from '@/api'
import CloseIcon from '@/assets/icons/close.svg'
import { Currencies, defaultRate, toFixedNumbers } from '@/constants'
import { useClickOutside } from '@/hooks/use-click-outside'
import useFetch from '@/hooks/use-fetch'
import { CurrencyModalProps, CurrencyRateData } from '@/types'

const CurrencyModal = ({
    onClose,
    priceUsd,
    start,
    end,
    asset_id,
    ...props
}: CurrencyModalProps) => {
    const [rateData, setRateData] = useState<CurrencyRateData>(defaultRate)
    const [currencyValue, setCurrencyValue] = useState(1)
    const modalRef = useRef(null)

    const { data, error, loading } = useFetch<
        CurrencyRateData,
        (assetId: Currencies) => Promise<CurrencyRateData>
    >(getAssetRate, asset_id)

    useEffect(() => {
        setRateData(data ?? defaultRate)
    }, [data])

    useClickOutside(modalRef, () => onClose(false))

    const handleShowModal = () => {
        onClose(false)
    }

    const validateInput = (input: string) => {
        const inputRegex = /^\d{1,5}$/
        if (inputRegex.test(input)) {
            return Number(input)
        } else return Number(input.slice(0, input.length - 1))
    }

    const handleSetCurrencyValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrencyValue(validateInput(e.target.value))
    }

    if (error) {
        return <ErrorModal onClose={handleShowModal} />
    }
    if (loading) {
        return <CurrencyModalLoader onClose={onClose} />
    }
    return (
        <div {...props} className={styles.container}>
            <div className={styles.window} data-cy="modal" ref={modalRef}>
                <button className={styles.close} onClick={handleShowModal}>
                    <CloseIcon />
                </button>
                <div className={styles.content}>
                    <div className={styles.title}>
                        Convert {rateData.asset_id_base}
                    </div>
                    <Description priceUsd={priceUsd} start={start} end={end} />
                    <div className={styles.currencies}>
                        <Convert
                            currencyValue={currencyValue}
                            handleChange={handleSetCurrencyValue}
                        >
                            <p className={styles.text}>
                                {rateData.asset_id_base}
                            </p>
                        </Convert>
                        <SelectCurrency>
                            {rateData.rates.map(({ rate, asset_id_quote }) => (
                                <option key={asset_id_quote}>
                                    {`${asset_id_quote}: ${(currencyValue * rate).toFixed(toFixedNumbers)}`}
                                </option>
                            ))}
                        </SelectCurrency>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(CurrencyModal)
