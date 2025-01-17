import { useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    navigate("/profileUpdate"); 
  };

  return (
    <div className="absolute top-4 right-24 ">
      <button
        onClick={handleUpdateClick} 
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        Update
      </button>
    </div>
  );
};

export default Update;