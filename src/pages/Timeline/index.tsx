import { Component, createRef, ReactElement } from 'react'
import { createPortal } from 'react-dom'

import * as styles from './styles.module.scss'

import { ChartCreater } from '@/components/ChartCreater'
import { ChartWithInfo } from '@/components/ChartWithInfo'
import { SelectTimeline } from '@/components/SelectTimeline'
import { dateNowMs, defaultAllAssets, msInDay } from '@/constants'
import { AssetsDataContext } from '@/providers/AssetsProvider'
import { CandlestickChartItem, CurrencyAssetsData, InputData } from '@/types'

interface TimelinePageState {
    currentCurrencyId: string
    isCreateChart: boolean
    chartData: InputData[]
    day: number
    notify: null | ReactElement
}

type TimelinePageProps = object

class TimelinePage extends Component<TimelinePageProps, TimelinePageState> {
    static contextType = AssetsDataContext
    context!: CurrencyAssetsData[]

    private selectRef: React.RefObject<HTMLSelectElement>
    private createButtonRef: React.RefObject<HTMLButtonElement>
    private notifyEvent: Event
    private notifyTimeout: NodeJS.Timeout | null

    constructor(props: TimelinePageProps) {
        super(props)
        this.state = {
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
        this.selectRef = createRef()
        this.notifyEvent = new Event('createChart')
        this.createButtonRef = createRef()
        this.notifyTimeout = null
    }

    componentDidMount() {
        this.setState({
            currentCurrencyId: this.selectRef.current?.value ?? '',
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
                    <p
                        className={styles.seccessNotify}
                        data-cy="success-notify"
                    >
                        Chart successful created
                    </p>
                ),
            })
        } else {
            this.setState({
                notify: (
                    <p className={styles.errorNotify} data-cy="error-notify">
                        Error: Fill all inputs
                    </p>
                ),
            })
        }

        this.notifyTimeout = setTimeout(() => {
            this.setState({ notify: null })
        }, 2000)
    }

    handleUpdateCurrency = () => {
        this.setState({
            currentCurrencyId: this.selectRef.current?.value ?? '',
        })
    }

    handleCreateChart = () => {
        if (!this.state.isCreateChart) {
            this.createButtonRef.current?.dispatchEvent(this.notifyEvent)
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
                    day,
                },
            ],
            day: day + 1,
            isCreateChart: false,
        })
    }

    render() {
        const assetsData = this.context
        const { currentCurrencyId, chartData, isCreateChart, notify } =
            this.state

        const currentCurrencyChart =
            assetsData.find((item) => item.asset_id === currentCurrencyId) ??
            defaultAllAssets

        const correctChartData: CandlestickChartItem[] = chartData.map(
            (item) => {
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
            }
        )
        return (
            <div className={styles.container}>
                <div className={styles.selectWrap}>
                    <SelectTimeline
                        assetsData={assetsData}
                        handleUpdateCurrency={this.handleUpdateCurrency}
                        selectRef={this.selectRef}
                    />
                </div>
                <ChartCreater
                    createButtonRef={this.createButtonRef}
                    chartData={chartData}
                    handleAddInputs={this.handleAddInputs}
                    handleCreateChart={this.handleCreateChart}
                    handleDeleteInputs={this.handleDeleteInputs}
                    handleUpdateChartData={this.handleUpdateChartData}
                />
                {isCreateChart && (
                    <ChartWithInfo
                        currentCurrencyChart={currentCurrencyChart}
                        data={correctChartData}
                    />
                )}
                {createPortal(notify, document.body)}
            </div>
        )
    }
}

export default TimelinePage
