import React, { useContext, useRef } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { AuthContext } from '../../context/AuthContext';
import { MenuList } from './components/MenuList';
import { BasketIcon } from './components/BasketIcon';
import { MessageIcon } from './components/MessageIcon';
import { useToggle } from '../../hooks/toggle.hook';
import { MenuUser } from './components/MenuUser';
import { useStyles } from './style';

export const Header = () => {
  const { logout, userAuth } = useContext(AuthContext)

  const { isOpen: isOpenMenuList, onToggle: toggleMenuList } = useToggle()
  const { isOpen: isOpenMenuUser, onToggle: toggleMenuUser } = useToggle()

  const ref = useRef(null)

  const classes = useStyles()

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
                onClick={toggleMenuList}
              >
                <MenuIcon />
              </IconButton>
              {isOpenMenuList &&
                <div onClick={toggleMenuList} className={classes.closeMenu}>
                  <MenuList />
                </div>
              }
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <MessageIcon />
                <BasketIcon />
                <IconButton color="inherit" onClick={toggleMenuUser}>
                  <AccountCircle />
                </IconButton>
              </div>
              {isOpenMenuUser &&
                <div onClick={toggleMenuUser} className={classes.closeUser}>
                  <MenuUser onLogout={logout} />
                </div>
              }
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}
