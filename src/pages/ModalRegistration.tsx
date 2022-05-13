import React, { FC, useState } from 'react'
import { Button } from '@material-ui/core'
import { RadioButtonRegistration } from '../component/RadioButtonRegistration'
import { useHttp } from '../hooks/http.hook'
import { TextFields } from '../component/Input'

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

export const ModalRegistration:FC<ModalWindow> = ({onClose}) => {
    const [form, setForm] = useState<RegisterUser>({email:'', name:'', password:'', checkPassword:'', role:''})
    const {loading, request, errorsValid} = useHttp()
    console.log(errorsValid)
    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registrationHandler = async () => {
        console.log(form)

        try {
            const data = await request('api/auth/register', 'POST', {...form} )
            console.log(data, 'register data')
        } catch (e) {}
    }
    
    return (
        <div className={errorsValid?"wrapperLogin wrapperregister wrappererrorregister":"wrapperLogin wrapperregister"}>
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
        </div>
    )
}