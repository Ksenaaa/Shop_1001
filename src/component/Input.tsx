import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { errorsForNameData } from '../utils/ErrorsHanding';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export const TextFields:any = ({label, type, errors, onChange, name}:any) => {
  const classes = useStyles();

  const error = errorsForNameData({name, errors})
  
  return (
    <form className={classes.root} noValidate autoComplete="off" >
        <TextField
          error={!!error}
          variant="outlined" 
          label={label} 
          type={type}
          onChange={onChange}
          name={name}
          helperText={error}
        />    
    </form>
  );
}