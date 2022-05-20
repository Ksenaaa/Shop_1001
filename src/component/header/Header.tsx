import React, { useState, useContext, useRef } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { AuthContext } from '../../context/AuthContext';
import { useStyles } from './style';

export const Header = () => {
  const classes = useStyles();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const {logout, userAuth} = useContext(AuthContext)

  const handleMenuOpen = () => setMenuOpen(true)
  const handleMenuClose = () => setMenuOpen(false)
  const handleMenuCloseExitUser = () => {
    setMenuOpen(false)
    logout()
  }

  const ref = useRef(null)

  return (
    <div className={classes.grow} ref={ref}>
      <AppBar position="static">
        <Toolbar>
          {(userAuth.token) ?
            <>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
            Page
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                  <MailIcon />
              </IconButton>
              <IconButton color="inherit">
                  <ShoppingBasketIcon />
              </IconButton>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircle />
              </IconButton>
            </div>
            </>
            : ""
          }
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={ref?.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>My profil</MenuItem>
        <MenuItem onClick={handleMenuCloseExitUser}>Exit</MenuItem>
      </Menu>
    </div>
  )
}
