import { PureComponent } from 'react'

import * as styles from './styles.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: number | string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    text?: string
    type?: string
    className?: string
    placeholder?: string
}

export class Input extends PureComponent<InputProps> {
    constructor(props: InputProps) {
        super(props)
    }
    static defaultProps = {
        type: 'text',
    }
    render() {
        const { value, handleChange, type, text, className, placeholder } =
            this.props
        return (
            <div className={styles.container}>
                {this.props.text && <p className={styles.text}>{text}</p>}
                <input
                    type={type}
                    value={value}
                    onChange={handleChange}
                    className={`${styles.input} ${className}`}
                    placeholder={placeholder}
                />
            </div>
        )
    }
}
