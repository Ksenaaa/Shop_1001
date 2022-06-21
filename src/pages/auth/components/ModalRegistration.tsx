import React, { ChangeEvent, FC, useCallback, useState } from 'react'
import { Button } from '@material-ui/core'
import cn from 'classnames'

import { LoadingCircular } from '../../../component/loading/LoadingCircular'
import { RadioButtonRegistration } from '../../../component/radioButton/RadioButtonRegistration'
import { useHttp } from '../../../hooks/http.hook'
import { TextFields } from '../../../component/input/Input'

type Props = {
    onClose: () => void,
}

type RegisterUser = {
    email: string, 
    name: string, 
    password: string, 
    checkPassword: string,
    role: string,
}

export const ModalRegistration: FC<Props> = ({ onClose }) => {
    const [form, setForm] = useState<RegisterUser>({ email: '', name: '', password: '', checkPassword: '', role: 'buyer' })
    
    const { loading, request, errorsValid } = useHttp()
    
    const handlerChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setForm(prevForm => ({ ...prevForm, [event.target.name]: event.target.value }))
    }, []) 

    const handlerRegistration = useCallback(async() => {
        const data = await request({ url: 'auth/register', method: 'POST', body: { ...form } })
        if(!data) return ''
        onClose()
    }, [onClose, form, request]) 

    const classes = cn("wrapperLogin", "wrapperRegister", errorsValid && "wrapperErrorRegister")

    return (
        <form 
            noValidate 
            autoComplete="off" 
            className={classes}
        >
            {loading && <LoadingCircular/>}
            <h2>Registration</h2> 
            <TextFields
                label="Email" 
                type="text" 
                name="email" 
                onChange={handlerChange}
                errors={errorsValid}
            />
            <TextFields
                label="Login" 
                type="text" 
                name="name" 
                onChange={handlerChange}
                errors={errorsValid}
            />
            <TextFields
                label="Password" 
                type="password" 
                name="password" 
                onChange={handlerChange}
                errors={errorsValid}
            />
            <TextFields
                label="Repeat password" 
                type="password" 
                name="checkPassword" 
                onChange={handlerChange}
                errors={errorsValid}
            />
            <RadioButtonRegistration
                name="role"
                onChange={handlerChange}
            />
            <div className="buttonLoginWrapper">
                <Button variant="outlined" color="secondary"  
                    onClick={handlerRegistration}
                    disabled={loading}
                >
                    Regestration
                </Button>
            </div>
            <div className="wrapperCloseWindow" onClick={onClose}>
                <img src="https://cdn-icons-png.flaticon.com/512/51/51517.png"  alt="close window" />
            </div>
        </form>
    )
}
