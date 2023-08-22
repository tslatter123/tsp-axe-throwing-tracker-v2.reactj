import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/FontFace.css';
import './index.css';

// context
import { AuthProvider } from './context/AuthProvider';

// pages
import App from './App';
import RouteTestPage from './pages/RouteTestPage';
import SignInPage from './pages/account/SignInPage';
import SignOutPage from './pages/account/SignOutPage';
import RegisterPage from './pages/account/RegisterPage';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='routetest' element={<RouteTestPage />} />
          <Route path='signin' element={<SignInPage />} />
          <Route path='signout' element={<SignOutPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
