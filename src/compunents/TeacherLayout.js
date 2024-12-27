// import React from 'react';
// import { Link, Outlet } from 'react-router-dom';
// // import '../styles/TeacherLayout.css'; // Add styles if needed

// const TeacherLayout = () => {
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/login/teacher'; // Redirect to login page
//   };

//   return (
//     <div className="layout-container">
//       {/* Navbar */}
//       <div className="navbar">
//         <Link to="/teacher/dashboard" className="navbar-link">Dashboard</Link>
//         <Link to="/teacher/dashboard/create-course" className="navbar-link">Create Course</Link>
//         <Link to="/teacher/students" className="navbar-link">Students</Link>
//         <Link to="/teacher/settings" className="navbar-link">Settings</Link>
//         <button onClick={handleLogout} className="navbar-link logout-btn">Logout</button>
//       </div>

//       {/* Outlet for nested routes */}
//       <div className="page-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default TeacherLayout;





// import React from 'react';
// import { Link, Outlet } from 'react-router-dom';

// const TeacherLayout = () => {
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/login/teacher'; // Redirect to login page
//   };

//   return (
//     <div className="layout-container">
//       {/* Navbar */}
//       <div className="navbar">
//         {/* <Link to="/teacher/dashboard" className="navbar-link">Dashboard</Link> */}
//         <Link to="/teacher/dashboard/create-course" className="navbar-link">Create Course</Link>
//         <Link to="/teacher/students" className="navbar-link">Students</Link>
//         <Link to="/teacher/dashboard/settings" className="navbar-link">Settings</Link>
//         <button onClick={handleLogout} className="navbar-link logout-btn">Logout</button>
//       </div>

//       {/* Outlet for Nested Routes */}
//       <div className="page-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default TeacherLayout;
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

const TeacherLayout = () => {
  const [teacherData, setTeacherData] = useState(null);

  
  useEffect(() => {
    const fetchTeacherData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return; // Optionally redirect to login
      }

      try {
        const response = await axios.get('http://localhost:5000/api/teacher/profile', {
          headers: {
            Authorization: `${token}`,
          },
        });
        setTeacherData(response.data.teacher);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeacherData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login/teacher';
  };

  return (
    <div className="layout-container">
      <div className="navbar">
        {teacherData && (
          <div className="teacher-profile">
            {/* <img src={`http://localhost:5000${teacherData.image}`} alt="Profile" className="profile-image" /> */}
            <span className="teacher-name">{teacherData.name}</span>
          </div>
        )}
        <Link to="/teacher/dashboard/create-course" className="navbar-link">Create Course</Link>
        <Link to="/teacher/students" className="navbar-link">Students</Link>
        <Link to="/teacher/dashboard/settings" className="navbar-link">Settings</Link>
        <button onClick={handleLogout} className="navbar-link logout-btn">Logout</button>
      </div>

      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherLayout;
