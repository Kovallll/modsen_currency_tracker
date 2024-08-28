import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { BurgerMenu } from '../Burger'
import { navigationLinks, subtitle, title } from './config'
import * as styles from './styles.module.scss'

import { getLastUpdated } from '@/api'
import Logo from '@/assets/icons/logo.svg'
import { LastUpdatedAt } from '@/components/LastUpdated'
import { ToggleThemeButton } from '@/components/ToggleThemeButton'
import { defaultLastUpdate } from '@/constants'
import useFetch from '@/hooks/use-fetch'
import { LastUpdated } from '@/types'

export const Header = () => {
    const [lastUpdated, setLastUpdated] = useState(defaultLastUpdate)
    const { data, loading, error } = useFetch<
        LastUpdated,
        () => Promise<LastUpdated>
    >(getLastUpdated)
    useEffect(() => {
        setLastUpdated(data ?? defaultLastUpdate)
    }, [data])

    const timePattern = /\d{2}:\d{2}:\d{2}/
    const timeUpdate = lastUpdated?.last_updated_at?.match(timePattern)
    return (
        <header className={styles.container}>
            <div className={styles.wrap}>
                <nav className={styles.navigation}>
                    <Logo className={styles.logo} />
                    <div className={styles.links}>
                        {navigationLinks.map(({ title, path }) => (
                            <Link
                                data-cy="link"
                                className={styles.link}
                                to={path}
                            >
                                {title}
                            </Link>
                        ))}
                    </div>
                    <BurgerMenu />
                    <ToggleThemeButton />
                </nav>
            </div>
            <div className={styles.navDown}>
                <aside className={styles.banner}>
                    <div className={styles.bannerText}>
                        <h1 className={styles.title}>{title}</h1>
                        <h2 className={styles.subTitle}>{subtitle}</h2>
                    </div>
                    <Logo
                        height={350}
                        width={300}
                        viewBox="0 0 40 45"
                        className={styles.bannerLogo}
                    />
                </aside>
                {!loading ? (
                    <LastUpdatedAt
                        className={styles.lastUpdate}
                        timeUpdate={timeUpdate}
                    />
                ) : (
                    <p className={styles.center}>Loading...</p>
                )}
                {error && <p className={styles.center}>Ups, some Error</p>}
            </div>
        </header>
    )
}
