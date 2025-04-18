import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://easy-renting-bn.onrender.com/api/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem('token', response.data.token); 
	  setTimeout(() => {
		navigate('/login'); 
	  }, 2000); 
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while registering.');
      console.error('Error during registration:', err);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-10">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange} 
              placeholder="Enter your Full Name"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

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
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword.password ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange} 
                placeholder="Write your Password"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                className="absolute inset-y-0 right-2 flex items-center px-2 mt-1 text-gray-400"
              >
                {showPassword.password ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange} 
                placeholder="Confirm your Password"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
                className="absolute inset-y-0 right-2 flex items-center px-2 mt-1 text-gray-400"
              >
                {showPassword.confirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? 'Registering ...' : 'Register'}
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
      </div>
    </div>
  );
};

export default Register;
