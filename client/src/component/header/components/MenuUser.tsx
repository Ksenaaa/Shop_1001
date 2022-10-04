import React, { FC } from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { NestedList } from '../../nestedList/NestedList';
import { NestedListItem } from '../../nestedList/NestedListItem';
import { useStyles } from '../style';

type Props = {
  onLogout: () => void,
}

export const MenuUser: FC<Props> = ({ onLogout }) => {  
  const classes = useStyles()

  return (
    <NestedList className={classes.nestedListUser}>
      <>
        <div className={classes.linkNested}>
          <NestedListItem
            itemText="My profil"
          >
            <AccountCircleIcon />
          </NestedListItem>
        </div>
        <div onClick={onLogout} className={classes.linkNested}>
          <NestedListItem
            itemText="Exit"
          >
            <ExitToAppIcon />
          </NestedListItem>
          </div>
      </>
    </NestedList>
  )
}
