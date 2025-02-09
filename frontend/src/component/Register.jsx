import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    branch: '', 
    isAdmin: false,
    passWord: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const branches = [
    'Computer Science and Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Information Technology',
    'Electronic Engineering',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // console.log(formData);
    
    try {
      axios.defaults.withCredentials=true;
      const response = await axios.post('http://localhost:8080/register', formData,{
        headers: {
          'Content-Type': 'application/json',
        
      },
      withCredentials:true  
  
      });
      // console.log(response.data);  // Handle success
      toast.success(response?.data?.message);
      navigate("/login")
      
    } catch (error) {
      console.error('Error: in register page', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-200 w-full">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your full name"
              required
            />
          </div>

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

          {/* Branch - Dropdown */}
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Branch</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

          {/* Admin Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
              className="h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Admin</span>
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
              <span>Create Account</span>
            )}
          </button>
        </form>

        {/* Toast Container for displaying notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegistrationForm;
