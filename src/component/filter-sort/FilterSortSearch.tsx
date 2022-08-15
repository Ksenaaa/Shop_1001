import React, { FC } from 'react'

import { RemoveFilters } from './components/RemoveFilters'
import { FilterBooks } from './components/FilterBooks'
import { SortBooks } from './components/SortBooks'
import { Search } from './components/Search'

import './style.css'

export const FilterSortSearch: FC = () => (
    <>
        <div className="wrapperFilterSortButton">
            <RemoveFilters />
            <FilterBooks />
            <SortBooks />
        </div>
        <div className="wrapperSearch">
            <Search />
        </div>
    </>
)
