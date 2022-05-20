import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from './style';

export default function LoadingCircular() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="primary" />
    </div>
  )
}
