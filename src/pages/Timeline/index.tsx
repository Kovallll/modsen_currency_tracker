import { createRef, lazy, PureComponent, Suspense } from 'react'
import { createPortal } from 'react-dom'

import { ChartCreater } from './Chart/ChartCreater'
import { ChartWithInfoLoader } from './Chart/ChartWithInfo/Loader'
import * as styles from './styles.module.scss'

import { SelectTimeline } from '@/components/SelectTimeline'
import { defaultAllAssets } from '@/constants'
import { AssetsDataContext } from '@/providers/AssetsProvider'
import {
    AssetsDataContextType,
    CandlestickChartItem,
    InputData,
    TimelinePageProps,
    TimelinePageState,
} from '@/types'
import { getRandomValue, handleAddNotify, Observer } from '@/utils'
import { modifyToCorrectChartData } from '@/utils/modifyToCorrectChartData'

const ChartWithInfo = lazy(() => import('./Chart/ChartWithInfo'))
class TimelinePage extends PureComponent<TimelinePageProps, TimelinePageState> {
    static contextType = AssetsDataContext
    context!: AssetsDataContextType
    private selectRef: React.RefObject<HTMLSelectElement>
    private createButtonRef: React.RefObject<HTMLButtonElement>
    private notifyTimeout: NodeJS.Timeout | null
    private observer: Observer
    constructor(props: TimelinePageProps) {
        super(props)
        this.state = {
            currentCurrencyId: '',
            currentCurrencyChart: defaultAllAssets,
            isCreateChart: false,
            chartData: [
                {
                    open: getRandomValue('open'),
                    close: getRandomValue('close'),
                    high: getRandomValue('high'),
                    low: getRandomValue('low'),
                    day: 1,
                },
            ],
            notify: null,
            day: 2,
        }
        this.selectRef = createRef()
        this.createButtonRef = createRef()
        this.notifyTimeout = null
        this.observer = new Observer()
    }

    componentDidMount() {
        this.setState({
            currentCurrencyId: this.selectRef.current?.value ?? '',
        })
        this.createButtonRef.current?.addEventListener('click', () => {
            this.observer.broadcast()
        })
    }

    componentDidUpdate(prevState: Readonly<TimelinePageState>) {
        const { chartData, currentCurrencyChart, currentCurrencyId } =
            this.state
        this.observer.subscribe(() => this.setState(handleAddNotify(chartData)))

        if (this.state.notify !== null) {
            this.notifyTimeout = setTimeout(() => {
                this.setState({ notify: null })
            }, 2000)
        }
        if (prevState.currentCurrencyChart !== currentCurrencyChart) {
            const currency =
                this.context.assetsData.find(
                    (item) => item.asset_id === currentCurrencyId
                ) ?? defaultAllAssets
            this.setState({ currentCurrencyChart: currency })
        }
    }

    componentWillUnmount() {
        const { chartData } = this.state

        clearTimeout(this.notifyTimeout ?? '')
        this.observer.unsubscribe(() =>
            this.setState(handleAddNotify(chartData))
        )
    }

    handleUpdateCurrency = () => {
        this.setState({
            currentCurrencyId: this.selectRef.current?.value ?? '',
        })
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
                    open: getRandomValue('open'),
                    close: getRandomValue('close'),
                    high: getRandomValue('high'),
                    low: getRandomValue('low'),
                    day,
                },
            ],
            day: day + 1,
            isCreateChart: false,
        })
    }

    render() {
        const assets = this.context
        const { chartData, isCreateChart, notify, currentCurrencyChart } =
            this.state

        const correctChartData: CandlestickChartItem[] =
            modifyToCorrectChartData(chartData)
        return (
            <main className={styles.container}>
                <div className={styles.selectWrap}>
                    <SelectTimeline
                        assets={assets}
                        handleUpdateCurrency={this.handleUpdateCurrency}
                        selectRef={this.selectRef}
                    />
                </div>
                <ChartCreater
                    createButtonRef={this.createButtonRef}
                    chartData={chartData}
                    handleAddInputs={this.handleAddInputs}
                    handleDeleteInputs={this.handleDeleteInputs}
                    handleUpdateChartData={this.handleUpdateChartData}
                />
                {isCreateChart && (
                    <Suspense fallback={<ChartWithInfoLoader />}>
                        <ChartWithInfo
                            currentCurrencyChart={currentCurrencyChart}
                            data={correctChartData}
                        />
                    </Suspense>
                )}
                {createPortal(notify, document.body)}
            </main>
        )
    }
}

export default TimelinePage
