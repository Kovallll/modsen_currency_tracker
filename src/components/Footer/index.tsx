import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { descriptionInfo, descriptionTitle, rights } from './config'
import * as styles from './styles.module.scss'

import Logo from '@/assets/icons/logo.svg'
import { Accordion } from '@/components/Accordion'
import { footerLinks } from '@/constants'
import { ThemeContext } from '@/providers/ThemeProvider'
import { FooterProps } from '@/types'

export const Footer = ({ className, ...props }: FooterProps) => {
    const { theme } = useContext(ThemeContext)
    const initialState = () => {
        return footerLinks.map(() => false)
    }
    const [accordionsShow, setAccordionsShow] = useState(initialState)

    const handleOpenClick = (id: string) => {
        const newArray = accordionsShow.map((el, index) => {
            if (index + 1 === Number(id)) {
                if (el) {
                    return false
                } else return true
            } else return false
        })
        setAccordionsShow(newArray)
    }
    const footerStyle = classNames(styles.container, className)

    return (
        <footer {...props} className={footerStyle} id="contacts">
            <section className={styles.info}>
                <article className={styles.description}>
                    <div className={styles.descTitle}>
                        <Logo />
                        <p className={styles.descText}>{descriptionTitle}</p>
                    </div>
                    <div className={styles.descInfo}>{descriptionInfo}</div>
                </article>
                <div className={styles.linksBlock}>
                    {footerLinks.map(({ id, title, links }) => (
                        <div key={id} className={styles.linksColumn}>
                            <p className={styles.title}>{title}</p>
                            {links.map((link) => (
                                <Link key={link} to="/" className={styles.link}>
                                    {link}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
                <div className={styles.accordion}>
                    {footerLinks.map(({ id, title, links }) => (
                        <Accordion
                            handleClick={handleOpenClick}
                            key={id}
                            isOpen={accordionsShow[Number(id) - 1]}
                            id={id}
                            title={title}
                            textData={links}
                            theme={theme}
                        />
                    ))}
                </div>
            </section>
            <p className={styles.rights}>{rights}</p>
        </footer>
    )
}
