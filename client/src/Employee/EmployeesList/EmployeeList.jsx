
// /* eslint-disable react/prop-types */
// import { Button } from "@mui/material";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import {
//   DataGrid,
//   gridFilteredSortedRowIdsSelector,
//   GridToolbarQuickFilter,
//   selectedGridRowsSelector,
// } from "@mui/x-data-grid";
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";
// import Toast from "../../components/utlis/toast";
// import Loader from "../../components/Loader";

// const employeeData = [
//   {
//     id: 1,
//     name: "John Doe",
//     mobile_no: "9876543210",
//     email: "john.doe@example.com",
//     address: "123 Main Street, New York, NY",
//     department: "Sales",
//     designation: "Sales Manager",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     mobile_no: "8765432109",
//     email: "jane.smith@example.com",
//     address: "456 Elm Street, Los Angeles, CA",
//     department: "Marketing",
//     designation: "Marketing Executive",
//   },
//   {
//     id: 3,
//     name: "David Johnson",
//     mobile_no: "7654321098",
//     email: "david.johnson@example.com",
//     address: "789 Oak Street, Chicago, IL",
//     department: "IT",
//     designation: "Software Engineer",
//   },
//   {
//     id: 4,
//     name: "Emily White",
//     mobile_no: "6543210987",
//     email: "emily.white@example.com",
//     address: "101 Pine Street, Houston, TX",
//     department: "HR",
//     designation: "HR Manager",
//   },
//   {
//     id: 5,
//     name: "Michael Brown",
//     mobile_no: "5432109876",
//     email: "michael.brown@example.com",
//     address: "202 Cedar Street, Miami, FL",
//     department: "Finance",
//     designation: "Accountant",
//   },
// ];

// const getSelectedRowsToExport = ({ apiRef }) => {
//   const selectedRowIds = selectedGridRowsSelector(apiRef);
//   if (selectedRowIds.size > 0) {
//     return Array.from(selectedRowIds.keys());
//   }

//   return gridFilteredSortedRowIdsSelector(apiRef);
// };

// function ManagerEmployeeList() {
//   const [isModalOpen, setModalOpen] = useState(false);

//   const [customerList, setCustomerList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const CustomToolbar = () => {
//     return (
//       <Box
//         sx={{
//           p: 2,
//           display: "flex",
//           justifyContent: "flex-end",

//           alignItems: "center",
//           backgroundColor: "#fff",
//         }}
//       >
//         <div className="rounded">
//           <GridToolbarQuickFilter />
//         </div>
//       </Box>
//     );
//   };

//   const columns = [
//     {
//       field: "id",
//       headerName: "S.No",
//       maxWidth: 70,
//       headerClassName: "super-app-theme--header header-id",
//       cellClassName: "header-id",
//       align: "center",
//       headerAlign: "center",
//       flex: 1,
//     },
//     {
//       field: "name",
//       headerName: "Full Name",
//       headerAlign: "left",
//       headerClassName: "super-app-theme--header",
//       minWidth: 150,
//       align: "left",
//       flex: 1,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       headerClassName: "super-app-theme--header",
//       minWidth: 150,
//       align: "left",
//       headerAlign: "left",
//       flex: 1,
//     },
//     {
//       field: "mobile_no",
//       headerName: "Mobile No.",
//       type: "number",
//       headerClassName: "super-app-theme--header",
//       maxWidth: 130,
//       align: "left",
//       headerAlign: "left",
//       flex: 1,
//     },
//     {
//       field: "designation",
//       headerName: "Role",
//       headerClassName: "super-app-theme--header",
//       minWidth: 150,
//       align: "left",
//       headerAlign: "left",
//       flex: 1,
//     },
//     {
//       field: "department",
//       headerName: "Department",
//       headerClassName: "super-app-theme--header",
//       minWidth: 150,
//       align: "left",
//       headerAlign: "left",
//       flex: 1,
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       headerClassName: "super-app-theme--header",
//       align: "center",
//       headerAlign: "center",
//       flex: 1,
//       renderCell: (params) => (
//         <div>
//           <Button
//             onClick={() => employeeProfileView(params)}
//             variant="contained"
//             style={{
//               marginLeft: "5px",
//               backgroundColor: "#E76714",
//               height: "22px",
//               width: "max-content",
//               padding: "8px",
//             }}
//           >
//             View
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const getRowId = (row) => row.id;

//   const getRowClassName = (params) => {
//     return params.row.id % 2 === 1 ? "even-row" : "odd-row";
//   };

//   const getCustomerList = async () => {
//     const token = Cookies.get("adminuser");
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BASE_URL}get-sales`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setCustomerList(data.employees);
//         setLoading(false);
//       }
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       Toast.fire({
//         icon: "error",
//         title: error.message,
//       });
//     }
//   };

//   useEffect(() => {
//     getCustomerList();
//   }, []);

//   const employeeProfileView = (params) => {
//     navigate(`/employeepanel/view-employee/${params.row.id}`);
//   };

//   const other = {
//     showCellVerticalBorder: true,
//     showColumnVerticalBorder: true,
//   };

//   return loading ? (
//     <Loader />
//   ) : (
//     <div className="customer-list-main-container">
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           margin: "0px 0px 12px 0px",
//         }}
//       >
//         <p className="app-para-heading-3 m-0">View Employees</p>
//       </div>

//       <div className="customer-list-sub-container">
//         <Box
//           sx={{
//             width: "100%",
//             border: 1,
//             borderTop: 2,

//             borderColor: "#ccc",
//             borderTopColor: "#e76714",
//             borderRadius: "8px",
//             height: "75vh",

//             display: "flex",
//             justifyContent: "space-between",
//             "& .super-app-theme--header": {
//               backgroundColor: "#fff",
//               fontWeight: "bold",
//               color: "#000",
//               fontSize: "18px",

//               borderTop: "1px solid #ccc",
//             },
//             "& .header-id": {
//               paddingLeft: "0px !important",
//             },
//             "&.export-right": {
//               paddingRight: "100px",
//             },

//             "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
//               outline: "none !important", // Remove the focus outline
//               border: "none !important", // Remove the border when the cell is focused
//               boxShadow: "none !important", // Remove any box shadow
//             },
//             "& .even-row, & .odd-row": {
//               color: "#212529",
//             },
//             "& .even-row:hover, & .odd-row:hover": {
//               backgroundColor: "#f2f2f2", // Remove the background color on hover
//             },
//           }}
//         >
//           <DataGrid
//             rows={employeeData}
//             {...other}
//             columns={columns}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 10,
//                 },
//               },
//             }}
//             getRowId={getRowId}
//             getRowClassName={getRowClassName}
//             pageSizeOptions={[10]}
//             disableSelectionOnClick // Add this line to disable cell selection
//             selectionModel={{}}
//             disableRowSelectionOnClick
//             slots={{
//               toolbar: CustomToolbar,
//               printOptions: {
//                 getRowsToExport: getSelectedRowsToExport,
//                 hideFooter: true,
//                 hideToolbar: true,
//                 includeCheckboxes: true,
//               },
//             }}
//             slotProps={{
//               toolbar: {
//                 showQuickFilter: true,
//                 quickFilterProps: { debounceMs: 500 },
//               },
//             }}
//           />
//           <Modal
//             open={isModalOpen}
//             onClose={handleCloseModal}
//             style={{ width: "100%" }}
//           >
//             <Box
//               sx={{
//                 position: "absolute",
//                 width: "80%",
//                 top: "50%",
//                 height: "500px",
//                 overflowY: "scroll",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 bgcolor: "background.paper",
//                 borderRadius: "8px",
//                 p: 3,
//               }}
//             >
//               {/* <ResultsModalPage 
//                   examId={selectedRow?.examId}
//                   onClose={handleCloseModal}
//                 /> */}
//             </Box>
//           </Modal>
//         </Box>
//       </div>
//     </div>
//   );
// }

// export default ManagerEmployeeList;
