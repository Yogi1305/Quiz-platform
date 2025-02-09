import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

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
      const response = await axios.post('http://localhost:8080/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      // console.log("user ki id",response.data._id);
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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="max-w-md w-full mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="passWord"
              value={formData.passWord}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
