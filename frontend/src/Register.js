import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './Register.css';
import register from './images/register.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/register', {
        username: email,
        password: password,
      });

      // Show success message and redirect to login page
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/login');  // Redirect to login page
      }, 2000);  // Redirect after 2 seconds
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <img src={register} alt="register" className="register" />  {/* Add the image */}
      <h1>DocuCloud</h1>
      <h4>"Safe Place For All Your Files"</h4>
      <h5>__________________________________________</h5>
      <h2>Register Now!</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Register</button>
        <p className="login">Already have an account? <Link to="/login" className="login-link">Log in</Link></p>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
    
    
  );
};

export default Register;