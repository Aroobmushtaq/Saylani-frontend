import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/TeacherDashboard.css';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]); // State to store courses
  const [error, setError] = useState(''); // State to store error messages
  const [isEditing, setIsEditing] = useState(false); // State to handle edit mode
  const [editCourse, setEditCourse] = useState(null); // Store the course being edited
  const navigate = useNavigate();

  // Fetch teacher's courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication error. Please log in.');
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/teacher/courses', {
          headers: {
            Authorization: `${token}`,
          },
        });

        // Log the API response
        console.log('API Response:', response.data);

        // Set courses state to the data from the response or an empty array
        setCourses(response.data || []);
      } catch (err) {
        // Set error state if API call fails
        setError(err.response?.data?.message || 'Error loading courses');
        console.error('API error:', err);
      }
    };

    fetchCourses(); // Call the function to fetch courses
  }, [navigate]);

  // Handle delete course
  const handleDelete = async (courseId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication error. Please log in.');
      navigate('/login');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/teacher/courses/${courseId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      // Remove deleted course from state
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting course');
      console.error('API error:', err);
    }
  };

  // Handle course update
  const handleUpdate = (course) => {
    setEditCourse(course);
    setIsEditing(true); // Set edit mode to true
  };

  // Handle form submission for updating course
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication error. Please log in.');
      navigate('/login');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', editCourse.name);
      formData.append('description', editCourse.description);
      if (editCourse.image) {
        formData.append('image', editCourse.image);
      }

      const response = await axios.patch(
        `http://localhost:5000/api/teacher/courses/${editCourse._id}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Update course list with the updated course
      setCourses(
        courses.map((course) =>
          course._id === response.data.course._id ? response.data.course : course
        )
      );

      setIsEditing(false);
      setEditCourse(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating course');
      console.error('API error:', err);
    }
  };

  // Handle input changes during update
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="dashboard-container">
      {/* Display error messages */}
      {error && <div className="error-message">{error}</div>}

      {/* If editing a course, show the edit form */}
      {isEditing && editCourse && (
        <div className="edit-course-form">
          <h3>Edit Course</h3>
          <form onSubmit={handleUpdateSubmit}>
            <input
              type="text"
              name="name"
              value={editCourse.name}
              onChange={handleInputChange}
              placeholder="Course Name"
              required
            />
            <textarea
              name="description"
              value={editCourse.description}
              onChange={handleInputChange}
              placeholder="Course Description"
              required
            />
            <input
              type="file"
              name="image"
              onChange={(e) => setEditCourse({ ...editCourse, image: e.target.files[0] })}
            />
            <button type="submit">Update Course</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      )}

      {/* Show courses */}
      <div className="course-section">
        <h3>My Courses</h3>
        {/* Conditionally render courses */}
        {Array.isArray(courses) && courses.length > 0 ? (
          <div className="course-list">
            {courses.map((course) => (
              <div key={course._id} className="course-item">
                {/* Display the image if it exists */}
                {course.image && (
                  <img
                    src={`http://localhost:5000${course.image}`} // Full URL to the image
                    alt={course.name}
                    className="course-image"
                  />
                )}
                <h4>{course.name}</h4>
                <p>{course.description}</p>
                {/* Update and delete buttons */}
                <button onClick={() => handleUpdate(course)}>Edit</button>
                <button onClick={() => handleDelete(course._id)}>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
