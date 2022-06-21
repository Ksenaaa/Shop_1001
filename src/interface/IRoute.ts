import React from "react";

import { Main } from "../pages/main/Main";
import { Auth } from "../pages/auth/Auth";
import { CreateBook } from "../pages/createBook/CreateBook";
import { BooksSeller } from "../pages/booksSeller/BooksSeller";
import { BookPage } from "../pages/bookPage/BookPage";
import { Basket } from "../pages/basket/Basket";
import { Order } from "../pages/order/Order";
import { Messages } from "../pages/messages/Messages";

export interface IRoute {
    path: string;
    element: React.ComponentType;
    exact: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    MAIN = '/main',
    CREATE_BOOK = '/create-book',
    BOOKS_SELLER = '/books-seller',
    BOOK_PAGE = '/book',
    BASKET = '/basket',
    ORDER = '/order',
    MESSAGES = '/messages',
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, exact: true, element: Auth }
]

export const privateRoutes: IRoute[] = [
    { path: RouteNames.MAIN, exact: true, element: Main },
    { path: RouteNames.CREATE_BOOK, exact: true, element: CreateBook },
    { path: RouteNames.BOOKS_SELLER, exact: true, element: BooksSeller },
    { path: `${RouteNames.BOOK_PAGE}/:idBook`, exact: true, element: BookPage },
    { path: RouteNames.BASKET, exact: true, element: Basket },
    { path: RouteNames.ORDER, exact: true, element: Order },
    { path: RouteNames.MESSAGES, exact: true, element: Messages },
]
