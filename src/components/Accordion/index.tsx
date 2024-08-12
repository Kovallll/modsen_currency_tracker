import { useState } from 'react'

import * as styles from './styles.module.scss'

import Arrow from '@/assets/icons/arrow.svg'

interface AccordionProps {
    title: string
    textData: string[]
    theme: string
}

export const Accordion = ({ title, textData, theme }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenClick = () => {
        setIsOpen((prev) => !prev)
    }
    return (
        <div className={styles.container} onClick={handleOpenClick}>
            <div className={styles.head}>
                <p className={styles.title}>{title}</p>
                <div className={isOpen ? styles.closeIcon : styles.openIcon}>
                    <Arrow fill={theme === 'dark' ? '#fff' : '#000'} />
                </div>
            </div>
            <div
                className={isOpen ? styles.visibleContent : styles.hideContent}
            >
                {textData.map((text) => (
                    <p key={text} className={styles.text}>
                        {text}
                    </p>
                ))}
            </div>
        </div>
    )
}
