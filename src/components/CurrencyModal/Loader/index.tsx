import * as styles from './styles.module.scss'

import CloseIcon from '@/assets/icons/close.svg'

export const CurrencyModalLoader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.window}>
                <button className={styles.close}>
                    <CloseIcon />
                </button>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <div className={styles.loadTitle}></div>
                    </div>
                    <div className={styles.description}>
                        <div className={styles.loadDescription} />
                        <div className={styles.loadDescription} />
                        <div className={styles.loadDescription} />
                    </div>
                    <div className={styles.currencies}>
                        <div className={styles.loadSelect}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
