import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
  (async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (error) {
      console.warn("Logout request failed (probably token invalid/expired):", error);
    } finally {
      // Always clear token and redirect
      localStorage.removeItem("token");
      navigate("/captains/login");
    }
  })();
}, [navigate]);

  return (
    <div className="text-center p-4">
      Logging out...
    </div>
  );
};

export default CaptainLogout;
