import { Component } from 'react'

import * as styles from './styles.module.scss'

import Basket from '@/assets/icons/basket.svg'
import { Input } from '@/components/Input'
import { InputsChartProps } from '@/types'

export class InputsChart extends Component<InputsChartProps> {
    constructor(props: InputsChartProps) {
        super(props)
    }

    validateInput = (input: string) => {
        const inputRegex = /^(?!0)(?!.*e.*e)[0-9]{1,2}e?[0-9]{0,1}$/
        if (inputRegex.test(input)) {
            return input
        } else return input.slice(0, input.length - 1)
    }

    handleChangeHigh = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { handleUpdateData, data } = this.props

        handleUpdateData({
            ...data,
            high: this.validateInput(e.target.value),
        })
    }

    handleChangeLow = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { handleUpdateData, data } = this.props

        handleUpdateData({
            ...data,
            low: this.validateInput(e.target.value),
        })
    }

    handleChangeClose = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { handleUpdateData, data } = this.props

        handleUpdateData({
            ...data,
            close: this.validateInput(e.target.value),
        })
    }

    handleChangeOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { handleUpdateData, data } = this.props

        handleUpdateData({
            ...data,
            open: this.validateInput(e.target.value),
        })
    }

    handleDelete = () => {
        const { handleDeleteInputs, data } = this.props
        const answer = confirm('Delete data?')
        if (answer) handleDeleteInputs(data.day)
    }

    render() {
        const { data, ...props } = this.props
        return (
            <div {...props} className={styles.container} data-cy="inputs-chart">
                <p className={styles.day}>{`${data.day})`}</p>
                <Input
                    handleChange={this.handleChangeOpen}
                    value={data.open}
                    text="open"
                    className={styles.input}
                    placeholder="open"
                    data-cy="input-chart"
                />
                <Input
                    handleChange={this.handleChangeClose}
                    value={data.close}
                    text="close"
                    className={styles.input}
                    placeholder="close"
                />
                <Input
                    handleChange={this.handleChangeLow}
                    value={data.low}
                    text="low"
                    className={styles.input}
                    placeholder="low"
                />
                <Input
                    handleChange={this.handleChangeHigh}
                    value={data.high}
                    text="high"
                    className={styles.input}
                    placeholder="high"
                />
                <div
                    onClick={this.handleDelete}
                    className={styles.basket}
                    data-cy="delete-button-inputs-chart"
                >
                    <Basket />
                </div>
            </div>
        )
    }
}
