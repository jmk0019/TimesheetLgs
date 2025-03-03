/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  DataGrid,
  gridFilteredSortedRowIdsSelector,
  GridToolbarQuickFilter,
  selectedGridRowsSelector,
} from "@mui/x-data-grid";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../components/utlis/toast";
import Loader from "../../components/Loader";

const projectsList = [
  {
    id: 1,
    project_name: "Project 1",
    description: "Description 1",
    date: "10-2-2025",
    client: "Alex",
  },
  {
    id: 2,
    project_name: "Project 2",
    description: "Description 2",
    date: "20-2-2025",
    client: "Bob",
  },
  {
    id: 3,
    project_name: "Project 3",
    description: "Description 3",
    date: "10-2-2025",
    client: "Charlie",
  },
];

// Dummy employee list
const employeesList = [
  { id: 101, name: "John Doe" },
  { id: 102, name: "Jane Smith" },
  { id: 103, name: "Emily Davis" },
  { id: 104, name: "Michael Brown" },
];

function ManagerProjectList() {
  const [loading, setLoading] = useState(true);
  const [customerList, setCustomerList] = useState([]);
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    getCustomerList();
  }, []);

  const getCustomerList = async () => {
    const token = Cookies.get("adminuser");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}get-sales`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCustomerList(data.employees);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.fire({ icon: "error", title: error.message });
    }
  };

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEmployees([]); // Reset selected employees
  };

  const handleEmployeeSelect = (employeeId) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(employeeId)
        ? prevSelected.filter((id) => id !== employeeId)
        : [...prevSelected, employeeId]
    );
  };

  const handleAssignEmployees = () => {
    console.log(
      "Assigned Employees:",
      selectedEmployees,
      "to Project:",
      selectedProject
    );
    Toast.fire({
      icon: "success",
      title: `Assigned ${selectedEmployees.length} employees to ${selectedProject.project_name}`,
    });
    handleCloseModal();
  };

  const columns = [
    {
      field: "id",
      headerName: "S.No",
      maxWidth: 70,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "project_name",
      headerName: "Project Name",
      minWidth: 150,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "client",
      headerName: "Client Name",
      minWidth: 150,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "date",
      headerName: "Project Date",
      minWidth: 150,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <Button
            onClick={() => handleOpenModal(params.row)}
            variant="contained"
            style={{
              backgroundColor: "#1976d2",
              marginRight: "8px",
              height: "22px",
              padding: "8px",
            }}
          >
            Assign
          </Button>
          <Button
            onClick={() => employeeProfileView(params)}
            variant="contained"
            style={{
              marginLeft: "5px",
              backgroundColor: "#E76714",
              height: "22px",
              width: "max-content",
              padding: "8px",
            }}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  const employeeProfileView = (params) => {
    navigate(`/employeepanel/view-project/${params.row.id}`);
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="customer-list-main-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0px 0px 12px 0px",
        }}
      >
        <p className="app-para-heading-3 m-0">View Projects</p>
        <Link to="/employeepanel/add-project">
          <button className="main-button-1 !pt-1 !pb-1">Add Project</button>
        </Link>
      </div>

      <div className="customer-list-sub-container">
        <Box
          sx={{
            width: "100%",
            height: "75vh",
            border: 1,
            borderColor: "#ccc",
            borderRadius: "8px",
          }}
        >
          <DataGrid
            rows={projectsList}
            columns={columns}
            pageSizeOptions={[10]}
            disableSelectionOnClick
          />

          {/* Assign Employees Modal */}
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                width: "40%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                borderRadius: "8px",
                p: 3,
                boxShadow: 24,
              }}
            >
              <h2 style={{ marginBottom: "16px" }}>
                Assign Employees to {selectedProject?.project_name}
              </h2>
              <List>
                {employeesList.map((employee) => (
                  <ListItem
                    key={employee.id}
                    button
                    onClick={() => handleEmployeeSelect(employee.id)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={selectedEmployees.includes(employee.id)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={employee.name} />
                  </ListItem>
                ))}
              </List>

              {/* Show selected employees */}
              {selectedEmployees.length > 0 && (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "8px",
                    background: "#f5f5f5",
                    borderRadius: "8px",
                  }}
                >
                  <h4>Selected Employees:</h4>
                  {selectedEmployees.map((id) => {
                    const emp = employeesList.find((e) => e.id === id);
                    return <p key={id}>{emp?.name}</p>;
                  })}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                }}
              >
                <Button
                  onClick={handleCloseModal}
                  style={{ marginRight: "8px" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAssignEmployees}
                  variant="contained"
                  color="primary"
                >
                  Assign
                </Button>
              </div>
            </Box>
          </Modal>
        </Box>
      </div>
    </div>
  );
}

export default ManagerProjectList;
