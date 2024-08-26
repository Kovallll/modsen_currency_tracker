import { useEffect, useState } from 'react'

import { Currencies } from '@/constants'

interface ApiResponse<T> {
    data: T | null
    loading: boolean
    error: string | null
}

function useFetch<T, F extends Function>(
    getData: F,
    id?: Currencies
): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response
                if (id !== undefined) {
                    response = await getData(id)
                } else response = await getData()
                setData(response)
            } catch (error) {
                setError((error as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [getData, id])

    return { data, loading, error }
}

export default useFetch
