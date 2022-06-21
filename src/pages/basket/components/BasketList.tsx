import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@material-ui/core'

import { BasketItem } from './BasketItem'
import { BasketContext } from '../../../context/BasketContext'
import { IBook } from '../../../interface/IBook'
import { sumBook } from '../utils'
import { RouteNames } from '../../../interface/IRoute'

import '../style.css'

type Props = {
    books: IBook[],
}

export const BasketList: FC<Props> = ({ books }) => {
    const { booksLocalStore, bookToLocalStorage, bookLocalStorRemove, bookDecreaseInLocalStorage } = useContext(BasketContext)
    
    const navigate = useNavigate()

    const totalSum = useMemo(() => 
        books.map((book: IBook) => 
            sumBook(booksLocalStore, book.idBook, book.price))
                .reduce((total: number, amount: number) => +(total + amount).toFixed(2), 0)
    , [booksLocalStore, books])
    
    const handlerToOrder = useCallback(() => {
        navigate(RouteNames.ORDER)
    }, [])

    return (
        <div className="wrapperBasketList" >
            <div className="basketOrder">
                Order #1
            </div>
            <div className="basketHeader">
                <div className="basketHeader-other">Img</div>
                <div className="basketHeader-name">Name</div>
                <div className="basketHeader-other">Quantity</div>
                <div className="basketHeader-other">Price</div>
                <div className="basketHeader-other">Sum</div>
                <div className="basketHeader-other">Del</div>
            </div>
            {books.map(book => 
                <BasketItem 
                    key={book.idBook} 
                    book={book}
                    booksLocalStore={booksLocalStore}
                    bookLocalStorRemove={bookLocalStorRemove}
                    bookToLocalStorage={bookToLocalStorage}
                    bookDecreaseInLocalStorage={bookDecreaseInLocalStorage}
                />
            )}
            <div className="basketTotal">
                <div>total: {totalSum}$</div>
            </div>
            <div className="basketButtonBuy">
                <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={handlerToOrder}
                >
                    Buy
                </Button>
            </div>
        </div>
    )
}
