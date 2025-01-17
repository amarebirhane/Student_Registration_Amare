import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
}

const ProfileUpdate: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value } as FormData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId"); // Assuming userId is stored after login
      if (!userId) {
        toast.error("User not logged in.");
        return;
      }

      // Make the PUT request to update the user's profile
      await axios.put(
        `http://localhost:7000/api/user/update/${userId}`,
        formData // Send the form data directly
      );

      toast.success("Profile updated successfully!");
      navigate('/login');

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred.");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex items-center gap-4 relative">
              <label
                htmlFor={key}
                className="text-sm font-medium text-gray-700 w-1/4 capitalize"
              >
                {key}:
              </label>
              <input
                type={key === "password" && !showPassword ? "password" : "text"}
                id={key}
                name={key}
                value={formData[key as keyof FormData]}
                onChange={handleChange}
                className="w-3/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
                required={key !== "middleName"}
              />
              {key === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-0.2 text-gray-500 bg-transparent"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 ${loading ? "bg-gray-400" : "bg-blue-500"} text-white font-semibold rounded-md hover:bg-blue-600 transition`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProfileUpdate;