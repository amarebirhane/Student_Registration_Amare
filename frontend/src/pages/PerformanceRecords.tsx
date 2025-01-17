import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

interface PerformanceRecord {
  _id: string;
  studentName: string;
  subject: string;
  score: number;
  date: string; // Make sure the backend returns this
}

const PerformanceRecords: React.FC = () => {
  const [records, setRecords] = useState<PerformanceRecord[]>([]);
  const [studentName, setStudentName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState<number | ''>(0);

  useEffect(() => {
    const fetchPerformance = async () => {
      const response = await axios.get('http://localhost:7000/performance');
      setRecords(response.data);
    };

    fetchPerformance();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = { studentName, subject, score };

    // Post the new record and expect it to return the full performance record
    const response = await axios.post('http://localhost:7000/api/performance', newRecord);
    setRecords([...records, response.data]); // Use the response data
    setStudentName('');
    setSubject('');
    setScore(0);
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Insert the Sidebar here */}
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Performance Records</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Student Name"
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="border p-2 rounded w-full mb-2"
            required
          />
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            placeholder="Score"
            className="border p-2 rounded w-full mb-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Performance
          </button>
        </form>
        <div>
          {records.map((record) => (
            <div key={record._id} className="border p-4 mb-2 rounded">
              <h2 className="text-xl font-semibold">{record.studentName}</h2>
              <p>Subject: {record.subject}</p>
              <p>Score: {record.score}</p>
              <small>Date: {new Date(record.date).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceRecords;