import React from 'react'
import { BrowserRouter } from 'react-router-dom';

import AuthProvider from './context/AuthProvider'
import { Header } from './component/header/Header';
import { Router } from './component/router/Router';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </div>
    </AuthProvider>
  )
}

export default App;
