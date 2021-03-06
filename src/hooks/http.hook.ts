import { useCallback, useState } from "react"

import { ErrorType } from "../utils/ErrorsHanding"
import { timeLoading } from "./constants"

type RequestType = {
    url: string,
    method?: string, 
    body?: any, 
    headers?: { [x: string]: string },
    notJsonContent?: boolean
}

type ErrorMapType = {
    param: string,
    msg: string,
}

export const API = `${process.env.REACT_APP_API_URL}api`

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [errorsValid, setErrorsValid] = useState<ErrorType[] | null>(null)

    const request = useCallback(async({ url, method = 'GET', body, headers = {}, notJsonContent = false }: RequestType) => {
        setLoading(true)
        setErrorsValid(null)

        try {
            if (body && !notJsonContent) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(`${API}/${url}`, { method, body, headers })

            const data = await response.json()

            if (!response.ok) {
                const errors = data.errors?.map((error: ErrorMapType) => ({
                    errorField: error.param,
                    errorText: error.msg
                }))

                setErrorsValid(errors)

                throw new Error(data.message || 'Error Error!')
            }

            return data
        } catch (e: any) {
            setError(e.message)
            throw e
        } finally {
            setTimeout(() => 
                setLoading(false)
            , timeLoading) 
        }
    }, [])

    const clearError = useCallback(() => {
        setError(null)
        setErrorsValid(null)
    }, [])
    
    return { loading, setLoading, request, error, clearError, errorsValid }
}
