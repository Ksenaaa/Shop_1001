import React, { FC } from 'react';
import MuiAlert from '@material-ui/lab/Alert';

import { useStyles } from './style';

type Props = {
  alertMessage: string,
}

export const SnackbarAccepted: FC<Props> = ({ alertMessage }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          {alertMessage}
        </MuiAlert>
    </div>
  )
}
