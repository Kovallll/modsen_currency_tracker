import { PureComponent } from 'react'

import { Input } from '../Input'
import * as styles from './styles.module.scss'

interface SearchProps extends React.InputHTMLAttributes<HTMLAreaElement> {
    value: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    text?: string
    type?: string
    className?: string
}

export class Search extends PureComponent<SearchProps> {
    constructor(props: SearchProps) {
        super(props)
        this.state = {
            response: null,
        }
    }
    static defaultProps = {
        type: 'text',
    }

    render() {
        const { value, handleChange, text, className } = this.props
        return (
            <search className={`${styles.container} ${className}`}>
                <div className={styles.text}>{text}</div>
                <Input
                    type="search"
                    value={value}
                    handleChange={handleChange}
                    placeholder="seacrh"
                    className={styles.search}
                />
            </search>
        )
    }
}
