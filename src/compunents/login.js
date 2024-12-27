import React, { useState } from 'react';
import axios from 'axios';
import logo from '../images/194086.svg';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../styles/LandingPage.css'; // Reuse LandingPage CSS for background

const Login = () => {
    const { role } = useParams(); // Capture "student" or "teacher" from the URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/users/login', formData);
    //         console.log(response.data);

    //         // Store the token and user data in localStorage
    //         if (response.data.token) {
    //             localStorage.setItem('token', response.data.token);
    //             localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
    //             console.log('Token saved:', response.data.token);
    //             console.log(response.data.user)
    //         }

    //         // Redirect to the respective dashboard
    //         if (response.data.userType === 'teacher') {
    //             navigate(`/student/dashboard`);
    //         } else {
    //             navigate(`/teacher/dashboard`);
    //         }
    //     } catch (error) {
    //         setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    //     }
    // };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            console.log(response.data);
    
            // Store the token and user data in localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
                console.log('Token saved:', response.data.token);
                console.log(response.data.user);
            }
    
            // Redirect to the respective dashboard
            if (response.data.user.userType === 'teacher') {
                navigate(`/teacher/dashboard`);  // Correct route for teachers
            } else {
                navigate(`/student/dashboard`);  // Correct route for students
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
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
                <h2 className="text-white text-lg font-semibold mb-4">Login</h2>
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 pl-4 pr-8 mt-1 border bg-[#FFFFFF80] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#99CA3C]"
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
                        Login
                    </button>
                </form>
                <div className="mt-4 text-white">
                    <span>Don't have an account? </span>
                    <Link to={`/register/${role || 'student'}`} className="text-[#99CA3C] hover:underline">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
