import { Component, ReactNode } from 'react'

import * as styles from './styles.module.scss'

import { CandlestickChart } from '@/components/Chart'
import { currencies } from '@/constants'
import { CandlestickChartItem, CurrencyAssetsData } from '@/types'

interface ChartCreaterProps {
    currentCurrencyChart: CurrencyAssetsData
    data: CandlestickChartItem[]
}

export class ChartWithInfo extends Component<ChartCreaterProps> {
    constructor(props: ChartCreaterProps) {
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
