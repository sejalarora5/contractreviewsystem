import React, {useState} from 'react'
import FileUpload from '../../components/FileUpload/FileUpload';
import { AiOutlineDelete } from 'react-icons/ai';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_BASE_URL;

import axios from 'axios';
import DocumentDetails from '../../components/DocumentDetaills/DocumentDetails';
import CompareDocuments from '../../components/CompareDocuments/CompareDocuments';
import MyComponent from '../../components/MyComponent';
// const HomePage = () => {

//   const [standardFile, setStandardFile] = useState(null);
//   const [revisedFile, setRevisedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState('');
//   const token = useSelector((state) => state.auth.token);
//     console.log("tokenn bearer", token)

//   // Handle file selection for standard and revised files
//   const handleStandardFileSelect = (file) => setStandardFile(file);
//   const handleRevisedFileSelect = (file) => setRevisedFile(file);

//   // Handle file upload when "Process Documents" button is clicked
//   const handleUpload = async () => {
//     if (!standardFile || !revisedFile) {
//       setError('Please upload both files');
//       alert('Please upload both files')
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append('standard_file', standardFile);
//     formData.append('revised_file', revisedFile);

//     try {
//       const response = await axios.post(`${baseUrl}upload-documents`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`,
//         },
//         onUploadProgress: (event) => {
//           const progress = Math.round((event.loaded * 100) / event.total);
//           setProgress(progress);
//         },
//       });

//       console.log("Upload response:", response.data);
//       setLoading(false);
//       setProgress(100); // Set to 100% on completion
//     } catch (error) {
//       setError('Failed to upload files');
//       console.error("Upload error:", error);
//       setLoading(false);
//       setProgress(0);
//     }
//   };
//   const handleProcessDocuments = async () => {
//     if (!standardFile || !revisedFile) {
//       alert("Please upload both files before processing.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("standard_file", standardFile);
//     formData.append("revised_file", revisedFile);

//     try {
//       const response = await axios.post(`${baseUrl}upload-documents`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("Documents processed:", response.data);
//       alert("Documents processed successfully!");
//     } catch (error) {
//       console.error("Error uploading documents:", error);
//       alert("Failed to process documents.");
//     }
//   };

//   const handleDeleteDocuments = async () => {
//     try {
//       // Call the delete API to remove uploaded documents
//       const response = await fetch('/api/delete-documents', {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         console.log("Documents deleted successfully");
//         // Optionally clear state or show a success message here
//       } else {
//         console.error("Failed to delete documents");
//       }
//     } catch (error) {
//       console.error("Error deleting documents:", error);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-white-50 p-4">
//       {/* NavBar */}
//       <nav className="bg-black text-white flex items-center justify-between p-4 mb-4">
//         <div className="flex items-center space-x-4">
//           <button className="btn btn-ghost text-lg text-white normal-case">Compare</button>
//           <button className="btn btn-ghost text-lg text-gray-400 normal-case">Validation</button>
//         </div>
//         <div className="dropdown dropdown-end">
//           <button className="btn btn-ghost btn-circle">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//             </svg>
//           </button>
//           <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
//             <li><a href="#">Profile</a></li>
//             <li><a href="#">Settings</a></li>
//             <li><a href="#">Logout</a></li>
//           </ul>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {/* Left Section: File Upload */}
//         <div className="col-span-1 space-y-2">
//           <div className="flex flex-col items-center space-y-2">
//           </div>
//           <FileUpload labelText="Upload standard file" onFileSelect={handleStandardFileSelect}  />
//           <FileUpload labelText="Upload redlined file" onFileSelect={handleRevisedFileSelect} />
//              {/* Show progress */}
//       {loading && (
//         <div className="mt-4">
//           <div>Uploading: {progress}%</div>
//           <div className="bg-gray-200 rounded-full">
//             <div
//               className="bg-[#F39200] text-xs leading-none py-1 text-center text-white rounded-full"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Success/Error Messages */}
//       {!loading && !error && (standardFile || revisedFile) && progress === 100 && (
//         <div className="mt-4 text-[#F39200] text-sm">Files uploaded successfully!</div>
//       )}

//       {error && <div className="mt-4 text-red-500">{error}</div>}
//           <button onClick={handleUpload} className="btn btn-block mt-4" >Process Documents</button>
//           <button
//             className="flex items-center btn-block justify-center space-x-2 text-red-500 mt-2"
//             onClick={handleDeleteDocuments}
//           >
//             <RiDeleteBin5Fill className="w-6 h-8" />
//             {/* <span className='text-center text-black'>Delete Documents</span> */}
//           </button>
//         </div>

//         {/* Center Section: Document Details */}

//         <div class="flex justify-center items-center">
//     <button 
//         type="button" 
//         class="text-white bg-gradient-to-r from-[#FF7E5F] via-[#FEB47B] to-[#FF7E5F] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-800 font-medium rounded-full text-lg px-12 py-6 text-center shadow-lg transform transition duration-300 hover:scale-105 w-full md:w-auto md:px-14 lg:px-16"
//     >
//         Attractive Gradient Button
//     </button>
// </div>


//        {/* <DocumentDetails/> */}

//         {/* Right Section: History */}
//         <div className="col-span-1 bg-white p-4 shadow rounded-lg">
//           <h3 className="font-bold mb-4">History</h3>
//           <ul className="space-y-2">
//             {["2023-10-01", "2023-09-28", "2023-09-25", "2023-09-20", "2023-09-15"].map((date, index) => (
//               <li key={index} className="flex items-center space-x-2">
//                 <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
//                 <span>Comparison {index + 1}</span>
//                 <span className="text-gray-500 text-sm">{date}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>

//   )
// }

// export default HomePage



// import React, { useState } from 'react';
// import FileUpload from '../../components/FileUpload/FileUpload';
// import { AiOutlineDelete } from 'react-icons/ai';
// import { RiDeleteBin5Fill } from "react-icons/ri";
// import { useSelector } from "react-redux";
// import axios from 'axios';
// import DocumentDetails from '../../components/DocumentDetails/DocumentDetails';

// const baseUrl = import.meta.env.VITE_BASE_URL;

const HomePage = () => {
  const [standardFile, setStandardFile] = useState(null);
  const [revisedFile, setRevisedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const token = useSelector((state) => state.auth.token);
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJha3NoYXkiLCJleHAiOjE3MzEzMzk3NjZ9.amUNsznP7I2exgfYd7gTHn2kT3fAM8s4GmWr9OLeunE'

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
      const response = await axios.post(`${baseUrl}upload-documents`, formData, {
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
      setError('Failed to upload files');
      setLoading(false);
      setProgress(0);
    }
  };

  const handleDeleteDocuments = async () => {
    try {
      const response = await fetch(`${baseUrl}delete-documents`, {
        method: 'DELETE',
        headers:  {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("Documents deleted successfully");
      } else {
        console.error("Failed to delete documents");
      }
    } catch (error) {
      console.error("Error deleting documents:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white-50">
      <nav className="bg-black text-white flex items-center justify-between p-4 mb-4">
        <div className="flex items-center space-x-4">
          <button className="btn btn-ghost text-lg text-white normal-case">Compare</button>
          <button className="btn btn-ghost text-lg text-gray-400 normal-case">Validation</button>
        </div>
        <div className="dropdown dropdown-end">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
          <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="#">Profile</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left Section: Upload Section - 25% Width */}
        <div className="col-span-1 bg-white p-4 shadow rounded-lg">
          <h3 className="font-bold text-center pb-2">Upload Files</h3>
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

          <button onClick={handleUpload} className="btn btn-block mt-4">Process Documents</button>
          <button className="flex items-center btn-block justify-center space-x-2 text-red-500 mt-2" onClick={handleDeleteDocuments}>
            <RiDeleteBin5Fill className="w-6 h-8" />
          </button>
          {/* <MyComponent/> */}
        </div>

        {/* Center Section: Document Details and Compare Button - 50% Width */}
        {/* <div className="col-span-2 bg-white p-4 shadow rounded-lg flex flex-col items-center justify-center"> */}
          {/* <h2 className="font-semibold text-xl mb-4 text-center">Compare your Documents </h2>
          <button 
            className="text-white bg-gradient-to-r from-[#FF7E5F] via-[#FEB47B] to-[#FF7E5F] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-800 font-medium rounded-full text-lg py-3 w-2/5 text-center shadow-lg transform transition duration-300 hover:scale-105"
          >
            Compare
          </button> */}
          <CompareDocuments/>
          {/* <DocumentDetails /> */}
        {/* </div> */}

        {/* Right Section: History - 25% Width */}
        <div className="col-span-1 bg-white p-4 shadow rounded-lg">
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
