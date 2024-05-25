import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated, setErrorMessage, setUserData }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const url = `https://json-storage-api.p.rapidapi.com/datalake/${email}`;
  const headers = {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': '68c18bd9e8msh5b5329b16d84ea3p1de8e7jsne487536a97c1',
    'X-RapidAPI-Host': 'json-storage-api.p.rapidapi.com'
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers
      });

      if (response.ok) {
        const data = await response.json();

        if (data.Password === password) {
          setIsAuthenticated(true);
          setErrorMessage('');
          setUserData({
            email: data.Email,
            name: data.Name,
            balance: data.Balance,
            transactions: data.Transactions
          });
          navigate('/dashboard');
        } else {
          setIsAuthenticated(false);
          setErrorMessage('Invalid email or password');
        }
      } else {
        setIsAuthenticated(false);
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-area container mt-5">
      <h1>Login</h1>
      <div className="form-group">
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="btn btn-primary themebutton" onClick={handleLogin}>
          Login
        </button>
        {setErrorMessage && <p style={{ color: 'red' }}>{setErrorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
