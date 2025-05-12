import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null); 

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

    try {
		
      const response = await axios.post(
        'https://easy-renting-bn.onrender.com/api/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user))

      const userData = JSON.parse(localStorage.getItem('user'));
       const token = localStorage.getItem('token');

    setSuccessMessage('Login successful! Redirecting...'); 
	   const userRole = userData.role;
      setTimeout(() => {
        if (userRole === 'seller' && token) {
          navigate('/supplied-property');
        } else if (userRole === 'buyer' && token) {
          navigate('/property-requested');
        } else if (userRole === 'admin' && token) {
          navigate('/admin-panel');
        } else {
          navigate('/'); 
        }
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while logging in.');
      console.error('Error during login:', err);
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <form onSubmit={handleLogin} className="mt-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-green-400 focus:border-green-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center px-2 mt-1 text-gray-400"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
			{loading ? 'Logging...' : 'Login'}
          </button>
		  
		   {error && (
            <div className="mt-4 text-red-500">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mt-4 text-green-500">
              {successMessage}
            </div>
          )}
        </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-green-500 hover:text-green-700 font-semibold">
            Register here
          </a>
        </p>
    </div>
      </div>
    </div>

  );
};

export default Login;
