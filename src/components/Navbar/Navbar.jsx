// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { CiLogout } from "react-icons/ci";
// import { RiLogoutCircleRFill } from "react-icons/ri";
// import { AiOutlineLogout } from "react-icons/ai";
// import { IoIosLogOut } from "react-icons/io";

// import logo from "../../assets/logo.png";
// import { logoutUser, clearState } from '../../redux/slices/authSlice';
// import { useDispatch } from 'react-redux';

// const Navbar = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // Function to handle logout
//     const handleLogout = async () => {
//         try {
//             await dispatch(logoutUser()).unwrap(); // Wait for the API call
//             dispatch(clearState()); // Clear state if needed
//             navigate('/login');
//             setIsModalOpen(false);
//         } catch (error) {
//             console.error('Logout failed:', error);
//         }
//     };

//     return (
//         <>
//             <nav className="bg-white shadow-md text-white flex items-center justify-between p-4 mb-4">
//                 <div className="flex items-center space-x-4 max-w-screen-xl mx-auto">
//                     <img className="w-55 h-10 object-cover" src={logo} alt="Netsmartz Logo" />
//                     <Link
//                         to="/"
//                         className={`btn btn-ghost text-lg normal-case ${location.pathname === '/' ? 'text-[#f49535]' : 'text-black'
//                             }`}
//                     >
//                         Compare
//                     </Link>
//                     <Link
//                         to="/explanation"
//                         className={`btn btn-ghost text-lg normal-case ${location.pathname === '/explanation' ? 'text-[#f49535]' : 'text-black'
//                             }`}
//                     >
//                         Explanation
//                     </Link>
//                 </div>
//                 <button
//                     className="flex items-center justify-center gap-1 px-3 py-2 bg-[#F58220] text-white text-sm font-normal rounded-md shadow-md hover:bg-orange-400 active:bg-[#000000] transition-all duration-200"
//                     onClick={() => setIsModalOpen(true)}
//                 >
//                     <RiLogoutCircleRFill className="w-6 h-6" color="white" />
//                     <span className="text-white">LOG OUT</span>

//                 </button>
//             </nav>

//             {/* Logout Confirmation Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white w-3/4 max-w-sm rounded-lg shadow-lg p-6">
//                         <h2 className="text-xl font-semibold text-gray-800">Confirm Logout</h2>
//                         <p className="text-gray-600 mt-2">
//                             Are you sure you want to log out?
//                         </p>
//                         <div className="mt-6 flex justify-evenly gap-4">
//                             <button
//                                 className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-orange-400"
//                                 onClick={() => setIsModalOpen(false)}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 className="btn bg-[#F39200] text-white hover:bg-[#d87d00] active:bg-[#bf7000] transition-all duration-200"
//                                 onClick={handleLogout}
//                             >
//                                 Logout
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutCircleRFill } from "react-icons/ri";
import logo from "../../assets/logo.png";
import { logoutUser, clearState } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { Menu } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to handle logout
    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            dispatch(clearState());
            navigate('/login');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <nav className="bg-white shadow-md text-white flex flex-wrap items-center justify-between p-4 mb-4 relative">
                <div className="flex items-center space-x-4">
                    <img className="w-50 h-9 md:w-55 md:h-10 object-cover" src={logo} alt="Netsmartz Logo" />
                </div>

                <button
                    className="md:hidden text-black"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu className="h-6 w-6" />
                </button>

                <div className={`${
                    isMenuOpen ? 'flex' : 'hidden'
                } md:flex flex-col md:flex-row w-full md:w-auto md:items-center md:space-x-4 mt-4 md:mt-0`}>
                    <Link
                        to="/"
                        className={`btn btn-ghost text-lg normal-case mb-2 md:mb-0 ${
                            location.pathname === '/' ? 'text-[#f49535]' : 'text-black'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Compare
                    </Link>
                    <Link
                        to="/explanation"
                        className={`btn btn-ghost text-lg normal-case mb-2 md:mb-0 ${
                            location.pathname === '/explanation' ? 'text-[#f49535]' : 'text-black'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Explanation
                    </Link>
                    <button
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-[#F58220] text-white text-sm font-normal rounded-md shadow-md hover:bg-orange-400 active:bg-[#000000] transition-all duration-200"
                        onClick={() => {
                            setIsModalOpen(true);
                            setIsMenuOpen(false);
                        }}
                    >
                        <RiLogoutCircleRFill className="w-6 h-6" color="white" />
                        <span className="text-white">SIGN OUT</span>
                    </button>
                </div>
            </nav>

            {/* Logout Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Confirm Sign Out
                        </h2>
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
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;