import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Baseurl } from '../main';

const QuestionForm = () => {
  const [formData, setFormData] = useState({
    Question: '',
    Options: ['', '', '', ''],
    Answer: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // For multi-step form
  const [answerIndex, setAnswerIndex] = useState(null); // To track which option is the answer

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'Options') {
      const updatedOptions = [...formData.Options];
      updatedOptions[parseInt(e.target.dataset.index)] = value;
      setFormData({ ...formData, Options: updatedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSetAnswer = (index) => {
    setAnswerIndex(index);
    setFormData({ ...formData, Answer: formData.Options[index] });
  };

  const nextStep = () => {
    if (step === 1 && !formData.Question.trim()) {
      toast.warning('Please enter a question before proceeding');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const validateForm = () => {
    // Check if all fields are filled
    if (!formData.Question.trim()) {
      toast.error('Please enter a question');
      return false;
    }

    // Check if all options have values
    const emptyOptions = formData.Options.some(option => !option.trim());
    if (emptyOptions) {
      toast.error('All options must have values');
      return false;
    }

    // Check if answer is selected
    if (!formData.Answer) {
      toast.error('Please select an answer');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      axios.defaults.withCredentials = true;
      await axios.post(`${Baseurl}/post/addQuestion`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      toast.success('Question added successfully!');
      
      // Reset form
      setFormData({
        Question: '',
        Options: ['', '', '', ''],
        Answer: '',
      });
      setAnswerIndex(null);
      setStep(1);
      
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to add the question. Please try again.');
    }

    setIsSubmitting(false);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-4">Step 1: Enter Your Question</h3>
            <div className="relative">
              <textarea
                name="Question"
                value={formData.Question}
                onChange={handleChange}
                className="w-full px-5 py-4 border-0 rounded-xl shadow-lg focus:ring-2 focus:ring-indigo-400 text-gray-700 text-lg resize-none min-h-[120px]"
                placeholder="Type your question here..."
                required
              />
              <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                {formData.Question.length} characters
              </div>
            </div>
            <button
              onClick={nextStep}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg"
            >
              Continue to Options
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-4">Step 2: Add Answer Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.Options.map((option, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <input
                    type="text"
                    name="Options"
                    data-index={index}
                    value={option}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-0 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-400 text-gray-700"
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                </div>
              ))}
            </div>
            <div className="flex space-x-4 pt-2">
              <button
                onClick={prevStep}
                className="w-1/2 bg-gray-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all shadow-lg"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="w-1/2 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg"
              >
                Set Correct Answer
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-5 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-4">Step 3: Select the Correct Answer</h3>
            <div className="space-y-3">
              {formData.Options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleSetAnswer(index)}
                  className={`p-4 rounded-xl cursor-pointer transition-all shadow-md flex items-center ${
                    answerIndex === index 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    answerIndex === index 
                      ? 'bg-white text-green-700' 
                      : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium">{option || `Option ${index + 1} (empty)`}</span>
                  {answerIndex === index && (
                    <svg className="w-6 h-6 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <div className="flex space-x-4 pt-2">
              <button
                onClick={prevStep}
                className="w-1/2 bg-gray-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all shadow-lg"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || answerIndex === null}
                className={`w-1/2 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                  isSubmitting || answerIndex === null
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Submit Question'
                )}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl shadow-2xl opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 p-3 rounded-xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-white mb-2">Create New Question</h2>
          <p className="text-indigo-100 text-center mb-8">Step {step} of 3</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2.5 mb-8">
            <div 
              className="bg-white h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
          
          {renderStepContent()}
        </div>
        
        {/* Preview Card */}
        {formData.Question && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg transition-all duration-300">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Question Preview</h3>
            <p className="text-gray-700 mb-4">{formData.Question}</p>
            
            {formData.Options.some(option => option) && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Options:</p>
                {formData.Options.map((option, index) => (
                  option && (
                    <div key={index} className={`p-2 rounded ${
                      formData.Answer === option ? 'bg-green-100 border border-green-300' : 'bg-gray-50'
                    }`}>
                      <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                      {formData.Answer === option && (
                        <span className="ml-2 text-xs font-medium text-green-700">
                          (Correct Answer)
                        </span>
                      )}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
};

export default QuestionForm;