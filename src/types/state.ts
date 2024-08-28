import { ReactElement } from 'react'

import { CurrencyAssetsData, InputData, MarkerObject } from '.'

import { Currencies } from '@/constants'

export interface TimelinePageState {
    currentCurrencyChart: CurrencyAssetsData
    currentCurrencyId: string
    isCreateChart: boolean
    chartData: InputData[]
    day: number
    notify: null | ReactElement
}

export interface BankCardPageState {
    searchValue: string
}

export interface SearchState {
    searchedCurrencies: Currencies[]
    isFocus: boolean
    cursor: number
}

export interface MapState {
    markers: MarkerObject[]
}

export interface MarkerState {
    isHover: boolean
}
