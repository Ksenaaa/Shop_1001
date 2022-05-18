import React, { useCallback, useEffect, useState } from 'react'

import { IUser } from '../interface/IUser'
import { IUserAuth } from '../interface/IUserAuth'

const storageName = 'userData'

export const useAuth = () => {
   const [token, setToken] = useState('')
   const [userAuth, setUserAuth] = useState<IUser>({
      token: '',
      userId: '',
      userName: '',
      userEmail: '',
      userIcon: '',
      userRole: ''
   })

   const login = useCallback(({jwtToken, id, name, email, icon, role}: IUserAuth) => {
      setUserAuth({
         token: jwtToken,
         userId: id,
         userName: name,
         userEmail: email,
         userIcon: icon,
         userRole: role
      })

      setToken(jwtToken)

      localStorage.setItem(storageName, JSON.stringify({
         token: jwtToken,
         userId: id,
         userName: name,
         userEmail: email,
         userIcon: icon,
         userRole: role
      }))
   }, [])

   const logout = useCallback(() => {
      setUserAuth({
         token: '',
         userId: '',
         userName: '',
         userEmail: '',
         userIcon: '',
         userRole: ''
      })

      localStorage.removeItem(storageName)
   }, [])

   useEffect(() => {
      const data = JSON.parse(localStorage.getItem(storageName) as string)
      
      if(data && data.token) {
         login({
            jwtToken: data.token,
            id: data.userId,
            name: data.userName,
            email: data.userEmail,
            icon: data.userIcon,
            role: data.userRole,
         })
      }
   }, [login])

   return {login, logout, userAuth, token}
}
