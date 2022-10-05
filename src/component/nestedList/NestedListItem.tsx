import React, { FC, ReactElement } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { useStyles } from './style';

type Props = {
  children?: ReactElement,
  itemText: string,
  onClick?: () => void,
}

export const NestedListItem: FC<Props> = ({ children, itemText, onClick }) => {
  const classes = useStyles()

  return (
    <ListItem className={classes.nested} onClick={onClick}>
      <ListItemIcon>
        {children}
      </ListItemIcon>
      <ListItemText className={classes.nestedText}>
        {itemText}
      </ListItemText>
    </ListItem>
  )
}
