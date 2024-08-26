import * as styles from './styles.module.scss'

import { SelectCurrencyProps } from '@/types'

export const SelectCurrency = ({ children, ...props }: SelectCurrencyProps) => {
    return (
        <select {...props} className={styles.container}>
            {children}
        </select>
    )
}
