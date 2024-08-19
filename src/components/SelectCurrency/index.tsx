import * as styles from './styles.module.scss'

export interface SelectCurrencyProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode
}

export const SelectCurrency = ({ children, ...props }: SelectCurrencyProps) => {
    return (
        <select {...props} className={styles.container}>
            {children}
        </select>
    )
}
