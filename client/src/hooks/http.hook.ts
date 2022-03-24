import {useCallback, useState} from "react";

export const useHttp = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)

    const request = useCallback(async (url: string, method: RequestMethodType = 'GET', body: any = null, headers: any) => {
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            setLoading(true)
            const response = await fetch(url, {
                method, body, headers,
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Some error occured')
            }
            setLoading(false)
            return data

        } catch (e) {
            setLoading(false)
            setError('Error')
            throw e
        }
    }, [])
    const clearError = () => setError(null)

    return {loading, request, error, clearError}
}

type RequestMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'
