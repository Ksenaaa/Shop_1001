import { useCallback, useState } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [errorsValid, setErrorsValid] = useState(null)

    const request = useCallback( async (url: string, method = 'GET', body: any = null, headers: any = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if(!response.ok) {
                const errorsArray = ():any => {
                    let m:any = []
                    const er = data.errors.filter((error: any) => {
                        m.push({
                            nameData: error.param,
                            errorText: error.msg
                        })
                    })
                    return m
                }
                setErrorsValid(errorsArray())

                throw new Error(data || 'Error Error!')
            }

            return data
        } catch (e: any) {
            setError(e.message)
            throw e
        } finally {
            setLoading(false)
        }
    }, [])

    const clearError = useCallback(() => {
        setError(null)
        setErrorsValid(null)
    }, [])
    
    return {loading, request, error, clearError, errorsValid}
}