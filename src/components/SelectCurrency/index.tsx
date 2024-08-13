import * as styles from './styles.module.scss'

export interface SelectCurrencyProps {
    children: React.ReactNode
}

export const SelectCurrency = ({ children }: SelectCurrencyProps) => {
    return <select className={styles.container}>{children}</select>
}
