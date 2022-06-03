import React, { FC, ReactElement, SelectHTMLAttributes } from 'react';

type Props = {
  value?: string | number,
}

export const SelectOption: FC<Props> = ({value}) => {

  return (
    <option 
      value={value}
    >
      {value}
    </option>
  )
}
