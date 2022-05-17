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
    MAIN = '/main'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, element: Auth}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.MAIN, exact: true, element: Main}
]
