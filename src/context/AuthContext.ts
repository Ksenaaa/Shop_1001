import { createContext } from "react";

import { IUser } from "../interface/IUser";
import { IUserAuth } from "../interface/IUserAuth";

type AuthContextType = {
    userAuth: IUser,
    login: (user: IUserAuth) => void,
    logout: () => void,
    token: string,
}

export const AuthContext = createContext<AuthContextType>({ 
    userAuth: {
        token: '',
        userId: '',
        userName: '',
        userEmail: '',
        userIcon: '',
        userRole: ''
    },
    login: ({ jwtToken, id, name, email, icon, role }: IUserAuth) => {},
    logout: () => {},
    token: ''
})
