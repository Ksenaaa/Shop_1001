import React, { FC, useCallback, useState } from 'react'
import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

import { IBook } from '../../interface/IBook'
import { RouteNames } from '../../interface/IRoute'

import './style.css'

type Props = {
    book: IBook
    addBookToBasket: (id: string) => void
}

export const BookItem: FC<Props> = ({ book, addBookToBasket }) => {
    const [favoriteBook, setFavoriteBook] = useState(false)
    
    const navigate = useNavigate()

    const handlerFavoriteBook = useCallback(() => 
        setFavoriteBook(favoriteBook === true ? false : true)
    , [favoriteBook])

    const handlerClickButton = useCallback(() => 
        addBookToBasket(book.idBook)
    , [book.idBook, addBookToBasket])

    const navigateToBookPage = useCallback(() => 
        navigate(`${RouteNames.BOOK_PAGE}/${book.idBook}`)
    , [book.idBook])

    return(
        <div className="wrapperBookItem">
            <div className="bookImg">
                <img src={`${process.env.REACT_APP_API_URL}${book.img}`} alt="book" />
            </div>
            <div className="bookText">
                <div className="bookName" onClick={navigateToBookPage}>
                    {book.bookName}
                </div>
                <div className="bookAuthor">{book.author}</div>
            </div>
            <div className="bookPrice">{book.price}</div>
            <div className="buttonBuy">
                <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={handlerClickButton}
                >
                    Buy
                </Button>
            </div>
            <div className="favoriteBook" onClick={handlerFavoriteBook}>
                {favoriteBook ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </div>
        </div>
    )
}
