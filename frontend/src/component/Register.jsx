import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Baseurl } from '../main';

// Custom Logo Component
const QuizLogo = () => (
  <div className="flex items-center">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
      <rect width="40" height="40" rx="8" fill="#6366F1" />
      <path d="M14 11C14 10.4477 14.4477 10 15 10H25C25.5523 10 26 10.4477 26 11V29C26 29.5523 25.5523 30 25 30H15C14.4477 30 14 29.5523 14 29V11Z" fill="white" />
      <path d="M17 15C17 14.4477 17.4477 14 18 14H22C22.5523 14 23 14.4477 23 15V17C23 17.5523 22.5523 18 22 18H18C17.4477 18 17 17.5523 17 17V15Z" fill="#6366F1" />
      <circle cx="20" cy="22" r="2" fill="#6366F1" />
      <path d="M17 26C17 25.4477 17.4477 25 18 25H22C22.5523 25 23 25.4477 23 26C23 26.5523 22.5523 27 22 27H18C17.4477 27 17 26.5523 17 26Z" fill="#6366F1" />
    </svg>
  </div>
);

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    branch: '', 
    isAdmin: false,
    passWord: '',
    confirmPassword: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formStep, setFormStep] = useState(1);
  
  const branches = [
    'Computer Science and Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Information Technology',
    'Electronic Engineering',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({ ...formData, [name]: newValue });
    
    // Check password match when either password field changes
    if (name === 'passWord' || name === 'confirmPassword') {
      if (name === 'passWord') {
        setPasswordMatch(value === formData.confirmPassword || formData.confirmPassword === '');
      } else {
        setPasswordMatch(value === formData.passWord);
      }
    }
  };

  const nextStep = () => {
    // Validate first step fields
    if (!formData.fullName || !formData.email) {
      toast.warning('Please fill in all required fields');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.warning('Please enter a valid email address');
      return;
    }
    
    setFormStep(2);
  };

  const prevStep = () => {
    setFormStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation
    if (!formData.branch || !formData.passWord) {
      toast.warning('Please fill in all required fields');
      return;
    }
    
    if (formData.passWord !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // Remove confirmPassword before sending to API
    const dataToSubmit = { ...formData };
    delete dataToSubmit.confirmPassword;
    
    setIsSubmitting(true);
    
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${Baseurl}/register`, dataToSubmit, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      
      toast.success(response?.data?.message || 'Registration successful!');
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      console.error('Error in register page', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 flex flex-col">
      {/* Navigation */}
      <div className="w-full backdrop-blur-sm bg-white/10 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <QuizLogo />
              <span className="text-white font-bold text-xl">KnitQuiz</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-white hover:text-indigo-200 transition px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/contest" className="text-white hover:text-indigo-200 transition px-3 py-2 rounded-md text-sm font-medium">Contests</Link>
              <Link to="/login" className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-200 font-medium">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-xl w-full">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
                <p className="text-indigo-100 mt-2">Join the KnitQuiz community today</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-2.5 mb-6">
                <div 
                  className="bg-white h-2.5 rounded-full transition-all duration-500"
                  style={{ width: formStep === 1 ? '50%' : '100%' }}
                ></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {formStep === 1 ? (
                  <>
                    {/* Step 1: Basic Info */}
                    <div className="space-y-5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">Full Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border-0 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">Email Address</label>
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

                      <button
                        type="button"
                        onClick={nextStep}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                      >
                        Continue
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Step 2: Additional Details */}
                    <div className="space-y-5">
                      {/* Branch */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">Branch</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <select
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border-0 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                            required
                          >
                            <option value="">Select your branch</option>
                            {branches.map((branch, index) => (
                              <option key={index} value={branch}>
                                {branch}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">Password</label>
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

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">Confirm Password</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`block w-full pl-10 pr-3 py-3 border-0 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 ${!passwordMatch ? 'ring-2 ring-red-500' : ''}`}
                            placeholder="••••••••"
                            required
                          />
                        </div>
                        {!passwordMatch && (
                          <p className="mt-1 text-sm text-red-300">Passwords do not match</p>
                        )}
                      </div>

                      {/* Admin Checkbox */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="isAdmin"
                          checked={formData.isAdmin}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 border-0 rounded focus:ring-indigo-500"
                        />
                        <label className="ml-2 block text-sm text-white">
                          Register as Admin
                        </label>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="w-1/3 flex justify-center py-3 px-4 border border-white/30 rounded-lg shadow-sm text-base font-medium text-white bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                        >
                          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                          </svg>
                          Back
                        </button>
                        
                        <button
                          type="submit"
                          disabled={isSubmitting || !passwordMatch}
                          className={`w-2/3 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white transition-all duration-200 ${
                            isSubmitting || !passwordMatch
                              ? 'bg-indigo-400 cursor-not-allowed'
                              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          }`}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Creating Account...
                            </div>
                          ) : (
                            'Create Account'
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
          
          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-white">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-200 hover:text-white transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
};

export default RegistrationForm;