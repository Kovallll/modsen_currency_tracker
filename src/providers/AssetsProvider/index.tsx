import { createContext, useEffect, useState } from 'react'

import { getAllAssets } from '@/api'
import { defaultAllAssets } from '@/constants'
import useFetch from '@/hooks/use-fetch'
import {
    AssetsDataContextType,
    AssetsProviderProps,
    CurrencyAssetsData,
} from '@/types'

export const AssetsDataContext = createContext<AssetsDataContextType>({
    assetsData: [defaultAllAssets],
    loading: true,
    error: '',
})

export const AssetsProvider = ({ children }: AssetsProviderProps) => {
    const [assetsData, setAssetsData] = useState<CurrencyAssetsData[]>([
        defaultAllAssets,
    ])
    const { data, loading, error } = useFetch<
        CurrencyAssetsData[],
        () => Promise<CurrencyAssetsData[]>
    >(getAllAssets)

    useEffect(() => {
        setAssetsData(data ?? [defaultAllAssets])
    }, [data])

    return (
        <AssetsDataContext.Provider value={{ assetsData, loading, error }}>
            {children}
        </AssetsDataContext.Provider>
    )
}
