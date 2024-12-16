import React, { useState, useEffect } from 'react'
import upload from "../../assets/document3.jpg"
import ClauseAssistant from '../../components/Chatbot/ClauseAssistant';
import Navbar from '../../components/Navbar/Navbar';
import standard from "../../assets/document-svg.svg"
import redlined from "../../assets/audit.svg"
import axios from 'axios';
import { useSelector } from "react-redux";


const ExplanationPage = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [selectedDocument, setSelectedDocument] = useState('')
    const [history, setHistory] = useState([]);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [startSession, setStartSession] = useState(false);

    const token = useSelector((state) => state.auth.token);
    const handleClick = (type) => {
        setSelectedDocument(type);
    };

    const startFreshSession = () => {
        console.log(
            "Clicking reset session"
        )
        setSelectedHistory(null)
        setStartSession(true)
        
    };
    // Fetch history data from API
    const fetchHistory = async (offset = 0, limit = 10) => {
        console.log('token', token);
        try {
            const response = await axios.get(`${baseUrl}/history/get-history/`, {
                params: {
                    offset,
                    limit,
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });
            console.log(response.data);
            setHistory(response.data.explanation_history || []);
            // if (response.data.explanation_history?.length > 0) {
            //     setSelectedHistory(response.data.explanation_history[0]); // Set the first entry as default
            // }
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    // const handleTabClick = (historyItem) => {
    //     setSelectedHistory(historyItem);
    // };

    const handleTabClick = (historyItem) => {
        // Check if historyItem is new and append to selectedHistory if necessary
        if (selectedHistory && selectedHistory.id === historyItem.id) {
            // If it's the same history item, don't update or append
            return;
        }

        // Update selectedHistory when clicking on a different history tab
        setSelectedHistory((prevState) => {
            // If there's any content already in selectedHistory, add new content
            return {
                ...prevState,
                clause: historyItem.clause,
                explanation: historyItem.explanation,
                example: historyItem.example,
            };
        });
    };


    return (
        <div className="min-h-screen bg-white-50">
            <Navbar />


            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4">
                {/* Left Section for Validation Specifics */}
                <div className="col-span-1 bg-white p-4 shadow-md rounded-lg">
                    <h3 className="font-bold text-center text-xl pb-2">Select Document</h3>
                    <div className="flex flex-col items-center justify-center p-2">
                        <div className="flex flex-col items-center">
                            <label
                                onClick={() => handleClick("standard")}
                                className={`flex flex-col items-center bg-gray-100 space-x-2 text-white p-16 rounded-md cursor-pointer transition-transform transform hover:scale-105 ${selectedDocument === "standard" ? "border-2 border-black" : ""
                                    }`}
                            >
                                <svg
                                    id="Layer_1"
                                    height="84"
                                    viewBox="0 0 24 24"
                                    width="84"
                                    xmlns="http://www.w3.org/2000/svg"
                                    data-name="Layer 1"
                                >
                                    <path
                                        fill={selectedDocument === "standard" ? "#f58220" : "#000000"}
                                        d="m21.414 5h-4.414v-4.414zm.586 2v17h-20v-21a3 3 0 0 1 3-3h10v7zm-15 9h7v-2h-7zm10 2h-10v2h10zm0-8h-10v2h10z"
                                    />
                                </svg>
                            </label>
                            <p className="text-center font-semibold text-sm pt-4 text-black">Standard Document</p>


                        </div>

                        <div className="flex flex-col items-center pt-2">
                            <label
                                onClick={() => handleClick("redlined")}
                                className={`flex flex-col p-16 bg-gray-100 items-center space-x-2 text-white cursor-pointer transition-transform transform hover:scale-105 ${selectedDocument === "redlined" ? "border-2 border-black" : ""
                                    }`}
                            >
                                <svg
                                    id="Layer_1"
                                    height="84"
                                    viewBox="0 0 24 24"
                                    width="84"
                                    xmlns="http://www.w3.org/2000/svg"
                                    data-name="Layer 1"
                                >
                                    <path
                                        fill={selectedDocument === "redlined" ? "#f58220" : "#000000"}
                                        d="m21.414 5h-4.414v-4.414zm.586 2v17h-20v-21a3 3 0 0 1 3-3h10v7zm-15 9h7v-2h-7zm10 2h-10v2h10zm0-8h-10v2h10z"
                                    />
                                </svg>
                            </label>
                            <p className="text-center font-semibold text-sm pt-4 text-black">Redlined Document</p>


                        </div>

                        {selectedDocument && <div className="mt-8 font-semibold  text-lg text-[#f58220]">
                            Selected Document: <span className="font-semibold capitalize text-[#f58220] text-lg">{selectedDocument}</span>
                        </div>

                        }
                    </div>
                </div>

                {/* Middle Section for Clause Assistant */}
                <div className="col-span-2 bg-white p-2 shadow-md rounded-lg">
                    <h3 className="font-bold text-center text-lg">Clause Assistant</h3>
                    <ClauseAssistant selectedDocumentType={selectedDocument} selectedHistory={selectedHistory} startFresh={startSession} setStartFresh={setStartSession} />
                </div> 
                {/* Right Section: History */}
                <div className="col-span-1 bg-white p-4 shadow rounded-lg">

                    <button
                        onClick={startFreshSession}
                        className="mb-4 w-full px-4 py-2 bg-[#f58220] text-white rounded-lg"
                    >
                        Start Fresh Clause Assistant
                    </button>
                    <h3 className="font-bold mb-4 text-center">Clause History</h3>
                    {history.length > 0 ? (
                        <div className="space-y-2">
                            {history.map((item) => (
                                <button
                                    key={item.id}
                                    className={`w-full text-left p-2 rounded-md border ${selectedHistory?.id === item.id ? 'bg-[#f58220] text-white' : 'bg-gray-100 text-black'}`}
                                    onClick={() => handleTabClick(item)}
                                >
                                    {item.clause}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No history available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExplanationPage