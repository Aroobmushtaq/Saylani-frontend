import React, { useState } from 'react';
import axios from 'axios';
import logo from '../images/194086.svg';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../styles/LandingPage.css'; // Reuse LandingPage CSS for background

const Registration = () => {
  const { role } = useParams(); // Capture "student" or "teacher" from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: role || 'student', // Default to the role in the URL or "student"
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      console.log(response.data);
      navigate(`/login/${formData.userType}`); // Redirect to login page after successful registration
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="landing-page bg-cover bg-center h-screen flex flex-col justify-center items-center">
      <div className="content-container space-y-6 w-full max-w-lg sm:max-w-md text-center transition-all duration-300">
        {/* Logo Section */}
        <div className="logo-container w-80 h-30 bg-white flex justify-center items-center rounded-lg shadow-xl">
          <img
            src={logo} // Correctly use the imported logo
            alt="Logo"
            className="logo-image w-60 h-24 object-contain rounded-lg"
          />
        </div>
      </div>
      <div className="content-container space-y-6 w-80 max-w-lg sm:max-w-md bg-gradient-to-b from-[#99CA3C] to-[#0030B3] rounded-lg shadow-xl p-4">
        <h2 className="text-white text-lg font-semibold mb-4">Registration Form</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              name="name"
              className="w-full p-2 pl-4 pr-8 mt-1 border bg-[#FFFFFF80] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#99CA3C]"
              value={formData.name}
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              className="w-full p-2 pl-4 pr-8 mt-2 border bg-[#FFFFFF80] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#99CA3C]"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              className="w-full p-2 pl-4 pr-8 mt-2 border bg-[#FFFFFF80] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#99CA3C]"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="p-2 pl-7 pr-7 mt-6 bg-[#99CA3C] text-white rounded-3xl shadow-lg hover:scale-105 transform transition-transform duration-300 w-auto mx-auto block"
          >
            Submit
          </button>
        </form>

        {/* Link to Login page if already have an account */}
        <div className="mt-4 text-white">
          <span>Have an account? </span>
          <Link to={`/login/${formData.userType}`} className="text-[#99CA3C] hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
