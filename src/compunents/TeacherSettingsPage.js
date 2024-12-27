import React, { useState } from "react";
import axios from "axios";

const TeacherSettings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
        const token = localStorage.getItem("token"); // Get current token
        const response = await axios.patch(
            "http://localhost:5000/api/teacher/settings", // API endpoint for updating settings
            formData,
            {
                headers: {
                    Authorization: token, // Include token in headers
                },
            }
        );

        // Update token in localStorage with the new token from the backend
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        setMessage(response.data.message);
    } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
    }
};


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Update Profile</h1>
      {message && <div className="text-green-500 text-sm mb-4">{message}</div>}
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
            Current Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your current password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter a new password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 transition duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default TeacherSettings;
