import React, { useContext, useState } from 'react'
import { Button } from '@material-ui/core'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../tools/Context'
import { TextFields } from '../component/Input'
import '../App.css';

export const ModalLogin = ({onClick}:any) => {
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({email: '', password: ''})
    const {loading, request, error, clearError} = useHttp()
        
    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        const data = await request('api/auth/login', 'POST', {...form} )
        // auth.login(data.token, data.userId, data.userName, data.userIcon)
        console.log(data)
    }
    return (
        <div className="wrapperLogin">
            <h2>LOGIN PAGE</h2> 
            <TextFields
                label="Email" 
                type="text" 
                name="email" 
                onChange={changeHandler}
                error={error}
            />
            <TextFields
                label="Password" 
                type="password" 
                name="password" 
                onChange={changeHandler}
                error={error}
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