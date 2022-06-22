import React, { UIEvent, useCallback, useEffect, useState } from 'react'

import { BookList } from '../../component/bookList/BookList'
import { LoadingCircular } from '../../component/loading/LoadingCircular'
import { DEFAULT_PAGE_LIMIT } from '../../constants/pageLimit'
import { useHttp } from '../../hooks/http.hook'
import { IBook } from '../../interface/IBook'
import { formatQueryString } from '../../utils/formatQueryString'
import { normalizeBooks } from '../../utils/normalizeBooks'

export const Main = () => {
    const [books, setBooks] = useState<IBook[]>([])
    const [currentPage,  setCurrentPage] = useState(1)
    const [totalCount,  setTotalCount] = useState(0)

    const { loading, request } = useHttp()

    useEffect(() => {
        showBooks()
    }, [])

    const showBooks = useCallback(async(limit = DEFAULT_PAGE_LIMIT) => {
        const result = await request({ url: formatQueryString(`books/show-books`, { limit, page: currentPage }) })

        setTotalCount(result.totalCount)
        setBooks([...books, ...normalizeBooks(result.data)])
        setCurrentPage(prevState => prevState + 1)
    }, [request, currentPage])

    const handleScroll = useCallback( ({ target }: UIEvent<HTMLDivElement>) => {
        if (totalCount <= books.length || loading) return

        const { scrollTop, scrollHeight } = target as HTMLDivElement
        const fetchingHeight = scrollHeight - (scrollTop + window.innerHeight)

        if (fetchingHeight < 100) {
            showBooks()
        }
    }, [books.length, loading, totalCount])

        return (
        <div>
            {loading && <LoadingCircular />}
            {books.length && <BookList books={books} onScroll={handleScroll}/>}
        </div>
    )
} 
