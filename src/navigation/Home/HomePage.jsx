import React, { useEffect, useState } from 'react'
import FileUpload from '../../components/FileUpload/FileUpload';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
import CompareDocuments from '../../components/CompareDocuments/CompareDocuments';
import Navbar from '../../components/Navbar/Navbar';
import deleteimg from "../../assets/deleted.png";

const HomePage = () => {
  const [standardFile, setStandardFile] = useState(null);
  const [revisedFile, setRevisedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const[redlinedFileName, setRedlinedFileName] = useState('')
  const[standardFileName, setStandardFileName] = useState('')
  const token = useSelector((state) => state.auth.token);

  const handleStandardFileSelect = (file) => setStandardFile(file);
  const handleRevisedFileSelect = (file) => setRevisedFile(file);

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
  // useEffect(()=> {
  //   handleFiles()
  // }, [])
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

  return (
    <div className="min-h-screen bg-white-50">
      <Navbar/>

      <div className="grid grid-cols-4 gap-4">
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
        <CompareDocuments />

        {/* Right Section: History - 25% Width */}
        {/* <div className="col-span-1 bg-white p-4 shadow rounded-lg">
          <h3 className="font-bold mb-4 text-center">History</h3>
          <ul className="space-y-2">
            {["2023-10-01", "2023-09-28", "2023-09-25", "2023-09-20", "2023-09-15"].map((date, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <span>Comparison {index + 1}</span>
                <span className="text-gray-500 text-sm">{date}</span>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;


