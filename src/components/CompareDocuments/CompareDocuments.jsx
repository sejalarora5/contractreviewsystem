import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import document from "../../assets/document.svg"

const CompareDocuments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Current section page
  const token = useSelector((state) => state.auth.token);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [redlinedDoc, setRedlinedDoc] = useState('')
  const [standardDoc, setStandardDoc] = useState('')


  const handleCompare = async () => {
    setLoading(true);
    setError(null);
    setComparisonData(null);

    try {
      const url = 'https://9669-112-196-16-34.ngrok-free.app/comparison/compare-documents';
      console.log('token in compare', token);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '69420',
          'Accept': 'application/json',
        },
      });
      console.log("comparison data:", response.data);
      console.log("response status:", response.status);
      console.log("response headers:", response.headers);
      console.log("responseeeeeee:", response.data.standard_file_name);
      setComparisonData(response.data.comparison_result.changes);
      setStandardDoc(response.data.standard_file_name)
      setRedlinedDoc(response.data.redlined_file_name)

    } catch (err) {
      setError('Failed to fetch comparison data.');
      console.error("Error fetching comparison data:", err);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="col-span-2 bg-white p-4 shadow rounded-lg flex flex-col items-center ">
      {loading && (
        <div className="flex justify-center items-center w-full h-full absolute top-0 left-0 bg-opacity-50 bg-gray-800 z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-[#f58220] rounded-full animate-spin"></div>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center w-full mt-6">
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto text-center">
            <p className="font-semibold text-xl">Oops! Something went wrong.</p>
            <p className="mt-2">{error}</p>
          </div>
        </div>
      )}

      {!loading && !comparisonData && (
        <div className='w-full min-h-screen flex flex-col items-center justify-center'>
          <h2 className="font-semibold text-xl mb-4 text-center">Compare your Documents</h2>
          <button
            onClick={handleCompare}
            className="text-white bg-gradient-to-r from-[#FF7E5F] via-[#FEB47B] to-[#FF7E5F] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-800 font-medium rounded-full text-lg py-3 w-2/5 text-center shadow-lg transform transition duration-300 hover:scale-105"
          >
            Compare
          </button>
        </div>
      )}

      <div className="w-full h-5/6 space-y-6 text-left flex flex-col">
        <h3 className="font-semibold text-2xl text-gray-800 tracking-wide text-center">Comparison Results</h3>

        <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 flex-grow overflow-y-auto">
          <div className="flex items-center justify-around space-x-8 mb-6">
            <div className="text-center flex">
              <img
                src={document}
                alt="Standard Document"
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />
              <div>
                <p className="text-s ml-2 font-medium mt-2 text-left text-gray-800">Standard Document</p>
                <p className="text-sm ml-2 text-[#f58220] text-left line-clamp-2 max-w-xs sm:max-w-[10rem] md:max-w-[12rem] lg:max-w-[14rem]">
                  {standardDoc}
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
                  {redlinedDoc}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 space-y-3">
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

        {/* Fixed button container */}
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

      {/* {!loading && comparisonData && ( */}
      {/* <div className="w-full h-full mt-6 space-y-6 text-left">

        <h3 className="font-semibold text-2xl text-gray-800 tracking-wide text-center">Comparison Results</h3>
        <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 h-fit justify-center item-center">
          <div className="flex items-center justify-around mb-6 space-x-8">
            <div className="text-center flex">
              <img
                src={document}
                alt="Standard Document"
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />
              <div>
                <p className="text-s ml-2 font-medium mt-2 text-left text-gray-800">Standard Document</p>
                <p className="text-sm ml-2 text-[#f58220] text-left line-clamp-2 max-w-xs sm:max-w-[10rem] md:max-w-[12rem] lg:max-w-[14rem]">
                  redlinedDoc redlinedDoc redlinedDoc redlinedDoc
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
                  redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 space-y-3">
            <p className="font-semibold text-lg text-[#f58220] pb-2">Section: <span className="font-medium text-gray-700">Original Text:</span>
            </p>

            <p className="text-gray-700 pb-2">
              <span className="font-medium text-[#f58220]">Original Text:</span> comparisonData[currentPage].original_text redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDocredlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc redlinedDoc
            </p>
            <p className="text-gray-700 pb-2">
              <span className="font-medium text-[#f58220]">Revised Text:</span> comparisonData[currentPage].revised_text
            </p>
            <p className="text-gray-700 pb-2">
              <span className="font-medium text-[#f58220]">Nature of Change:</span> blah cblajkaa
            </p>
            <p className="text-gray-600 pb-2">
              <span className="font-medium text-[#f58220]">Favorable:</span> blah blah
            </p>
          </div>
        </div>



      </div> */}
      {/* )}*/}
    </div>

  );
};

export default CompareDocuments;
