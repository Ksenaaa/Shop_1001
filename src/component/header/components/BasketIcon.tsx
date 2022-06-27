import React, { useCallback, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { RouteNames } from '../../../interface/IRoute';
import { BasketContext } from '../../../context/BasketContext';
import { useStyles } from '../style';
import { LocalStorageBookType } from '../../../hooks/basket.hook';

export const BasketIcon = () => {
    const { booksLocalStore } = useContext(BasketContext)

    const navigate = useNavigate()
    const classes = useStyles()

    const count = useMemo(() => 
        booksLocalStore.reduce((total: number, book: LocalStorageBookType) => total + +book.quantity, 0)
    , [booksLocalStore])

    const handlerToBasketPage = useCallback(() => 
        navigate(RouteNames.BASKET)
    , [])

    return (
        <IconButton color="inherit" onClick={handlerToBasketPage}>
            {!!count &&
                <div className={classes.badge}>
                    {count}
                </div>
            }
            <ShoppingBasketIcon />
        </IconButton>
    )
}
