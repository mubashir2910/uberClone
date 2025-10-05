import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserProtectedWrapper = ({ children }) => {
  const [user, setUser] = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // If no token, immediately mark as unauthorized
    if (!token) {
      setIsAuthorized(false);
      setIsLoading(false);
      return;
    }

    // If token exists, verify with backend
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          localStorage.removeItem("token");
        }
      })
      .catch((error) => {
        console.error(error);
        setIsAuthorized(false);
        localStorage.removeItem("token");
      })
      .finally(() => setIsLoading(false));
  }, [token, setUser]);

  // Show loading state while checking
  if (isLoading) return <div>Loading...</div>;

  // Redirect if not authorized
  if (!isAuthorized) return <Navigate to="/users/login" />;

  // If authorized, render children
  return children;
};

export default UserProtectedWrapper;
