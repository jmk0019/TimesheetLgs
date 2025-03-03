import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Toast from "../../components/utlis/toast";
import Loader from "../../components/Loader";
import "./index.css"; // Import the CSS file

const employeeData = [
  {
    id: 1,
    name: "John Doe",
    mobile_no: "9876543210",
    employee_id: "LGS20210021",
    address: "123 Main Street, New York, NY",
    department: "Sales",
    designation: "Sales Manager",
    status: 1,
  },
  {
    id: 2,
    name: "Jane Smith",
    mobile_no: "8765432109",
    employee_id: "LGS20210021",
    address: "456 Elm Street, Los Angeles, CA",
    department: "Marketing",
    designation: "Marketing Executive",
    status: 0,
  },
];

function EmployeeList() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEdit = (row) => {
    navigate(`/adminpanel/edit-market-person/${row.id}`);
  };

  const handleEnableClick = async (id, currentStatus) => {
    const newStatus = parseInt(currentStatus) ? 0 : 1;
    const token = Cookies.get("adminuser");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}empolyee-toggle-status/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        Toast.fire({ icon: "success", title: data.message });
        getCustomerList();
      } else {
        const data = await response.json();
        Toast.fire({ icon: "error", title: data.message });
      }
    } catch (error) {
      Toast.fire({ icon: "error", title: error.message });
    }
  };

  const getCustomerList = async () => {
    const token = Cookies.get("adminuser");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}get-sales`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCustomerList(data.employees);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  const filteredEmployees = employeeData.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return loading ? (
    <Loader />
  ) : (
    <div className="customer-list-main-containers">
      <div className="customer-list-header">
        <p className="app-para-heading-31 m-0">Employees</p>
        <Link to="/adminpanel/register-employee">
          <button className="main-buttons">Add Employee</button>
        </Link>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="customer-list-sub-container">
        <div className="data-grid-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Full Name</th>
                <th>Emp Id</th>
                <th>Mobile No.</th>
                <th>Role</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.employee_id}</td>
                  <td>{employee.mobile_no}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.department}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit"
                        onClick={() => navigate(`/adminpanel/edit-employee/${employee.id}`)}
                    
                        
                      >
                        Edit
                      </button>
                      <button
                        className="view"
                        onClick={() => navigate(`/adminpanel/view-employee/${employee.id}`)}
                      >
                        View
                      </button>
                      <button
                        className={employee.status === 1 ? "toggle-on" : "toggle-off"}
                        onClick={() => handleEnableClick(employee.id, employee.status)}
                      >
                        {employee.status === 1 ? "Disable" : "Enable"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal} />
          <div className="modal-container">
            {/* Modal content here */}
          </div>
        </>
      )}
    </div>
  );
}

export default EmployeeList;