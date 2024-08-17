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
            createButtonRef
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
                    <Button
                        createButtonRef={createButtonRef}
                        onClick={handleCreateChart}
                        title="Create"
                    />
                </div>
            </div>
        )
    }
}
