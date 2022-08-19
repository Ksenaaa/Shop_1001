import React, { FC, useCallback } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { NestedListItem } from '../../nestedList/NestedListItem'
import { FilterModalOptionItems } from './FilterModalOptionItems'
import { useToggle } from '../../../hooks/toggle.hook';
import { IFilter, RangeFilter } from '../../../interface/IFilter';
import { Filter } from '../constants';

type Props = {
    option: Filter,
    addFilterCategory: (name: string, item: string | RangeFilter, type: string) => void,
    filterCategory: IFilter,
}
  
export const FilterModalOptions: FC<Props> = ({ option, filterCategory, addFilterCategory }) => {
    const { isOpen: isOpenModalCategory, onToggle: toggleOpenModalCategory } = useToggle()

    const handleClick = useCallback(() => 
        toggleOpenModalCategory()
    , [toggleOpenModalCategory])

    return (
        <>
            <NestedListItem itemText={option.label} onClick={handleClick} >
                <ArrowDropDownIcon />
            </NestedListItem>
            {isOpenModalCategory && 
                <div className="wrapperFilterModalItemCategory">
                    <FilterModalOptionItems 
                        optionLabel={option.label as keyof IFilter}
                        optionType={option.type}
                        optionPayload={option.payload} 
                        addFilterCategory={addFilterCategory} 
                        filterCategory={filterCategory} 
                    />
                </div>
            }
        </>
    )
}
