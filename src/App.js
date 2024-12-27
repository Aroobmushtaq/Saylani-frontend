// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LandingPage from './compunents/LandingPage';
// import Registration from './compunents/registration';
// import Login from './compunents/login';
// import TeacherDashboard from './compunents/TeacherDashboard';
// import CreateCoursePage from './compunents/CreateCoursePage';
// import TeacherLayout from './compunents/TeacherLayout';
// import TeacherSettings from './compunents/TeacherSettingsPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/register/:role" element={<Registration />} />
//         <Route path="/login/:role" element={<Login />} />

//         {/* Teacher Routes */}
//         <Route path="/teacher" element={<TeacherLayout />}>
//           <Route path="dashboard" element={<TeacherDashboard />} />
//           <Route path="dashboard/create-course" element={<CreateCoursePage />} />
//           <Route path="dashboard/settings" element={<TeacherSettings />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './compunents/LandingPage';
import Registration from './compunents/registration';
import Login from './compunents/login';
import TeacherDashboard from './compunents/TeacherDashboard';
import CreateCoursePage from './compunents/CreateCoursePage';
import TeacherLayout from './compunents/TeacherLayout';
import TeacherSettings from './compunents/TeacherSettingsPage';
import StudentDashboard from "./compunents/studentDashboard";
import StudentCourse from './compunents/studentCourse';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register/:role" element={<Registration />} />
        <Route path="/login/:role" element={<Login />} />

        {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/courses" element={<StudentCourse />} />
        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="dashboard/create-course" element={<CreateCoursePage />} />
          <Route path="dashboard/settings" element={<TeacherSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
