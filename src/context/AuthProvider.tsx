import React, { FC, ReactElement } from 'react';

import { AuthContext } from './AuthContext';
import { useAuth } from '../hooks/auth.hook';

type Props = {
    children: ReactElement
}
 
const AuthProvider: FC<Props> = ({ children }) => {
    const {login, userAuth, logout} = useAuth()

    return (
        <AuthContext.Provider value={{login, userAuth, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
