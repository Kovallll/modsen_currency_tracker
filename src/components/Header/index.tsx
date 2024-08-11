import { Link } from 'react-router-dom'

import { ToggleThemeButton } from '../ToggleThemeButton'
import * as styles from './styles.module.scss'

import Logo from '@/assets/icons/logo.svg'
import { Paths } from '@/constants'

export const Header = () => {
    return (
        <div className={styles.container}>
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
            <div className={styles.banner}>
                <div className={styles.bannerWrap}>
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
            </div>
        </div>
    )
}
