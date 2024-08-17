import { PureComponent } from 'react'

import * as styles from './styles.module.scss'

import { Currencies } from '@/constants'

interface CurrencyPopupProps extends React.InputHTMLAttributes<HTMLDivElement> {
    searchedCurrencies: Currencies[]
    onClickCurrency: (currency: Currencies) => void
    cursor: number
    divContainerRef: React.RefObject<HTMLDivElement>
}

export class CurrencyPopup extends PureComponent<CurrencyPopupProps> {
    constructor(props: CurrencyPopupProps) {
        super(props)
    }

    handleOnClickCurrency = (currency: Currencies) => () => {
        this.props.onClickCurrency(currency)
    }

    render() {
        const { searchedCurrencies, cursor, divContainerRef } =
            this.props
        return (
            <div className={styles.container} ref={divContainerRef}>
                {searchedCurrencies.length ? (
                    searchedCurrencies.map((currency, index) => (
                        <div
                            tabIndex={cursor}
                            className={`${styles.currencyWrap} ${cursor === index ? styles.active : null}`}
                            onClick={this.handleOnClickCurrency(currency)}
                        >
                            <p className={styles.currency}>{currency}</p>
                        </div>
                    ))
                ) : (
                    <div tabIndex={cursor} className={styles.currencyWrap}>
                        <p className={styles.currency}>No currency</p>
                    </div>
                )}
            </div>
        )
    }
}
