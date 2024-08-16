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

    handleChangeHigh = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handleUpdateData({
            ...this.props.data,
            high: +e.target.value,
        })
    }

    handleChangeLow = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handleUpdateData({
            ...this.props.data,
            low: +e.target.value,
        })
    }

    handleChangeClose = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handleUpdateData({
            ...this.props.data,
            close: +e.target.value,
        })
    }

    handleChangeOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handleUpdateData({
            ...this.props.data,
            open: +e.target.value,
        })
    }

    handleDelete = () => {
        this.props.handleDeleteInputs(this.props.data.day)
    }

    render() {
        const { data } = this.props
        return (
            <div className={styles.container}>
                <Input
                    handleChange={this.handleChangeOpen}
                    value={data.open}
                    text="open"
                    type="number"
                    className={styles.input}
                />
                <Input
                    handleChange={this.handleChangeClose}
                    value={data.close}
                    text="close"
                    type="number"
                    className={styles.input}
                />
                <Input
                    handleChange={this.handleChangeLow}
                    value={data.low}
                    text="low"
                    type="number"
                    className={styles.input}
                />
                <Input
                    handleChange={this.handleChangeHigh}
                    value={data.high}
                    text="high"
                    type="number"
                    className={styles.input}
                />
                <div onClick={this.handleDelete} className={styles.basket}>
                    <Basket />
                </div>
            </div>
        )
    }
}
