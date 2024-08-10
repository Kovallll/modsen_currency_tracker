import { Link } from 'react-router-dom'

import * as styles from './styles.module.scss'

import { Paths } from '@/constants'

export const Header = () => {
    return (
        <div className={styles.container}>
            <nav className={styles.navigation}>
                <div className={styles.logo} />
                <div className={styles.links}>
                    <Link to={Paths.Home}>Home</Link>
                    <Link to={Paths.Timeline}>Timeline</Link>
                    <Link to={Paths.BankCard}>BankCard</Link>
                </div>
            </nav>
        </div>
    )
}
