import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    position: 'absolute',
    top: '50%',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
  },
}))
