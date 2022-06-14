import React, { useCallback, useState } from 'react'

import { IUser } from '../interface/IUser'
import { IUserAuth } from '../interface/IUserAuth'

const storageName = 'userData'

const initialData = {
   token: '',
   userId: '',
   userName: '',
   userEmail: '',
   userIcon: '',
   userRole: ''
}

export const useAuth = () => {
   const userData = JSON.parse(localStorage.getItem(storageName) as string) || initialData

   const [userAuth, setUserAuth] = useState<IUser>({ ...userData })

   const login = useCallback(({ jwtToken, id, name, email, icon, role }: IUserAuth) => {
      const userInfo = {
         token: jwtToken,
         userId: id,
         userName: name,
         userEmail: email,
         userIcon: icon,
         userRole: role
      }

      setUserAuth({ ...userInfo })
      localStorage.setItem(storageName, JSON.stringify({ ...userInfo }))
   }, [])

   const logout = useCallback(() => {
      setUserAuth({ ...initialData })
      localStorage.removeItem(storageName)
   }, [])

   return { login, logout, userAuth }
}
