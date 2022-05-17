import React, { ChangeEvent, FC, useCallback, useContext, useState } from 'react'
import { Button } from '@material-ui/core'

import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../tools/Context';
import { TextFields } from '../../../component/Input';

import '../../../App.css';

type ModalLoginType = {
    onClick: () => void
}

export const ModalLogin: FC<ModalLoginType> = ({onClick}) => {
    const {login} = useContext(AuthContext)
    const [form, setForm] = useState({email: '', password: ''})
    const {loading, request, errorsValid} = useHttp()
        
    const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setForm({...form, [event.target.name]: event.target.value})
    }, [form]) 

    const loginHandler = useCallback(async() => {
        const data = await request({url: 'api/auth/login', method: 'POST', body: {...form}}) 
        login({
            jwtToken: data.jwtToken,
            id: data.id,
            name: data.name,
            email: data.email,
            icon: data.icon,
            role: data.role,
        })
    }, [login]) 
        
    return (
        <div className="wrapperLogin">
            <h2>LOGIN PAGE</h2> 
            <TextFields
                label="Email" 
                type="text" 
                name="email" 
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
            <div className="buttonLoginWrapper">
                <Button variant="outlined" color="secondary"  
                    onClick={onClick}
                >
                    Regestration
                </Button>
                <Button variant="outlined" color="primary"  
                    onClick={loginHandler}
                    disabled={loading}
                >
                    Login
                </Button>
            </div>
        </div>
    )
}
