import React, { Component, createRef } from 'react'
import { Chart, ChartItem, ChartTypeRegistry } from 'chart.js'

import { CandlestickController } from './controller.candlestick.js'
import { CandlestickElement } from './element.candlestick.js'
import * as styles from './styles.module.scss'

import 'chartjs-adapter-luxon'
import 'chart.js/auto'
import { CandlestickChartItem } from '@/types/index.js'

interface CandlestickChartProps {
    data: CandlestickChartItem[]
}

export class CandlestickChart extends Component<CandlestickChartProps> {
    private chartRef: React.RefObject<HTMLCanvasElement>
    constructor(props: CandlestickChartProps) {
        super(props)
        this.chartRef = createRef()
        Chart.register(CandlestickController, CandlestickElement)
    }

    componentDidMount(): void {
        const { data } = this.props

        new Chart(this.chartRef.current as unknown as ChartItem, {
            type: 'candlestick' as keyof ChartTypeRegistry,
            data: {
                datasets: [
                    {
                        label: 'CHRT - Chart.js Corporation',
                        data: data,
                        backgroundColor: 'rgba(0, 123, 255, 0.5)',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 1,
                    },
                ],
            },
        })
    }
    render() {
        return <canvas className={styles.chart} ref={this.chartRef}></canvas>
    }
}
