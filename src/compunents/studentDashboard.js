import React from 'react';
import Navbar from './studentNavbar'; // Import the Navbar component
import courseImage from "../images/Online Course.png";

const StudentDashboard = () => {
  return (
    <div>
      <Navbar /> {/* Add Navbar here */}

      {/* Main Content with background color */}
      <div className="flex items-center space-x-8 p-4 bg-[#99CA3C33]">
        <div className="flex-1">
        <h1 className="text-5xl font-semibold py-4 text-transparent bg-gradient-to-r from-[#99CA3C] via-[#99CA3C] to-[#0030B3] bg-clip-text">Learn without <br />limits</h1>
          
          {/* Gradient Text */}
          <p className="text-transparent bg-gradient-to-r from-[#0030B3] to-[#99CA3C] bg-clip-text">
            Start, switch, or advance your career with <br />more than 7,000 courses,
            Professional <br />Certificates, and degrees from world-class <br />universities and companies.
          </p>
          
          {/* Gradient Button */}
          <button className="bg-gradient-to-r from-[#0030B3] to-[#99CA3C] text-white py-2 px-6 rounded-2xl">
            Courses
          </button>
        </div>

        {/* Image */}
        <img 
          src={courseImage}  // Correct path to the image
          alt="Dashboard"
          className="w-1/3"  // Adjust the image width
        />
      </div>
    </div>
  );
};

export default StudentDashboard;
