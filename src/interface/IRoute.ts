import React from "react";

import { Main } from "../pages/main/Main";
import { Auth } from "../pages/auth/Auth";
import { CreateBook } from "../pages/createBook/CreateBook";
import { BooksSeller } from "../pages/booksSeller/BooksSeller";

export interface IRoute {
    path: string;
    element: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    MAIN = '/main',
    CREATE_BOOK = '/create-book',
    BOOKS_SELLER = '/books-seller',
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, element: Auth}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.MAIN, exact: true, element: Main},
    {path: RouteNames.CREATE_BOOK, exact: true, element: CreateBook},
    {path: RouteNames.BOOKS_SELLER, exact: true, element: BooksSeller},
]
