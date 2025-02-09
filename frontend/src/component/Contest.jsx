import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Contest = () => {
    const [contest, setcontest] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getcontest = async () => {
        try {
            setLoading(true);
            axios.defaults.withCredentials = true;
            const response = await axios.get('http://localhost:8080/post/getcontest', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            setcontest(response?.data?.contest);
        } catch (error) {
            console.log("Error in contest page frontend", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getcontest();
    }, []);

    const handleJoinContest = (contestId, contest) => {
        try {
            // Navigate to the ContestQuestion component and pass data via state
            toast.success(`Joining contest with ID: ${contestId}`);
            navigate("/ContestQuestion", { state: { contest: contest } });
        } catch (error) {
            console.log("Error while navigating to ContestQuestion:", error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen p-6 flex flex-col items-center">
            <ToastContainer />
            {loading && <p className="text-lg font-semibold text-white">Loading contests...</p>}
            <button 
                onClick={getcontest} 
                className="bg-blue-600 text-white py-2 px-6 rounded-lg mb-4 shadow-md hover:bg-blue-700 transition duration-300">
                Get Contest
            </button>
            {contest.length === 0 && !loading && <p className="text-lg font-semibold text-white">No contests found.</p>}
            
            {/* Render contests if data exists */}
            {contest.length > 0 && (
                <div className="w-full max-w-4xl">
                    {contest.map((contestItem) => (
                        <div key={contestItem.id} className="border border-gray-300 rounded-lg p-6 mb-6 bg-white shadow-lg hover:shadow-2xl transition duration-300">
                            <h3 className="text-2xl font-bold text-gray-800">{contestItem.title}</h3>
                            <p className="text-gray-600 mt-2">{contestItem.description}</p>
                            <button 
                                onClick={() => handleJoinContest(contestItem._id, contestItem)} 
                                className="bg-purple-600 text-white py-2 px-6 rounded-lg mt-4 hover:bg-purple-700 transition duration-300">
                                Join Contest
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Contest;
