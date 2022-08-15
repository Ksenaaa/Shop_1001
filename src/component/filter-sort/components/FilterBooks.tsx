import React, { FC, useCallback, useContext } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Button } from '@material-ui/core';

import { optionsFilter } from '../constants';
import { useToggle } from '../../../hooks/toggle.hook';
import { NestedList } from '../../nestedList/NestedList';
import { FilterModalOptions } from './FilterModalOptions';
import { FilterSortContext } from '../../../context/FilterSortContext';

import '../style.css'

export const FilterBooks: FC = () => {
    const { isOpen: isOpenModal, onToggle: toggleOpenModal } = useToggle()
    
    const { onFilter, clearFilters, filterCategory, addFilterCategory } = useContext(FilterSortContext)

    const onCloseMenu = useCallback(() => {
        toggleOpenModal()
        clearFilters()
    }, [toggleOpenModal, clearFilters])

    return (
        <div className="wrapper-button-filter">
            <div onClick={toggleOpenModal}>
                Filter
                <ArrowDropDownIcon />
                {!!Object.keys(filterCategory).length && <FilterListIcon />}
            </div>
            {isOpenModal &&
                <>
                    <NestedList className="wrapper-modalList" >
                        <>
                            {optionsFilter.map(option => 
                                <FilterModalOptions 
                                    key={option.id} 
                                    option={option} 
                                    addFilterCategory={addFilterCategory}
                                    filterCategory={filterCategory}
                                />
                            )}
                            <div className="buttonApply" onClick={toggleOpenModal}>
                                <Button
                                    variant="outlined" 
                                    color="secondary"
                                    onClick={onFilter}
                                >
                                    Apply
                                </Button>
                            </div>
                        </>
                    </NestedList>
                    <div onClick={onCloseMenu} className="closeModal" />
                </>
            }
        </div>
    )
}
