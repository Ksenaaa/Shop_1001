import React, { createContext, UIEvent } from "react";

import { SORT } from "../component/filter-sort/constants";
import { IFilter, RangeFilter } from "../interface/IFilter";

export type FilterSortContextType = {
    onSort: (e: UIEvent<SVGSVGElement>) => void,
    pickFieldForSort: (name: string) => void,
    onFilter: () => void, 
    onRemoveFilters: () => void, 
    clearFilters: () => void, 
    sortField: string,
    sortOrder: SORT | string,
    filterCategory: IFilter,
    applyFilter: IFilter,
    addFilterCategory: (name: string, item: string | RangeFilter, type: string) => void,
    searchText: string,
    onSearch: (text: string) => void,
}

export const FilterSortContext = createContext<FilterSortContextType>({ 
    onSort: (e: UIEvent<SVGSVGElement>) => {},
    pickFieldForSort: (name: string) => {},
    onFilter: () => {}, 
    onRemoveFilters: () => {}, 
    clearFilters: () => {}, 
    sortField: '',
    sortOrder: SORT.asc,
    filterCategory: {},
    applyFilter: {},
    addFilterCategory: (name: string, item: string | RangeFilter, type: string) => {},
    searchText: '',
    onSearch: (text: string) => {},
})
