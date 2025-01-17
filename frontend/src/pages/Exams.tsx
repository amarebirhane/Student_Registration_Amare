import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

interface Exam {
  _id: string;
  title: string;
  subject: string;
  date: string;
  duration: number; // Duration in minutes
}

const Exams: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState<number | ''>(60); // Default duration

  useEffect(() => {
    const fetchExams = async () => {
      const response = await axios.get('http://localhost:7000/api/exams');
      setExams(response.data);
    };

    fetchExams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newExam = { title, subject, date, duration };

    // Post the new exam and expect it to return the full exam object
    const response = await axios.post('http://localhost:7000/api/exams', newExam);
    setExams([...exams, response.data]); // Use the response data
    setTitle('');
    setSubject('');
    setDate('');
    setDuration(60);
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Insert the Sidebar here */}
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Exams</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Exam Title"
            className="border p-2 rounded w-full mb-2 text-white"
            required
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="border p-2 rounded w-full mb-2 text-white"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded w-full mb-2 text-white"
            required
          />
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            placeholder="Duration (minutes)"
            className="border p-2 rounded w-full mb-2 text-white"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Exam
          </button>
        </form>
        <div>
          {exams.map((exam) => (
            <div key={exam._id} className="border p-4 mb-2 rounded">
              <h2 className="text-xl font-semibold">{exam.title}</h2>
              <p>Subject: {exam.subject}</p>
              <p>Exam Date: {new Date(exam.date).toLocaleDateString()}</p>
              <p>Duration: {exam.duration} minutes</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exams;



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Exams = () => {
//   const [exams, setExams] = useState([]);

//   // Fetch Exams
//   useEffect(() => {
//     axios
//       .get("http://localhost:7000/api/exams")
//       .then((res) => setExams(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Exams</h1>
//       <ul className="space-y-4">
//         {exams.map((exam) => (
//           <li
//             key={exam._id}
//             className="p-4 border rounded-md shadow-sm bg-white"
//           >
//             <h2 className="text-lg font-semibold">{exam.title}</h2>
//             <p className="text-gray-700">
//               Date: {new Date(exam.date).toLocaleDateString()}
//             </p>
//             <p className="text-gray-700">Duration: {exam.duration} minutes</p>
//             <p className="text-gray-700">Total Marks: {exam.totalMarks}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Exams;
