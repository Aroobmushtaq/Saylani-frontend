import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/194086.svg'; // Import logo
import '../styles/LandingPage.css'; // Import the CSS file

const LandingPage = () => {
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        if (role === 'student') {
            navigate('/login/student');
        } else if (role === 'teacher') {
            navigate('/login/teacher');
        }
    };

    return (
        <div className="landing-page bg-cover bg-center h-screen flex flex-col justify-center items-center">
            <div className="content-container space-y-6 w-full max-w-lg sm:max-w-md text-center transition-all duration-300">
                {/* Logo Section */}
                <div className="logo-container w-50 h-30 bg-white flex justify-center items-center rounded-lg shadow-xl">
                    <img
                        src={logo} // Correctly use the imported logo
                        alt="Logo"
                        className="logo-image w-40 h-24 object-contain rounded-lg"
                    />
                </div>
                <div className="buttons-container flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
                    {/* Student Button */}
                    <div
                        className="button w-32 sm:w-30 h-32 sm:h-24 bg-gradient-to-b from-[#99CA3C] to-[#0030B3] text-white flex justify-center items-center cursor-pointer rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
                        onClick={() => handleRoleSelect('student')}
                    >
                        <h2 className="text-lg sm:text-xl font-bold">Student</h2>
                    </div>

                    {/* Teacher Button */}
                    <div
                        className="button w-32 sm:w-30 h-32 sm:h-24 bg-gradient-to-b from-[#99CA3C] to-[#0030B3] text-white flex justify-center items-center cursor-pointer rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
                        onClick={() => handleRoleSelect('teacher')}
                    >
                        <h2 className="text-lg sm:text-xl font-bold">Teacher</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
