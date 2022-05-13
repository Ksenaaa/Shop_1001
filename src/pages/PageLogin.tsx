import React, { useState } from 'react'
import { ModalRegistration } from './ModalRegistration'
import { ModalLogin } from './ModalLogin'

import '../App.css';

export const PageLogin = () => {
    const [modalRegistrationVisible, setModalRegistrationVisible] = useState(false)
        
    return (
    <>
        {modalRegistrationVisible ? 
            <ModalRegistration
                onClose={() => setModalRegistrationVisible(false)}
            /> 
            :
            <ModalLogin 
                onClick={() => setModalRegistrationVisible(true)}
            />
        }
    </>
    )
}