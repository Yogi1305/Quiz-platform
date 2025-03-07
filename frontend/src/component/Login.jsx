import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Link } from 'react-router-dom';
import { Baseurl } from '../main';

// Custom Logo Component
const QuizLogo = () => (
  <div className="flex items-center justify-center">
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="#6366F1" />
      <path d="M21 16.5C21 15.6716 21.6716 15 22.5 15H37.5C38.3284 15 39 15.6716 39 16.5V43.5C39 44.3284 38.3284 45 37.5 45H22.5C21.6716 45 21 44.3284 21 43.5V16.5Z" fill="white" />
      <path d="M25.5 22.5C25.5 21.6716 26.1716 21 27 21H33C33.8284 21 34.5 21.6716 34.5 22.5V25.5C34.5 26.3284 33.8284 27 33 27H27C26.1716 27 25.5 26.3284 25.5 25.5V22.5Z" fill="#6366F1" />
      <circle cx="30" cy="33" r="3" fill="#6366F1" />
      <path d="M25.5 39C25.5 38.1716 26.1716 37.5 27 37.5H33C33.8284 37.5 34.5 38.1716 34.5 39C34.5 39.8284 33.8284 40.5 33 40.5H27C26.1716 40.5 25.5 39.8284 25.5 39Z" fill="#6366F1" />
    </svg>
    <span className="text-white font-bold text-2xl ml-3">KnitQuiz</span>
  </div>
);

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    passWord: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${Baseurl}/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      localStorage.setItem('userId', response?.data?._id);
      
      toast.success('Login successful');
      setRedirect(true);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    }

    setIsSubmitting(false);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 flex flex-col">
      {/* Top Navigation Bar */}
      <div className="w-full backdrop-blur-sm bg-white/10 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <rect width="40" height="40" rx="8" fill="#6366F1" />
                <path d="M14 11C14 10.4477 14.4477 10 15 10H25C25.5523 10 26 10.4477 26 11V29C26 29.5523 25.5523 30 25 30H15C14.4477 30 14 29.5523 14 29V11Z" fill="white" />
                <path d="M17 15C17 14.4477 17.4477 14 18 14H22C22.5523 14 23 14.4477 23 15V17C23 17.5523 22.5523 18 22 18H18C17.4477 18 17 17.5523 17 17V15Z" fill="#6366F1" />
                <circle cx="20" cy="22" r="2" fill="#6366F1" />
                <path d="M17 26C17 25.4477 17.4477 25 18 25H22C22.5523 25 23 25.4477 23 26C23 26.5523 22.5523 27 22 27H18C17.4477 27 17 26.5523 17 26Z" fill="#6366F1" />
              </svg>
              <span className="text-white font-bold text-xl">KnitQuiz</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-white hover:text-indigo-200 transition px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/contest" className="text-white hover:text-indigo-200 transition px-3 py-2 rounded-md text-sm font-medium">Contests</Link>
              <Link to="/about" className="text-white hover:text-indigo-200 transition px-3 py-2 rounded-md text-sm font-medium">About</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="mb-8 text-center">
                <QuizLogo />
                <h2 className="text-2xl font-bold text-white mt-6 mb-2">Welcome Back!</h2>
                <p className="text-indigo-100">Sign in to your account to continue</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border-0 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-white">Password</label>
                    <a href="#" className="text-xs text-indigo-200 hover:text-white">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="passWord"
                      value={formData.passWord}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border-0 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-indigo-200">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-medium text-white hover:underline">
                    Sign up now
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-indigo-200">
            <p>By signing in, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
};

export default LoginForm;