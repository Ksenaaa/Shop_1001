import React, { useCallback, useEffect, useState } from 'react'

const storageName = 'bookData'

export type LocalStorageBookType = {
   idBook: string,
   quantity: number,
}

export const useBasket = () => {
   let bookData = JSON.parse(localStorage.getItem(storageName) as string) || []

   const [booksLocalStore, setBooksLocalStore] = useState<LocalStorageBookType[]>(bookData)

   useEffect(() => {
      localStorage.setItem(storageName, JSON.stringify(booksLocalStore))
   }, [booksLocalStore])

   const bookToLocalStorage = useCallback((id: string) => {
      setBooksLocalStore(prevState => {
         const hasBook = prevState.find(book => book.idBook === id)
         
         if (hasBook) {
            return prevState.map(book => {
               if (book.idBook === id) {
                  return { ...book, quantity: book.quantity + 1 }
               }
               return book
            })
         } else {
            return [...prevState, { idBook: id, quantity: 1 }]
         }
      })
   }, [setBooksLocalStore])

   const bookDecreaseInLocalStorage = useCallback((id: string) => {
      setBooksLocalStore(prevState => {
         return prevState.map(book => {
            if(book.idBook === id) {
               if(book.quantity === 1) {
                  return book
               }
               return { ...book, quantity: book.quantity - 1 }
            }
            return book
         })
      })
   }, [setBooksLocalStore])

   const bookLocalStorRemove = useCallback((id: string) => {
      setBooksLocalStore(prevState => prevState.filter(book => book.idBook !== id))
   }, [setBooksLocalStore])

   return { booksLocalStore, bookToLocalStorage, bookDecreaseInLocalStorage, bookLocalStorRemove }
}
