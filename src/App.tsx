import { BrowserRouter } from 'react-router-dom';

import AuthProvider from './context/AuthProvider'
import { Header } from './component/Header';
import { Router } from './component/Router';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </AuthProvider>
  )
}

export default App;
