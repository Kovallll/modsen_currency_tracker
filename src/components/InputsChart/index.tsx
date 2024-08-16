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
        const inputRegex = /^(?!0)[0-9e]+$/
        if (inputRegex.test(input)) {
            return input
        } else return ''
    }

    handleChangeHigh = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handleUpdateData({
            ...this.props.data,
            high: this.validateInput(e.target.value),
        })
    }

    handleChangeLow = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handleUpdateData({
            ...this.props.data,
            low: this.validateInput(e.target.value),
        })
    }

    handleChangeClose = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handleUpdateData({
            ...this.props.data,
            close: this.validateInput(e.target.value),
        })
    }

    handleChangeOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handleUpdateData({
            ...this.props.data,
            open: this.validateInput(e.target.value),
        })
    }

    handleDelete = () => {
        this.props.handleDeleteInputs(this.props.data.day)
    }

    render() {
        return (
            <div className={styles.container}>
                <Input
                    handleChange={this.handleChangeOpen}
                    value={this.props.data.open}
                    text="open"
                    className={styles.input}
                />
                <Input
                    handleChange={this.handleChangeClose}
                    value={this.props.data.close}
                    text="close"
                    className={styles.input}
                />
                <Input
                    handleChange={this.handleChangeLow}
                    value={this.props.data.low}
                    text="low"
                    className={styles.input}
                />
                <Input
                    handleChange={this.handleChangeHigh}
                    value={this.props.data.high}
                    text="high"
                    className={styles.input}
                />
                <div onClick={this.handleDelete} className={styles.basket}>
                    <Basket />
                </div>
            </div>
        )
    }
}
