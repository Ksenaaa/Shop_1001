import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { publicRoutes, RouteNames } from './types/IRoute';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  )
}

export default App;
