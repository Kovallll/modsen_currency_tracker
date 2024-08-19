import * as styles from './styles.module.scss'

interface LastUpdatedProps {
    timeUpdate: RegExpMatchArray | null
    className?: string
}

export const LastUpdated = ({
    timeUpdate,
    className,
    ...props
}: LastUpdatedProps) => {
    return (
        <div {...props} className={`${styles.container} ${className}`}>
            <div className={styles.circle} />
            <p className={styles.text}>Last updated at {timeUpdate}</p>
        </div>
    )
}
