import React, { ChangeEvent, FC, useCallback, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { errorsForNameData, ErrorType } from '../utils/ErrorsHanding';

type InputType = {
  label: string,
  type: string,
  errors: ErrorType[] | null,
  onChange(e: ChangeEvent<HTMLInputElement>): void,
  name: string,
}

const useStyles = makeStyles( (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35.6ch',
    },
  },
}));

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
