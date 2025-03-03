import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const ManagerProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("managerToken");

    if (token) {
      navigate("/employee-login");
    }
    if (!token) {
      navigate("/employeepanel");
    }
  }, [navigate]);
  return children;
};

export default ManagerProtectedRoute;
