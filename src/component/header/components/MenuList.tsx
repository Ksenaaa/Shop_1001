import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import HomeIcon from '@material-ui/icons/Home';

import { AuthContext } from '../../../context/AuthContext';
import { useStyles } from '../style';
import { NestedList } from '../../nestedList/NestedList';
import { NestedListItem } from '../../nestedList/NestedListItem';
import { RouteNames } from '../../../interface/IRoute';

export const MenuList = () => {
  const classes = useStyles()
  const {userAuth} = useContext(AuthContext)

  return (
    <>
      <NestedList className={classes.nestedList}>
        <>
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
    </>
  )
}
