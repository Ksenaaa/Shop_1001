import React, { FC } from 'react'

import { IBook } from '../../interface/IBook'
import { BookItem } from './BookItem'

import './style.css'

type Props = {
    books: IBook[]
}

export const BookList: FC<Props> = ({books}) => {

    return(
        <div className="wrapperList">
            {books.map(book => 
                <BookItem 
                    key={book.idBook} 
                    book={book}
                />
            )}
        </div>
    )
}
