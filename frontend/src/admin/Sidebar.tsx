import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white h-screen"> 
           <div className="p-4 flex justify-center"> 
        <img src={logo} alt="Logo" className="h-10" /> 
      </div>
      <nav className="flex-grow overflow-y-auto"> {/* Added overflow-y-auto for scrollability */}
        <ul className="space-y-2 p-4">
          <li>
            <Link to="/" className="block p-2 hover:bg-gray-700 rounded">
              Home
            </Link>
          </li>
          <li>
            <Link to="/announcements" className="block p-2 hover:bg-gray-700 rounded">
              Announcements
            </Link>
          </li>
          <li>
            <Link to="/attendance" className="block p-2 hover:bg-gray-700 rounded">
              Attendance
            </Link>
          </li>
          <li>
            <Link to="/assignments" className="block p-2 hover:bg-gray-700 rounded">
              Assignments
            </Link>
          </li>
          <li>
            <Link to="/exams" className="block p-2 hover:bg-gray-700 rounded">
              Exams
            </Link>
          </li>
          <li>
            <Link to="/library" className="block p-2 hover:bg-gray-700 rounded">
              Library
            </Link>
          </li>
          <li>
            <Link to="/performance" className="block p-2 hover:bg-gray-700 rounded">
              Performance
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block p-2 hover:bg-gray-700 rounded">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;