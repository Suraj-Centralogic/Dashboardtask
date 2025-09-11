import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import CustomerPage from './Pages/CustomerPage';
import Sidebarmain from './Components/SideBarComponents/Sidebarmain';
import { useState, useEffect } from 'react';
import AuthPage from './Components/HomePageComponents/AuthPage';
import MuiThemeProvider from './Components/SideBarComponents/Muithemeprovider';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const token = 'authToken';
    setIsAuthenticated(!!token);
  }, []);

  return (
    <MuiThemeProvider>
      <Router>
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<Sidebarmain />}>
              <Route index element={<HomePage />} />
              <Route path="customers" element={<CustomerPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          ) : (
            <>
              <Route path="/" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
