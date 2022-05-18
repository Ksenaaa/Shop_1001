import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { privateRoutes, publicRoutes, RouteNames } from '../interface/IRoute';

export const Router = () => {
    const {userAuth} = useContext(AuthContext)

    return (
      <>
        {!userAuth.userId
        ?
        <Routes>   
          {publicRoutes.map(route =>
            <Route
              path={route.path}
              element={<route.element />} 
              key={route.path}
            />
          )}  
          <Route 
            path='*'
            element={<Navigate to={RouteNames.LOGIN} replace/>} 
          />
        </Routes> 
        :
        <Routes>   
          {privateRoutes.map(route =>
            <Route
              path={route.path}
              element={<route.element />} 
              key={route.path}
            />
          )}  
          <Route 
            path='*'
            element={<Navigate to={RouteNames.MAIN} replace/>} 
          />
        </Routes> 
        }
      </>
  )
}