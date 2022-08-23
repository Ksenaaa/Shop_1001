import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button } from '@material-ui/core'

import { LoadingCircular } from '../../component/loading/LoadingCircular'
import { useHttp } from '../../hooks/http.hook'
import { IBook } from '../../interface/IBook'
import { normalizeBook } from '../../utils/normalizeBooks'
import { BasketContext } from '../../context/BasketContext'
import { RouteNames } from '../../interface/IRoute'
import { AuthContext } from '../../context/AuthContext'
import { GoBackPage } from '../../component/goBackPage/GoBackPage'

import './style.css'

export const BookPage = () => {
    const [book, setBook] = useState<IBook>()

    const { addBookToBasket } = useContext(BasketContext)
    const { userAuth } = useContext(AuthContext)

    const { loading, request } = useHttp()

    const { idBook } = useParams()

    const toEditePage = useNavigate()

    const showBook = useCallback(async () => {
        const result = await request({ url: `books/${idBook}` })
        setBook(normalizeBook(result)) 
    }, [idBook, request])

    useEffect(() => {
        showBook()
    }, [showBook])

    const handlerAddBookToLocalStorage = useCallback(() => 
        idBook && addBookToBasket(idBook)
    , [idBook, addBookToBasket])

    const navigateToEditePage = useCallback(() => 
        toEditePage(`${RouteNames.EDITE_BOOK}/${idBook}`)
    , [idBook])

    return (
        <>
            <GoBackPage />
            <h2 className="title-name">Book: {book?.bookName}</h2>
            {loading && <LoadingCircular />}
            {!!book &&
            <div className="wrapper-book-page">
                <div className="imageAndChange">
                    <div className="wrapper-image">
                        <img src={`${process.env.REACT_APP_API_URL}${book?.img}`} alt="book" />
                    </div>
                    {(userAuth.userId === book.sellerId) &&
                        <Button variant="outlined" color="secondary"                    
                            onClick={navigateToEditePage}
                            disabled={loading}
                        >
                            Edite book
                        </Button>
                    }
                </div>
                <div className="wrapper-text">
                    <div className="name title">{book?.bookName}</div>
                    <div className="author title">{book?.author}</div>
                    <div className="bookInfo">
                        <div className="bookInfo title">Book info:</div>
                        <div>Name: {book?.bookName}</div>
                        <div>Author: {book?.author}</div>
                        <div>Category: {book?.category}</div>
                        <div>Language: {book?.language}</div>
                        <div>Year: {book?.year}</div>
                        <div>Page: {book?.page}</div>
                    </div>
                </div>
                <div className="wrapper-buy">
                    <div className="price title">Price: {book?.price} $</div>
                    <Button variant="outlined" color="secondary"                    
                        onClick={handlerAddBookToLocalStorage}
                        disabled={loading}
                    >
                        Add to basket
                    </Button>
                </div>
            </div>
            }
        </>
    )
} 
