import { memo } from 'react'

import * as styles from './styles.module.scss'

import { currencies } from '@/constants'
import { CurrencyCardProps } from '@/types'

const CurrencyCard = ({
    title,
    asset_id,
    subtitle,
    onClick,
    ...props
}: CurrencyCardProps) => {
    const handleShowModal = () => {
        onClick(true)
    }

    return (
        <>
            <article
                {...props}
                className={styles.container}
                onClick={handleShowModal}
                data-cy="card"
            >
                <div className={styles.image}>{currencies[asset_id]}</div>
                <div className={styles.info}>
                    <p className={styles.title} data-cy="card-title">
                        {title}
                    </p>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>
            </article>
        </>
    )
}

export default memo(CurrencyCard)
