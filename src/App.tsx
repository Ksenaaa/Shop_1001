import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navigation } from './component/Navigation';
import { privateRoutes, publicRoutes, RouteNames } from './types/IRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        {/* {!userAuth.userId ? */}
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
            element={ <Navigate to={RouteNames.LOGIN} replace/> } 
          />
        </Routes> 
        {/* :
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
            element={ <Navigate to={RouteNames.GOODS} replace/> } 
          />
        </Routes>
        } */}
      </BrowserRouter>
    </div>
  );
}

export default App;
