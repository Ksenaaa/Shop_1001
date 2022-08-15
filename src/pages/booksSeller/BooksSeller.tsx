import React, { useContext, useState } from 'react'

import { BookList } from '../../component/bookList/BookList'
import { FilterSortSearch } from '../../component/filter-sort/FilterSortSearch'
import { AuthContext } from '../../context/AuthContext'
import { FilterSortProvider } from '../../context/FilterSortProvider'
import { IBook } from '../../interface/IBook'

import './style.css'

export const BooksSeller = () => {
    const [books, setBooks] = useState<IBook[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

    const { userAuth } = useContext(AuthContext)

    return (
        <FilterSortProvider setBooks={setBooks} setCurrentPage={setCurrentPage} >
            <>
                <div className="namePageForSaller">My books</div>
                <FilterSortSearch />
                <BookList
                    books={books} 
                    setBooks={setBooks}
                    currentPage={currentPage}  
                    setCurrentPage={setCurrentPage}
                    totalCount={totalCount}
                    setTotalCount={setTotalCount}
                    userAuth={userAuth}
                />
            </>
        </FilterSortProvider>
    )
} 
