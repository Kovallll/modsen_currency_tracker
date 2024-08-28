import { useContext } from 'react'
import classNames from 'classnames'

import * as styles from './styles.module.scss'

import { ThemeContext } from '@/providers/ThemeProvider'

export const ToggleThemeButton = ({ ...props }) => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    const handleClickButton = () => {
        toggleTheme()
    }

    const buttonStyle = classNames({
        [styles.darkButton]: theme === 'dark',
        [styles.lightButton]: theme !== 'dark',
    })

    return (
        <div {...props} className={styles.container}>
            <button
                data-cy="toggle"
                className={buttonStyle}
                onClick={handleClickButton}
            />
        </div>
    )
}
