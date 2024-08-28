import * as styles from './styles.module.scss'

import { toFixedNumbers } from '@/constants'
import { DescriptionProps } from '@/types'

export const Description = ({ end, priceUsd, start }: DescriptionProps) => {
    return (
        <div className={styles.description}>
            <p className={styles.text}>
                price usd: {priceUsd.toFixed(toFixedNumbers)}
            </p>
            <p className={styles.text}>start: {start}</p>
            <p className={styles.text}>end: {end}</p>
        </div>
    )
}
