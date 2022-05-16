import React from 'react'
import { useCallback, useEffect, useState } from "react"
import { IUser } from '../types/IUser'

const storageName = 'userData'
export type UserAuth = {
   jwtToken: string, 
   id: string, 
   name: string, 
   email: string,
   icon: string,
   role: string
}
export const useAuth = () => {
     const [userAuth, setUserAuth] = useState<IUser>({
        token: '',
        userId: '',
        userName: '',
        userEmail: '',
        userIcon: '',
        userRole: ''
     })
    
     const login = useCallback( ({jwtToken, id, name, email, icon, role}:UserAuth) => {
         setUserAuth({
            token: jwtToken,
            userId: id,
            userName: name,
            userEmail: email,
            userIcon: icon,
            userRole: role
         })

         localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken,
            userId: id,
            userName: name,
            userEmail: email,
            userIcon: icon,
            userRole: role
         }))
     },[])

     const logout = useCallback( () => {
        setUserAuth({
            token: '',
            userId: '',
            userName: '',
            userEmail: '',
            userIcon: '',
            userRole: ''
         })
        localStorage.removeItem(storageName)
     },[])


     useEffect( () => {
         const data = JSON.parse(localStorage.getItem(storageName) as string)
         if(data && data.token) {
            login(data.token)
         }
     }, [login])

     return {login, logout, userAuth}
}
