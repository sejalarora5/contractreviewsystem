import React, { useEffect, useState } from 'react'
import FileUpload from '../../components/FileUpload/FileUpload';
import { useSelector } from "react-redux";
import CompareDocuments from '../../components/CompareDocuments/CompareDocuments';
import Navbar from '../../components/Navbar/Navbar';
import deleteimg from "../../assets/deleted.png";
import ApiService from '../../services/apiService';

const HomePage = () => {

  const token = useSelector((state) => state.auth.token);

  const [standardFile, setStandardFile] = useState(null);
  const [revisedFile, setRevisedFile] = useState(null);
  const [redlinedDoc, setRedlinedDoc] = useState('')
  const [standardDoc, setStandardDoc] = useState('')
  const [fileUploaded, setFileUploaded] = useState(false)


  const [loading, setLoading] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const [history, setHistory] = useState([]);
  const [shouldResetFiles, setShouldResetFiles] = useState(false);

  const [selectedHistory, setSelectedHistory] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);

  const [standardFileName, setStandardFileName] = useState('')
  const [redlinedFileName, setRedlinedFileName] = useState('')

  const handleStandardFileSelect = (file) => setStandardFile(file);
  const handleRevisedFileSelect = (file) => setRevisedFile(file);

  // Upload Documents API
  const handleUpload = async () => {
    if (!standardFile || !revisedFile) {
      setError('Please upload both files');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await ApiService.documentApi.uploadDocuments(
        standardFile,
        revisedFile,
        (progress) => setProgress(progress)
      );

      console.log('Upload response:', response);
      setProgress(100);

      if (response.status === 200) {
        await handleFiles();
        setFileUploaded(true)
      }
    } catch (error) {
      console.error('Upload error:', error);
      // setError(error.response?.data?.detail || 'Upload failed');
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  // Compare Documents API
  const startNewComparison = async () => {
    setIsComparing(true);
    try {
      const response = await ApiService.documentApi.compareDocuments();
      // Validate the response format
      if (
        response.data &&
        response.data.comparison_result &&
        Array.isArray(response.data.comparison_result.changes)
      ) {
        const changes = response.data.comparison_result.changes;

        // Handle case when no changes are found
        if (changes.length === 0) {
          setError('No changes found between the documents.');
          setComparisonResult([]); // Clear the comparison results in the UI
          setIsComparing(false);
        } else {
          // Update the UI with valid results
          fetchHistory();
          setComparisonResult(changes);
          setStandardDoc(response.data.standard_file_name);
          setRedlinedDoc(response.data.redlined_file_name);
          setError(''); // Clear any previous errors
          setIsComparing(false);
        }
        console.log('New comparison started:', response.data);
      } else {
        throw new Error('Invalid response format'); // Handle unexpected response
      }
    } catch (error) {
      console.error('Error starting new comparison:', error);
      setError(error.detail);
    } finally {
      setIsComparing(false);
    }
  };

  // Delete Documents API
  const handleDeleteDocuments = async () => {
    try {
      const response = await ApiService.documentApi.deleteDocuments();
      if (response.status === 200) {
        setShouldResetFiles(true);
        setStandardFile(null);
        setRevisedFile(null);
        setError('')
        setFileUploaded(false);
        console.log('Successfuly deleted the documents', response)
        await handleFiles();
      }
      else {
        console.error("Failed to delete documents");
      }
    } catch (error) {
      console.error("Error deleting documents:", error.response.data.detail);
    }
  };

  // History API
  const fetchHistory = async () => {
    setHistoryLoading(true)
    try {
      const response = await ApiService.historyApi.getHistory(0, 20);
      console.log('Response of comparison history API', response.data.comparison_history);
      setHistoryLoading(false)
      setHistory(response.data.comparison_history || []);
    } catch (error) {
      console.error('Error fetching history:', error);
      setHistoryLoading(false)
    }
  };

  const handleFiles = async () => {
    try {
      const response = await ApiService.documentApi.viewStandardFile();
      if (response.status === 200) {
        setStandardFileName(response.data.message)
        console.log('res', response.data.message)
      }
    }
    catch (error) {
      console.error('Failed to fetch file name');
    }
    try {
      const response = await ApiService.documentApi.viewRedlinedFile();
      if (response.status === 200) {
        setRedlinedFileName(response.data.message)
        console.log('res', response.data.message)
      }
    }
    catch (error) {
      console.error('Failed to fetch file name');
    }
  };

  useEffect(() => {
    handleFiles()
    fetchHistory()
  }, [])

  console.log('ohmy', fileUploaded)
  const handleTabClick = (item) => {
    setSelectedHistory(item); // Update selected history

    const parsedResult = JSON.parse(item.result);
    setComparisonResult(parsedResult.comparison_result.changes); // Parse and pass the result to the Compare Documents component
    setStandardDoc(parsedResult.standard_file_name);
    setRedlinedDoc(parsedResult.redlined_file_name);

    console.log('item', item)
  };

  console.log('token', token)
  const handleResetComplete = () => {
    setShouldResetFiles(false);
  };

  return (
    <div className="min-h-screen bg-white-50">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left Section: Upload Section - 25% Width */}
        <div className="col-span-1 bg-white p-3 shadow rounded-lg">
          {/* <h3 className="font-bold text-center text-xl pb-2">Upload Documents</h3> */}
          <FileUpload id={1} labelText={standardFileName} onFileUpload={fileUploaded} onFileSelect={handleStandardFileSelect} shouldReset={shouldResetFiles}
            onResetComplete={handleResetComplete}
          />
          <FileUpload id={2} labelText={redlinedFileName} onFileUpload={fileUploaded} onFileSelect={handleRevisedFileSelect} shouldReset={shouldResetFiles}
            onResetComplete={handleResetComplete}
          />

          {loading && (
            <div className="mt-4">
              <div>Uploading: {progress}%</div>
              <div className="bg-gray-200 rounded-full">
                <div className="bg-[#F39200] text-xs leading-none py-1 text-center text-white rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {!loading && !error && fileUploaded && (
            <div className="mt-4 text-[#F39200] text-sm">Files uploaded successfully!</div>
          )}
          {error && <div className="mt-2 text-red-500">{error}</div>}

          <button onClick={handleUpload} className="btn btn-block hover:text-white hover:bg-[#f58220] my-2">Upload Documents</button>
          <button className="flex items-center btn-block justify-center space-x-2 pt-2 text-red-500" onClick={handleDeleteDocuments}>
            {/* {error && <div className="mt-4 text-red-500">{error}</div>} */}
            <img className="w-10 h-auto object-contain" src={deleteimg} alt="Delete Documents" />
            {/* <RiDeleteBin5Fill className="w-6 h-8" /> */}
            {/* <svg id="Layer_1" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path fill="red" d="m21.414 5h-4.414v-4.414zm.586 2v17h-20v-21a3 3 0 0 1 3-3h10v7zm-8.586 8 2.543-2.543-1.414-1.414-2.543 2.543-2.543-2.543-1.414 1.414 2.543 2.543-2.543 2.543 1.414 1.414 2.543-2.543 2.543 2.543 1.414-1.414z"/></svg> */}
          </button>

        </div>
        <div className="col-span-2 bg-white rounded-lg relative">
          {/* {isComparing && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-4">
                <span className="loading loading-spinner loading-lg text-[#f58220]"></span>
                <p className="text-lg font-semibold text-gray-700">Comparing Documents...</p>
              </div>
            </div>
          )} */}
          {isComparing ? (
            <div className="relative w-full min-h-full">
              {/* Show existing results in background if they exist */}
              {comparisonResult && comparisonResult.length > 0 && (
                <div className="opacity-50">
                  <CompareDocuments
                    comparisonData={comparisonResult}
                    redlinedDocName={redlinedDoc}
                    standardDocName={standardDoc}
                  />
                </div>
              )}

              {/* Loader overlay */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                <svg
                  className="animate-spin h-8 w-8 text-[#f58220]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span className="ml-3 text-gray-600">Comparing documents...</span>
              </div>
            </div>
          ) : (
            <>
              {comparisonResult && comparisonResult.length > 0 ? (
                <CompareDocuments
                  comparisonData={comparisonResult}
                  redlinedDocName={redlinedDoc}
                  standardDocName={standardDoc}
                />
              ) : (
                <div className="w-full min-h-full flex flex-col items-center justify-center">
                  {comparisonResult && comparisonResult.length === 0 ? (
                    <div className="text-gray-500 text-lg text-center mb-4">
                      No changes found between the documents.
                    </div>
                  ) : (
                    <div className="text-gray-500 text-lg text-center mb-4">
                      Upload documents to start comparison.
                    </div>
                  )}
                  <button
                    onClick={startNewComparison}
                    disabled={isComparing}
                    className="text-white rounded-xl bg-gradient-to-r bg-[#f58220] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-800 font-medium text-lg py-3 w-2/5 text-center shadow-lg transform transition duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Compare your documents
                  </button>
                </div>
              )}
            </>
          )}
        </div>


        {/* Right Section: History - 25% Width */}
        <div className="col-span-1 pr-2 bg-white h-[570px]">
          <button
            className="mb-4 w-full px-4 py-2 bg-[#f58220] text-white rounded-lg"
            onClick={startNewComparison}
            disabled={isComparing}
          >
            {isComparing ? "Starting New Session..." : "New Comparison"}
          </button>
          <h3 className="font-bold mb-4 px-2 text-left">Comparison History</h3>

          {historyLoading ? (
            // Loader to indicate history is loading
            <div className="flex justify-center items-center py-40">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : history.length > 0 ? (
            <div className="space-y-2 overflow-y-auto h-full">
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

                const changes = resultObj?.comparison_result?.changes;
                // console.log('changes', resultObj)
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