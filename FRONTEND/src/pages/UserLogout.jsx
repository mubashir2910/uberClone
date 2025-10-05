import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
  (async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (error) {
      console.warn("Logout request failed (probably token invalid/expired):", error);
    } finally {
      // Always clear token and redirect
      localStorage.removeItem("token");
      navigate("/users/login");
    }
  })();
}, [navigate]);

  return (
    <div className="text-center p-4">
      Logging out...
    </div>
  );
};

export default UserLogout;
