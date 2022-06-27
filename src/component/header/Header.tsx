import React, { useState, useContext, useRef, useCallback } from 'react'
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

import { AuthContext } from '../../context/AuthContext';
import { MenuList } from './components/MenuList';
import { BasketIcon } from './components/BasketIcon';
import { MessageIcon } from './components/MessageIcon';
import { useToggle } from '../../hooks/toggle.hook';
import { useStyles } from './style';

export const Header = () => {
  const { logout, userAuth } = useContext(AuthContext)

  const { isOpen: isOpenMenuList, onToggle: toggleMenuList } = useToggle()

  const { isOpen: isOpenMenuUser, onToggle: toggleMenuUser } = useToggle()

  const ref = useRef(null)

  const classes = useStyles()

  const handlerLogout = () => {
    toggleMenuUser()
    logout()
  }

  const openMenuList = useCallback(() => 
    toggleMenuList()
  , [toggleMenuList])

  const openMenuUser = useCallback(() => 
    toggleMenuUser()
  , [toggleMenuUser])

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
                onClick={openMenuList}
              >
                <MenuIcon />
              </IconButton>

              {isOpenMenuList &&
                <div onClick={openMenuList} className={classes.closeMenu}>
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
                <MessageIcon />
                <BasketIcon />
                <IconButton color="inherit" onClick={openMenuUser}>
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
        open={isOpenMenuUser}
        onClose={openMenuUser}
      >
        <MenuItem onClick={openMenuUser}>My profil</MenuItem>
        <MenuItem onClick={handlerLogout}>Exit</MenuItem>
      </Menu>
    </div>
  )
}
