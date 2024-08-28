import { PureComponent } from 'react'
import classNames from 'classnames'

import * as styles from './styles.module.scss'

import { InputProps } from '@/types'

export class Input extends PureComponent<InputProps> {
    static defaultProps = {
        type: 'text',
    }

    constructor(props: InputProps) {
        super(props)
    }

    render() {
        const {
            value,
            handleChange,
            text,
            className,
            inputRef,
            placeholder,
            ...props
        } = this.props

        const inputStyle = classNames(styles.input, className)

        return (
            <div className={styles.container}>
                {text && <p className={styles.text}>{text}</p>}
                <input
                    {...props}
                    value={value}
                    onChange={handleChange}
                    className={inputStyle}
                    ref={inputRef}
                    placeholder={placeholder}
                />
            </div>
        )
    }
}
