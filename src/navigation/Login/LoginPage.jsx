import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import image from "../../assets/woman.png";
import logo from "../../assets/logo.png";
import { loginUser } from '../../redux/slices/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {  error } = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.auth.loading);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); 

  // Load saved credentials on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  // const handleSubmit = (e) => {
  //   console.log( 'erroring', error)

  //   e.preventDefault();
  //   dispatch(loginUser({ username, password }))
  //     .then((e) => {
  //       // console.log("HELLO",e.type);
  //       if (e.type == 'auth/token/fulfilled') {
  //         navigate('/');
  //         // console.log("HELLO",e.type);
  //       }
  //     })
  //     .catch(() => {
  //       // console.log('error', error)
  //     });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const resultAction = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      if (rememberMe) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
      } else {
        // Clear credentials if "Remember Me" is unchecked
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
      navigate('/');
    } else {
      console.log(error,' erra')
      alert(resultAction.payload)
      
      console.error("Login failed:", resultAction.payload || "Unexpected error");
    }
  };
  return (
    <div className="h-screen flex flex-col md:flex-row">

      <div className="hidden md:flex md:flex-1 h-full">
        <img className="w-5/5 h-auto object-contain mb-20" src={image} alt="Login Illustration" />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-end items-center p-4">
          <img className="w-56 h-20 object-contain" src={logo} alt="Netsmartz Logo" />
        </div>
        <div className="flex-1 flex justify-center items-center bg-white-100 mb-20">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg drop-shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-2">Sign in</h2>
            <p className="text-center mb-6 text-gray-500">Enter your credentials to continue.</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="text-left">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-black focus:ring-[#F39200] focus:border-[#F39200] block w-full p-2.5"
                  placeholder="Enter Username"
                  required
                />
              </div>
               <div className="text-left">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  type={showPassword ? "text" : "password"}  // Toggle between text and password
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-black focus:ring-black focus:border-black block w-full p-2.5" 
                  placeholder="Enter Password"
                  required
                />
              </div>
                <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center">
                  <input
                    id="show-password"
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}  // Toggle showPassword state
                    className="h-4 w-4 text-[#F39200]"
                  />
                  <label htmlFor="show-password" className="ml-2 text-sm text-gray-600">Show Password</label>
                </div>
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-[#F39200]"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember Me?</label>
                </div>
              </div>
              <button type="submit" className="text-white bg-[#F39200] hover:bg-[#D97B00] w-full py-2 rounded-lg font-semibold">
                {loading ? <span className="loading loading-dots loading-md"></span> : 'SIGN IN'}
              </button>
              {/* {error ? <p>{error}</p>: ''} */}
            </form>
           
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/signup" className="text-[#F39200] hover:text-[#D97B00] font-semibold">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
