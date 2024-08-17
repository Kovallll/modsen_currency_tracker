import { Component, createRef, ReactElement } from 'react'
import { createPortal } from 'react-dom'

import * as styles from './styles.module.scss'

import { ChartCreater } from '@/components/ChartCreater'
import { ChartWithInfo } from '@/components/ChartWithInfo'
import { SelectTimeline } from '@/components/SelectTimeline'
import { dateNow, defaultAllAssets, msInDay } from '@/constants'
import { CurrencyAssetsData, InputData } from '@/types'

interface TimelinePageState {
    assetsData: CurrencyAssetsData[]
    currentCurrencyId: string
    isCreateChart: boolean
    chartData: InputData[]
    day: number
    isInView: boolean
}

type TimelinePageProps = object

class TimelinePage extends Component<TimelinePageProps, TimelinePageState> {
    private ref: React.RefObject<HTMLSelectElement>
    private chartRef: React.RefObject<HTMLDivElement>
    private notify: ReactElement | null

    constructor(props: TimelinePageProps) {
        super(props)
        this.ref = createRef()
        this.chartRef = createRef()
        this.notify = <p className={styles.notify}>Chart successful created</p>
        this.state = {
            assetsData: JSON.parse(localStorage.getItem('assetsData') ?? '[]'),
            currentCurrencyId: '',
            isCreateChart: false,
            isInView: false,
            chartData: [
                {
                    open: 0,
                    close: 0,
                    high: 0,
                    low: 0,
                    day: 1,
                },
            ],
            day: 2,
        }
    }
    observer = new IntersectionObserver(([entry]) => {
        this.setState({
            isInView: entry.isIntersecting,
        })
    })

    componentDidMount() {
        this.setState({
            currentCurrencyId: this.ref.current?.value ?? '',
        })
    }

    componentDidUpdate() {
        if (this.chartRef.current) {
            this.observer.observe(this.chartRef.current)
        }
        if (this.state.isInView) {
            setTimeout(() => {
                this.setState({ isInView: false })
                this.notify = null
            }, 2000)
        }
    }

    componentWillUnmount() {
        if (this.chartRef.current) {
            this.observer.unobserve(this.chartRef.current)
        }
    }

    handleUpdateCurrency = () => {
        this.setState({
            currentCurrencyId: this.ref.current?.value ?? '',
        })
    }

    handleCreateChart = () => {
        this.setState({
            isCreateChart: true,
        })
        this.notify = <p className={styles.notify}>Chart successful created</p>
    }

    handleDeleteInputs = (day: number) => {
        const { chartData } = this.state

        if (chartData.length !== 1) {
            this.setState({
                chartData: chartData.filter((el) => el.day !== day),
                isCreateChart: false,
            })
        }
    }

    handleUpdateChartData = (data: InputData) => {
        this.setState((state) => {
            const index = state.chartData.findIndex(
                (item) => item.day === data.day
            )
            const dataArr = state.chartData
            dataArr.splice(index, 1, data)
            return {
                chartData: [...dataArr],
                isCreateChart: false,
            }
        })
    }

    handleAddInputs = () => {
        const { chartData, day } = this.state

        this.setState({
            chartData: [
                ...chartData,
                {
                    open: 0,
                    close: 0,
                    high: 0,
                    low: 0,
                    day: day,
                },
            ],
            day: day + 1,
            isCreateChart: false,
        })
    }

    render() {
        const {
            assetsData,
            currentCurrencyId,
            chartData,
            isInView,
            isCreateChart,
        } = this.state

        const currentCurrencyChart =
            assetsData.find((item) => item.asset_id === currentCurrencyId) ??
            defaultAllAssets

        const data = chartData.map((item) => {
            return {
                x: item.day * msInDay + dateNow,
                o: item.open,
                h: item.high,
                c: item.close,
                l: item.low,
            }
        })
        return (
            <div className={styles.container}>
                <div className={styles.selectWrap}>
                    <SelectTimeline
                        assetsData={assetsData}
                        handleUpdateCurrency={this.handleUpdateCurrency}
                        selectRef={this.ref}
                    />
                </div>
                <ChartCreater
                    chartData={chartData}
                    handleAddInputs={this.handleAddInputs}
                    handleCreateChart={this.handleCreateChart}
                    handleDeleteInputs={this.handleDeleteInputs}
                    handleUpdateChartData={this.handleUpdateChartData}
                />
                {isCreateChart && (
                    <ChartWithInfo
                        chartRef={this.chartRef}
                        currentCurrencyChart={currentCurrencyChart}
                        data={data}
                    />
                )}
                {isInView && createPortal(this.notify, document.body)}
            </div>
        )
    }
}

export default TimelinePage
