import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const EmployeeProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("employeeToken");

    if (!token) {
      navigate("/employee-login");
    }
    if (token) {
      navigate("/employeedashboard");
    }
  }, [navigate]);
  return children;
};

export default EmployeeProtectedRoute;
