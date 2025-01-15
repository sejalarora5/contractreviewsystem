import React, { useState, useEffect } from 'react';
import fileupload from "../../assets/file-upload.svg"

const FileUpload = ({ labelText = "Upload File", onFileSelect, onFileUpload, id, shouldReset, onResetComplete }) => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0); // for showing progress
    const [error, setError] = useState(''); // for error messages
    const [loading, setLoading] = useState(false); // for showing loading state
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
    useEffect(() => {
        if (shouldReset) {
            setFile(null);
            setProgress(0);
            setError('');
            setLoading(false);
            onFileSelect(null); // Notify parent that file has been cleared
            onResetComplete?.(); // Notify parent that reset is complete
        }
    }, [shouldReset, onFileSelect, onResetComplete]);

    return (
        <div className="flex flex-col items-center justify-center p-1 w-64 mx-auto">
            <div className="flex flex-col items-center w-64">
                <input
                    type="file"
                    accept=".docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id={`file-upload${id}`}
                    key={file ? 'has-file' : 'no-file'}
                />
                <label
                    htmlFor={`file-upload${id}`}
                    className="flex flex-col items-center space-x-2 cursor-pointer rounded-lg px-14 py-8 bg-gray-100 text-white"
                >
                    <div className="w-32 h-32 flex items-center justify-center mb-4">
                        <img
                            className="w-full h-full object-contain"
                            src={fileupload}
                            alt="Upload file"
                        />
                    </div>
                    <div className="h-6 flex items-center justify-center">
                        <p className="text-center text-black text-sm px-2 line-clamp-2">
                            {labelText}
                        </p>
                    </div>
                </label>

            </div>

            {file && !loading && !onFileUpload && (
                <div className="mt-4 text-sm text-gray-600">
                    File: <span className="font-semibold ">{file.name}</span>
                </div>
            )}

            {/* {error && <div className="mt-2 text-red-500 text-sm">{error}</div>} */}

        </div>
    );
};

export default FileUpload;
