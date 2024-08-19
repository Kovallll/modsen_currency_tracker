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
    createButtonRef: React.RefObject<HTMLButtonElement>
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
            createButtonRef,
            ...props
        } = this.props

        return (
            <div {...props} className={styles.container}>
                <div className={styles.inputs} data-cy="container-inputs-chart">
                    {chartData.map((data) => (
                        <InputsChart
                            key={data.day}
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
                        data-cy="add-button-inputs-chart"
                    />
                    <Button
                        createButtonRef={createButtonRef}
                        onClick={handleCreateChart}
                        title="Create"
                        data-cy="create-chart-button"
                    />
                </div>
            </div>
        )
    }
}
