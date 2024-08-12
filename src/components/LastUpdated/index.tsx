import * as styles from './styles.module.scss'

interface LastUpdatedProps {
    timeUpdate: RegExpMatchArray | null
}

export const LastUpdated = ({ timeUpdate }: LastUpdatedProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.circle} />
            <p className={styles.text}>Last updated at {timeUpdate}</p>
        </div>
    )
}
