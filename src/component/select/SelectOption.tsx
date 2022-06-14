import React, { FC } from 'react';

type Props = {
  value?: string | number,
}

export const SelectOption: FC<Props> = ({ value }) => (
  <option 
    value={value}
  >
    {value}
  </option>
)
