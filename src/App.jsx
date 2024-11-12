import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './navigation/Home/HomePage';
import LoginPage from './navigation/Login/LoginPage';
import SignupPage from './navigation/Signup/SignupPage';
import ExplanationPage from './navigation/ExplanationChatbot/ExplanationPage';

import { useSelector } from 'react-redux';

function App() {
  const token = useSelector((state) => state.auth.token);
  return (
    <BrowserRouter>
    <Routes>
      {/* Protecting routes that require authentication */}
      <Route
        path="/"
        element={token ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/explanation"
        element={token ? <ExplanationPage /> : <Navigate to="/login" />}
      />

      {/* Unprotected routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
