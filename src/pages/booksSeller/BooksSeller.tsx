import React, { useCallback, useContext, useEffect, useState } from 'react'

import { BookList } from '../../component/bookList/BookList'
import { LoadingCircular } from '../../component/loading/LoadingCircular'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { IBook } from '../../interface/IBook'
import { normalizeBooks } from '../../utils/normalizeBooks'

export const BooksSeller = () => {
    const [books, setBooks] = useState<IBook[]>()

    const {userAuth} = useContext(AuthContext)

    const {loading, request} = useHttp()

    const showBooks = useCallback(async () => {
        const result = await request({url: `api/books/show-books/${userAuth.userId}`})
        
        setBooks(normalizeBooks(result)) 
    }, [])

    useEffect(() => {
        showBooks()
    }, [])

    return (
        <>
        <h1>My books</h1>
        {loading && <LoadingCircular />}
        {books?.length ? <BookList books={books} /> : <h2>No books..(</h2>}
        </>
    )
} 
