import { createContext } from "react";
import { UserAuth } from "../hooks/auth.hook";

export const AuthContext = createContext({ 
    userAuth: {
        token: '',
        userId: '',
        userName: '',
        userEmail: '',
        userIcon: '',
        userRole: ''
    },
    login: ({jwtToken, id, name, email, icon, role}:UserAuth) => {},
    logout: () => {},
})
