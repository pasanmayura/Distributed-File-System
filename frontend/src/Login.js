import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useNavigate to redirect after login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        username: email,
        password: password,
      });

      // If login is successful, store the token (optional: in localStorage or state)
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token); // Save token (optional)
        setMessage('Login successful');
        setTimeout(() => {
          navigate('/dashboard');  // Redirect to dashboard after successful login
        }, 2000);  // Redirect after 2 seconds
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
