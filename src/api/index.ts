import axios from 'axios'

import { Currencies, defaultLastUpdate, timeToUpdateData } from '@/constants'
import {
    CurrencyAssetsData,
    CurrencyAssetsDataResponse,
    CurrencyRateData,
    LastUpdated,
    LastUpdatedData,
} from '@/types'
import {
    getDateTimer,
    getResponseAssetRate,
    getResponseAssets,
    LocalStorage,
} from '@/utils'

const localStorage = new LocalStorage()
const date = new Date().getDate()

export const getAllAssets = async () => {
    const data: CurrencyAssetsData[] | null = localStorage.getItem('assetsData')

    if (data !== null && getDateTimer(timeToUpdateData)) {
        return data
    } else {
        const { data } =
            await axios.get<CurrencyAssetsDataResponse[]>(getResponseAssets())

        const response: CurrencyAssetsData[] = data.map((item) => {
            return {
                asset_id: item.asset_id ?? Currencies.Dollar,
                title: item.name ?? 'none',
                subtitle: item.data_symbols_count ?? 0,
                priceUsd: item.price_usd ?? 0,
                start: item.data_start ?? 'none',
                end: item.data_end ?? 'none',
            }
        })

        localStorage.setItem('assetsData', response)
        localStorage.setItem('assetsTimer', date)
        return response
    }
}

export const getLastUpdated = async () => {
    const data: LastUpdated | null = localStorage.getItem('lastUpdated')
    if (data !== null && getDateTimer(timeToUpdateData)) {
        return data
    } else {
        const {data} = await axios.get<LastUpdatedData>(
            process.env.REACT_APP_RESPONSE_LAST_UPDATED ?? ''
        )
        localStorage.setItem('lastUpdated', data.meta ?? defaultLastUpdate)
        localStorage.setItem('assetsTimer', date)
        return data.meta
    }
}

export const getAssetRate = async (assetId: Currencies) => {
    const data: CurrencyRateData[] = localStorage.getItem('assetRate', [])
    const currency = data.find((currency) => currency.asset_id_base === assetId)

    if (currency && getDateTimer(timeToUpdateData)) {
        return currency
    } else {
        const { data } = await axios.get<CurrencyRateData>(
            getResponseAssetRate(assetId)
        )
        const localStorageData: CurrencyRateData[] = localStorage.getItem(
            'assetRate',
            {}
        )

        localStorage.setItem('assetRate', [...localStorageData, data])
        localStorage.setItem('assetsTimer', date)
        return data
    }
}
