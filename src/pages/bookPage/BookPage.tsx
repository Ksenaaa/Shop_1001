import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { useParams } from 'react-router'

import { LoadingCircular } from '../../component/loading/LoadingCircular'
import { useHttp } from '../../hooks/http.hook'
import { IBook } from '../../interface/IBook'
import { normalizeBook } from '../../utils/normalizeBooks'

import './style.css'

export const BookPage = () => {
    const [book, setBook] = useState<IBook>()

    const { loading, request } = useHttp()

    const { idBook } = useParams()

    const showBook = useCallback(async () => {
        const result = await request({ url: `books/${idBook}` })
        setBook(normalizeBook(result)) 
    }, [idBook, request])

    useEffect(() => {
        showBook()
    }, [showBook])

    const addToBasketHandler = useCallback(() => {
    }, [])

    return (
        <>
            <h2 className="title-name">Book: {book?.bookName}</h2>
            {loading && <LoadingCircular />}
            {book &&
            <div className="wrapper-book-page">
                <div className="wrapper-image">
                    <img src={`${process.env.REACT_APP_API_URL}${book?.img}`} alt="book" />
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
                        onClick={addToBasketHandler}
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
