import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    // Clear user session (e.g., remove token from local storage)
    localStorage.removeItem("token"); // Adjust based on your session management

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="absolute top-4 right-2">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;