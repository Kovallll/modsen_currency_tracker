import { PureComponent } from 'react'

import * as styles from './styles.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void
    title: string
    className?: string
}

export class Button extends PureComponent<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props)
    }

    render() {
        const { className, onClick, title, ...props } = this.props
        return (
            <button
                {...props}
                className={`${styles.button} ${className}`}
                onClick={onClick}
            >
                {title}
            </button>
        )
    }
}
