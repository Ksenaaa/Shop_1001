import React, { FC, UIEvent, useCallback, useContext } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SortIcon from '@material-ui/icons/Sort';

import { SortModalItem } from './SortModalItem';
import { optionsSort, SORT } from '../constants';
import { useToggle } from '../../../hooks/toggle.hook';
import { NestedList } from '../../nestedList/NestedList';
import { FilterSortContext } from '../../../context/FilterSortContext';

import '../style.css'

export const SortBooks: FC = () => {
    const { isOpen: isOpenModal, onToggle: toggleOpenModal } = useToggle()

    const { sortField, sortOrder, pickFieldForSort, onSort } = useContext(FilterSortContext)

    const onCloseMenu = useCallback((e: UIEvent<HTMLDivElement>) => {
        e.stopPropagation()
        toggleOpenModal()
    }, [toggleOpenModal])

    return (
        <div 
            className="wrapper-button-filter"
            onClick={toggleOpenModal}
        >
            <div>
                Sort
                <ArrowDropDownIcon />
                {sortField}
            </div>
            {sortField &&
                <SortIcon 
                    onClick={onSort} 
                    className={sortOrder === SORT.asc ? "sort-arrow-upend" : "sort-arrow"}
                />
            }
            {isOpenModal &&
                <>
                    <NestedList className="wrapper-modalList">
                        <>
                            {optionsSort.map(option =>
                                <SortModalItem 
                                    key={option} 
                                    option={option} 
                                    onSelection={pickFieldForSort}
                                />
                            )}
                        </>
                    </NestedList>
                    <div onClick={onCloseMenu} className="closeModal" />
                </>
            }
        </div>
    )
}
