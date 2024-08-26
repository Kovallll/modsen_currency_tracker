import { Component, ReactNode } from 'react'

import { InputsChart } from '../InputsChart'
import * as styles from './styles.module.scss'

import { Button } from '@/components/Button'
import { ChartCreaterProps } from '@/types'

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
                        className={styles.createButton}
                        title="Create"
                        data-cy="create-chart-button"
                    />
                </div>
            </div>
        )
    }
}
