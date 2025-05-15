import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import BudgetPage from './pages/BudgetPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Detect page refresh and redirect to dashboard if authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login', { replace: true });
  };

  return (
    <>
      {token && <Header handleLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <Login setToken={setToken} />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/transactions"
          element={token ? <TransactionsPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/budget"
          element={token ? <BudgetPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
