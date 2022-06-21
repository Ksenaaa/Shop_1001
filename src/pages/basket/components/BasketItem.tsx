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
    bookLocalStorRemove: (id: string) => void,
    bookToLocalStorage: (id: string) => void,
    bookDecreaseInLocalStorage: (id: string) => void,
}

export const BasketItem: FC<Props> = ({ book, booksLocalStore, bookLocalStorRemove, bookToLocalStorage, bookDecreaseInLocalStorage }) => {
    const [count, setCount] = useState<number>()
    const [sum, setSum] = useState<number>()

    const navigate = useNavigate()

    useEffect(() => {
        setCount(countBook(booksLocalStore, book.idBook))
        setSum(sumBook(booksLocalStore, book.idBook, book.price))
    }, [book.idBook, book.price, booksLocalStore, countBook, sumBook])
    
    const handlerIncreaseBookToLocalStorage = useCallback(() => {
        bookToLocalStorage(book.idBook)
    }, [book.idBook, bookToLocalStorage])

    const handlerDecreaseBookToLocalStorage = useCallback(() => {
        bookDecreaseInLocalStorage(book.idBook)
    }, [book.idBook, bookDecreaseInLocalStorage])

    const handlerDeleteBooks = useCallback(() => {
        bookLocalStorRemove(book.idBook)
    }, [book.idBook, bookLocalStorRemove])
    
    const handlerGoToBookPage = useCallback(() => {
        navigate(`${RouteNames.BOOK_PAGE}/${book.idBook}`)
    }, [book.idBook])

    return(
        <div className="wrapperBasketItem">
            <div className="basketBookImg">
                <img src={`${process.env.REACT_APP_API_URL}${book.img}`} alt="book" />
            </div>
            <div className="basketBookName" onClick={handlerGoToBookPage}>
                {book.bookName}
            </div>
            <div className="basketBookNum">
                {count}
                <ExpandLessIcon className="basketExpandMax" onClick={handlerIncreaseBookToLocalStorage}/>
                <ExpandMoreIcon className="basketExpandMin" onClick={handlerDecreaseBookToLocalStorage}/>
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
