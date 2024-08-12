import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { LastUpdated } from '../LastUpdated'
import { ToggleThemeButton } from '../ToggleThemeButton'
import * as styles from './styles.module.scss'

import Logo from '@/assets/icons/logo.svg'
import { Paths } from '@/constants'

const response =
    'https://api.currencyapi.com/v3/latest?apikey=cur_live_5KKBeFRlkcERd1QQC93qEgq1112YvvAsScAyp16M&currencies=EUR%2CUSD%2CCAD%2CAFN%2CRUB%2CBYN'

export const Header = () => {
    const [lastUpdated, setLastUpdated] = useState({ last_updated_at: '' })

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(response)
                setLastUpdated(data.meta)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    const timePattern = /\d{2}:\d{2}:\d{2}/
    const timeUpdate = lastUpdated.last_updated_at.match(timePattern)

    return (
        <header className={styles.container}>
            <div className={styles.wrap}>
                <nav className={styles.navigation}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
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
                        <Link className={styles.link} to={Paths.Contacts}>
                            Contacts
                        </Link>
                    </div>
                    <div className={styles.toggleButton}>
                        <ToggleThemeButton />
                    </div>
                </nav>
            </div>
            <div className={styles.navDown}>
                <div className={styles.bannerWrap}>
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
                        <div className={styles.svgWrap}>
                            <Logo
                                height={350}
                                width={300}
                                viewBox="0 0 40 45"
                                className={styles.bannerLogo}
                            />
                        </div>
                    </div>
                    <div className={styles.lastUpdate}>
                        <LastUpdated timeUpdate={timeUpdate} />
                    </div>
                </div>
            </div>
        </header>
    )
}
