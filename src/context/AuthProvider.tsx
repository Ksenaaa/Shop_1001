import { FC, ReactElement } from 'react';

import { AuthContext } from './AuthContext';
import { useAuth } from '../hooks/auth.hook';

type Props = {
    children: ReactElement
}
 
const AuthProvider: FC<Props> = ({ children }) => {
    const {login, userAuth, logout, token} = useAuth()

    return (
        <AuthContext.Provider value={{login, userAuth, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
