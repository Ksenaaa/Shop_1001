import React, { useCallback, useState } from 'react'

import { ModalRegistration } from './components/ModalRegistration'
import { ModalLogin } from './components/ModalLogin'

import '../../App.css';

export const Auth = () => {
    const [modalRegistrationVisible, setModalRegistrationVisible] = useState(false)

    const handlerOpenModalRegistration = useCallback(() => {
        modalRegistrationVisible ? setModalRegistrationVisible(false) : setModalRegistrationVisible(true)
    }, [modalRegistrationVisible])

    return (
        <>
            {modalRegistrationVisible  
                ? <ModalRegistration
                    onClose={handlerOpenModalRegistration}
                /> 
                : <ModalLogin 
                    onClick={handlerOpenModalRegistration}
                />
            }
        </>
    )
}
