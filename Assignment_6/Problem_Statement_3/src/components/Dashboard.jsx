import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>
        <p className="mb-4">This is your personalized dashboard.</p>
        <button
          onClick={logout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
