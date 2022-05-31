import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    padding: '0 0 0 2px',
  },
  nestedText: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
}));