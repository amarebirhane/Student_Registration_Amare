import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

interface Assignment {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
}

const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      const response = await axios.get('http://localhost:7000/api/assignments');
      setAssignments(response.data);
    };

    fetchAssignments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAssignment = { title, description, dueDate };

    // Post the new assignment and expect it to return the full assignment object
    const response = await axios.post('http://localhost:7000/api/assignments', newAssignment);
    setAssignments([...assignments, response.data]); // Use the response data
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Include Sidebar here */}
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Assignments</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Assignment Title"
            className="border p-2 rounded w-full mb-2 text-white"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border p-2 rounded w-full mb-2 text-white"
            required
          ></textarea>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 rounded w-full mb-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Assignment
          </button>
        </form>
        <div>
          {assignments.map((assignment) => (
            <div key={assignment._id} className="border p-4 mb-2 rounded">
              <h2 className="text-xl font-semibold">{assignment.title}</h2>
              <p>{assignment.description}</p>
              <small>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assignments;


       // the assignment that that allow student to see
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Assignments = () => {
//   const [assignments, setAssignments] = useState([]);

//   // Fetch Assignments
//   useEffect(() => {
//     axios.get("http://localhost:7000/api/assignments")
//       .then((res) => setAssignments(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Assignments</h1>
//       <ul className="space-y-4">
//         {assignments.map((assignment) => (
//           <li
//             key={assignment._id}
//             className="p-4 border rounded-md shadow-sm bg-white"
//           >
//             <h2 className="text-lg font-semibold">{assignment.title}</h2>
//             <p className="text-gray-700">{assignment.description}</p>
//             <p className="text-sm text-gray-500">
//               Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Assignments;
