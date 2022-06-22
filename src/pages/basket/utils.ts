import React from "react"

import { LocalStorageBookType } from "../../hooks/basket.hook"

export const countBook = (localStore: LocalStorageBookType[], id: string) => {
    let findBook = localStore.find(bookFromLocal => id === bookFromLocal.idBook)
    if (!findBook) return 0

    return +findBook.quantity
}

export const sumBook = (localStore: LocalStorageBookType[], id: string, price: string) => {
    let findBook = localStore.find(bookFromLocal => id === bookFromLocal.idBook)
    if (!findBook) return 0
    
    return +(+findBook.quantity * +price).toFixed(2)
}
