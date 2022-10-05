import React, { ReactElement, UIEvent, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { FilterSortContext } from './FilterSortContext'
import { SORT } from '../component/filter-sort/constants'
import { IFilter, RangeFilter } from '../interface/IFilter'
import { formatQueryStringFilter } from '../utils/formatQueryString'
import { onParseFilter } from '../utils/parceFilterParams'
import { addFilterByOptions } from '../utils/addFilterByOptions'

type Props = {
   setBooks: ([]) => void,
   setCurrentPage: (arg: number) => void,
   children: ReactElement,
}

export enum FilterParams {
   SORT_FIELD = 'sortfield',
   SORT_ORDER = 'sortorder',
   SEARCH = 'search',
   FILTER = 'filter',
}
 
export const FilterSortProvider = ({ setBooks, setCurrentPage, children }: Props) => {
   const [searchParams, setSearchParams] = useSearchParams()

   const [sortField, setSortField] = useState<string>(searchParams.get(FilterParams.SORT_FIELD) || '')
   const [sortOrder, setSortOrder] = useState<SORT | string>(searchParams.get(FilterParams.SORT_ORDER) || SORT.asc)
   const [filterCategory, setFilterCategory] = useState<IFilter>({})
   const [applyFilter, setApplyFilter] = useState<IFilter>(onParseFilter(searchParams.get(FilterParams.FILTER)) || {})
   const [searchText, setSearchText] = useState<string>(searchParams.get(FilterParams.SEARCH) || '')

   const onSort = useCallback((e: UIEvent<SVGSVGElement>) => {
      e.stopPropagation()
      setBooks([])
      setCurrentPage(1)
      setSortOrder(prevSort => (prevSort === SORT.asc ? SORT.desc : SORT.asc))
   }, [])

   const pickFieldForSort = useCallback((name: string) => {
      setBooks([])
      setCurrentPage(1)
      setSortField(name)
   }, [])

   const addFilterCategory = useCallback((name: string, item: string | RangeFilter, type: string) => 
      setFilterCategory(prevFilter => addFilterByOptions({ prevFilter, name, item, type }))
   , [])

   const onFilter = useCallback(() => {
      if (filterCategory !== applyFilter) {
         setBooks([])
         setCurrentPage(1)
         setApplyFilter(filterCategory)
      }
   }, [filterCategory, applyFilter]) 
   
   const onSearch = useCallback((text: string) => {
      setBooks([])
      setCurrentPage(1)
      setSearchText(text)
   }, []) 

   useEffect(() => {
      let params: Record<string, string> = {}
      if (sortField.length) params[FilterParams.SORT_FIELD] = sortField
      if (sortField.length) params[FilterParams.SORT_ORDER] = sortOrder
      if (searchText.length) params[FilterParams.SEARCH] = searchText
      if (Object.keys(applyFilter).length != 0) params[FilterParams.FILTER] = formatQueryStringFilter(applyFilter)
      setSearchParams(params)
   }, [searchText, applyFilter, sortField, sortOrder])

   const clearFilters = useCallback(() => 
      setFilterCategory(applyFilter)
   , [applyFilter]) 
      
   const onRemoveFilters = useCallback(() => {
      setBooks([])
      setCurrentPage(1)
      setSortField('')
      setSortOrder(SORT.asc)
      setApplyFilter({})
      setFilterCategory({})
      setSearchText('')
   }, []) 

   const value = { 
      onSort, 
      pickFieldForSort, 
      onFilter, 
      onRemoveFilters, 
      clearFilters,
      sortField, 
      sortOrder, 
      filterCategory,
      applyFilter,
      addFilterCategory,
      searchText,
      onSearch,
   }

   return (
      <FilterSortContext.Provider value={value}>
         {children}
      </FilterSortContext.Provider>
   )
}
