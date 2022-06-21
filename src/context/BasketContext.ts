import React, { createContext } from "react";

import { LocalStorageBookType } from "../hooks/basket.hook";


type BasketContextType = {
    booksLocalStore: LocalStorageBookType[],
    bookToLocalStorage: (id: string) => void,
    bookDecreaseInLocalStorage: (id: string) => void,
    bookLocalStorRemove: (id: string) => void,
}

export const BasketContext = createContext<BasketContextType>({ 
    booksLocalStore: [],
    bookToLocalStorage: (id: string) => {},
    bookDecreaseInLocalStorage: (id: string) => {},
    bookLocalStorRemove: (id: string) => {},
})
