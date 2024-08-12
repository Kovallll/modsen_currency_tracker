import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Accordion } from '../Accordion'
import * as styles from './styles.module.scss'

import Logo from '@/assets/icons/logo.svg'
import { footerLinks } from '@/constants'
import { ThemeContext } from '@/providers/ThemeProvider/ThemeProvier'

export const Footer = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <footer className={styles.container}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.description}>
                        <div className={styles.descTitle}>
                            <Logo />
                            <p className={styles.descText}>
                                Modsen Currency Tracker
                            </p>
                        </div>
                        <div className={styles.descInfo}>
                            Since then, the company has grown organically to.
                            Starsup is the world's largest trading platform,
                            with $12 billion worth of currency trading and
                            500,000 tickets sold daily to tens of thousands of
                            traders worldwide.
                        </div>
                    </div>
                    {width >= 768 ? (
                        <div className={styles.linksBlock}>
                            {footerLinks.map(({ title, links }) => (
                                <div className={styles.linksColumn}>
                                    <p className={styles.title}>{title}</p>
                                    {links.map((link) => (
                                        <Link to="/" className={styles.link}>
                                            {link}
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.accordion}>
                            {footerLinks.map(({ title, links }) => (
                                <Accordion
                                    title={title}
                                    textData={links}
                                    theme={theme}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.rights}>
                    <p>Startsup © 2023-2024, All Rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}
