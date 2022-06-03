import React, { useCallback, useEffect, useState } from 'react'

import { BookList } from '../../component/bookList/BookList'
import { LoadingCircular } from '../../component/loading/LoadingCircular'
import { useHttp } from '../../hooks/http.hook'
import { IBook } from '../../interface/IBook'
import { normalizeBooks } from '../../utils/normalizeBooks'

export const Main = () => {
    const [books, setBooks] = useState<IBook[]>()

    const {loading, request} = useHttp()

    const showBooks = useCallback(async() => {
        const result = await request({url: 'api/books/show-books'})

        setBooks(normalizeBooks(result))
    }, [])

    useEffect(() => {
        showBooks()
    }, [])

    return (
        <>
        {loading && <LoadingCircular />}
        {books?.length && <BookList books={books} />}
        </>
    )
} 
