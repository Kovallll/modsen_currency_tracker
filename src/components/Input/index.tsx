import { PureComponent } from 'react'

import * as styles from './styles.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    searchValue: number | string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputRef?: React.RefObject<HTMLInputElement>
    text?: string
    className?: string
    placeholder?: string
}

export class Input extends PureComponent<InputProps> {
    static defaultProps = {
        type: 'text',
    }

    constructor(props: InputProps) {
        super(props)
    }

    render() {
        const {
            searchValue,
            handleChange,
            text,
            className,
            inputRef,
            placeholder,
            ...props
        } = this.props

        return (
            <div className={styles.container}>
                {text && <p className={styles.text}>{text}</p>}
                <input
                    {...props}
                    value={searchValue}
                    onChange={handleChange}
                    className={`${styles.input} ${className}`}
                    ref={inputRef}
                    placeholder={placeholder}
                />
            </div>
        )
    }
}
