import { PureComponent } from 'react'
import classNames from 'classnames'

import * as styles from './styles.module.scss'

import { Currencies } from '@/constants'
import { CurrencyPopupProps } from '@/types'

export class CurrencyPopup extends PureComponent<CurrencyPopupProps> {
    constructor(props: CurrencyPopupProps) {
        super(props)
    }

    handleOnClickCurrency = (currency: Currencies) => () => {
        this.props.onClickCurrency(currency)
    }

    render() {
        const { searchedCurrencies, cursor, divContainerRef, ...props } =
            this.props

        return (
            <div {...props} className={styles.container} ref={divContainerRef}>
                {searchedCurrencies.length ? (
                    searchedCurrencies.map((currency, index) => (
                        <div
                            key={currency}
                            tabIndex={cursor}
                            className={classNames(styles.currencyWrap, {
                                [styles.active]: cursor === index,
                            })}
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
