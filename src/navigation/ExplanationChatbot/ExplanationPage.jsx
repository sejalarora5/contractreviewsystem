import React, { useState } from 'react'
import upload from "../../assets/document3.jpg"
import ClauseAssistant from '../../components/Chatbot/ClauseAssistant';
import Navbar from '../../components/Navbar/Navbar';

const ExplanationPage = () => {
    const [selectedDocument, setSelectedDocument] = useState('')
    const handleClick = (type) => {
        setSelectedDocument(type);
    };
    return (
        <div className="min-h-screen bg-white-50">
            <Navbar />


            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Left Section for Validation Specifics */}
                <div className="col-span-1 bg-white p-4 shadow-md rounded-lg">
                    <h3 className="font-bold text-center text-lg pb-2">Select Document</h3>
                    <div className="flex flex-col items-center justify-center p-2">
                        <div className="flex flex-col items-center">
                            <label onClick={() => handleClick("standard")} className={"flex flex-col items-center space-x-2 bg-[#FFFFFF] text-white p-2 rounded-md cursor-pointer transition-transform transform hover:scale-105"} >
                                <img className="w-8/12 h-2/6 object-contain" src={upload} alt="Choose file" />
                            </label>
                            <p className='text-center text-sm text-black'>Standard Document</p>

                        </div>

                        <div className="flex flex-col items-center pt-2">
                            <label onClick={() => handleClick("redlined")} className={"flex flex-col items-center space-x-2bg-[#FFFFFF] text-white p-2 cursor-pointer transition-transform transform hover:scale-105"} >
                                <img className="w-8/12 h-2/6 object-contain" src={upload} alt="Choose file" />
                            </label>
                            <p className='text-center text-sm text-black'>Redlined Document</p>

                        </div>

                        {selectedDocument && <div className="mt-8 text-sm text-gray-600">
                            Selected Document: <span className="font-semibold capitalize">{selectedDocument}</span>
                        </div>

                        }
                    </div>
                </div>

                {/* Middle Section for Validation Assistant */}
                <div className="col-span-2 bg-white p-2 shadow-md rounded-lg">
                    <h3 className="font-bold text-center text-lg">Clause Assistant</h3>
                    {/* Add Validation Chat or Assistant Components Here */}
                    <ClauseAssistant selectedDocumentType={selectedDocument} />
                </div>

                {/* Right Section: History */}
                <div className="col-span-1 bg-white p-4 shadow rounded-lg">
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
                </div>
            </div>
        </div>
    );
};

export default ExplanationPage