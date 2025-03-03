import React, { useEffect, useState } from "react";
// import "./DailyTimesheet.css";
import Toast from "../../components/utlis/toast";

const ViewDailyTimesheet = ({ sheetId, closeModel }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [reason, setReason] = useState("");
  const [managerName, setSelectedManagerName] = useState("");

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [workedHours, setWorkedHours] = useState("");
  const [taskName, setTaskName] = useState("");

  const [status, setStatus] = useState("");

  const token = sessionStorage.getItem("token");

  const handleDeleteTimeSheet = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this timesheet?"
    );

    if (!confirm) return;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        `/deleteSpecificDailyTimeSheet/${sheetId}`,
        options
      );
      const data = await response.json();
      if (response.ok) {
        closeModel();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
      } else {
        // closeModel();
        Toast.fire({
          icon: "error",
          title: data.message,
        });
      }
    } catch (error) {
      // closeModel();
      // Toast.fire({
      //   icon: "success",
      //   title: data.message,
      // });
    }
  };

  const fetchDailyTimesheet = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const api = `getSpecificDailyTimeSheet/${sheetId}`;
    try {
      const response = await fetch(api, options);
      if (response.ok) {
        const data = await response.json();
        setSelectedProjectId(data.data.projectId);
        setProjectName(data.data.projectName);
        setTaskName(data.data.taskName);
        setWorkedHours(data.data.workedHours);
        setSelectedManagerName(data.data.managerName);
        setSelectedDay(new Date(data.data.date).toISOString().split("T")[0]);
        setStatus(data.data.approvalStatus);
        if (data.data.reason) {
          setReason(data.data.reason);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchDailyTimesheet();
  }, []);

  const handleSubmit = async () => {
    if (!selectedDay || !selectedProjectId || !workedHours || !taskName) {
      Toast.fire({
        icon: "warning",
        title: "Please select Project and enter Task for all rows",
      });
      return;
    }
    const requestData = {
      date: selectedDay,
      projectId: selectedProjectId,
      taskName: taskName,
      workedHours: Number(workedHours),
    };

    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      };

      const response = await fetch(
        `/editSpecificDailyTimeSheet/${sheetId}`,
        options
      );
      const data = await response.json();
      if (response.ok) {
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        closeModel();
        fetchDailyTimesheet();
      } else {
        Toast.fire({
          icon: "error",
          title: data.message,
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error Submitting Timesheet",
      });
    }
  };

  const viewDailyMainContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  return (
    <div style={viewDailyMainContainer}>
      <div className="daily-timesheet-container">
        {status === "Rejected" && (
          <div>
            <h6>
              Reason: <span style={{ color: "red" }}>{reason}</span>
            </h6>
          </div>
        )}
        <h2 className="daily-time-sheet-heading">Add Daily Timesheet</h2>
        <form className="timesheet-form">
          <div className="form-group">
            <label className="daily-time-sheet-label">Date:</label>
            <input
              className="daily-time-sheet-input"
              type="date"
              value={selectedDay}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="daily-time-sheet-label">Project</label>
            <input
              className="daily-time-sheet-input"
              type="text"
              value={projectName}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="daily-time-sheet-label">Manager</label>
            <input
              className="daily-time-sheet-input"
              type="text"
              value={managerName}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="daily-time-sheet-label">Task Name</label>
            <input
              className="daily-time-sheet-input"
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="daily-time-sheet-label">Worked Hours</label>
            <input
              className="daily-time-sheet-input"
              type="number"
              placeholder="Worked Hours"
              value={workedHours}
              onChange={(e) => setWorkedHours(e.target.value)}
            />
          </div>
        </form>
        <div className="time-sheet-submit-button-container">
          {status === "Pending" && (
            <button
              className="time-sheet-delete-button"
              onClick={handleDeleteTimeSheet}
            >
              Delete Time Sheet
            </button>
          )}
          {status !== "Approved" && status !== "Bill Generated" && (
            <button
              className="time-sheet-submit-button"
              onClick={() => handleSubmit()}
            >
              Update Hours
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDailyTimesheet;
