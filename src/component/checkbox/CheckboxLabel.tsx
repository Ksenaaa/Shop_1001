import React, { FC, UIEvent, useCallback } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { RangeFilter } from '../../interface/IFilter';

type Props = {
  itemText: string,
  optionLabel: string,
  optionType: string,
  checkboxItems?: string[],
  addFilterCategory: (name: string, item: string | RangeFilter, type: string) => void,
}

export const CheckboxLabel: FC<Props> = ({ itemText, checkboxItems, optionLabel, optionType, addFilterCategory }) => {
  const handleClick = useCallback((e: UIEvent<HTMLLabelElement>) => 
    e.stopPropagation()
  , [])

  const handleChangeCheckbox = useCallback(() => 
    addFilterCategory(optionLabel, itemText, optionType)
  , [addFilterCategory, optionLabel, itemText, optionType])

  const checked = !!checkboxItems?.find(filter => itemText === filter)

  return (
    <FormControlLabel onClick={handleClick} onChange={handleChangeCheckbox}
      control={
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
          checkedIcon={<CheckBoxIcon fontSize="small" />}
          checked={checked}
          name="checkedI"
        />
      }
      label={itemText}
    />
  )
}
