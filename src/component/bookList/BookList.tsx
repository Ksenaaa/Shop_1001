import React, { FC, UIEvent, useContext } from 'react'

import { BasketContext } from '../../context/BasketContext'
import { IBook } from '../../interface/IBook'
import { BookItem } from './BookItem'

import './style.css'

type Props = {
    books: IBook[],
    onScroll?: (e: UIEvent<HTMLDivElement>) => void,
}

export const BookList: FC<Props> = ({ books, onScroll }) => {
    const { addBookToBasket } = useContext(BasketContext)

    return (
        <div className="wrapperBookList" onScroll={onScroll}>
            {books.map(book => 
                <BookItem
                    key={book.idBook}
                    book={book}
                    addBookToBasket={addBookToBasket}
                />
            )}
        </div>
    )
}
