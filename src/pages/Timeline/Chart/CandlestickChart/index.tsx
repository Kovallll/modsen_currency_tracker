import React, { Component, createRef } from 'react'
import { Chart, ChartTypeRegistry } from 'chart.js'

import { CandlestickController } from './controller.candlestick.js'
import { CandlestickElement } from './element.candlestick.js'
import * as styles from './styles.module.scss'

import 'chartjs-adapter-luxon'
import 'chart.js/auto'
import { chartBarColor, chartGridColor } from '@/constants'
import { CandlestickChartProps } from '@/types'

export class CandlestickChart extends Component<CandlestickChartProps> {
    private chartRef: React.RefObject<HTMLCanvasElement>
    constructor(props: CandlestickChartProps) {
        super(props)
        this.chartRef = createRef()
        Chart.register(CandlestickController, CandlestickElement)
    }

    componentDidMount(): void {
        const { data } = this.props

        new Chart(this.chartRef.current ?? '', {
            type: 'candlestick' as keyof ChartTypeRegistry,
            data: {
                datasets: [
                    {
                        label: 'CHRT - Chart.js Corporation',
                        data: data,
                        backgroundColor: chartBarColor,
                        borderColor: chartBarColor,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        grid: {
                            color: chartGridColor,
                        },
                    },
                    y: {
                        grid: {
                            color: chartGridColor,
                        },
                    },
                },
            },
        })
    }

    render() {
        const { ...props } = this.props
        return (
            <canvas
                {...props}
                className={styles.chart}
                ref={this.chartRef}
                data-cy="chart"
            ></canvas>
        )
    }
}
