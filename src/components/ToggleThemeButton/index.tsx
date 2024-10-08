import { useContext } from 'react'

import * as styles from './styles.module.scss'

import { ThemeContext } from '@/providers/ThemeProvider'

export const ToggleThemeButton = ({ ...props }) => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    const handleClickButton = () => {
        toggleTheme()
    }
    return (
        <div {...props} className={styles.container}>
            <button
                data-cy='toggle'
                className={
                    theme === 'dark' ? styles.darkButton : styles.lightButton
                }
                onClick={handleClickButton}
            />
        </div>
    )
}
