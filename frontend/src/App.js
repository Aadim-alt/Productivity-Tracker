import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/user', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/github';
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/auth/logout', {
        credentials: 'include'
      });
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                user ? <Dashboard user={user} /> : <Navigate to="/" />
              } 
            />
            <Route 
              path="/login" 
              element={
                user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
