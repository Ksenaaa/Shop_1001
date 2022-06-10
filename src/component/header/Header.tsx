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
import { MenuList } from './components/MenuList';

export const Header = () => {
  const [isMenuUserOpen, setMenuUserOpen] = useState<boolean>(false)
  const [isMenuListOpen, setMenuListOpen] = useState<boolean>(false)
  
  const {logout, userAuth} = useContext(AuthContext)
  
  const ref = useRef(null)

  const classes = useStyles()

  const onLogout = () => {
    setMenuUserOpen(false)
    logout()
  }

  return (
    <div className={classes.grow} ref={ref}>
      <AppBar position="static">
        <Toolbar>
          {userAuth.token &&
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                onClick={() => setMenuListOpen(true)}
              >
                <MenuIcon />
              </IconButton>

              {isMenuListOpen &&
                <div onClick={() => setMenuListOpen(false)} className={classes.closeMenu}>
                  <MenuList/>
                </div>
              }

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
                <IconButton color="inherit" onClick={() => setMenuUserOpen(true)}>
                  <AccountCircle />
                </IconButton>
              </div>
            </>
          }
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={ref?.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuUserOpen}
        onClose={() => setMenuUserOpen(false)}
      >
        <MenuItem onClick={() => setMenuUserOpen(false)}>My profil</MenuItem>
        <MenuItem onClick={onLogout}>Exit</MenuItem>
      </Menu>
    </div>
  )
}
