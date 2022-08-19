export const optionsSort = ['year', 'price', 'name']

export enum FilterOption {
    Checkbox = 'checkbox',
    Range = 'number',
}

export interface Filter {
    id: string,
    type: FilterOption,
    label: string,
    payload: string[] | RangeType,
}

export const optionsFilter: Filter[] = [
    {
        id: '1',
        type: FilterOption.Checkbox,
        label: 'category',
        payload: ['astronomy', 'geography', 'history', 'humour', 'medicine', 'romance', 'science']
    }, 
    {
        id: '2',
        type: FilterOption.Range,
        label: 'page',
        payload: {} as RangeType,
    }, 
    {
        id: '3',
        type: FilterOption.Range,
        label: 'year',
        payload: {} as RangeType,
    }, 
    {
        id: '4',
        type: FilterOption.Checkbox,
        label: 'language',
        payload: ['ukrainian', 'english', 'poland']
    }, 
    {
        id: '5',
        type: FilterOption.Range,
        label: 'price',
        payload: {} as RangeType,
    }, 
]

export enum RangeType {
    From = 'from',
    To = 'to'
}

export enum SORT {
    asc = 'asc',
    desc = 'desc'
}
