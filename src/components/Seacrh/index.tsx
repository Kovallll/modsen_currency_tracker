import { createRef, PureComponent } from 'react'

import { CurrencyPopup } from '../CurrencyPopup'
import { Input } from '../Input'
import * as styles from './styles.module.scss'

import { Currencies } from '@/constants'

interface SearchProps extends React.InputHTMLAttributes<HTMLAreaElement> {
    searchValue: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangePopupValue: (value: Currencies) => void
    text?: string
    type?: string
    className?: string
}

interface SearchState {
    searchedCurrencies: Currencies[]
    isFocus: boolean
    cursor: number
}

export class Search extends PureComponent<SearchProps, SearchState> {
    static defaultProps = {
        type: 'text',
    }

    private currencies: Currencies[]
    private inputRef: React.RefObject<HTMLInputElement>
    private divContainerRef: React.RefObject<HTMLDivElement>
    constructor(props: SearchProps) {
        super(props)
        this.state = {
            searchedCurrencies: Object.values(Currencies),
            cursor: 0,
            isFocus: false,
        }
        this.currencies = Object.values(Currencies)
        this.inputRef = createRef()
        this.divContainerRef = createRef()
    }

    componentDidMount(): void {
        document.addEventListener('click', this.handleClickOutsideInput)
    }

    componentDidUpdate(prevProps: Readonly<SearchProps>): void {
        const { searchValue } = this.props

        if (prevProps.searchValue !== searchValue) {
            this.setState({
                searchedCurrencies: this.currencies.filter((currency) => {
                    return currency
                        .toLocaleLowerCase()
                        .includes(searchValue.toLocaleLowerCase())
                }),
                cursor: 0,
            })
        }
    }

    componentWillUnmount(): void {
        document.removeEventListener('click', this.handleClickOutsideInput)
    }

    handleClickOutsideInput = (event: MouseEvent | TouchEvent) => {
        if (
            this.inputRef.current &&
            !this.inputRef.current.contains(event.target as Node)
        ) {
            this.setState({
                isFocus: false,
            })
        }
    }

    handleClickCurrency = (currency: Currencies) => {
        this.props.handleChangePopupValue(currency)
    }

    handleFocusInput = () => {
        this.setState({
            isFocus: true,
            cursor: 0,
        })
    }

    handleKeyEnter = () => {
        const { searchedCurrencies, cursor } = this.state

        this.props.handleChangePopupValue(searchedCurrencies[cursor])
    }

    handleKeyUp = (scrollValue: number, countVisibleElements: number) => {
        const { searchedCurrencies, cursor } = this.state

        if (cursor === 0) {
            this.setState({
                cursor: searchedCurrencies.length - 1,
            })
            this.divContainerRef.current?.scrollBy(
                0,
                (searchedCurrencies.length - countVisibleElements) * scrollValue
            )
        } else {
            this.setState((prevState) => ({
                cursor: prevState.cursor - 1,
            }))
            if (cursor <= searchedCurrencies.length - countVisibleElements) {
                this.divContainerRef.current?.scrollBy(0, -scrollValue)
            }
        }
    }

    handleKeyDown = (scrollValue: number, countVisibleElements: number) => {
        const { cursor, searchedCurrencies } = this.state

        if (cursor === searchedCurrencies.length - 1) {
            this.setState({
                cursor: 0,
            })
            this.divContainerRef.current?.scrollBy(
                0,
                -searchedCurrencies.length * scrollValue
            )
        } else {
            this.setState((prevState) => ({
                cursor: prevState.cursor + 1,
            }))
            if (cursor + 1 >= countVisibleElements) {
                this.divContainerRef.current?.scrollBy(0, scrollValue)
            }
        }
    }

    handleKeyClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { cursor, searchedCurrencies } = this.state

        const scrollValue = (
            this.divContainerRef.current?.childNodes[0] as HTMLElement
        ).offsetHeight

        const countVisibleElements =
            (this.divContainerRef?.current?.offsetHeight ?? 0) / scrollValue

        if (event.key === 'ArrowUp' && cursor >= 0) {
            this.handleKeyUp(scrollValue, countVisibleElements)
        }
        if (
            event.key === 'ArrowDown' &&
            cursor <= searchedCurrencies.length - 1
        ) {
            this.handleKeyDown(scrollValue, countVisibleElements)
        }
        if (event.key === 'Enter') {
            this.handleKeyEnter()
        }
    }

    render() {
        const { searchedCurrencies, isFocus, cursor } = this.state
        const { searchValue, handleChange, text, className } = this.props
        return (
            <search className={`${styles.container} ${className}`}>
                <p className={styles.text}>{text}</p>
                <div className={styles.seacrhBlock}>
                    <Input
                        type="search"
                        searchValue={searchValue}
                        handleChange={handleChange}
                        placeholder="seacrh"
                        className={styles.search}
                        onFocus={this.handleFocusInput}
                        inputRef={this.inputRef}
                        onKeyDown={this.handleKeyClick}
                    />
                    {isFocus && (
                        <CurrencyPopup
                            divContainerRef={this.divContainerRef}
                            cursor={cursor}
                            onClickCurrency={this.handleClickCurrency}
                            searchedCurrencies={searchedCurrencies}
                        />
                    )}
                </div>
            </search>
        )
    }
}
