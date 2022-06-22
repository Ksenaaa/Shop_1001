import React, { useCallback, useEffect, useState } from 'react'

const storageName = 'bookData'

export type LocalStorageBookType = {
   idBook: string,
   quantity: number,
}

export const useBasket = () => {
   let bookData = JSON.parse(localStorage.getItem(storageName) as string) || []

   const [booksLocalStore, setBooksLocalStore] = useState<LocalStorageBookType[]>(bookData)

   useEffect(() => 
      localStorage.setItem(storageName, JSON.stringify(booksLocalStore))
   , [booksLocalStore])

   const addBookToBasket = useCallback((id: string) => {
      setBooksLocalStore(prevState => {
         const findBook = prevState.find(book => book.idBook === id)

         if (!findBook) 
            return [...prevState, { idBook: id, quantity: 1 }]
         
         return prevState.map(book => (book.idBook === id) ? { ...book, quantity: book.quantity + 1 } : book)
      })
   }, [setBooksLocalStore])

   const decreaseBookFromBasket = useCallback((id: string) => {
      setBooksLocalStore(prevState => {
         return prevState.map(book => {
            if (book.idBook === id) {
               if (book.quantity === 1) return book
               
               return { ...book, quantity: book.quantity - 1 }
            }
            return book
         })
      })
   }, [setBooksLocalStore])

   const removeBookFromBasket = useCallback((id: string) => 
      setBooksLocalStore(prevState => prevState.filter(book => book.idBook !== id))
   , [setBooksLocalStore])

   return { booksLocalStore, addBookToBasket, decreaseBookFromBasket, removeBookFromBasket }
}
