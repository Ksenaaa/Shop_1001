import React, { useCallback, useState } from 'react'

import { IBook, IBookResponce } from '../interface/IBook'
import { normalizeBook } from '../utils/normalizeBooks'

const storageName = 'bookData'

const initialData = {
   idBook: '',
   bookName: '', 
   author: '',
   category: '',
   page: '',
   year: '',
   language: '',
   price: '',
   img: null,
   sellerId: '',
}

export const useBook = () => {
   const bookData = JSON.parse(localStorage.getItem(storageName) as string) || initialData

   const [book, setBook] = useState<IBook>({...bookData})

   const bookToLocalStorage = useCallback((book: IBookResponce) => {
      const normalizedBook = normalizeBook(book)
      
      setBook(normalizedBook)
      localStorage.setItem(storageName, JSON.stringify(normalizedBook))
   }, [])

   const bookLocalStorRemove = useCallback(() => {
      setBook({...initialData})
      localStorage.removeItem(storageName)
   }, [])

   return {book, bookToLocalStorage, bookLocalStorRemove}
}
