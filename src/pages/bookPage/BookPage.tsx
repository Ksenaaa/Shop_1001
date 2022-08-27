import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import { LoadingCircular } from '../../component/loading/LoadingCircular'
import { useHttp } from '../../hooks/http.hook'
import { IBook } from '../../interface/IBook'
import { normalizeBook } from '../../utils/normalizeBooks'
import { BasketContext } from '../../context/BasketContext'
import { RouteNames } from '../../interface/IRoute'
import { AuthContext } from '../../context/AuthContext'
import { GoBackPage } from '../../component/goBackPage/GoBackPage'
import { useToggle } from '../../hooks/toggle.hook'
import { SnackbarAccepted } from '../../component/snackbar/SnackbarAccepted'
import { ConfirmModal } from '../../component/confirmModal/ConfirmModal'

import './style.css'

export const BookPage = () => {
    const [book, setBook] = useState<IBook>()
    const [confirmDeleteBook, setConfirmDeleteBook] = useState<boolean>(false)
    const [messageDeleted, setMessageDeleted] = useState<string>('')

    const { addBookToBasket } = useContext(BasketContext)
    const { userAuth } = useContext(AuthContext)
    
    const { isOpen: isShowSnackbar, onToggle: toggleShowSnackbar } = useToggle()
    const { isOpen: isShowConfirmModal, onToggle: toggleShowConfirmModal } = useToggle()
    
    const { loading, request } = useHttp()
    
    const { idBook } = useParams()
    
    const navigate = useNavigate()

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
        navigate(`${RouteNames.EDITE_BOOK}/${idBook}`)
    , [idBook, navigate])

    const openModalConfirm = useCallback(() => 
        toggleShowConfirmModal()
    , [toggleShowConfirmModal])
        
    const onConfirm = useCallback((answer: boolean) => {
        setConfirmDeleteBook(answer)
        toggleShowConfirmModal()
    }, [toggleShowConfirmModal])
    
    const deleteBook = useCallback(async() => {
        const data = await request({ url: `delete/delete-book/${idBook}`, method: 'DELETE', body: confirmDeleteBook })
        if (data.status === 200) {
            setMessageDeleted(data.message)
            toggleShowSnackbar()
            setTimeout(() => navigate(-1), 1000)
        }    
    }, [request, idBook, toggleShowSnackbar, navigate])
    
    useEffect(() => {
        confirmDeleteBook && deleteBook() 
    }, [confirmDeleteBook, deleteBook])

    return (
        <>
            {loading && <LoadingCircular />}
            {isShowSnackbar && <SnackbarAccepted alertMessage={messageDeleted} />}
            {isShowConfirmModal && 
                <ConfirmModal 
                    askConfirm='Are you sure to delete?'
                    onConfirm={onConfirm}
                />
            }
            <GoBackPage />
            <h2 className="title-name">Book: {book?.bookName}</h2>
            {!!book &&
            <div className="wrapper-book-page">
                <div className="imageAndChange">
                    <div className="wrapper-image">
                        <img src={`${process.env.REACT_APP_API_URL}${book?.img}`} alt="book" />
                    </div>
                    {(userAuth.userId === book.sellerId) &&
                        <>
                            <Button variant="outlined" color="secondary"                    
                                onClick={navigateToEditePage}
                                disabled={loading}
                            >
                                Edite book
                            </Button>
                            <Button variant="outlined" color="secondary"                   
                                onClick={openModalConfirm}
                                disabled={loading}
                            >
                                Delete book
                                <DeleteForeverIcon />
                            </Button>
                        </>
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
