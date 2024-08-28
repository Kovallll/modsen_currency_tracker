import {
    AssetsDataContextType,
    CandlestickChartItem,
    CurrencyAssetsData,
    Feature,
    InputData,
} from '.'

import { Currencies } from '@/constants'

export type TimelinePageProps = object

export type BankCardPageProps = object

export interface SelectTimelineProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    selectRef: React.RefObject<HTMLSelectElement>
    handleUpdateCurrency: () => void
    assets: AssetsDataContextType
}

export interface SelectCurrencyProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode
}

export interface SearchProps
    extends React.InputHTMLAttributes<HTMLAreaElement> {
    searchValue: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleChangePopupValue: (value: Currencies) => void
    text?: string
    type?: string
    className?: string
}

export interface MarkerProps {
    feature: Feature
}

export interface MapProps extends React.InputHTMLAttributes<HTMLDivElement> {
    mapContainer: React.RefObject<HTMLDivElement>
    searchValue: string
}

export interface LastUpdatedProps {
    timeUpdate: RegExpMatchArray | null
    className?: string
}

export interface InputsChartProps {
    handleDeleteInputs: (day: number) => void
    data: InputData
    handleUpdateData: (data: InputData) => void
}

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    value: number | string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    inputRef?: React.RefObject<HTMLInputElement>
    text?: string
    className?: string
    placeholder?: string
}

export interface FooterProps {
    className?: string
}

export interface CurrencyTableProps {
    title: string
}

export interface CurrencyPopupProps
    extends React.InputHTMLAttributes<HTMLDivElement> {
    searchedCurrencies: Currencies[]
    onClickCurrency: (currency: Currencies) => void
    cursor: number
    divContainerRef: React.RefObject<HTMLDivElement>
}

export interface CurrencyModalProps {
    onClose: (isShow: boolean) => void
    priceUsd: number
    start: string
    end: string
    asset_id: Currencies
}

export interface CurrencyCardProps {
    title: string
    asset_id: Currencies
    subtitle: number
    onClick: (isShow: boolean) => void
}

export interface ChartWithInfoProps {
    currentCurrencyChart: CurrencyAssetsData
    data: CandlestickChartItem[]
}

export interface ChartCreaterProps {
    chartData: InputData[]
    handleDeleteInputs: (day: number) => void
    handleUpdateChartData: (data: InputData) => void
    handleAddInputs: () => void
    createButtonRef: React.RefObject<HTMLButtonElement>
}

export interface CandlestickChartProps {
    data: CandlestickChartItem[]
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void
    title: string
    className?: string
    createButtonRef?: React.RefObject<HTMLButtonElement>
}

export interface AccordionProps
    extends React.ButtonHTMLAttributes<HTMLDivElement> {
    id: string
    isOpen: boolean
    handleClick: (id: string) => void
    title: string
    textData: string[]
    theme: string
}

export interface ConvertProps {
    children: React.ReactNode
    currencyValue: number
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface MarkerPopupProps {
    feature: Feature
}

export interface ErrorModalProps {
    onClose: (isShow: boolean) => void
}

export interface CurrencyModalLoaderProps {
    onClose: (isShow: boolean) => void
}

export interface DescriptionProps {
    priceUsd: number
    start: string
    end: string
}

export interface AssetsProviderProps {
    children: React.ReactNode
}
