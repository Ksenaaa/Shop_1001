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
}

export const BookItem: FC<Props> = ({ book }) => {
    const [favoriteBook, setFavoriteBook] = useState(false)
    
    const navigate = useNavigate()

    const handlerFavoriteBook = useCallback(() => {
        setFavoriteBook(favoriteBook === true ? false : true)
    }, [favoriteBook])

    return(
        <div className="wrapperBookItem">
            <div className="bookImg">
                <img src={`${process.env.REACT_APP_API_URL}${book.img}`} alt="book" />
            </div>
            <div className="bookText">
                <div className="bookName" onClick={() => navigate(`${RouteNames.BOOK_PAGE}/${book.idBook}`)}>
                    {book.bookName}
                </div>
                <div className="bookAuthor">{book.author}</div>
            </div>
            <div className="bookPrice">{book.price}</div>
            <div className="buttonBuy">
                <Button variant="outlined" color="secondary">Buy</Button>
            </div>
            <div className="favoriteBook" onClick={handlerFavoriteBook}>
                {favoriteBook ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </div>
        </div>
    )
}
