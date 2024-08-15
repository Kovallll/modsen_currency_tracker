import { useContext } from 'react'

import * as styles from './styles.module.scss'

import { ThemeContext } from '@/providers/ThemeProvider'

export const ToggleThemeButton = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    const handleClickButton = () => {
        toggleTheme()
    }
    return (
        <div className={styles.container}>
            <button
                className={
                    theme === 'dark' ? styles.darkButton : styles.lightButton
                }
                onClick={handleClickButton}
            />
        </div>
    )
}
