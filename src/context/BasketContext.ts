import React, { createContext } from "react";

import { LocalStorageBookType } from "../hooks/basket.hook";


type BasketContextType = {
    booksLocalStore: LocalStorageBookType[],
    addBookToBasket: (id: string) => void,
    decreaseBookFromBasket: (id: string) => void,
    removeBookFromBasket: (id: string) => void,
}

export const BasketContext = createContext<BasketContextType>({ 
    booksLocalStore: [],
    addBookToBasket: (id: string) => {},
    decreaseBookFromBasket: (id: string) => {},
    removeBookFromBasket: (id: string) => {},
})
