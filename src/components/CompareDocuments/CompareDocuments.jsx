import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import document from "../../assets/document.svg"

const CompareDocuments = ({ comparisonData, redlinedDocName, standardDocName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Current section page
  const token = useSelector((state) => state.auth.token);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  console.log('Comparison Data Results', comparisonData)
  const handleCompare = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${baseUrl}/comparison/compare-documents/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '69420',
          'Accept': 'application/json',
        },
      });
      setStandardDoc(response.data.standard_file_name);
      setRedlinedDoc(response.data.redlined_file_name);
    } catch (err) {
      setError(err.response.data.detail);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Reset currentPage to 0 whenever comparisonData changes
    setCurrentPage(0);
  }, [comparisonData]);
  const nextPage = () => {
    if (currentPage < comparisonData.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="col-span-2 bg-white p-4 shadow rounded-lg flex flex-col items-center relative">
      {loading && (
        <div className="flex justify-center items-center w-full h-full absolute top-0 left-0 bg-opacity-50 bg-white z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-[#f58220] rounded-full animate-spin"></div>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center w-full h-full mt-6">
          <div className="bg-[#f58220] text-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto text-center">
            <p className="font-semibold text-xl">Oops! Something went wrong.</p>
            <p className="mt-2">{error}</p>
          </div>
        </div>
      )}

      {!loading && comparisonData && (
        <div className="w-full h-[650px] space-y-6 text-left flex flex-col overflow-auto">
          <h3 className="font-semibold text-2xl text-gray-800 tracking-wide text-center">Comparison Results</h3>

          <div className="bg-white pt-3 pl-2 pr-2 rounded-lg shadow-xl border border-gray-200 flex-grow overflow-hidden">
            <div className="flex items-center pt-2 justify-around space-x-8 mb-6">
              <div className="text-center flex">
                <img
                  src={document}
                  alt="Standard Document"
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <div>
                  <p className="text-s ml-2 font-medium mt-2 text-left text-gray-800">Standard Document</p>
                  <p className="text-sm ml-2 text-[#f58220] text-left line-clamp-2 max-w-xs sm:max-w-[10rem] md:max-w-[12rem] lg:max-w-[14rem]">
                    {standardDocName}
                  </p>
                </div>
              </div>
              <div className="text-center flex">
                <img
                  src={document}
                  alt="Redlined Document"
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <div>
                  <p className="text-s ml-2 font-medium mt-2 text-left text-gray-800">Redlined Document</p>
                  <p className="text-sm ml-2 text-[#f58220] text-left line-clamp-2 max-w-xs sm:max-w-[10rem] md:max-w-[12rem] lg:max-w-[14rem]">
                    {redlinedDocName}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2 space-y-3 overflow-y-auto max-h-[350px]">
              <p className="font-semibold text-lg text-[#f58220] pb-2">
                Section: <span className="font-medium text-gray-700">{comparisonData[currentPage].section}</span>
              </p>

              <p className="text-gray-700 pb-2">
                <span className="font-medium text-[#f58220]">Original Text:</span> {comparisonData[currentPage].original_text}
              </p>
              <p className="text-gray-700 pb-2">
                <span className="font-medium text-[#f58220]">Revised Text:</span> {comparisonData[currentPage].revised_text}
              </p>
              <p className="text-gray-700 pb-2">
                <span className="font-medium text-[#f58220]">Nature of Change:</span> {comparisonData[currentPage].nature_of_change}
              </p>
              <p className="text-gray-700 pb-2">
                <span className="font-medium text-[#f58220]">Favorable:</span> {comparisonData[currentPage].favorable}
              </p>
            </div>
          </div>

          {/* Button container with fixed position */}
          <div className="mt-4 flex justify-between space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="px-6 py-3 w-1/5 text-white bg-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50 transition duration-200"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === comparisonData.length - 1}
              className="px-6 py-3 w-1/5 text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50 transition duration-200"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareDocuments;
