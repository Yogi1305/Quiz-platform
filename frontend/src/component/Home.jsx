import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const[logged,setlogged]=useState(false);
  const checklogged=async()=>{
     try {

      axios.defaults.withCredentials = true;
      const response = await axios.get('https://quiz-platform-rju6.onrender.com/checklogged',  {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setlogged(response?.success);
     } catch (error) {
      console.log("checklogged in home",error);
      
     }
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      {/* Navbar */}
      <div className="w-full h-16  bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-between px-6 ">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src="/126.jpg" alt="Logo" className="h-10 w-20 mix-blend-screen bg-transparent" />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8 text-lg">
          <Link to="/" className="text-gray-800 hover:text-blue-500 transition">Home</Link>
          <Link to="/contest" className="text-gray-800 hover:text-blue-500 transition">Contest</Link>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition">{}Login</Link>
          {/* haha par looged */}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-full flex flex-col justify-center items-center py-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Knit Quiz Platform</h1>
        <p className="text-xl text-gray-600 mb-1">A quiz is not just about answering questions </p><p  className="text-xl text-gray-600 mb-6">It's about discovering how much you know and how much more you can learn.</p>
        <div className="space-x-4">
          <Link to="/contest" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition">Join the Contest</Link>
          <Link to="/register" className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition">Get Started</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
