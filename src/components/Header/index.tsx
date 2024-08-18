import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import * as styles from './styles.module.scss'

import { getLastUpdated } from '@/api'
import Logo from '@/assets/icons/logo.svg'
import { LastUpdated } from '@/components/LastUpdated'
import { ToggleThemeButton } from '@/components/ToggleThemeButton'
import { defaultLastUpdate, Paths } from '@/constants'

export const Header = () => {
    const [lastUpdated, setLastUpdated] = useState(defaultLastUpdate)

    useEffect(() => {
        const getData = async () => {
            const data = await getLastUpdated()
            setLastUpdated(data)
        }
        getData()
    }, [])

    const timePattern = /\d{2}:\d{2}:\d{2}/
    const timeUpdate = lastUpdated.last_updated_at.match(timePattern)

    return (
        <header className={styles.container}>
            <div className={styles.wrap}>
                <nav className={styles.navigation}>
                    <Logo className={styles.logo} />
                    <div className={styles.links}>
                        <Link className={styles.link} to={Paths.Home}>
                            Home
                        </Link>
                        <Link className={styles.link} to={Paths.Timeline}>
                            Timeline
                        </Link>
                        <Link className={styles.link} to={Paths.BankCard}>
                            BankCard
                        </Link>
                        <a className={styles.link} href={Paths.Contacts}>
                            Contacts
                        </a>
                    </div>
                    <ToggleThemeButton />
                </nav>
            </div>
            <div className={styles.navDown}>
                <div className={styles.banner}>
                    <div className={styles.bannerText}>
                        <p className={styles.title}>
                            Modsen Currency <br />
                            Tracker
                        </p>
                        <p className={styles.subTitle}>
                            Quotes for the dollar and other international
                            currencies.
                        </p>
                    </div>
                    <Logo
                        height={350}
                        width={300}
                        viewBox="0 0 40 45"
                        className={styles.bannerLogo}
                    />
                </div>
                <LastUpdated
                    className={styles.lastUpdate}
                    timeUpdate={timeUpdate}
                />
            </div>
        </header>
    )
}
