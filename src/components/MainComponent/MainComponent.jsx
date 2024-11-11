import React, { useState } from 'react'
import Chatbot from '../Chatbot/Chatbot';


const MainComponent = () => {
    const [comparisonResult, setComparisonResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleChatbot = () => {
        setIsOpen(!isOpen);
      };

    const handleFileChange = (event, setFile) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // Handle comparison API call
    const handleComparison = async () => {
        if (!file1 || !file2) {
            alert('Please upload both files before comparing.');
            return;
        }

        const formData = new FormData();
        formData.append('file1', file1);
        formData.append('file2', file2);

        try {
            // Simulating an API call
            const response = await fetch('https://api.example.com/compare-documents', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            // Set the comparison result
            setComparisonResult(data.explanation || 'Comparison completed.');
            setShowResult(true);
        } catch (error) {
            console.error('Comparison API error:', error);
            setComparisonResult('Failed to fetch comparison.');
            setShowResult(true);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center h-full space-y-4 p-6">
            <div className="flex flex-row space-x-4">
            <label className="btn bg-[#f58220] text-white focus:outline-none focus:ring-2 focus:ring-[#1b090945] focus:ring-offset-2"> 
                Upload Standard Document
                    <input
                        type="file"
                        onChange={(event) => handleFileChange(event, setFile1)}
                        className="hidden"
                    />
                </label>
                <label className="btn bg-[#f58220] text-white">
                    Upload RedLine Document
                    <input
                        type="file"
                        onChange={(event) => handleFileChange(event, setFile2)}
                        className="hidden"
                    />
                </label>
            </div>


            <button className="btn bg-black text-white mt-4 ">
                Compare Documents
            </button>
            {/* Comparison Result Container */}
            {/* {showResult && ( */}
            {/* <div className="mt-6 w-full max-w-lg bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700">Comparison Result:</h3>
                <p className="mt-2 text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
            </div> */}
            {/* )} */}

            <Chatbot/>

        </div>
    )
}

export default MainComponent