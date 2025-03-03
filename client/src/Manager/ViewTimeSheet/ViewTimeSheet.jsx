import React, { useEffect, useState } from "react";
import Toast from "../../components/utlis/toast";

const ViewTimeSheet = ({ sheetId, closeModel, getSheets }) => {
  const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  function getStartOfWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const startOfWeek = new Date(today.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }
  const initialStartDate = getStartOfWeek(); // Year, Month (0-indexed), Day
  const [startDate, setStartDate] = useState(initialStartDate);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [managerName, setManagerName] = useState("");
  const [data, setData] = useState([
    {
      project: projects[0],
      task: "",
      hours: [0, 0, 0, 0, 0, 0, 0],
      total: 0,
    },
  ]);

  const token = sessionStorage.getItem("token");

  const fetchProjects = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/getprojects`,
        options
      );
      if (response.ok) {
        const fetchdata = await response.json();
        setProjects(fetchdata);
      }
    } catch (error) {}
  };

  const convertArrayOfObjects = (dataArray) => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return dataArray.map((input) => {
      const hoursArray = Array(7).fill(0);
      daysOfWeek.forEach((day, index) => {
        if (input[day]) {
          hoursArray[index] += input[day];
        }
      });
      return {
        project: input.projectId || "",
        task: input.taskName || "",
        hours: hoursArray,
        total: input.totalHours,
      };
    });
  };

  const getTimeSheet = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/employee/specificweeklytimesheet/${sheetId}`,
        options
      );
      if (response.ok) {
        const data = await response.json();
        setStatus(data.data.approvalStatus);
        setReason(data.data.reason);
        setProjectName(data.data.projectName);
        setManagerName(data.data.managerName);
        const convertedArray = convertArrayOfObjects(data.data.tasks);
        setData(convertedArray);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchProjects();
    getTimeSheet();
  }, []);

  const handleHoursChange = (projectIndex, dayIndex, value) => {
    const updatedData = [...data];
    const intValue = parseInt(value) || 0;
    if (intValue >= 0) {
      updatedData[projectIndex].hours[dayIndex] = intValue;
      updatedData[projectIndex].total = updatedData[projectIndex].hours.reduce(
        (acc, cur) => acc + (cur >= 0 ? cur : 0),
        0
      );
      setData(updatedData);
    }
  };

  const formattedDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedDayDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  const handleSubmit = async () => {
    const updatedData = data.map((item) => {
      return {
        tasks: {
          taskName: item.task,
          Monday: item.hours[0],
          Tuesday: item.hours[1],
          Wednesday: item.hours[2],
          Thursday: item.hours[3],
          Friday: item.hours[4],
          Saturday: item.hours[5],
          Sunday: item.hours[6],
          totalHours: item.total,
        },
      };
    });
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/editSpecificWeeklyTimeSheet/${sheetId}`,
        options
      );
      const data = await response.json();
      if (response.ok) {
        closeModel();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        getTimeSheet();
        getSheets();
      } else {
        closeModel();
        Toast.fire({
          icon: "error",
          title: data.message,
        });
      }
    } catch (error) {
      closeModel();
      Toast.fire({
        icon: "error",
        title: data.message,
      });
    }
  };

  const overallTotals = data.reduce((acc, item) => {
    item.hours.forEach((hour, index) => {
      if (hour >= 0) {
        // Exclude negative values
        acc[index] = (acc[index] || 0) + hour;
      } else {
        acc[index] = acc[index] + hour;
      }
    });
    return acc;
  }, new Array(7).fill(0));

  const overUnder = overallTotals.map((total, index) => {
    // Ignore Sunday (index 6)
    return total >= 0 ? total - 8 : 0;
  });

  const billableHours = overallTotals.map((total, index) => {
    // Ensure to consider only weekdays for billable hours
    return total >= 0 ? (total >= 8 ? 8 : total) : 0;
  });

  // Calculate total overall, over/under, and billable hours
  const totalOverall = overallTotals.reduce(
    (acc, total) => acc + Math.max(total, 0),
    0
  );

  const totalOverUnder = overUnder.reduce((acc, diff) => acc + diff, 0);
  const totalBillable = billableHours.reduce(
    (acc, billable) => acc + Math.max(billable, 0)
  );

  const tableSelect = {
    width: "95%",
  };
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
        `${process.env.REACT_APP_FETCH_URL}/deleteSpecificWeeklyTimeSheet/${sheetId}`,
        options
      );
      const data = await response.json();
      if (response.ok) {
        closeModel();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        getSheets();
      } else {
        closeModel();
        Toast.fire({
          icon: "error",
          title: data.message,
        });
      }
    } catch (error) {
      closeModel();
      Toast.fire({
        icon: "success",
        title: data.message,
      });
    }
  };

  const handleSelectChange = (dayIndex, value) => {
    const updatedData = [...data];
    updatedData.forEach((item) => {
      item.hours[dayIndex] = parseInt(value);
    });
    setData(updatedData);
  };

  return (
    <div className="time-sheet-main-container">
      <div className="time-sheet-container">
        <h4 className="time-sheet-heading">Update Time Sheet</h4>
        <div className="week-nav-main-container">
          <div
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              padding: "8px",
            }}
          >
            <div className="week-start-date">{formattedDate(startDate)}</div>
          </div>
          {status === "Rejected" && (
            <div>
              <h5>
                Reason: <span style={{ color: "red" }}>{reason}</span>
              </h5>
            </div>
          )}
        </div>
        <div className="tables-holding-container">
          <div className="table-container">
            <table style={{ width: "100%" }}>
              <thead className="table-header-container">
                <tr className="first-table-header-row">
                  <th className="table-select-head">Project</th>
                  <th className="table-select-head">Manager</th>
                  <th className="table-select-head">Task</th>
                  {days.map((day, index) => (
                    <th key={day} className="table-day-cell">
                      {day}
                      <br />
                      {formattedDayDate(
                        new Date(
                          startDate.getFullYear(),
                          startDate.getMonth(),
                          startDate.getDate() + index
                        )
                      )}
                    </th>
                  ))}
                  <th className="table-day-total-cell">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="table-day-cell-1">
                      <input
                        type="text"
                        value={projectName}
                        className="table-select"
                        readOnly
                      />
                    </td>
                    <td className="table-day-cell-1">
                      <input
                        type="text"
                        value={managerName}
                        className="table-select"
                        readOnly
                      />
                    </td>
                    <td className="table-day-cell-1">
                      <input
                        type="text"
                        value={item.task}
                        style={tableSelect}
                        onChange={(e) => {
                          const updatedData = [...data];
                          updatedData[index].task = e.target.value;
                          setData(updatedData);
                        }}
                      />
                    </td>

                    {item.hours.map((hour, dayIndex) => (
                      <td key={dayIndex} className="time-sheet-hours-input">
                        <input
                          type={hour < 0 ? "text" : "number"}
                          value={hour < 0 ? "---" : hour}
                          readOnly={hour < 0 ? true : false}
                          className={
                            hour >= 0 ? "table-input" : "table-input-holiday"
                          }
                          onChange={(e) =>
                            handleHoursChange(index, dayIndex, e.target.value)
                          }
                        />
                      </td>
                    ))}
                    <td className="table-day-total-cell">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overall-table-container">
            <table style={{ width: "100%" }}>
              <thead className="table-header-container">
                <tr className="first-table-header-row">
                  <th className="table-select-head-remove"></th>
                  <th className="table-select-head-remove"></th>
                  <th className="table-select-head-remove"></th>
                  {days.map((day, index) => (
                    <th key={day} className="table-day-cell">
                      {day}
                      <br />
                      {formattedDayDate(
                        new Date(
                          startDate.getFullYear(),
                          startDate.getMonth(),
                          startDate.getDate() + index
                        )
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  {days.map((_, dayIndex) => (
                    <td key={dayIndex} className="time-sheet-hours-input">
                      <select
                        value={data[0].hours[dayIndex]}
                        onChange={(e) =>
                          handleSelectChange(dayIndex, e.target.value)
                        }
                      >
                        <option value="0">Working</option>
                        <option value="-1">Leave</option>
                        <option value="-2">Holiday</option>
                      </select>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="overall-table-container">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td className="overall-totals-cell">Overall Totals</td>
                  {overallTotals.map((total, index) => (
                    <td key={index} className="overall-hours-input">
                      {total}
                    </td>
                  ))}
                  <td className="overall-hours-input">{totalOverall}</td>
                </tr>
                <tr>
                  <td className="overall-totals-cell">Over/ Under</td>
                  {overUnder.map((difference, index) => (
                    <td key={index} className="overall-hours-input">
                      {difference}
                    </td>
                  ))}
                  <td className="overall-hours-input">{totalOverUnder}</td>
                </tr>
                <tr>
                  <td className="overall-totals-cell">Billable Hours</td>
                  {billableHours.map((billable, index) => (
                    <td key={index} className="overall-hours-input">
                      {billable}
                    </td>
                  ))}
                  <td className="overall-hours-input">{totalBillable}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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

export default ViewTimeSheet;
