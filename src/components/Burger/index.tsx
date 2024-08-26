import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { navigationLinks } from '../Header/config'
import * as styles from './styles.module.scss'

import { useClickOutside } from '@/hooks/use-click-outside'

export const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const burgerRef = useRef(null)

    const handleClickBurgerMenu = () => {
        setIsOpen((prev) => !prev)
    }

    useClickOutside(burgerRef, () => {
        setIsOpen(false)
    })

    const navbarStyle = classNames(styles.navbar, {
        [styles.activeNavbar]: isOpen,
    })

    const lineStyle = classNames(styles.line, {
        [styles.activeLine]: isOpen,
    })

    return (
        <div className={styles.container} ref={burgerRef}>
            <div className={styles.menu} onClick={handleClickBurgerMenu}>
                <span className={lineStyle} />
                <span className={lineStyle} />
                <span className={lineStyle} />
            </div>
            <div className={navbarStyle}>
                {navigationLinks.map(({ title, path }) => (
                    <Link to={path} className={styles.link}>
                        <p className={styles.text}>{title}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}
