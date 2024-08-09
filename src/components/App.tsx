import { useContext, useEffect } from 'react'

import * as styles from './App.module.scss'

import { ThemeContext } from '@/providers/ThemeProvider/ThemeProvier'

const App = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <div className={styles.app}>
            <p>Text</p>
            <button onClick={toggleTheme}>toggle</button>
        </div>
    )
}

export default App
