import React, { ChangeEvent, FC, useCallback } from 'react'

import { IFilter, RangeFilter } from '../../../interface/IFilter'
import { CheckboxLabel } from '../../checkbox/CheckboxLabel'
import { TextFields } from '../../input/Input'
import { FilterOption, RangeType } from '../constants'

type Props = {
    optionPayload: string[] | RangeType,
    optionLabel: keyof IFilter,
    optionType: FilterOption,
    addFilterCategory: (name: string, item: string | RangeFilter, type: string) => void,
    filterCategory: IFilter,
}
  
export const FilterModalOptionItems: FC<Props> = ({ optionPayload, optionLabel, optionType, filterCategory, addFilterCategory }) => {
    const handleChangeInput = useCallback(({ target }: ChangeEvent<HTMLInputElement>): void => 
        addFilterCategory(optionLabel, { [target.name]: target.value || '0' } as RangeFilter, optionType)
    , [addFilterCategory, optionLabel, optionType])

    const valueInputFilter = filterCategory[optionLabel as keyof IFilter] as RangeFilter
    
    return (
        <>
            {optionType === FilterOption.Checkbox && 
                (optionPayload as string[])?.map(optionItem =>
                    <CheckboxLabel 
                        key={optionItem} 
                        itemText={optionItem}
                        optionLabel={optionLabel}
                        optionType={optionType}
                        checkboxItems={filterCategory?.[optionLabel] as string[]}
                        addFilterCategory={addFilterCategory} 
                    />
                )
            }
            {optionType === FilterOption.Range && 
                <div className="wrapperOptionInputText">
                    <TextFields
                        label="from:" 
                        type="text" 
                        name="from" 
                        value={valueInputFilter?.from || ''}
                        onChange={handleChangeInput}
                        errors={null}
                    />
                    <TextFields
                        label="to:" 
                        type="text" 
                        name="to" 
                        value={valueInputFilter?.to || ''}
                        onChange={handleChangeInput}
                        errors={null}
                    />
                </div>
            }
        </>
    )
}
