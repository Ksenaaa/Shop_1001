import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import HomeIcon from '@material-ui/icons/Home';
import ListSubheader from '@material-ui/core/ListSubheader';

import { AuthContext } from '../../../context/AuthContext';
import { NestedList } from '../../nestedList/NestedList';
import { NestedListItem } from '../../nestedList/NestedListItem';
import { RouteNames } from '../../../interface/IRoute';
import { useStyles } from '../style';

export const MenuList = () => {
  const { userAuth } = useContext(AuthContext)
  
  const classes = useStyles()

  return (
    <NestedList 
      className={classes.nestedList}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Menu
        </ListSubheader>
      }
    >
      <>`
        <Link to={RouteNames.MAIN} className={classes.linkNested}>
          <NestedListItem
            itemText="Main"
          >
            <HomeIcon />
          </NestedListItem>
        </Link>
        {(userAuth.userRole !== 'buyer') &&
          <>
            <Link to={RouteNames.CREATE_BOOK} className={classes.linkNested}>
              <NestedListItem
                itemText="Create product"
              >
                <AddCircleOutlineIcon />
              </NestedListItem>
            </Link>
            <Link to={RouteNames.BOOKS_SELLER} className={classes.linkNested}>
              <NestedListItem
                itemText="My books"
              >
                <CollectionsBookmarkIcon />
              </NestedListItem>
            </Link>
          </>
        }
      </>
    </NestedList>
  )
}
