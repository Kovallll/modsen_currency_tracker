import { Component } from 'react'

import { Input } from '../Input'
import * as styles from './styles.module.scss'

import Basket from '@/assets/icons/basket.svg'
import { InputData } from '@/types'

interface InputsChartProps {
    handleDeleteInputs: (day: number) => void
    data: InputData
    handleUpdateData: (data: InputData) => void
}

export class InputsChart extends Component<InputsChartProps> {
    constructor(props: InputsChartProps) {
        super(props)
    }

    validateInput = (input: string) => {
        const inputRegex = /^(?!0)(?!.*e.*e)[0-9]*e?[0-9]*$/
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

        handleDeleteInputs(data.day)
    }

    render() {
        const { data, ...props } = this.props
        return (
            <div {...props} className={styles.container}>
                <Input
                    handleChange={this.handleChangeOpen}
                    searchValue={data.open}
                    text="open"
                    className={styles.input}
                    placeholder="open"
                />
                <Input
                    handleChange={this.handleChangeClose}
                    searchValue={data.close}
                    text="close"
                    className={styles.input}
                    placeholder="close"
                />
                <Input
                    handleChange={this.handleChangeLow}
                    searchValue={data.low}
                    text="low"
                    className={styles.input}
                    placeholder="low"
                />
                <Input
                    handleChange={this.handleChangeHigh}
                    searchValue={data.high}
                    text="high"
                    className={styles.input}
                    placeholder="high"
                />
                <div onClick={this.handleDelete} className={styles.basket}>
                    <Basket />
                </div>
            </div>
        )
    }
}
