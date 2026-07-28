import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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
    setError(null);
    setSuccessMessage(null);

    // Client-side validation for passwords matching
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...payload } = formData;

      await axios.post('https://greatconnectionltd.onrender.com/api/signup', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Clear the form data to reset inputs
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      setSuccessMessage('Registration successful! Please check your email to verify your account. Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while registering.');
      console.error('Error during registration:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
          <p className="text-sm text-gray-500 mt-1">Please fill in the details to sign up</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your Full Name"
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword.password ? 'text' : 'password'}
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Write your Password"
                className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-xs font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword.password ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword.confirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your Password"
                className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-xs font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword.confirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {error && (
            <div className="mt-3 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center font-medium">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mt-3 p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100 text-center font-medium leading-relaxed">
              {successMessage}
            </div>
          )}

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 font-medium hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;