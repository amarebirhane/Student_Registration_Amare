import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

interface CourseInput {
  title: string;
  description: string;
  price: number;
}

const AddCourse: React.FC = () => {
  const [courseData, setCourseData] = useState<CourseInput>({
    title: '',
    description: '',
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: name === 'price' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/api/courses', courseData);
      toast.success('Course added successfully!'); // Use toast for success message
      setCourseData({ title: '', description: '', price: 0 });
    } catch (error) {
      console.error('Error adding course:', error);
      toast.error('Failed to add course. Please try again.'); // Use toast for error message
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Add Course</h2>
        <div className="mb-4">
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          ></textarea>
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
        >
          Add Course
        </button>
      </form>
      <ToastContainer /> {/* Container for toast notifications */}
    </div>
  );
};

export default AddCourse;