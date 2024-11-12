import React, { useState } from 'react'
import upload from "../../assets/document3.jpg"
import ClauseAssistant from '../../components/Chatbot/ClauseAssistant';
import Navbar from '../../components/Navbar/Navbar';
import standard from "../../assets/document-svg.svg"
import redlined from "../../assets/audit.svg"

const ExplanationPage = () => {
    const [selectedDocument, setSelectedDocument] = useState('')
    const handleClick = (type) => {
        setSelectedDocument(type);
    };
    return (
        <div className="min-h-screen bg-white-50">
            <Navbar />


            <div className="grid grid-cols-4 gap-4">
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

                {/* Middle Section for Validation Assistant */}
                <div className="col-span-3 bg-white p-2 shadow-md rounded-lg">
                    <h3 className="font-bold text-center text-lg">Clause Assistant</h3>
                    {/* Add Validation Chat or Assistant Components Here */}
                    <ClauseAssistant selectedDocumentType={selectedDocument} />
                </div>

                {/* Right Section: History */}
                {/* <div className="col-span-1 bg-white p-4 shadow rounded-lg">
                    <h3 className="font-bold mb-4 text-center">Validation History</h3>
                    <ul className="space-y-2">
                        {["2023-10-01", "2023-09-28", "2023-09-25", "2023-09-20", "2023-09-15"].map((date, index) => (
                            <li key={index} className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                <span>Validation {index + 1}</span>
                                <span className="text-gray-500 text-sm">{date}</span>
                            </li>
                        ))}
                    </ul>
                </div> */}
            </div>
        </div>
    );
};

export default ExplanationPage