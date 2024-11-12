import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/logo.png"
import user from "../../assets/circle-user.svg"
const Navbar = () => {
    return (
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
            <div className="dropdown dropdown-end">
                <button className="shadow-none bg-white stroke-none outline-none pr-5">
                    {/* <img source={user} classname="w-10 h-10 object-cover rounded-lg shadow-md" color='orange'/> */}
                    {/* <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                        <g id="SVGRepo_bgCarrier" stroke-width="0" />

                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                        <g id="SVGRepo_iconCarrier"> <circle cx="12" cy="9" r="3" stroke="#f49535" stroke-width="1.5" /> <circle cx="12" cy="12" r="10" stroke="#f49535" stroke-width="1.5" /> <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#f49535" stroke-width="1.5" stroke-linecap="round" /> </g>

                    </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="35" height="35"><path fill="#f58220" d="m16,23.314c-1.252.444-2.598.686-4,.686s-2.748-.242-4-.686v-2.314c0-2.206,1.794-4,4-4s4,1.794,4,4v2.314ZM12,7c-1.103,0-2,.897-2,2s.897,2,2,2,2-.897,2-2-.897-2-2-2Zm12,5c0,4.433-2.416,8.311-6,10.389v-1.389c0-3.309-2.691-6-6-6s-6,2.691-6,6v1.389C2.416,20.311,0,16.433,0,12,0,5.383,5.383,0,12,0s12,5.383,12,12Zm-8-3c0-2.206-1.794-4-4-4s-4,1.794-4,4,1.794,4,4,4,4-1.794,4-4Z"/></svg>

                </button>
                {/* <ul className="menu text-black menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Logout</a></li>
                </ul> */}

            </div>
        </nav>
    )
}

export default Navbar