import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaUser, FaRobot } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
const ClauseAssistant = ({ selectedDocumentType = selectedDocumentType }) => {
    const [clause, setClause] = useState('');
    const [messages, setMessages] = useState([]); // Array of chat messages
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        // Initial bot messages on component mount
        setMessages([
            { sender: 'bot', text: "Welcome to the Clause Assistant!" },
            { sender: 'bot', text: "How can I assist you today?" }
        ]);
    }, []);

    const handleSubmit = async () => {


        const baseUrl = import.meta.env.VITE_BASE_URL;
        // setSelectedDocumentType('standard');
        setError(null);
        setLoading(true);

        // Add the user's message to the chat
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', text: clause }
        ]);
        // setSelectedDocumentType('standard');

        // Prepare form data

        if (!selectedDocumentType || !clause) {
            setError("Please select a document type and enter a clause.");
            return;
        }
        const formData = new FormData();
        formData.append("clause", clause);
        formData.append("document_type", selectedDocumentType);

        try {
            const res = await axios.post(`${baseUrl}explanation/explain-clause/`, formData, {
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
                <div className="flex items-center ">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Enter clause..."
                            className="w-full px-4 py-3 pr-12 border rounded-lg outline-[#f58220]"  // Add `pr-12` to make space for the icon
                            value={clause}
                            onChange={(e) => setClause(e.target.value)}
                        />
                        {loading ? (
                            <div role="status" className="absolute right-4 top-1/2 justify-center transform -translate-y-1/2 w-6 h-6">
                                <svg
                                    aria-hidden="true"
                                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#f58220]"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                            </div>) : (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8  text-white  flex items-center justify-center cursor-pointer" onClick={handleSubmit}>
                                {/* <AiOutlineSend className="w-5 h-5" /> */}
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="30" height="30"><path fill="#f58220" d="m.172,3.708C-.216,2.646.076,1.47.917.713,1.756-.041,2.951-.211,3.965.282l18.09,8.444c.97.454,1.664,1.283,1.945,2.273H4.048L.229,3.835c-.021-.041-.04-.084-.057-.127Zm3.89,9.292L.309,20.175c-.021.04-.039.08-.054.122-.387,1.063-.092,2.237.749,2.993.521.467,1.179.708,1.841.708.409,0,.819-.092,1.201-.279l18.011-8.438c.973-.456,1.666-1.288,1.945-2.28H4.062Z"/></svg>

                            </div>
                        )}
                    </div>
                </div>

                {/* Error Message */}
                {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
            </div>
        </div>
    );
};

export default ClauseAssistant;
