import React from "react";
import { Main } from "../pages/main/Main";
import { Auth } from "../pages/auth/Auth";

export interface IRoute {
    path: string;
    element: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    GOODS = '/goods'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, element: Auth}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.GOODS, exact: true, element: Main}
]
