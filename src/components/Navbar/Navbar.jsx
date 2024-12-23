// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { CiLogout } from "react-icons/ci";
// import logo from "../../assets/logo.png"
// import { logoutUser, clearState } from '../../redux/slices/authSlice';
// import { useDispatch } from 'react-redux';
// const Navbar = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     // Function to handle logout
//     const handleLogout = async () => {
//         try {
//             await dispatch(logoutUser()).unwrap(); // Wait for the API call
//             navigate('/login');
//             dispatch(clearState()); // Clear state if needed
//         } catch (error) {
//             console.error('Logout failed:', error);
//         }
//     };

//     return (
//         <nav className="bg-white shadow-md text-white flex items-center justify-between p-4 mb-4">
//             <div className="flex items-center space-x-4">
//                 <img className="w-55 h-10 object-cover" src={logo} alt="Netsmartz Logo" />
//                 <Link
//                     to="/"
//                     className={`btn btn-ghost text-lg normal-case ${location.pathname === '/' ? 'text-[#f49535]' : 'text-black'
//                         }`}
//                 >
//                     Compare
//                 </Link>
//                 <Link
//                     to="/explanation"
//                     className={`btn btn-ghost text-lg normal-case ${location.pathname === '/explanation' ? 'text-[#f49535]' : 'text-black'
//                         }`}
//                 >
//                     Explanation
//                 </Link>
//             </div>
//             <div className="dropdown dropdown-end">
//                 <button className="flex items-center justify-center gap-2 px-3 py-2 bg-[#F39200] text-white text-sm font-medium rounded-md shadow-md hover:bg-[#d87d00] active:bg-[#bf7000] transition-all duration-200"
//                     onClick={handleLogout}>
//                     <span className='text-white'>Logout </span>
//                     <CiLogout className="w-6 h-8" color='white' />
//                 </button>
//                 {/* <ul className="menu text-black menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
//                     <li><a href="#">Profile</a></li>
//                     <li><a href="#">Settings</a></li>
//                     <li><a href="#">Logout</a></li>
//                 </ul> */}

//             </div>
//         </nav>
//     )
// }

// export default Navbar

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import logo from "../../assets/logo.png";
import { logoutUser, clearState } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to handle logout
    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap(); // Wait for the API call
            dispatch(clearState()); // Clear state if needed
            navigate('/login');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <nav className="bg-white shadow-md text-white flex items-center justify-between p-4 mb-4">
                <div className="flex items-center space-x-4">
                    <img className="w-55 h-10 object-cover" src={logo} alt="Netsmartz Logo" />
                    <Link
                        to="/"
                        className={`btn btn-ghost text-lg normal-case ${location.pathname === '/' ? 'text-[#f49535]' : 'text-black'
                            }`}
                    >
                        Compare
                    </Link>
                    <Link
                        to="/explanation"
                        className={`btn btn-ghost text-lg normal-case ${location.pathname === '/explanation' ? 'text-[#f49535]' : 'text-black'
                            }`}
                    >
                        Explanation
                    </Link>
                </div>
                <button
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-[#F39200] text-white text-sm font-medium rounded-md shadow-md hover:bg-[#d87d00] active:bg-[#bf7000] transition-all duration-200"
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className="text-white">Logout</span>
                    <CiLogout className="w-6 h-8" color="white" />
                </button>
            </nav>

            {/* Logout Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-3/4 max-w-sm rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800">Confirm Logout</h2>
                        <p className="text-gray-600 mt-2">
                            Are you sure you want to log out?
                        </p>
                        <div className="mt-6 flex justify-evenly gap-4">
                            <button
                                className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-orange-400"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn bg-[#F39200] text-white hover:bg-[#d87d00] active:bg-[#bf7000] transition-all duration-200"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
