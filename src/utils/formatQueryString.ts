export type queryParams = {
    limit?: number,
    page?: number,
    search?: string,
}

export const formatQueryString = (url: string, queryParams: Record<string, string | number> = {}) =>
    `${url}?${Object.entries(queryParams).map(([key, value]) => `&${key}=${value}`).join('').replace('&', '')}`
