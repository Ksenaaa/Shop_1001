import React, { FC, ReactElement } from 'react';
import List from '@material-ui/core/List';

type Props = {
  children: ReactElement,
  className?: string,
  subheader?: ReactElement,
}

export const NestedList: FC<Props> = ({ children, className, subheader }) => (
  <List
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={subheader}
    className={className}
  >
    {children}
  </List>
)
