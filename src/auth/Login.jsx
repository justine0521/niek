import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../images/Nike-Logo/check-logo-orange.png';
import axios from 'axios';
import { useAuth } from '../Context/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3003/login', { email, password });

      if (response.status === 200 && response.data.token) {
        setErrors({});
        login(); // Call login function to update the auth state
        localStorage.setItem('token', response.data.token); // Store token in local storage
        navigate('/'); // Redirect to home page after successful login
      } else {
        setErrors({ general: 'Login failed. Please try again later.' });
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error.response && error.response.status === 401) {
        setErrors({ general: 'Invalid email or password' });
      } else {
        setErrors({ general: 'Login failed. Please try again later.' });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <img src={Logo} alt="Nike Logo" className="w-24 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.general ? 'border-red-500' : ''}`}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.general ? 'border-red-500' : ''}`}
              required
            />
            {errors.general && <p className="text-red-500 text-sm mt-1">{errors.general}</p>}
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300">
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <NavLink to="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
