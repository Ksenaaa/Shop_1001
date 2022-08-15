import React, { Dispatch, FC, SetStateAction, UIEvent, useCallback, useContext, useEffect } from 'react'

import { DEFAULT_PAGE_LIMIT } from '../../constants/pageLimit'
import { BasketContext } from '../../context/BasketContext'
import { FilterSortContext } from '../../context/FilterSortContext'
import { useHttp } from '../../hooks/http.hook'
import { IBook } from '../../interface/IBook'
import { IUser } from '../../interface/IUser'
import { formatQueryString, formatQueryStringFilter } from '../../utils/formatQueryString'
import { normalizeBooks } from '../../utils/normalizeBooks'
import { LoadingCircular } from '../loading/LoadingCircular'
import { BookItem } from './BookItem'

import './style.css'

type Props = {
    books: IBook[],
    currentPage: number, 
    setCurrentPage: Dispatch<SetStateAction<number>>, 
    totalCount: number, 
    setTotalCount: Dispatch<SetStateAction<number>>, 
    setBooks: Dispatch<SetStateAction<IBook[]>>, 
    userAuth?: IUser,
}

export const BookList: FC<Props> = ({ books, currentPage, setCurrentPage, totalCount, setTotalCount, setBooks, userAuth }) => {
    const { addBookToBasket } = useContext(BasketContext)
    
    const { loading, request } = useHttp()
    
    const { sortField, sortOrder, applyFilter, searchText } = useContext(FilterSortContext)

    const filter = formatQueryStringFilter(applyFilter)

    useEffect(() => {
        showBooks()
    }, [sortField, sortOrder, applyFilter, searchText])
    
    const showBooks = useCallback(async(limit = DEFAULT_PAGE_LIMIT) => {
        const result = await request({ url: formatQueryString(`books/show-books/${userAuth?.userId || 0}`, { 
            limit, 
            page: currentPage, 
            sortField,
            sortOrder,
            filter,
            searchText
        }) })
        
        setTotalCount(result.totalCount)
        setBooks([...books, ...normalizeBooks(result.data)])
        setCurrentPage(prevState => prevState + 1)
    }, [request, currentPage, sortField, sortOrder, searchText, applyFilter])
    
    const handleScroll = useCallback( ({ target }: UIEvent<HTMLDivElement>) => {
        if (totalCount <= books.length || loading) return
        const { scrollTop, scrollHeight } = target as HTMLDivElement
        const fetchingHeight = scrollHeight - (scrollTop + window.innerHeight)

        if (fetchingHeight < 100) {
            showBooks()
        }
    }, [books.length, loading, totalCount])

    return (
        <>
            {loading && <LoadingCircular />}  
            {!!books.length 
                ? <div className="wrapperBookList" onScroll={handleScroll}>
                    {books.map(book => 
                        <BookItem
                            key={book.idBook}
                            book={book}
                            addBookToBasket={addBookToBasket}
                        />
                    )}
                </div>
                : <h2>No books..</h2>
            }
        </>
    )
}
