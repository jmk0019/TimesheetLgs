import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminLogin from "../src/Admin/AdminLogin";
import AdminDashboard from "../src/Admin/AdminDashboard/AdminDashboard";
import EmployeeList from "../src/Admin/EmployeesList/EmployeeList";
import ProjectList from "../src/Admin/ProjectsList/ProjectList";
import ManagerLogin from "../src/Manager/ManagerLogin/Managerlogin";

import "./index.css";
import EmployeeRegister from "./Admin/EmployeeRegister/EmployeeRegister";
import Adminpanel from "./Admin/AdminPannel/AdminPanel";


import  EmployeePanel from "./Employee/EmployeePannel/EmployeePanel";





import AddProject from "./Manager/AddProject/AddProject";

import EmployeeView from "./Admin/EmployeeView/EmployeeView";
import EmployeeDashboard from "./Employee/EmployeeDashboard/EmployeeDashboard";
import EmployeeProtectedRoute from "./components/EmployeeProtectedRoute";
import Feedbacks from "./Admin/Feedback/Feedbacks";
import Notifications from "./Admin/Notfications/Notifications";
import Employeedit from "./Admin/Employeeedit/Employeedit";
import EmployeeProfile from  "./Employee/Profile/EmployeeProfile";


const router = createBrowserRouter([
  {
    path: "/adminpanel",
    element: <Adminpanel />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "employees",
        element: <EmployeeList />,
      },
      {
        path: "view-employee/:id",
        element: <EmployeeView />,
      },
      {
        path: "edit-employee/:id",
        element: <Employeedit />,
      }
      ,
      {
        path: "projects",
        element: <ProjectList />,
      },
      {
        path: "feedback",
        element: <Feedbacks />,
      },
      {
        path:'notfication',
        element : <Notifications/>

      },
      {
        path: "register-employee",
        element: <EmployeeRegister />,
      },
    ],
  },
  {
    path: "/employeepanel",
    element: (
      <EmployeePanel />
    
    ),
    children: [
    
      {
        path: "dashboard",
        element: <EmployeeDashboard />,
        },
        {
          path: "profile",
          element: <EmployeeProfile />,
        },
        {
          path: "add-project",
          element: <AddProject />,
         },
      {
        path: "view-employee/:id",
        element: <EmployeeView />,
      },
    
    
    
    ],
  },
  
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/employee-login",
    element: <ManagerLogin />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);