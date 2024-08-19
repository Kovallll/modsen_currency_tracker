import { Component, ReactNode } from 'react'

import * as styles from './styles.module.scss'

import { CurrencyAssetsData } from '@/types'

interface SelectTimelineProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    selectRef: React.RefObject<HTMLSelectElement>
    handleUpdateCurrency: () => void
    assetsData: CurrencyAssetsData[]
}

export class SelectTimeline extends Component<SelectTimelineProps> {
    constructor(props: SelectTimelineProps) {
        super(props)
    }

    render(): ReactNode {
        const { selectRef, handleUpdateCurrency, assetsData, ...props } =
            this.props
        return (
            <select
                {...props}
                className={styles.select}
                ref={selectRef}
                onChange={handleUpdateCurrency}
                data-cy='select'
            >
                {assetsData.map((currency) => (
                    <option key={currency.asset_id} value={currency.asset_id}>
                        {currency.title}
                    </option>
                ))}
            </select>
        )
    }
}
