import React, { FC, useContext } from 'react'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

import { FilterSortContext } from '../../../context/FilterSortContext';

import '../style.css'

export const RemoveFilters: FC = () => {

    const { onRemoveFilters } = useContext(FilterSortContext)

    return (
        <>
            <div 
                className="wrapper-button-filter"
                onClick={onRemoveFilters}
            >
                <DeleteSweepIcon />
            </div>
        </>
    )
}
