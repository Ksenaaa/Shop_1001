import React, { FC, UIEvent } from 'react'

import { IBook } from '../../interface/IBook'
import { BookItem } from './BookItem'

import './style.css'

type Props = {
    books: IBook[],
    onScroll?: (e: UIEvent<HTMLDivElement>) => void,
}

export const BookList: FC<Props> = ({books, onScroll}) => {

    return(
        <div className="wrapperBookList" onScroll={onScroll}>
            {books.map(book => 
                <BookItem 
                    key={book.idBook} 
                    book={book}
                />
            )}
        </div>
    )
}