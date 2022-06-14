import React, { FC, ReactElement } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

type Props = {
  children: ReactElement,
  className: string,
}

export const NestedList: FC<Props> = ({ children, className }) => (
  <List
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
      <ListSubheader component="div" id="nested-list-subheader">
        Menu
      </ListSubheader>
    }
    className={className}
  >
      {children}
  </List>
)
