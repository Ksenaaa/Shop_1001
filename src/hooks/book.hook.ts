import React, { useCallback, useState } from 'react'

import { IBook, IBookResponce } from '../interface/IBook'

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

   const bookLocalStor = useCallback(({_id, bookName, author, category, page, year, language, price, img, sellerId}: IBookResponce) => {
      const bookInfo = {
         idBook: _id,
         bookName, 
         author,
         category,
         page,
         year,
         language,
         price,
         img,
         sellerId,
      }

      setBook({...bookInfo})
      localStorage.setItem(storageName, JSON.stringify({...bookInfo}))
   }, [])

   const bookLocalStorRemove = useCallback(() => {
      setBook({...initialData})
      localStorage.removeItem(storageName)
   }, [])

   return {book, bookLocalStor, bookLocalStorRemove}
}
