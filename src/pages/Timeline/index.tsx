import { Component, createRef, ReactElement } from 'react'
import { createPortal } from 'react-dom'

import * as styles from './styles.module.scss'

import { ChartCreater } from '@/components/ChartCreater'
import { SelectTimeline } from '@/components/SelectTimeline'
import { defaultAllAssets, msInDay } from '@/constants'
import { ChartWithInfo } from '@/containers/ChartWithInfo'
import { CurrencyAssetsData, InputData } from '@/types'

interface TimelinePageState {
    assetsData: CurrencyAssetsData[]
    currentCurrencyId: string
    isCreateChart: boolean
    chartData: InputData[]
    day: number
    isInView: boolean
    notify: null | ReactElement
}

type TimelinePageProps = object

class TimelinePage extends Component<TimelinePageProps, TimelinePageState> {
    private ref: React.RefObject<HTMLSelectElement>
    private chartRef: React.RefObject<HTMLDivElement>

    constructor(props: TimelinePageProps) {
        super(props)
        this.ref = createRef()
        this.chartRef = createRef()
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
            notify: <p className={styles.notify}>Chart successful created</p>,
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
                this.setState({ isInView: false, notify: null })
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
            notify: <p className={styles.notify}>Chart successful created</p>,
        })
    }

    handleDeleteInputs = (day: number) => {
        if (this.state.chartData.length !== 1) {
            this.setState({
                chartData: this.state.chartData.filter((el) => el.day !== day),
                isCreateChart: false,
            })
        }
    }

    handleUpdateChartData = (data: InputData) => {
        this.setState((state) => {
            const index = state.chartData.findIndex(
                (item) => item.day === data.day
            )
            state.chartData.splice(index, 1, data)
            return {
                chartData: [...state.chartData],
                isCreateChart: false,
            }
        })
    }

    handleAddInputs = () => {
        this.setState({
            chartData: [
                ...this.state.chartData,
                {
                    open: 0,
                    close: 0,
                    high: 0,
                    low: 0,
                    day: this.state.day,
                },
            ],
            day: this.state.day + 1,
            isCreateChart: false,
        })
    }

    render() {
        const dateNow = new Date().getTime()
        console.log(this.state.chartData, 'chart')
        const currentCurrencyChart =
            this.state.assetsData.find(
                (item) => item.asset_id === this.state.currentCurrencyId
            ) ?? defaultAllAssets

        const data = this.state.chartData.map((item) => {
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
                        assetsData={this.state.assetsData}
                        handleUpdateCurrency={this.handleUpdateCurrency}
                        selectRef={this.ref}
                    />
                </div>
                <ChartCreater
                    chartData={this.state.chartData}
                    handleAddInputs={this.handleAddInputs}
                    handleCreateChart={this.handleCreateChart}
                    handleDeleteInputs={this.handleDeleteInputs}
                    handleUpdateChartData={this.handleUpdateChartData}
                />
                {this.state.isCreateChart && (
                    <ChartWithInfo
                        chartRef={this.chartRef}
                        currentCurrencyChart={currentCurrencyChart}
                        data={data}
                    />
                )}
                {this.state.isInView &&
                    createPortal(this.state.notify, document.body)}
            </div>
        )
    }
}

export default TimelinePage
