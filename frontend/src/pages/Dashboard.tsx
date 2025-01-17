import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar"; // Sidebar component
import Logout from "@/components/Logout"; // Logout button
import { useNavigate } from "react-router-dom"; // For navigation
import { jwtDecode } from "jwt-decode"; // Install with npm install jwt-decode
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Update from "@/components/Update";

const Dashboard: React.FC = () => {
  const navigate = useNavigate(); // Replacing useHistory with useNavigate

  // State to store the fetched profile data
  const [profile, setProfile] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dob: "",
  });

  // Fetching the profile data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        if (!token) {
          toast.error("You are not authenticated.");
          return;
        }

        const response = await axios.get("http://localhost:7000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        });

        // Setting the fetched profile data to state
        setProfile({
          firstName: response.data.firstName,
          middleName: response.data.middleName,
          lastName: response.data.lastName,
          email: response.data.email,
          dob: response.data.dob,
        });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // Log the full error details to the console for debugging
          console.error("Axios Error: ", error.response?.data);
          toast.error(error.response?.data?.message || "An error occurred.");
        } else if (error instanceof Error) {
          // Log general JavaScript error
          console.error("General Error: ", error);
          toast.error(error.message);
        } else {
          toast.error("Unexpected error.");
        }
      }
    };

    fetchProfile();
  }, []);

  // Check user token and redirect to login if not valid
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user: any = jwtDecode(token); // Decode the token
        if (!user) {
          localStorage.removeItem("token");
          navigate("/login"); // Redirect to login
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <div className="flex">
      <Sidebar /> 
      <div className="flex flex-col md:flex-row">
      <div className="flex justify-between items-center mb-4">
          {/* <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1> */}
          <div className="flex gap-4">
            <Update /> 
            <Logout /> 
          </div>
        </div>
        
  <div className="bg-blue-100 shadow-md rounded-lg p-6 mb-4"> 
  <h2 className="text-2xl font-semibold text-blue-800">Profile Information</h2> 
  <p className="text-gray-700"><strong>First Name:</strong> {profile.firstName}</p>
  <p className="text-gray-700"><strong>Middle Name:</strong> {profile.middleName}</p>
  <p className="text-gray-700"><strong>Last Name:</strong> {profile.lastName}</p>
  <p className="text-gray-700"><strong>Email:</strong> {profile.email}</p>
  <p className="text-gray-700"><strong>Date of Birth:</strong> {profile.dob}</p>
</div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
