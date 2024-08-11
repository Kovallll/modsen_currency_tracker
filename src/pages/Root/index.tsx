import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import * as styles from './styles.module.scss'

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
            <Outlet />
        </div>
    )
}

export default RootRoute
