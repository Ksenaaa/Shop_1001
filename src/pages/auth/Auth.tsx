import React, { useCallback, useState } from 'react'

import { ModalRegistration } from './components/ModalRegistration'
import { ModalLogin } from './components/ModalLogin'

import '../../App.css';
import { useToggle } from '../../hooks/toggle.hook';

export const Auth = () => {
    const { isOpen, onToggle } = useToggle()
    
    const handlerOpenModalRegistration = useCallback(() => 
        onToggle()
    , [onToggle])

    return (
        <>
            {isOpen  
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
