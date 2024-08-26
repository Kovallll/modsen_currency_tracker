import * as styles from './styles.module.scss'

import { InputData } from '@/types'

export const handleAddNotify = (data: InputData[]) => {
    const isEmpty = data.find((item) => Object.values(item).includes(''))

    const lowest = data.find((item) => Number(item.low) > Number(item.open))
    const highest = data.find((item) => Number(item.high) < Number(item.close))

    if (isEmpty) {
        return {
            isCreateChart: false,
            notify: (
                <p className={styles.errorNotify} data-cy="error-notify">
                    Error: Fill all inputs
                </p>
            ),
        }
    } else if (lowest) {
        return {
            isCreateChart: false,
            notify: (
                <p className={styles.errorNotify} data-cy="errorLowest-notify">
                    low should be less than open
                </p>
            ),
        }
    } else if (highest) {
        return {
            isCreateChart: false,
            notify: (
                <p className={styles.errorNotify} data-cy="errorHighest-notify">
                    close should be less than high
                </p>
            ),
        }
    } else if (data.length < 30) {
        return {
            isCreateChart: false,
            notify: (
                <p className={styles.errorNotify} data-cy="error30-notify">
                    It must be at least 30 days
                </p>
            ),
        }
    } else {
        return {
            isCreateChart: true,
            notify: (
                <p className={styles.seccessNotify} data-cy="success-notify">
                    Chart successful created
                </p>
            ),
        }
    }
}
