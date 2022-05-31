import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    background: 'rgba(2,2,2,0.3)',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));
