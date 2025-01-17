import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png'; 

const Navbar = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState<string>("");

  // Handlers
  const handleLoginClick = () => navigate('/login');
  const handleSignupClick = () => navigate('/signup');

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour12: true }) // 12-hour format with AM/PM
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img src={logo} alt="Logo" className="h-12" />
        {/* Clock */}
        <span className="text-gray-600 text-lg font-semibold">{currentTime}</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleLoginClick}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
        <button
          onClick={handleSignupClick}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
