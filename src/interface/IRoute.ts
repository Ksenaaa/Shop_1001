import React from "react";

import { Main } from "../pages/main/Main";
import { Auth } from "../pages/auth/Auth";
import { CreateBook } from "../pages/createBook/CreateBook";
import { BooksSeller } from "../pages/booksSeller/BooksSeller";
import { BookPage } from "../pages/bookPage/BookPage";

export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum RouteNames {
    LOGIN = '/login',
    MAIN = '/main',
    CREATE_BOOK = '/create-book',
    BOOKS_SELLER = '/books-seller',
    BOOK_PAGE = '/book',
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, element: Auth}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.MAIN, element: Main},
    {path: RouteNames.CREATE_BOOK, element: CreateBook},
    {path: RouteNames.BOOKS_SELLER, element: BooksSeller},
    {path: `${RouteNames.BOOK_PAGE}/:idBook`, element: BookPage},
]
