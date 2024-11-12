import React, { useState } from 'react';
import upload from "../../assets/uploadfile.png"
const baseUrl = import.meta.env.VITE_BASE_URL;
import { useSelector } from 'react-redux';

const FileUpload = ({ labelText = "Upload File" , onFileSelect, id}) => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0); // for showing progress
    const [error, setError] = useState(''); // for error messages
    const [loading, setLoading] = useState(false); // for showing loading state
    const token = useSelector((state) => state.auth.token);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        if (!selectedFile || selectedFile.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          setError('Please upload a valid .docx file');
          setFile(null);
          return;
        }
    
        setError('');
        setFile(selectedFile);
        onFileSelect(selectedFile); // Pass file to parent if needed
      };
   
    return (
        <div className="flex flex-col items-center justify-center p-2">
            <div className="flex flex-col items-center">
                <input
                    type="file"
                    accept=".docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id={`file-upload${id}`}
                />
                <label
                    htmlFor={`file-upload${id}`}
                    className="flex flex-col items-center space-x-2 cursor-pointer bg-[#FFFFFF] text-white"
                >
                    <img className="w-8/12 h-2/6 object-contain" src={upload} alt="Upload file" />
                    <p className='text-center text-black'>{labelText}</p>
                </label>



            </div>

            {file && !loading && (
                <div className="mt-4 text-sm text-gray-600">
                    File: <span className="font-semibold">{file.name}</span>
                </div>
            )}

            {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}

        </div>
    );
};

export default FileUpload;
