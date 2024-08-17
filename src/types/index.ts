import { Currencies } from '@/constants'

export interface CurrencyCardData {
    currency: CurrencyAssetsData
}

export interface CurrencyAssetsData {
    asset_id: Currencies
    name: string
    data_symbols_count: number
    price_usd: number
    data_start: string
    data_end: string
}

export interface DescriptionData {
    price_usd: number
    data_start: string
    data_end: string
}

export interface CurrencyRateData {
    asset_id_base: Currencies
    rates: CurrencyRate[]
}

export interface CurrencyRate {
    time: string
    asset_id_quote: string
    rate: number
}

export interface LastUpdatedData {
    meta: LastUpdated
}

export interface LastUpdated {
    last_updated_at: string
}

export interface TimeseriesData {
    time_period_start: string
    time_period_end: string
    time_open: string
    time_close: string
    rate_open: number
    rate_high: number
    rate_low: number
    rate_close: number
}

export interface CandlestickChartItem {
    x: number
    o: number
    h: number
    c: number
    l: number
}

export interface InputData {
    open: string
    high: string
    close: string
    low: string
    day: number
}
