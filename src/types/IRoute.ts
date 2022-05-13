import React from "react";
import { PageGoods } from "../pages/PageGoods";
import { PageLogin } from "../pages/PageLogin";

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
    {path: RouteNames.LOGIN, exact: true, element: PageLogin}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.GOODS, exact: true, element: PageGoods}
]