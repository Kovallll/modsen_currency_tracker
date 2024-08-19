import { createContext, useEffect, useState } from 'react'

import { getAllAssets } from '@/api'
import { defaultAllAssets } from '@/constants'
import { CurrencyAssetsData } from '@/types'

interface AssetsProviderProps {
    children: React.ReactNode
}

type AssetsDataContext = CurrencyAssetsData[]

export const AssetsDataContext = createContext<AssetsDataContext>([
    defaultAllAssets,
])

export const AssetsProvider = ({ children }: AssetsProviderProps) => {
    const [assetsData, setAssetsData] = useState<CurrencyAssetsData[]>([
        defaultAllAssets,
    ])

    useEffect(() => {
        const getData = async () => {
            const data = await getAllAssets()
            setAssetsData(data)
        }
        getData()
    }, [])
    return (
        <AssetsDataContext.Provider value={assetsData}>
            {children}
        </AssetsDataContext.Provider>
    )
}
