import { Component, ReactNode } from 'react'

import * as styles from './styles.module.scss'

import { CandlestickChart } from '@/components/Chart'
import { currencies } from '@/constants'
import { CurrencyAssetsData } from '@/types'

interface ChartCreaterProps {
    currentCurrencyChart: CurrencyAssetsData
    data: {
        x: number
        o: number
        h: number
        c: number
        l: number
    }[]
    chartRef: React.RefObject<HTMLDivElement>
}

export class ChartWithInfo extends Component<ChartCreaterProps> {
    constructor(props: ChartCreaterProps) {
        super(props)
    }

    render(): ReactNode {
        const { currentCurrencyChart, data, chartRef } = this.props
        return (
            <div className={styles.container}>
                <div className={styles.chartInfo} ref={chartRef}>
                    <div className={styles.icon}>
                        {currencies[currentCurrencyChart.asset_id]}
                    </div>
                    <div className={styles.chartText}>
                        <p className={styles.chartTitle}>
                            {currentCurrencyChart.name}
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
