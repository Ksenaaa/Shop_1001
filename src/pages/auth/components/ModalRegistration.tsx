import React, { ChangeEvent, FC, useCallback, useState } from 'react'
import { Button } from '@material-ui/core'

import LoadingCircular from '../../../component/LoadingCircular'
import { RadioButtonRegistration } from '../../../component/RadioButtonRegistration'
import { useHttp } from '../../../hooks/http.hook'
import { TextFields } from '../../../component/Input'

type ModalWindow = {
    onClose: () => void
}

type RegisterUser = {
    email: string, 
    name: string, 
    password: string, 
    checkPassword: string,
    role: string,
}

export const ModalRegistration: FC<ModalWindow> = ({onClose}) => {
    const [form, setForm] = useState<RegisterUser>({email: '', name: '', password: '', checkPassword: '', role: 'buyer'})
    const {loading, request, errorsValid} = useHttp()
    
    const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setForm({...form, [event.target.name]: event.target.value})
    }, [form]) 

    const registrationHandler = useCallback(async() => {
        const data = await request({url: 'api/auth/register', method: 'POST', body: {...form}})
        if(!data) return ''
        onClose()
    }, [onClose, form]) 

    const classes = {
        wrapWithErr: "wrapperLogin wrapperregister wrappererrorregister",
        wrap: "wrapperLogin wrapperregister"
    }

    return (
        <form 
            noValidate 
            autoComplete="off" 
            className={errorsValid ? classes.wrapWithErr : classes.wrap}
        >
            {loading && <LoadingCircular/>}
            <h2>Registration</h2> 
            <TextFields
                label="Email" 
                type="text" 
                name="email" 
                onChange={changeHandler}
                errors={errorsValid}
            />
            <TextFields
                label="Login" 
                type="text" 
                name="name" 
                onChange={changeHandler}
                errors={errorsValid}
            />
            <TextFields
                label="Password" 
                type="password" 
                name="password" 
                onChange={changeHandler}
                errors={errorsValid}
            />
            <TextFields
                label="Repeat password" 
                type="password" 
                name="checkPassword" 
                onChange={changeHandler}
                errors={errorsValid}
            />
            <RadioButtonRegistration
                name="role"
                onChange={changeHandler}
            />
            <div className="buttonLoginWrapper">
                <Button variant="outlined" color="secondary"  
                    onClick={registrationHandler}
                    disabled={loading}
                >
                    Regestration
                </Button>
            </div>
            <div className="wrapperCloseWindow" onClick={onClose}>
                <img src="https://cdn-icons-png.flaticon.com/512/51/51517.png"  alt=''/>
            </div>
        </form>
    )
}