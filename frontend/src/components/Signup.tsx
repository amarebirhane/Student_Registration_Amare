import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the form data structure
interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  file: File | null;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    file: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({ ...formData, file });
  };

  // Password Validation
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Handle Signup
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("Password must be at least 8 characters long, contain one uppercase, one lowercase, one number, and one special character.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.append(key, value as any);
    });

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7000/api/auth/signup",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Signup successful! Redirecting...");
        navigate("/course-list");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Signup failed. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Student Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Middle Name", name: "middleName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: showPassword ? "text" : "password" },
            { label: "Confirm Password", name: "confirmPassword", type: showConfirmPassword ? "text" : "password" },
            { label: "Date of Birth", name: "dob", type: "date" },
          ].map((field) => (
            <div key={field.name} className="flex items-center space-x-4">
              <label className="w-1/4 text-sm font-medium text-black">
                {field.label}:
              </label>
              <div className="relative flex-1">
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof FormData] as string}
                  onChange={handleChange}
                  placeholder={`Enter your ${field.label}`}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-white"
                />
                {(field.name === "password" || field.name === "confirmPassword") && (
                  <button
                    type="button"
                    onClick={() => {
                      if (field.name === "password") {
                        setShowPassword(!showPassword);
                      } else {
                        setShowConfirmPassword(!showConfirmPassword);
                      }
                    }}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 bg-transparent"
                    aria-label={field.name === "password" ? (showPassword ? "Hide password" : "Show password") : (showConfirmPassword ? "Hide confirm password" : "Show confirm password")}
                  >
                    <i className={`fas ${field.name === "password" ? (showPassword ? "fa-eye-slash" : "fa-eye") : (showConfirmPassword ? "fa-eye-slash" : "fa-eye")}`}></i>
                  </button>
                )}
              </div>
            </div>
          ))}

          <div>
            <label className="w-1/4 text-sm font-medium text-gray-700">Upload File:</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Signup"}
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">Login</a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;