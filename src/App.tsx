import React from 'react'
import { BrowserRouter } from 'react-router-dom';

import Provider from './context/Provider'
import { Header } from './component/header/Header';
import { Router } from './component/router/Router';

import './App.css';

const App = () => (
  <Provider>
    <div className="App">
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </div>
  </Provider>
)

export default App;
