import { Component, createRef, ReactElement } from 'react'
import { createPortal } from 'react-dom'

import * as styles from './styles.module.scss'

import { ChartCreater } from '@/components/ChartCreater'
import { ChartWithInfo } from '@/components/ChartWithInfo'
import { SelectTimeline } from '@/components/SelectTimeline'
import { defaultAllAssets, msInDay } from '@/constants'
import { CurrencyAssetsData, InputData } from '@/types'

interface TimelinePageState {
    assetsData: CurrencyAssetsData[]
    currentCurrencyId: string
    isCreateChart: boolean
    chartData: InputData[]
    day: number
    notify: null | ReactElement
}

type TimelinePageProps = object

class TimelinePage extends Component<TimelinePageProps, TimelinePageState> {
    private ref: React.RefObject<HTMLSelectElement>
    private createButtonRef: React.RefObject<HTMLButtonElement>
    private event: Event
    private notifyTimeout: NodeJS.Timeout | null

    constructor(props: TimelinePageProps) {
        super(props)
        this.state = {
            assetsData: JSON.parse(localStorage.getItem('assetsData') ?? '[]'),
            currentCurrencyId: '',
            isCreateChart: false,
            chartData: [
                {
                    open: this.getRandomValue(),
                    close: this.getRandomValue(),
                    high: this.getRandomValue(),
                    low: this.getRandomValue(),
                    day: 1,
                },
            ],
            notify: null,
            day: 2,
        }
        this.ref = createRef()
        this.event = new Event('createChart')
        this.createButtonRef = createRef()
        this.notifyTimeout = null
    }

    componentDidMount() {
        this.setState({
            currentCurrencyId: this.ref.current?.value ?? '',
        })
        this.createButtonRef.current?.addEventListener(
            'createChart',
            this.handleAddNotify
        )
    }

    componentWillUnmount() {
        this.createButtonRef.current?.removeEventListener(
            'createChart',
            this.handleAddNotify
        )
        clearTimeout(this.notifyTimeout ?? '')
    }

    getRandomValue = () => {
        return String(Math.trunc(Math.random() * 10 + 1))
    }

    handleAddNotify = () => {
        const { chartData } = this.state

        const isEmpty = chartData.find((item) =>
            Object.values(item).includes('')
        )

        if (!isEmpty) {
            this.setState({
                isCreateChart: true,
                notify: (
                    <p className={styles.seccessNotify}>
                        Chart successful created
                    </p>
                ),
            })
        } else {
            this.setState({
                notify: (
                    <p className={styles.errorNotify}>Error: Fill all inputs</p>
                ),
            })
        }

        this.notifyTimeout = setTimeout(() => {
            this.setState({ notify: null })
        }, 2000)
    }

    handleUpdateCurrency = () => {
        this.setState({
            currentCurrencyId: this.ref.current?.value ?? '',
        })
    }

    handleCreateChart = () => {
        if (!this.state.isCreateChart) {
            this.createButtonRef.current?.dispatchEvent(this.event)
        }
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
                    open: this.getRandomValue(),
                    close: this.getRandomValue(),
                    high: this.getRandomValue(),
                    low: this.getRandomValue(),
                    day: this.state.day,
                },
            ],
            day: day + 1,
            isCreateChart: false,
        })
    }

    render() {
        const { assetsData, currentCurrencyId, chartData, isCreateChart } =
            this.state

        const currentCurrencyChart =
            assetsData.find((item) => item.asset_id === currentCurrencyId) ??
            defaultAllAssets

        const dateNowMs = new Date().getTime()

        const data = chartData.map((item) => {
            const o = Number.parseFloat(item.open)
            const c = Number.parseFloat(item.close)
            const l = Number.parseFloat(item.low)
            const h = Number.parseFloat(item.high)
            return {
                x: Number(item.day) * msInDay + dateNowMs,
                o: o,
                h: h,
                c: c,
                l: l,
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
                    createButtonRef={this.createButtonRef}
                    chartData={this.state.chartData}
                    handleAddInputs={this.handleAddInputs}
                    handleCreateChart={this.handleCreateChart}
                    handleDeleteInputs={this.handleDeleteInputs}
                    handleUpdateChartData={this.handleUpdateChartData}
                />
                {isCreateChart && (
                    <ChartWithInfo
                        currentCurrencyChart={currentCurrencyChart}
                        data={data}
                    />
                )}
                {createPortal(this.state.notify, document.body)}
            </div>
        )
    }
}

export default TimelinePage
