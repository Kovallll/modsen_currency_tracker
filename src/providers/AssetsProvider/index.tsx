import { useEffect } from 'react'

import { getAllAssets } from '@/api'

interface AssetsProviderProps {
    children: React.ReactNode
}

export const AssetsProvider = ({ children }: AssetsProviderProps) => {
    useEffect(() => {
        const getData = async () => {
            await getAllAssets()
        }
        getData()
    }, [])
    return <>{children}</>
}
