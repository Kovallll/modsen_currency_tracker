import classNames from 'classnames'

import { title } from './config'
import * as styles from './styles.module.scss'

import { LastUpdatedProps } from '@/types'

export const LastUpdatedAt = ({
    timeUpdate,
    className,
    ...props
}: LastUpdatedProps) => {
    const containerStyle = classNames(styles.container, className)

    return (
        <div {...props} className={containerStyle}>
            <div className={styles.circle} />
            <h3 className={styles.text}>
                {title} {timeUpdate}
            </h3>
        </div>
    )
}
