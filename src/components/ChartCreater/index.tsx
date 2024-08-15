import { Component, ReactNode } from 'react'

import { Button } from '../Button'
import { InputsChart } from '../InputsChart'
import * as styles from './styles.module.scss'

import { InputData } from '@/types'

interface ChartCreaterProps {
    chartData: InputData[]
    handleDeleteInputs: (day: number) => void
    handleUpdateChartData: (data: InputData) => void
    handleAddInputs: () => void
    handleCreateChart: () => void
}

export class ChartCreater extends Component<ChartCreaterProps> {
    constructor(props: ChartCreaterProps) {
        super(props)
    }

    render(): ReactNode {
        const {
            chartData,
            handleDeleteInputs,
            handleUpdateChartData,
            handleAddInputs,
            handleCreateChart,
        } = this.props
        return (
            <div className={styles.container}>
                <div className={styles.inputs}>
                    {chartData.map((data) => (
                        <InputsChart
                            data={data}
                            handleDeleteInputs={handleDeleteInputs}
                            handleUpdateData={handleUpdateChartData}
                        />
                    ))}
                </div>
                <div className={styles.buttons}>
                    <Button
                        className={styles.addButton}
                        onClick={handleAddInputs}
                        title="Add"
                    />
                    <Button onClick={handleCreateChart} title="Create" />
                </div>
            </div>
        )
    }
}
