import { Component, ReactNode } from 'react'

import * as styles from './styles.module.scss'

import { CurrencyAssetsData } from '@/types'

interface ChartCreaterProps {
    selectRef: React.RefObject<HTMLSelectElement>
    handleUpdateCurrency: () => void
    assetsData: CurrencyAssetsData[]
}

export class SelectTimeline extends Component<ChartCreaterProps> {
    constructor(props: ChartCreaterProps) {
        super(props)
    }

    render(): ReactNode {
        const { selectRef, handleUpdateCurrency, assetsData } = this.props
        return (
            <select
                className={styles.select}
                ref={selectRef}
                onChange={handleUpdateCurrency}
            >
                {assetsData.map((currency) => (
                    <option value={currency.asset_id}>{currency.name}</option>
                ))}
            </select>
        )
    }
}
