import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './navigation/Home/HomePage';
import LoginPage from './navigation/Login/LoginPage';
import SignupPage from './navigation/Signup/SignupPage';
import ExplanationPage from './navigation/ExplanationChatbot/ExplanationPage';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explanation" element={<ExplanationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
