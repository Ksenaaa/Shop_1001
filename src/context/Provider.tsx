import React, { FC, ReactElement } from 'react';

import { AuthContext } from './AuthContext';
import { useAuth } from '../hooks/auth.hook';
import { BasketContext } from './BasketContext';
import { useBasket } from '../hooks/basket.hook';

type Props = {
    children: ReactElement
}
 
const Provider: FC<Props> = ({ children }) => {
    const { userAuth, login, logout } = useAuth()
    const { booksLocalStore, bookToLocalStorage, bookDecreaseInLocalStorage, bookLocalStorRemove } = useBasket()

    return (
        <AuthContext.Provider value={{ login, userAuth, logout }}>
            <BasketContext.Provider value={{ booksLocalStore, bookToLocalStorage, bookDecreaseInLocalStorage, bookLocalStorRemove }}>
                {children}
            </BasketContext.Provider>
        </AuthContext.Provider>
    )
}

export default Provider;
