// import React, { useState, useEffect } from 'react';
// import Navbar from './studentNavbar'; // Ensure the correct path to Navbar
// import axios from 'axios';

// const StudentCourse = () => {
//   const [courses, setCourses] = useState([]); // State to store courses
//   const [error, setError] = useState(''); // State to store error messages

//   // Fetch courses when the component mounts
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/student/courses'); // Correct endpoint
//         setCourses(response.data || []); // Set courses in state
//       } catch (err) {
//         setError(err.response?.data?.message || 'Error loading courses');
//         console.error('Error fetching courses:', err);
//       }
//     };
  
//     fetchCourses();
//   }, []);

//   return (
//     <div>
//       <Navbar /> {/* Include the Navbar */}
//       <div className="p-4">
//         <h1 className="text-5xl font-semibold py-4 text-transparent bg-gradient-to-r from-[#99CA3C] to-[#0030B3] bg-clip-text">
//           Start learning with <br /> free courses
//         </h1>
//         <p className="text-[#0030B3]">Explore free online courses.</p>

//         {/* Display error messages */}
//         {error && <div className="text-red-500">{error}</div>}

//         {/* Display courses */}
//         {courses.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//             {courses.map((course) => (
//               <div key={course._id} className="border rounded-md shadow-md p-4">
//                 {/* Display the course image if it exists */}
//                 {course.image && (
//                   <img
//                     src={course.image.startsWith('http') ? course.image : `http://localhost:5000${course.image}`}
//                     alt={course.name}
//                     className="w-full h-48 object-cover rounded-md mb-3"
//                   />
//                 )}
//                 <h4 className="text-lg font-semibold">{course.name}</h4>
//                 <p className="text-sm text-gray-700">{course.description}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 mt-6">No courses available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentCourse;
import React, { useState, useEffect } from 'react';
import Navbar from './studentNavbar'; // Ensure the correct path to Navbar
import axios from 'axios';

const StudentCourse = () => {
  const [courses, setCourses] = useState([]); // State to store courses
  const [error, setError] = useState(''); // State to store error messages
  const [successMessage, setSuccessMessage] = useState(''); // State to store success messages

  // Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/courses'); // Correct endpoint
        setCourses(response.data || []); // Set courses in state
      } catch (err) {
        setError(err.response?.data?.message || 'Error loading courses');
        console.error('Error fetching courses:', err);
      }
    };

    fetchCourses();
  }, []);

  const handleApply = async (courseId) => {
    try {
      setSuccessMessage(''); // Clear previous success messages
      setError(''); // Clear previous errors

      // Send a request to apply for a course
      const response = await axios.post(`http://localhost:5000/api/student/courses/${courseId}/apply`);
      setSuccessMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Error applying for the course');
    }
  };

  return (
    <div>
      <Navbar /> {/* Include the Navbar */}
      <div className="p-4">
        <h1 className="text-5xl font-semibold py-4 text-transparent bg-gradient-to-r from-[#99CA3C] to-[#0030B3] bg-clip-text">
          Start learning with <br /> free courses
        </h1>
        <p className="text-[#0030B3]">Explore free online courses.</p>

        {/* Display success and error messages */}
        {successMessage && <div className="text-green-500">{successMessage}</div>}
        {error && <div className="text-red-500">{error}</div>}

        {/* Display courses */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {courses.map((course) => (
              <div key={course._id} className="border rounded-md shadow-md p-4">
                {/* Display the course image if it exists */}
                {course.image && (
                  <img
                    src={course.image.startsWith('http') ? course.image : `http://localhost:5000${course.image}`}
                    alt={course.name}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                )}
                <h4 className="text-lg font-semibold">{course.name}</h4>
                <p className="text-sm text-gray-700">{course.description}</p>
                <button
                  onClick={() => handleApply(course._id)}
                  className="mt-4 bg-[#0030B3] text-white px-4 py-2 rounded-md hover:bg-[#002080]"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-6">No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default StudentCourse;
