import { Component, ReactNode } from 'react'

import * as styles from './styles.module.scss'

import { currencies } from '@/constants'
import { CandlestickChart } from '@/pages/Timeline/Chart/CandlestickChart'
import { ChartWithInfoProps } from '@/types'

class ChartWithInfo extends Component<ChartWithInfoProps> {
    constructor(props: ChartWithInfoProps) {
        super(props)
    }

    render(): ReactNode {
        const { currentCurrencyChart, data, ...props } = this.props

        return (
            <div {...props} className={styles.container}>
                <div className={styles.chartInfo}>
                    <div className={styles.icon}>
                        {currencies[currentCurrencyChart.asset_id]}
                    </div>
                    <div className={styles.chartText}>
                        <p className={styles.chartTitle}>
                            {currentCurrencyChart.title}
                        </p>
                        <p className={styles.chartSubtitle}>
                            {currentCurrencyChart.asset_id}
                        </p>
                    </div>
                </div>
                <CandlestickChart data={data} />
            </div>
        )
    }
}

export default ChartWithInfo
