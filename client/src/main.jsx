import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminLogin from "../src/Admin/AdminLogin";
import AdminDashboard from "../src/Admin/AdminDashboard/AdminDashboard";
import EmployeeList from "../src/Admin/EmployeesList/EmployeeList";
import ProjectList from "../src/Admin/ProjectsList/ProjectList";


import "./index.css";
import EmployeeRegister from "./Admin/EmployeeRegister/EmployeeRegister";
import Adminpanel from "./Admin/AdminPannel/AdminPanel";
import EventEdit from "./Admin/Events/EventEdit";

import NotificationsList from "./Admin/Notfications/NotificationsList";


import FeedbackPage from "./Employee/Feedback/FeedbackPage";

import EventView from "./Admin/Events/EventView";

import EventCards from "./Employee/Events/EventCards";

import  EmployeePanel from "./Employee/EmployeePannel/EmployeePanel";
import  ProjectForm from "./Manager/AddProject/ProjectForm";

import NotificationsPage from "./Employee/Notfications/NotificationsPage";

import EmployeeFeedbackForm from "./Employee/Feedback/EmployeeFeedbackForm";
import EventsList from "./Admin/Events/EventsList";
import EventForm from "./Admin/Events/EvenForm";
import ManagerLogin from "./ManagerLogin";
import HRLogin from "./HrLogin";
import EmployeeRoute from "./Employee/EmployeeProtect/EmployeeProtectedRoute";







import EmployeeView from "./Admin/EmployeeView/EmployeeView";
import EmployeeDashboard from "./Employee/EmployeeDashboard/EmployeeDashboard";

import Feedbacks from "./Admin/Feedback/Feedbacks";
import Notifications from "./Admin/Notfications/Notifications";
import Employeedit from "./Admin/Employeeedit/Employeedit";
import EmployeeProfile from  "./Employee/Profile/EmployeeProfile";
import EmployeeLogin from "./EmployeeLogin";
import HrPanel from "./Hr/HRPanel/HRPanel";
import AdminProtectedRoute from "./Admin/AdminProtectedRoute/AdminProtectedRoute";
import AdminProfile from "./Admin/AdminProfile";


const router = createBrowserRouter([
  {

    path: "/adminpanel",
    

    element:
    <AdminProtectedRoute>
    <Adminpanel />
    </AdminProtectedRoute>,
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
      {
        path: "add-project",
        element: <ProjectForm />,
      },
      {
        path:"events",
        element:<EventsList/>
      },
      {
        path:"add-event",
        element:<EventForm/>
      },
      {
        path:"event-cards",
        element:<EventCards/>
      },
      {
        path:"adminprofile",
        element:<AdminProfile/>
      },
      {
        path:"edit-event",
        element:<EventEdit/>
      },

      {
        path:"notificationslist",
        element:<NotificationsList/>
      }
    ],
  },
  {
    path: "/employeepanel",
    element: (
      <EmployeeRoute>
      <EmployeePanel />
      </EmployeeRoute>
    
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
        path: "view-employee/:id",
        element: <EmployeeView />,
      },
      {
        path: "projects",
        element: <ProjectList />,
      },
  
      {
        path: "notifications",
        element: <NotificationsPage />,
      },

      {

        path:"feedback",
        element:<EmployeeFeedbackForm/>
      },
      {
        path:"feedbacks",
        element:<FeedbackPage/>
      },
      {
        path:"events",
        element:<EventCards/>
      },

      

    
    
    
    ],
  },


  {
    path: "/hr-panel",
    element: <HrPanel/>
  },
  
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/manager-login",
    element: <ManagerLogin />,

  },
  {
    path: "/HR-login",
    element: <HRLogin />,
  },
  {
    path: "/employee-login",
    element: <EmployeeLogin />,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);