import React, { ChangeEvent, FC, useCallback, useContext, useState } from 'react'
import { Button } from '@material-ui/core'

import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { TextFields } from '../../../component/input/Input';
import { LoadingCircular } from '../../../component/loading/LoadingCircular';

import '../../../App.css';

type Props = {
    onClick: () => void
}

type LoginUser = {
    email: string, 
    password: string, 
}

export const ModalLogin: FC<Props> = ({ onClick }) => {
    const [form, setForm] = useState<LoginUser>({ email: '', password: '' })

    const { login } = useContext(AuthContext)
    
    const { loading, request, errorsValid } = useHttp()

    const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }, [form]) 

    const loginHandler = useCallback(async() => {
        const data = await request({url: 'api/auth/login', method: 'POST', body: { ...form }})
        login({
            jwtToken: data.token,
            id: data.id,
            name: data.name,
            email: data.email,
            icon: data.icon,
            role: data.role,
        })
    }, [login, form])
        
    return (
        <form 
            noValidate 
            className="wrapperLogin"
        >
            {loading && <LoadingCircular/>}
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
        </form>
    )
}
