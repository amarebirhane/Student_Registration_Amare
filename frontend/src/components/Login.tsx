import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Login Component
const Login = () => {
  // State variables
  const [email, setEmail] = useState(""); // Email input
  const [password, setPassword] = useState(""); // Password input
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [loading, setLoading] = useState(false); // Loading state

  // Handle Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(""); // Clear previous errors
    setLoading(true); // Show loading spinner

    try {
      // Debugging: Log user inputs
      console.log("Email:", email);
      console.log("Password:", password);

      // API request with Axios
      const response = await axios.post("http://localhost:7000/api/auth/login", {
        email,
        password,
      });

      // Debugging: Log response
      console.log("Response:", response);

      // Check for success
      if (response.status === 200 && response.data.token) {
        // Login successful
        localStorage.setItem("token", response.data.token); // Save token in local storage
        toast.success("Login successful! Redirecting to dashboard..."); // Show success message
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        throw new Error(response.data.error || "Invalid login credentials");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "An unexpected error occurred.");
      } else if (error instanceof Error) {
        toast.error(error.message || "An unexpected error occurred.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
          Student Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="flex items-center gap-4">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 w-1/4 ">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={!email ? "Enter your email" : ""}
              required
              className="w-3/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center gap-4">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 w-1/4">
              Password:
            </label>
            <div className="relative w-3/4">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={!password ? "Enter your password" : ""}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-0.2 text-gray-500 bg-transparent"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <p className="text-center text-sm mt-4">
            forget password{" "}
            <a href="/signup" className="text-blue-500">
              Forgot Password
            </a>
          </p>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`w-full py-2 px-4 ${loading ? "bg-gray-400" : "bg-blue-500"} text-white font-semibold rounded-md hover:bg-blue-600 transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500">
              Sign up
            </a>
          </p>
          
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;