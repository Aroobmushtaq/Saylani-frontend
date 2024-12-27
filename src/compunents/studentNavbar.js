import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/194086.svg"

const Navbar = () => {
  return (
    <nav className="bg-[#99CA3C] text-white p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
  {/* Logo */}
  <div className='bg-white rounded-3xl p-2'>
  <img 
    src={logo}  // Correct path to the image
    alt="Dashboard"
    className="w-32 md:w-48"  // Set logo width (32 for small screens, 48 for medium and larger screens)
  />
  </div>
  {/* Menu for larger screens */}
  <div className="hidden md:flex space-x-8">
    <Link to="/courses" className="hover:text-yellow-400">
      Courses
    </Link>
    <Link to="/blog" className="hover:text-yellow-400">
      Blog
    </Link>
    <Link to="/contact" className="hover:text-yellow-400">
      Contact
    </Link>

    {/* Register and Login Buttons */}
    <div className="flex space-x-4">
      <Link to="/register/student" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full">
        Register
      </Link>
      <Link to="/login/student" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">
        Login
      </Link>
    </div>
  </div>

  {/* Mobile Menu Button */}
  <div className="md:hidden flex items-center">
    <button className="text-white focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</div>


      {/* Mobile Menu (hidden by default) */}
      <div className="md:hidden mt-4 space-y-4 text-center">
        <Link to="/courses" className="block hover:text-yellow-400">Courses</Link>
        <Link to="/blog" className="block hover:text-yellow-400">Blog</Link>
        <Link to="/contact" className="block hover:text-yellow-400">Contact</Link>
        <div className="flex flex-col items-center space-y-4">
          <Link to="/register/student" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full">
            Register
          </Link>
          <Link to="/login/student" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
