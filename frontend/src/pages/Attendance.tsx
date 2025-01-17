import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import the Sidebar component

interface AttendanceRecord {
  _id: string;
  studentName: string;
  date: string; // Make sure your backend returns this
  status: 'Present' | 'Absent'; //  for better type safety
}

const Attendance: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [studentName, setStudentName] = useState('');
  const [status, setStatus] = useState<'Present' | 'Absent'>('Present');

  useEffect(() => {
    const fetchAttendance = async () => {
      const response = await axios.get('http://localhost:7000/attendance');
      setRecords(response.data);
    };

    fetchAttendance();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = { studentName, status };

    // Post the new record and expect it to return the full attendance record
    const response = await axios.post('http://localhost:7000/api/attendance', newRecord);
    setRecords([...records, response.data]); // Use the response data
    setStudentName('');
    setStatus('Present');
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Insert the Sidebar component here */}
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Student Name"
            className="border p-2 rounded w-full mb-2 text-white"
            required
          />
          
          <label htmlFor="status" className="mb-2 block">Status</label>
          <select
            id="status" // Add id attribute for the label
            value={status}
            onChange={(e) => setStatus(e.target.value as 'Present' | 'Absent')}
            className="border p-2 rounded w-full mb-2 text-white"
            required
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Mark Attendance
          </button>
        </form>
        
        <div>
          {records.map((record) => (
            <div key={record._id} className="border p-4 mb-2 rounded">
              <h2 className="text-xl font-semibold">{record.studentName}</h2>
              <p>Status: {record.status}</p>
              <small>{new Date(record.date).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;