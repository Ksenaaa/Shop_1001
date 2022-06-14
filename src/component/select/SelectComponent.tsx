import React, { ChangeEvent, FC, ReactElement, useMemo } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { handleErrors, ErrorType } from '../../utils/ErrorsHanding';
import { useStyles } from './style';

type Props = {
  label: string,
  errors: ErrorType[] | null,
  onChange(e: ChangeEvent<HTMLInputElement>): void,
  name: string,
  children: ReactElement,
  value: string,
}

export const SelectComponent: FC<Props> = ({ label, name, errors, onChange, children, value }) => {
  const classes = useStyles()

  const error = useMemo(() => handleErrors({ name, errors }), [name, errors]) 

  return (
    <FormControl 
      variant="outlined" 
      className={classes.formControl}
      onChange={onChange}
      error={!!error}
    >
      <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
      <Select
        native
        label={label}
        name={name}
        value={value}
      >
        <option aria-label="None" value='' />
        {children}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  )
}
