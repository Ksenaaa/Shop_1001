import { createContext } from "react";
import { UserAuth } from "../hooks/auth.hook";
import { IUser } from "../types/IUser";

type AuthContextType = {
    userAuth: IUser,
    login: ({jwtToken, id, name, email, icon, role}:UserAuth) => void,
    logout: () => void,
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

    login: ({jwtToken, id, name, email, icon, role}: UserAuth) => {},
    
    logout: () => {},
})
