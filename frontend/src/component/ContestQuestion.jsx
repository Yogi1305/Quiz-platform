import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ContestQuestion = () => {
  const location = useLocation();
  const { contest } = location.state || {};

  if (!contest) {
    return <p>No contest data available.</p>;
  }

  const [disabledQuestions, setDisabledQuestions] = useState({});

  const handleOptionClick = async (option, QuestionId) => {
    try {
      const UserId = localStorage.getItem("userId");
      const ContestId = contest._id;

      
      const response = await axios.post(
        'https://quiz-platform-rju6.onrender.com/post/answer',
        { UserId, ContestId, QuestionId, selectedOption: option }, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log("Answer submitted successfully:", response.data);
      
      // Disable the button after answering the question
      setDisabledQuestions((prevState) => ({
        ...prevState,
        [QuestionId]: true,
      }));
    } catch (error) {
      console.error("Error handling option click", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen p-6 flex flex-col items-center">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          {contest.title}
        </h1>
        <ul className="space-y-6">
          {contest.QuestionSet.map((item, index) => (
            <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                {item.Question}
              </h3>
              <div className="flex flex-wrap gap-4">
                {item.Options.map((option, optionIndex) => (
                  <div key={optionIndex} className="mb-4">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      Option {optionIndex + 1}
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <button
                        disabled={disabledQuestions[item._id]} // Disable button for this question if answered
                        className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer ${
                          disabledQuestions[item._id] ? "bg-gray-500" : ""
                        } hover:bg-blue-600 transition duration-300`}
                        onClick={() => handleOptionClick(option, item._id)} // Pass correct QuestionId
                      >
                        {option}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContestQuestion;
