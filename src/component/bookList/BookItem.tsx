import React, { FC, useCallback, useState } from 'react'
import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

import { IBook } from '../../interface/IBook'

import './style.css'

type Props = {
    book: IBook
}

export const BookItem: FC<Props> = ({book}) => {
    const [favoriteBook, setFavoriteBook] = useState(false)
    
    const navigate = useNavigate()

    const handlerFavoriteBook = useCallback(() => {
        setFavoriteBook(favoriteBook === true ? false : true)
    }, [])
    
    return(
        <div className="wrapperItem">
            <div className="bookImg">
                <img src={`http://localhost:3002/${book.img}`} />
            </div>
            <div className="bookText">
                <div className="bookName" onClick={() => navigate(`'/book' + '/' + ${book.idBook}`)}>
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
