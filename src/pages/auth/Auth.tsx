import React, { useState } from 'react'
import { ModalRegistration } from './components/ModalRegistration'
import { ModalLogin } from './components/ModalLogin'

import '../../App.css';

export const Auth = () => {
    const [modalRegistrationVisible, setModalRegistrationVisible] = useState(false)

    return (
    <>
        {modalRegistrationVisible  
            ? <ModalRegistration
                onClose={() => setModalRegistrationVisible(false)}
            /> 
            : <ModalLogin 
                onClick={() => setModalRegistrationVisible(true)}
            />
        }
    </>
    )
}
