import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuestionForm = () => {
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],  
    answer: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'options') {
      const updatedOptions = [...formData.options];
      updatedOptions[parseInt(e.target.dataset.index)] = value;
      setFormData({ ...formData, options: updatedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      axios.defaults.withCredentials=true;
      const response = await axios.post('https://quiz-platform-rju6.onrender.com/post/addQuestion', formData,{
        headers: {
          'Content-Type': 'application/json',
        
      },
      withCredentials:true  
      });
      toast.success('Question added successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to add the question. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-gradient-to-r from-green-500 to-blue-600 shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-2xl font-extrabold text-center text-white mb-4">Add New Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Question */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-white mb-2">Question</label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your question"
            required
          />
        </div>

        {/* Options */}
        {formData.options.map((option, index) => (
          <div key={index} className="mb-4">
            <label className="block text-lg font-semibold text-white mb-2">Option {index + 1}</label>
            <input
              type="text"
              name="options"
              data-index={index}
              value={option}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder={`Enter option ${index + 1}`}
              required
            />
          </div>
        ))}

        {/* Answer */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-white mb-2">Answer</label>
          <input
            type="text"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter correct answer"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <span>Submit Question</span>
          )}
        </button>
      </form>

      {/* Toast Container for displaying notifications */}
      <ToastContainer />
    </div>
  );
};

export default QuestionForm;
