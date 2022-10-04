import { IFilter } from "../interface/IFilter"

export type queryParams = {
    limit?: number,
    page?: number,
    search?: string,
    id?: string[]
}

export const formatQueryString = (url: string, queryParams: Record<string, string | number | string[] | IFilter> = {}) =>
    `${url}?${Object.entries(queryParams).map(([key, value]) => `&${key}=${value}`).join('').replace('&', '')}`

export const formatQueryStringFilter = (params: IFilter) => {
    return `${Object.entries(params)
        .map(([key, value]) => Array.isArray(value) ? `${key}=${value}` : `${key}=${Object.entries(value).map(i=> i.join(':'))}`)
        .join(';')
    }`
}
