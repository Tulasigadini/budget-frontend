import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://budget-track-19hu.onrender.com/api/register/', { username, password });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(JSON.stringify(error.response.data));
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
          <button type="button" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;