import React, { ChangeEvent, FC, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import { formatValue } from 'react-currency-input-field';

import { handleErrors, ErrorType } from '../../utils/ErrorsHanding';
import { useStyles } from './style';

type InputType = {
  label: string,
  type: string,
  errors: ErrorType[] | null,
  onChange(e: ChangeEvent<HTMLInputElement>): void,
  name: string,
  value?: string,
}

export const TextFields: FC<InputType> = ({label, type, errors, onChange, name, value}) => {
  const classes = useStyles();

  const error = useMemo(() => handleErrors({name, errors}), [name, errors]) 
  

  return (
    <div className={classes.root} >
        <TextField
          error={!!error}
          variant="outlined" 
          label={label} 
          type={type}
          onChange={onChange}
          name={name}
          value={value}
          helperText={error}
        />    
    </div>
  )
}
