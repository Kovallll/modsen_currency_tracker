import * as styles from './styles.module.scss'

export const CurrencyCardLoader = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.image}>
                    <div className={styles.loadImage} />
                </div>
                <div className={styles.info}>
                    <div className={styles.loadText} />
                    <div className={styles.loadText} />
                </div>
            </div>
        </>
    )
}
