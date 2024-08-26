import { PureComponent } from 'react'
import classNames from 'classnames'

import * as styles from './styles.module.scss'

import { ButtonProps } from '@/types'

export class Button extends PureComponent<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props)
    }

    render() {
        const { className, onClick, title, createButtonRef, ...props } =
            this.props

        const buttonStyle = classNames(styles.button, className)
        return (
            <button
                {...props}
                className={buttonStyle}
                onClick={onClick}
                ref={createButtonRef}
            >
                {title}
            </button>
        )
    }
}
