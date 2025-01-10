import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaUser, FaRobot } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
const ClauseAssistant = ({ selectedDocumentType, selectedHistory, startFresh, setStartFresh }) => {
    const [clause, setClause] = useState('');
    const initMessage=[
        { sender: 'bot', text: "Welcome to the Clause Assistant!" },
        { sender: 'bot', text: "How can I assist you today?" }
    ]
    const [messages, setMessages] = useState(
    initMessage); // Array of chat messages
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const handleStartFresh = () => {
        // Reset chat and clause input for fresh session
        setMessages(initMessage);
        console.log("resetting clause")
        setClause('');
    };

    // Trigger the handleStartFresh function if startFresh is true

    useEffect(() => {
        if (startFresh) {
            handleStartFresh();
        }
    }, [startFresh])
    console.log('selectedHistory', selectedHistory)
    useEffect(() => {
        if (selectedHistory) {
            // If there is a selected history, show the relevant messages
            setMessages([
                ...initMessage,
                { sender: 'user', text: selectedHistory.clause },
                { sender: 'bot', text: selectedHistory.explanation },
                { sender: 'bot', text: `Example: ${selectedHistory.example}` }
            ]);
        } else {
            // Otherwise, set initial messages
            setMessages(initMessage);
        }
    }, [selectedHistory]);

    const handleSubmit = async () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        setError(null);
        setLoading(true);
        setStartFresh(false);

        // Add the user's message to the chat
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', text: clause }
        ]);

        if (!selectedDocumentType || !clause) {
            setError("Please select a document type and enter a clause.");
            return;
        }

        const formData = new FormData();
        formData.append("clause", clause);
        formData.append("document_type", selectedDocumentType);

        try {
            const res = await axios.post(`${baseUrl}/explanation/explain-clause/`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            // Add the bot's response to the chat
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: res.data.explanation_result.explanation },
                { sender: 'bot', text: `Example: ${res.data.explanation_result.example}` }
            ]);
        } catch (err) {
            setError("Failed to fetch explanation. Please try again.");
        } finally {
            setLoading(false);
            setClause('');
        }
    };

    return (
        <div className="bg-white-50 p-4">
            <div className="bg-white p-4 shadow-lg rounded-lg">
                {/* Chat Area */}
                <div className="h-[480px]  overflow-y-scroll p-4 border rounded-lg bg-white mb-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`my-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'bot' && (
                                <div className="flex items-center mr-2">
                                    <FaRobot className="text-[#f58220] text-xl" /> {/* Bot icon */}
                                </div>
                            )}
                            <div className={`inline-block p-3 rounded-lg ${msg.sender === 'user' ? 'bg-white text-[#f58220]' : 'bg-gray-100 text-black'}`}>
                                {msg.text}
                            </div>
                            {msg.sender === 'user' && (
                                <div className="flex items-center ml-2">
                                    <FaUser className="text-[#f58220] text-xl" /> {/* User icon */}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Clause Input */}
                <div className="flex items-center">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Enter clause..."
                            className="w-full px-4 py-3 pr-12 border rounded-lg outline-[#f58220]"
                            value={clause}
                            onChange={(e) => setClause(e.target.value)}
                        />
                        <button
                            onClick={handleSubmit}
                            className="absolute right-2 top-3 text-[#f58220] text-xl"
                        >
                            <AiOutlineSend />
                        </button>
                    </div>
                </div>
                {/* Error message */}
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                {/* Loading indicator */}
                {loading && <p className="text-center mt-2">Loading...</p>}
            </div>
        </div>
    );
};

export default ClauseAssistant;
