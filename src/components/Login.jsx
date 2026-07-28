import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        'https://greatconnectionltd.onrender.com/api/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token, user } = response.data;

      // Store auth tokens and user data securely in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setSuccessMessage('Login successful! Redirecting...');

      const userRole = user?.role?.toLowerCase();

      setTimeout(() => {
        if (userRole === 'seller') {
          navigate('/supplied-property');
        } else if (userRole === 'buyer') {
          navigate('/property-requested');
        } else if (userRole === 'admin') {
          navigate('/admin-panel');
        } else {
          navigate('/');
        }
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while logging in.');
      console.error('Error during login:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccessMessage(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Please enter your credentials to login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition pr-16"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-xs font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error && (
            <div className="mt-3 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center font-medium">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mt-3 p-3 bg-green-50 text-green-600 text-sm rounded-lg border border-green-100 text-center font-medium">
              {successMessage}
            </div>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-green-600 font-medium hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;