import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setEmail, clearSignupData, setFullname, setPassword } from '../../redux/slices/signupSlice';
import { signupUser } from '../../redux/slices/signupSlice';
import { Link, useNavigate } from 'react-router-dom';

import image from "../../assets/contract.png";
import logo from "../../assets/logo.png";

const SignupPage = () => {
  const { username, email, fullname, password , loading, error} = useSelector((state) => state.signup);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(signupUser({ username,email, fullname,  password }));
    if (signupUser.fulfilled.match(resultAction)) {
      dispatch(clearSignupData());
      navigate('/login');
    } else {
      console.log("Signup error:", error);
      alert(resultAction.payload || "Signup failed: Unexpected error");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="hidden md:flex md:flex-1 h-full">
        <img className="w-full h-auto object-contain mb-15" src={image} alt="Signup Illustration" />
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-end items-center pr-6 pt-6">
          <img className="w-56 h-20 object-contain" src={logo} alt="Netsmartz Logo" />
        </div>
        <div className="flex-1 flex justify-center items-center bg-white-100 mb-20">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg drop-shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-2">Sign Up</h2>
            <p className="text-center mb-6 text-gray-500">Create your account to get started.</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="text-left">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => dispatch(setUsername(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-black focus:ring-[#F39200] focus:border-[#F39200] block w-full p-2.5"
                  placeholder="Enter Username"
                  required
                />
              </div>

              <div className="text-left">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-black focus:ring-[#F39200] focus:border-[#F39200] block w-full p-2.5"
                  placeholder="Enter Email"
                  required
                />
              </div>

              <div className="text-left">
                <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                <input
                  type="text"
                  id="fullname"
                  value={fullname}
                  onChange={(e) => dispatch(setFullname(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-black focus:ring-[#F39200] focus:border-[#F39200] block w-full p-2.5"
                  placeholder="Enter Full Name"
                  required
                />
              </div>

              <div className="text-left">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-black focus:ring-[#F39200] focus:border-[#F39200] block w-full p-2.5"
                  placeholder="Enter Password"
                  required
                />
              </div>

              <button type="submit" className="text-white bg-[#F39200] hover:bg-[#D97B00] w-full py-2 rounded-lg font-semibold">
                {loading ? <span className="loading loading-dots loading-md"></span> : 'SIGN UP'}
              </button>
            </form>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-[#F39200] hover:text-[#D97B00] font-semibold">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
