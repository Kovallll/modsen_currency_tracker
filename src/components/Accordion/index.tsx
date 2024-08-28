import classNames from 'classnames'

import * as styles from './styles.module.scss'

import Arrow from '@/assets/icons/arrow.svg'
import { black, white } from '@/constants'
import { AccordionProps } from '@/types'

export const Accordion = ({
    id,
    isOpen,
    handleClick,
    title,
    textData,
    theme,
    ...props
}: AccordionProps) => {
    const iconStyle = classNames({
        [styles.closeIcon]: isOpen,
        [styles.openIcon]: !isOpen,
    })

    const contentStyle = classNames({
        [styles.visibleContent]: isOpen,
        [styles.hideContent]: !isOpen,
    })

    const fillArrow = theme === 'dark' ? white : black

    const handleShowAccordion = () => {
        handleClick(id)
    }

    return (
        <div
            {...props}
            className={styles.container}
            onClick={handleShowAccordion}
        >
            <div className={styles.head}>
                <p className={styles.title}>{title}</p>
                <div className={iconStyle}>
                    <Arrow fill={fillArrow} />
                </div>
            </div>
            <div className={contentStyle}>
                {textData.map((text) => (
                    <p key={text} className={styles.text}>
                        {text}
                    </p>
                ))}
            </div>
        </div>
    )
}
