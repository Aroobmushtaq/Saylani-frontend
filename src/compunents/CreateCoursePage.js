// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../styles/CreateCoursePage.css';

// const CreateCoursePage = () => {
//   const [newCourse, setNewCourse] = useState({
//     name: '',
//     description: '',
//     image: null,
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleCourseChange = (e) => {
//     const { name, value } = e.target;
//     setNewCourse((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setNewCourse((prevState) => ({
//       ...prevState,
//       image: e.target.files[0],
//     }));
//   };

//   const handleCreateCourse = async (e) => {
//     e.preventDefault();

//     // Get token from localStorage
//     const token = localStorage.getItem('token');
//     console.log("Token from localStorage:", token); // Ensure token is correct

//     if (!token) {
//       setError('Authentication required. Please log in.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', newCourse.name);
//     formData.append('description', newCourse.description);
//     if (newCourse.image) {
//       formData.append('image', newCourse.image);
//     }

//     try {
//       // Make API call to create course
//       const response = await axios.post('http://localhost:5000/api/teacher/courses', formData, {
//         headers: {
//           Authorization: `${token}`, // Send the token in the Authorization header
//         },
//       });
//       navigate('/teacher/dashboard'); // Redirect to dashboard after successful creation
//     } catch (err) {
//       // Log the error to the console for debugging
//       console.error('Error creating course:', err.response ? err.response.data : err.message);
//       setError('Error creating course');
//     }
//   };

//   return (
//     <div className="create-course-container">
//       <h3 className="create-course-title">Create Course</h3>
//       {error && <div className="error-message">{error}</div>}
//       <form onSubmit={handleCreateCourse} className="create-course-form">
//         <input
//           type="text"
//           name="name"
//           value={newCourse.name}
//           onChange={handleCourseChange}
//           placeholder="Course Name"
//           className="form-input"
//           required
//         />
//         <textarea
//           name="description"
//           value={newCourse.description}
//           onChange={handleCourseChange}
//           placeholder="Course Description"
//           className="form-textarea"
//           required
//         />
//         <input
//           type="file"
//           name="image"
//           onChange={handleFileChange}
//           className="form-file-input"
//         />
//         <button type="submit" className="submit-button">Create</button>
//         <button type="submit" className="submit-button">Cancel</button>
//       </form>
//     </div>
//   );
// };

// export default CreateCoursePage;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateCoursePage.css';

const CreateCoursePage = () => {
  const [newCourse, setNewCourse] = useState({
    name: '',
    description: '',
    image: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewCourse((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    // Get token from localStorage
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token); // Ensure token is correct

    if (!token) {
      setError('Authentication required. Please log in.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newCourse.name);
    formData.append('description', newCourse.description);
    if (newCourse.image) {
      formData.append('image', newCourse.image);
    }

    try {
      // Make API call to create course
      const response = await axios.post('http://localhost:5000/api/teacher/courses', formData, {
        headers: {
          Authorization: `${token}`, // Send the token in the Authorization header
        },
      });
      navigate('/teacher/dashboard'); // Redirect to dashboard after successful creation
    } catch (err) {
      // Log the error to the console for debugging
      console.error('Error creating course:', err.response ? err.response.data : err.message);
      setError('Error creating course');
    }
  };

  const handleCancel = () => {
    navigate('/teacher/dashboard'); // Navigate to the dashboard on cancel
  };

  return (
    <div className="create-course-container">
      <h3 className="create-course-title">Create Course</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleCreateCourse} className="create-course-form">
        <input
          type="text"
          name="name"
          value={newCourse.name}
          onChange={handleCourseChange}
          placeholder="Course Name"
          className="form-input"
          required
        />
        <textarea
          name="description"
          value={newCourse.description}
          onChange={handleCourseChange}
          placeholder="Course Description"
          className="form-textarea"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="form-file-input"
        />
        <button type="submit" className="submit-button">Create</button>
        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateCoursePage;
