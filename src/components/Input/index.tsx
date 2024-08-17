import { PureComponent } from 'react'

import * as styles from './styles.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    searchValue: number | string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputRef?: React.RefObject<HTMLInputElement>
    text?: string
    className?: string
}

export class Input extends PureComponent<InputProps> {
    constructor(props: InputProps) {
        super(props)
    }
    static defaultProps = {
        type: 'text',
    }
    render() {
        const {
            searchValue,
            handleChange,
            text,
            className,
            inputRef,
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
                />
            </div>
        )
    }
}
