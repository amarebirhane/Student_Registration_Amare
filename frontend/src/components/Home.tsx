import Footer from "./Footer";
import '../App.css';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';

const Home = () => {
  const [currentTextColorIndex, setCurrentTextColorIndex] = useState(0);
  const textColors = ['text-red-500', 'text-blue-500', 'text-green-500']; // Dynamic colors

  // Change color every second
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setCurrentTextColorIndex((prevIndex) => (prevIndex + 1) % textColors.length);
    }, 1000);

    return () => clearInterval(colorInterval);
  }, []); // this runs once a loop

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col">
      <Navbar />
      <div className="overflow-hidden whitespace-nowrap bg-gray-900 py-4 shadow-lg mb-6">
        <h2
          className={`text-2xl font-bold tracking-wide animate-marquee ${textColors[currentTextColorIndex]}`}
        >
          Welcome to Home Page — Explore and Learn with Us!
        </h2>
      </div>
      <main className="flex flex-col md:flex-row items-center justify-center flex-grow p-4 gap-4">
        {/* School Information */}
        <div className="max-w-lg w-full space-y-4 bg-white rounded-lg shadow-lg p-6">
          <h1
            className={`text-3xl font-bold ${textColors[currentTextColorIndex]}`}
          >
            <span className="animate-pulse">Embark on Your Journey</span>
            <br />
            Student Registration
          </h1>
          <p className="text-gray-700 leading-relaxed">
            Welcome to our <strong>student registration</strong> portal.
            <span className="text-blue-500"> Unlock your potential </span> and
            <span className="text-green-500"> shape the future </span>
            with us.
            <br />
            Education for humans is a multifaceted process with profound
            implications for individual growth, societal progress, and global
            well-being. Here's a detailed look:
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;