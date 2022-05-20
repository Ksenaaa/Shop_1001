import React, { ChangeEvent, FC, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';

import { errorsForNameData, ErrorType } from '../../utils/ErrorsHanding';
import { useStyles } from './style';

type InputType = {
  label: string,
  type: string,
  errors: ErrorType[] | null,
  onChange(e: ChangeEvent<HTMLInputElement>): void,
  name: string,
}

export const TextFields: FC<InputType> = ({label, type, errors, onChange, name}) => {
  const classes = useStyles();

  const error = useMemo(() => errorsForNameData({name, errors}), [name, errors]) 
  
  return (
    <div className={classes.root} >
        <TextField
          error={!!error}
          variant="outlined" 
          label={label} 
          type={type}
          onChange={onChange}
          name={name}
          helperText={error}
        />    
    </div>
  )
}
