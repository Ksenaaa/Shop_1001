import React, { FC, ReactElement, SelectHTMLAttributes } from 'react';

export const SelectOption: FC<SelectHTMLAttributes<ReactElement>> = ({value}) => {

  return (
    <option 
      value={value}
    >
      {value}
    </option>
  )
}
