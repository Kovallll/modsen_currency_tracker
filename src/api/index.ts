import axios from 'axios'

import {
    Currencies,
    defaultAllAssets,
    defaultLastUpdate,
    getResponseAssetRate,
    responseAssets,
    responseLastUpdated,
} from '@/constants'
import {
    CurrencyAssetsData,
    CurrencyAssetsDataResponse,
    CurrencyRateData,
    LastUpdated,
    LastUpdatedData,
} from '@/types'
import { getDateTimer } from '@/utils'

export const getAllAssets = async () => {
    try {
        const data: CurrencyAssetsData[] = JSON.parse(
            localStorage.getItem('assetsData') ?? JSON.stringify(null)
        )

        if (data !== null && getDateTimer(60)) {
            return data
        } else {
            const { data } =
                await axios.get<CurrencyAssetsDataResponse[]>(responseAssets)
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

            localStorage.setItem('assetsData', JSON.stringify(response))
            localStorage.setItem(
                'assetsTimer',
                JSON.stringify(new Date().getDate())
            )
            return response
        }
    } catch (error) {
        console.log(error)
        return [defaultAllAssets]
    }
}

export const getLastUpdated = async () => {
    try {
        const data: LastUpdated = JSON.parse(
            localStorage.getItem('lastUpdated') ?? JSON.stringify(null)
        )
        if (data !== null && getDateTimer(60)) {
            return data
        } else {
            const { data } =
                await axios.get<LastUpdatedData>(responseLastUpdated)
            localStorage.setItem('lastUpdated', JSON.stringify(data.meta))
            localStorage.setItem(
                'assetsTimer',
                JSON.stringify(new Date().getDate())
            )
            return data.meta
        }
    } catch (error) {
        console.log(error)
        return defaultLastUpdate
    }
}

export const getAssetRate = async (assetId: Currencies) => {
    try {
        const data: CurrencyRateData[] = JSON.parse(
            localStorage.getItem('assetRate') ?? JSON.stringify([])
        )
        const currency = data.find(
            (currency) => currency.asset_id_base === assetId
        )
        if (currency && getDateTimer(60)) {
            return currency
        } else {
            const { data } = await axios.get<CurrencyRateData>(
                getResponseAssetRate(assetId)
            )
            const localStorageData: CurrencyRateData[] = JSON.parse(
                localStorage.getItem('assetRate') ?? JSON.stringify({})
            )
            localStorage.setItem(
                'assetRate',
                JSON.stringify([...localStorageData, data])
            )
            localStorage.setItem(
                'assetsTimer',
                JSON.stringify(new Date().getDate())
            )
            return data
        }
    } catch (error) {
        console.log(error)
        return {
            asset_id_base: assetId,
            rates: [{ time: 'none', asset_id_quote: 'none', rate: 0 }],
        }
    }
}
