import React, { useEffect, useState } from 'react'
import FileUpload from '../../components/FileUpload/FileUpload';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
import CompareDocuments from '../../components/CompareDocuments/CompareDocuments';
import Navbar from '../../components/Navbar/Navbar';
import deleteimg from "../../assets/deleted.png";
import comparison from "../../assets/compare.png";

const HomePage = () => {
  const [standardFile, setStandardFile] = useState(null);
  const [revisedFile, setRevisedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [redlinedFileName, setRedlinedFileName] = useState('')
  const [standardFileName, setStandardFileName] = useState('')
  const token = useSelector((state) => state.auth.token);
  const [history, setHistory] = useState([]);

  const [selectedHistory, setSelectedHistory] = useState(null);

  const handleStandardFileSelect = (file) => setStandardFile(file);
  const handleRevisedFileSelect = (file) => setRevisedFile(file);
  const [redlinedDoc, setRedlinedDoc] = useState('')
  const [standardDoc, setStandardDoc] = useState('')

  // const handleTabClick = async (item) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axios.get(`${baseUrl}/history/get-history-details/`, {
  //       params: { id: item.id },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         Accept: 'application/json',
  //       },
  //     });
  //     setSelectedHistory({
  //       comparisonData: response.data.comparison_result.changes,
  //       standardDoc: response.data.standard_file_name,
  //       redlinedDoc: response.data.redlined_file_name,
  //     });
  //   } catch (err) {
  //     setError('Error fetching comparison details.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleUpload = async () => {
    if (!standardFile || !revisedFile) {
      setError('Please upload both files');
      alert('Please upload both files');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('standard_file', standardFile);
    formData.append('revised_file', revisedFile);

    try {
      const response = await axios.post(`${baseUrl}/upload-documents/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        onUploadProgress: (event) => {
          const progress = Math.round((event.loaded * 100) / event.total);
          setProgress(progress);
        },
      });
      console.log('res', response)
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.log('error', error)
      setError(error.response.data.detail);
      setLoading(false);
      setProgress(0);
    }
  };
  const [comparisonResult, setComparisonResult] = useState(null);

  const fetchHistory = async (offset = 0, limit = 10) => {
    console.log('token', token);
    setHistoryLoading(true)
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
      setHistoryLoading(false)
      console.log(typeof response.data.comparison_history)
      setHistory(response.data.comparison_history || []);
    } catch (error) {
      console.error('Error fetching history:', error);
      setHistoryLoading(false)
    }
  };
  const handleTabClick = (item) => {
    setSelectedHistory(item); // Update selected history
    console.log('item', item)

    console.log(typeof item.result);
    const parsedResult = JSON.parse(item.result);
    console.log('123', parsedResult.changes)
    setComparisonResult(parsedResult.changes); // Parse and pass the result to the CompareDocuments component
  };



  useEffect(() => {
    fetchHistory()
  }, [])

  const handleFiles = async () => {
    try {
      const response = await axios.get(`${baseUrl}/view-standard-file`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': '69420',
          'Accept': 'application/json',
        },

      });
      console.log('res', response.data.message)
      setStandardFileName(response.data.message)
      console.log('response', response.data.message)

    } catch (error) {
      setError('Failed to fetch file name');
      setLoading(false);
      setProgress(0);
    }
  };
  const handleRedlinedFiles = async () => {
    try {
      const response = await axios.get(`${baseUrl}/view-redlined-file`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': '69420',
          'Accept': 'application/json',
        },

      });
      console.log('res', response.data.message)
      setRedlinedFileName(response.data.message)
      console.log('response', response.data.message)

    } catch (error) {
      setError('Failed to fetch file name');
      setLoading(false);
      setProgress(0);
    }
  };


  const handleDeleteDocuments = async () => {
    try {
      const response = await fetch(`${baseUrl}/delete-documents/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response)

      if (response.ok) {
        alert("Documents deleted successfully");
      } else {
        console.error("Failed to delete documents");
      }
    } catch (error) {
      console.error("Error deleting documents:", error);
    }
  };
  const [isComparing, setIsComparing] = useState(false);
  const startNewComparison = async () => {
    setIsComparing(true);
    try {
      const response = await axios.get(`${baseUrl}/comparison/compare-documents/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '69420',
          'Accept': 'application/json',
        },
      });
      console.log("New comparison started:", response.data);
      setComparisonResult(response.data.comparison_result.changes)
      setStandardDoc(response.data.standard_file_name);
      setRedlinedDoc(response.data.redlined_file_name);
      // Handle response as needed
    } catch (error) {
      console.error("Error starting new comparison:", error);
    } finally {
      setIsComparing(false);
    }
  };
  const handleCompare = async () => {
    setLoading(true);
    setError(null);
    setComparisonData(null);

    try {
      // const url = 'https://9669-112-196-16-34.ngrok-free.app/comparison/compare-documents';
      const response = await axios.get(`${baseUrl}/comparison/compare-documents/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '69420',
          'Accept': 'application/json',
        },
      });
      setComparisonData(response.data.comparison_result.changes);
      setStandardDoc(response.data.standard_file_name);
      setRedlinedDoc(response.data.redlined_file_name);
    } catch (err) {
      setError(err.response.data.detail);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-white-50">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left Section: Upload Section - 25% Width */}
        <div className="col-span-1 bg-white p-4 shadow rounded-lg">
          <h3 className="font-bold text-center text-xl pb-2">Upload Files</h3>
          <FileUpload id={1} labelText="Upload standard file" onFileSelect={handleStandardFileSelect} />
          <FileUpload id={2} labelText="Upload redlined file" onFileSelect={handleRevisedFileSelect} />

          {loading && (
            <div className="mt-4">
              <div>Uploading: {progress}%</div>
              <div className="bg-gray-200 rounded-full">
                <div className="bg-[#F39200] text-xs leading-none py-1 text-center text-white rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {!loading && !error && (standardFile || revisedFile) && progress === 100 && (
            <div className="mt-4 text-[#F39200] text-sm">Files uploaded successfully!</div>
          )}
          {error && <div className="mt-4 text-red-500">{error}</div>}

          <button onClick={handleUpload} className="btn btn-block hover:bg-[#f58220] mt-4">Process Documents</button>
          <button className="flex items-center btn-block justify-center space-x-2 pt-2 text-red-500 mt-2" onClick={handleDeleteDocuments}>
            {/* {error && <div className="mt-4 text-red-500">{error}</div>} */}
            <img className="w-10 h-auto object-contain" src={deleteimg} alt="Delete Documents" />
            {/* <RiDeleteBin5Fill className="w-6 h-8" /> */}
            {/* <svg id="Layer_1" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path fill="red" d="m21.414 5h-4.414v-4.414zm.586 2v17h-20v-21a3 3 0 0 1 3-3h10v7zm-8.586 8 2.543-2.543-1.414-1.414-2.543 2.543-2.543-2.543-1.414 1.414 2.543 2.543-2.543 2.543 1.414 1.414 2.543-2.543 2.543 2.543 1.414-1.414z"/></svg> */}
          </button>

        </div>
        {/* <CompareDocuments /> */}
        <div className="col-span-2 bg-white rounded-lg">
          {/* <h3 className="font-bold mb-4 text-center">Comparison Results</h3> */}
          {comparisonResult ? (
            <CompareDocuments comparisonData={comparisonResult} redlinedDocName={redlinedDoc} standardDocName={standardDoc} />
          ) : (
            // <p className="text-center text-gray-500">No document comparison selected.</p>
            <div className='w-full min-h-full flex flex-col items-center justify-center'>
              {/* <h2 className="font-semibold text-xl mb-4 text-center">Compare your Documents</h2> */}
              <button
                onClick={startNewComparison}
                className="text-white rounded-xl bg-gradient-to-r bg-[#f58220] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-800 font-medium text-lg py-3 w-2/5 text-center shadow-lg transform transition duration-300 hover:scale-105"
              >
                Compare your documents
              </button>
            </div>
          )}
        </div>

        {/* Right Section: History - 25% Width */}
        <div className="col-span-1 bg-white p-4 shadow rounded-lg">
          {/* <button
            className="hover:bg-gray-400 font-bold w-full text-left text-black p-2 rounded mb-4"
            onClick={startNewComparison}
            disabled={isComparing}
          >
            {isComparing ? "Starting New Session..." : "New Comparison"}
          </button> */}
          <button
            className="hover:bg-[#f58220] hover:text-white font-semibold w-full text-left text-black p-2 rounded mb-4 flex items-center justify-between"
            onClick={startNewComparison}
            disabled={isComparing}
          >

            {isComparing ? "Starting New Session..." : "New Comparison"}
            <img
              src={comparison} // Replace with your image path
              alt="icon"
              className="w-7 h-7 mr-2 justify-end" // Adjust size and spacing
            />
          </button>

          <h3 className="font-bold mb-4 px-2 text-left">Comparison History</h3>

          {/* {history.length > 0 ? (
            <div className="space-y-2">
              {history.map((item) => {
                let resultObj
                try {
                  // Parse result if it's a string
                  resultObj = typeof item.result === 'string'
                    ? JSON.parse(item.result.replace(/\\/g, '')) // Remove backslashes before parsing
                    : item.result;
                } catch (error) {
                  console.error('Failed to parse result:', error);
                  resultObj = null;
                }
                const changes = resultObj?.changes;
                const revisedText = changes?.[0]?.revised_text || 'No text available';
                // Debugging console logs
                console.log('Item:', item);
                console.log('Changes:', changes);
                console.log('Revised Text:', revisedText);

                return (
                  <button
                    key={item.id}
                    className={`w-full text-left p-2 text-sm rounded-md border ${selectedHistory?.id === item.id ? 'bg-[#f58220] text-white' : 'bg-gray-100 text-black'
                      }`}
                    onClick={() => handleTabClick(item)}
                  >
                    {`${revisedText.split(' ').slice(0, 3).join(' ')}...`}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">No Comparison history available.</p>
          )} */}
          {historyLoading ? (
            // Loader to indicate history is loading
            <div className="flex justify-center items-center py-40">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : history.length > 0 ? (
            <div className="space-y-2">
              {history.map((item) => {
                let resultObj;
                try {
                  // Parse result if it's a string
                  resultObj =
                    typeof item.result === "string"
                      ? JSON.parse(item.result.replace(/\\/g, ""))
                      : item.result;
                } catch (error) {
                  console.error("Failed to parse result:", error);
                  resultObj = null;
                }

                const changes = resultObj?.changes;
                const revisedText =
                  changes?.[0]?.revised_text || "No text available";

                return (
                  <button
                    key={item.id}
                    className={`w-full text-left p-2 text-sm rounded-md border ${selectedHistory?.id === item.id
                        ? "bg-[#f58220] text-white"
                        : "bg-gray-100 text-black"
                      }`}
                    onClick={() => handleTabClick(item)}
                  >
                    {`${revisedText.split(" ").slice(0, 3).join(" ")}...`}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No Comparison history available.
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default HomePage;


