import React, { useCallback, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { RouteNames } from '../../../interface/IRoute';
import { BasketContext } from '../../../context/BasketContext';
import { useStyles } from '../style';

export const BasketIcon = () => {
    const { booksLocalStore } = useContext(BasketContext)

    const navigate = useNavigate()
    const classes = useStyles()

    const count = useMemo(() => 
        booksLocalStore.map(book => +book.quantity).reduce((total: number, amount: number) => total + amount, 0)
    , [booksLocalStore])

    const handlerToBasketPage = useCallback(() => {
        navigate(RouteNames.BASKET)
    }, [])

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
