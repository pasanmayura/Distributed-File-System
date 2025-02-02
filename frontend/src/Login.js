import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useNavigate to redirect after login
import './Login.css';
import Loginimg from './images/Loginimg.png';  // Import the image
import user from './images/user.png';  // Import the image

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
        sessionStorage.setItem("userEmail", email);
        localStorage.setItem('token', response.data.token);
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
    <div className="login-containers">
      <div className="Image-container">
        <h2>DocuCloud</h2>
        <img src={Loginimg} alt="Loginimg" className="Loginimg" />  {/* Add the image */}
        <h4>"Welcome Back"</h4>
      </div>

      <div className="login-container">
      <img src={user} alt="user" className="user" />  {/* Add the image */}
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
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
