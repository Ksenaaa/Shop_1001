import React, { useCallback, useContext, useEffect, useState } from 'react'

import { LoadingCircular } from '../../component/loading/LoadingCircular'
import { BasketContext } from '../../context/BasketContext'
import { useHttp } from '../../hooks/http.hook'
import { IBook, IBookResponce } from '../../interface/IBook'
import { normalizeBooks } from '../../utils/normalizeBooks'
import { BasketList } from './components/BasketList'
import { formatQueryString } from '../../utils/formatQueryString'

import './style.css'

export const Basket = () => {
    const [books, setBooks] = useState<IBook[]>([])
    
    const { booksLocalStore } = useContext(BasketContext)
    
    const { loading, request } = useHttp()
    
    const idForRequest = booksLocalStore.map(book => book.idBook)

    useEffect(() => {
        idForRequest.length && showBooks()
    }, [])

    useEffect(() => {
        setBooks(prevBooks => prevBooks.filter(book => 
            booksLocalStore.find(localBook => book.idBook === localBook.idBook && localBook.quantity )))
    }, [booksLocalStore])

    const showBooks = useCallback(async() => {
        const result = await request({ url: formatQueryString(`basket/show-books`, { id: idForRequest }) })
        const resultData = result.map((book: IBookResponce[]) => book[0])
        setBooks([...normalizeBooks(resultData)])
    }, [request, idForRequest])

    return (
        <div className="wrapperBasket">
            {loading && <LoadingCircular />}
            {books.length 
                ? <BasketList books={books} />
                : <h2>Sorry, there are no items in the basket ((</h2>
            }
        </div>
    )
}
