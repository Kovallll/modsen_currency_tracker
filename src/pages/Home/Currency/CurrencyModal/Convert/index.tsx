import * as styles from './styles.module.scss'

import { Input } from '@/components/Input'
import { ConvertProps } from '@/types'

export const Convert = ({
    children,
    currencyValue,
    handleChange,
}: ConvertProps) => {
    return (
        <div className={styles.container}>
            <Input
                value={currencyValue}
                handleChange={handleChange}
                className={styles.input}
                data-cy="convert-input"
            />
            {children}
        </div>
    )
}
