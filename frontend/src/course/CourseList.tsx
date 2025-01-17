import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Course[]>('http://localhost:7000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to fetch courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (courseId: string) => {
    setLoading(true);
    try {
      const response = await axios.post<{ url: string }>(
        'http://localhost:7000/api/create-payment-session',
        { courseId }
      );
      window.location.href = response.data.url; // Redirect to the payment URL
    } catch (error) {
      console.error('Error creating payment session:', error);
      setError('Failed to create payment session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get('status');
    if (status === 'success') {
      navigate('/dashboard');
    } else if (status === 'canceled') {
      navigate('/course-list');
    }
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="border rounded-lg shadow p-4 bg-white">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-gray-700">{course.description}</p>
            <p className="text-lg font-bold mt-2">Price: ${(course.price).toFixed(2)}</p>
            <button 
              onClick={() => handlePayment(course._id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;