import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import * as styles from './styles.module.scss'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ThemeContext } from '@/providers/ThemeProvider/ThemeProvier'

const RootRoute = () => {
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default RootRoute
