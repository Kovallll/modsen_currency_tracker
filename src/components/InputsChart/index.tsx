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
        const { handleUpdateData, data } = this.props

        handleUpdateData({
            ...data,
            high: +e.target.value,
        })
    }

    handleChangeLow = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { handleUpdateData, data } = this.props

        handleUpdateData({
            ...data,
            low: +e.target.value,
        })
    }

    handleChangeClose = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { handleUpdateData, data } = this.props

        handleUpdateData({
            ...data,
            close: +e.target.value,
        })
    }

    handleChangeOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { handleUpdateData, data } = this.props

        handleUpdateData({
            ...data,
            open: +e.target.value,
        })
    }

    handleDelete = () => {
        const { handleDeleteInputs, data } = this.props

        handleDeleteInputs(data.day)
    }

    render() {
        const { data } = this.props
        return (
            <div className={styles.container}>
                <Input
                    handleChange={this.handleChangeOpen}
                    searchValue={data.open}
                    text="open"
                    type="number"
                    className={styles.input}
                />
                <Input
                    handleChange={this.handleChangeClose}
                    searchValue={data.close}
                    text="close"
                    type="number"
                    className={styles.input}
                />
                <Input
                    handleChange={this.handleChangeLow}
                    searchValue={data.low}
                    text="low"
                    type="number"
                    className={styles.input}
                />
                <Input
                    handleChange={this.handleChangeHigh}
                    searchValue={data.high}
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
