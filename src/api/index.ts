import axios from 'axios'

import {
    Currencies,
    currencies,
    defaultAllAssets,
    defaultLastUpdate,
    getResponseAssetRate,
    responseAssets,
    responseLastUpdated,
} from '@/constants'
import {
    CurrencyAssetsData,
    CurrencyRateData,
    LastUpdated,
    LastUpdatedData,
} from '@/types'

export const getAllAssets = async () => {
    try {
        const data: CurrencyAssetsData[] = JSON.parse(
            localStorage.getItem('assetsData') ?? JSON.stringify(null)
        )
        if (data !== null) {
            return data
        } else {
            const data = await axios.get<CurrencyAssetsData[]>(responseAssets)
            const response = data.data
                .filter((item) => !!currencies[item.asset_id])
                .map((item) => {
                    return {
                        asset_id: item.asset_id ?? Currencies.Dollar,
                        name: item.name ?? 'none',
                        data_symbols_count: item.data_symbols_count ?? 0,
                        price_usd: item.price_usd ?? 0,
                        data_start: item.data_start ?? 'none',
                        data_end: item.data_end ?? 'none',
                    }
                })
            localStorage.setItem('assetsData', JSON.stringify(response))
            return response
        }
    } catch (error) {
        console.log(error)
        return defaultAllAssets
    }
}

export const getLastUpdated = async () => {
    try {
        const data: LastUpdated = JSON.parse(
            localStorage.getItem('lastUpdated') ?? JSON.stringify(null)
        )
        if (data !== null) {
            return data
        } else {
            const { data } =
                await axios.get<LastUpdatedData>(responseLastUpdated)
            localStorage.setItem('lastUpdated', JSON.stringify(data.meta))
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
        if (currency) {
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
