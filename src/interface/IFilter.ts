export type RangeFilter = {
    from?: string, 
    to?: string,
}

export interface IFilter {
    category?: string[],
    page?: RangeFilter,
    year?: RangeFilter,
    language?: string[],
    price?: RangeFilter,
}
