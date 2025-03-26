import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie

const EmployeeRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token"); // Get token from cookies
    const role = Cookies.get("role");   // Get role from cookies

    if (token && role?.toLowerCase() === "user") {
      navigate("/employeepanel");
    } else {
      navigate("/employee-login");
    }
  }, [navigate]);

  return children;
};

export default EmployeeRoute;
