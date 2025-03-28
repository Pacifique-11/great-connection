import React from 'react'
import { useState } from 'react'

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-10">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <form className="mt-4" >
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
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
                type={showPassword.password ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Write your Password"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword({
                  ...showPassword,
                  password: !showPassword.password
                })}
                className="absolute inset-y-0 right-2 flex items-center px-2 mt-1 text-gray-400"
              >
                {showPassword.password ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your Password"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword({
                  ...showPassword,
                  confirmPassword: !showPassword.confirmPassword
                })}
                className="absolute inset-y-0 right-2 flex items-center px-2 mt-1 text-gray-400"
              >
                {showPassword.confirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
