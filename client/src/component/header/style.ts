import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  closeMenu: {
    height: '100%',
    padding: '100%',
    position:'absolute',
    zIndex: 10,
    left: 0,
    top: 0,
  },
  closeUser: {
    height: '100%',
    padding: '100%',
    position:'absolute',
    zIndex: 10,
    right: 0,
    top: 0,
  },
  nestedList: {
    width: '100%',
    maxWidth: 260,
    backgroundColor: theme.palette.background.paper,
    display: 'block',
    opacity: 1,
    zIndex: 11,
    position: 'absolute',
    left: 0,
    top: '6ch',
    boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
    borderRadius: '4px',
    transform: 'scale(1)',
    transition: '0.5s',
  },
  nestedListUser: {
    width: '100%',
    maxWidth: 260,
    backgroundColor: theme.palette.background.paper,
    display: 'block',
    opacity: 1,
    zIndex: 11,
    position: 'absolute',
    right: 0,
    top: '6ch',
    boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
    borderRadius: '4px',
    transform: 'scale(1)',
    transition: '0.5s',
  },
  linkNested: {
    textDecoration: 'none',
  },
  badge: {
    top: 1,
    right: 0,
    color: '#fff',
    backgroundColor: '#f50057',
    height: '20px',
    display: 'flex',
    padding: '0 6px',
    zIndex: 11,
    position: 'absolute',
    flexWrap: 'wrap',
    fontSize: '0.75rem',
    minWidth: '20px',
    boxSizing: 'border-box',
    transition: 'transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    alignItems: 'center',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    lineHeight: 1,
    alignContent: 'center',
    borderRadius: '10px',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}))