import React from 'react';
import facebookIcon from '../assets/facebook.png';
import twitterIcon from '../assets/twitter.png';
import linkedinIcon from '../assets/linkedin.png'; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <a href="#" className="hover:text-gray-400">Contact Us</a>
        </div>
        <div className="mt-2">
          <a href="#" className="inline-block mr-2">
            <img src={facebookIcon} alt="Facebook" className="h-6 w-6 " />
          </a>
          <a href="#" className="inline-block mr-2">
            <img src={twitterIcon} alt="Twitter" className="h-6 w-6" />
          </a>
          <a href="#" className="inline-block">
            <img src={linkedinIcon} alt="LinkedIn" className="h-6 w-6 " />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;