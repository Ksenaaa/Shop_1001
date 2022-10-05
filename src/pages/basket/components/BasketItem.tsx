import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useNavigate } from 'react-router'

import { IBook } from '../../../interface/IBook'
import { RouteNames } from '../../../interface/IRoute'
import { LocalStorageBookType } from '../../../hooks/basket.hook'
import { countBook, sumBook } from '../utils'

import '../style.css'

type Props = {
    book: IBook,
    booksLocalStore: LocalStorageBookType[],
    removeBookFromBasket: (id: string) => void,
    addBookToBasket: (id: string) => void,
    decreaseBookFromBasket: (id: string) => void,
}

export const BasketItem: FC<Props> = ({ book, booksLocalStore, removeBookFromBasket, addBookToBasket, decreaseBookFromBasket }) => {
    const [count, setCount] = useState<number>()
    const [sum, setSum] = useState<number>()

    const navigate = useNavigate()

    useEffect(() => {
        setCount(countBook(booksLocalStore, book.idBook))
        setSum(sumBook(booksLocalStore, book.idBook, book.price))
    }, [book.idBook, book.price, booksLocalStore, countBook, sumBook])
    
    const increaseBookToLocalStorage = useCallback(() => 
        addBookToBasket(book.idBook)
    , [book.idBook, addBookToBasket])

    const decreaseBookToLocalStorage = useCallback(() => 
        decreaseBookFromBasket(book.idBook)
    , [book.idBook, decreaseBookFromBasket])

    const handlerDeleteBooks = useCallback(() => 
        removeBookFromBasket(book.idBook)
    , [book.idBook, removeBookFromBasket])
    
    const navigateToBookPage = useCallback(() => 
        navigate(`${RouteNames.BOOK_PAGE}/${book.idBook}`)
    , [book.idBook])

    return(
        <div className="wrapperBasketItem">
            <div className="basketBookImg">
                <img src={`${process.env.REACT_APP_API_URL}${book.img}`} alt="book" />
            </div>
            <div className="basketBookName" onClick={navigateToBookPage}>
                {book.bookName}
            </div>
            <div className="basketBookNum">
                {count}
                <ExpandLessIcon className="basketExpandMax" onClick={increaseBookToLocalStorage}/>
                <ExpandMoreIcon className="basketExpandMin" onClick={decreaseBookToLocalStorage}/>
            </div>
            <div className="basketBookNum">{book.price}</div>
            <div className="basketBookNum">{sum}</div>
            <div className="buttonDeleteBook">
                <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={handlerDeleteBooks}
                >
                    X
                </Button>
            </div>
        </div>
    )
}
