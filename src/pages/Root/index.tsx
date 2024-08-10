import { Outlet } from 'react-router-dom'

import * as styles from './styles.module.scss'

import { Header } from '@/components/Header'

const RootRoute = () => {
    return (
        <div className={styles.container}>
            <Header />
            <Outlet />
        </div>
    )
}

export default RootRoute
