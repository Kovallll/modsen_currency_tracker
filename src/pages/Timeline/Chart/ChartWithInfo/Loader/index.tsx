import { Component, ReactNode } from 'react'

import * as styles from './styles.module.scss'

export class ChartWithInfoLoader extends Component {
    render(): ReactNode {
        return (
            <div className={styles.container}>
                <div className={styles.chartInfo}>
                    <div className={styles.icon}></div>
                    <div className={styles.chartText}>
                        <p className={styles.text}></p>
                        <p className={styles.text}></p>
                    </div>
                </div>
                <div className={styles.chart}></div>
            </div>
        )
    }
}
