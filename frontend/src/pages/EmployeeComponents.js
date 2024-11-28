import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    date_of_joining: "",
    department: "",
  });

  const navigate = useNavigate(); // For navigation to detail/edit pages

  // Fetch employees from the API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/emp/employees");
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError("Failed to fetch employees: " + err.message);
      setLoading(false);
    }
  };

  // Handle adding a new employee
  const handleAddEmployee = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/emp/employees",
        newEmployee,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Employee added successfully!");
      fetchEmployees(); // Refresh the employee list
      setNewEmployee({
        first_name: "",
        last_name: "",
        email: "",
        position: "",
        salary: "",
        date_of_joining: "",
        department: "",
      }); // Reset form
    } catch (err) {
      console.error("Error creating employee:", err);
      alert("Failed to create employee. Please try again.");
    }
  };

  // Handle deleting an employee
  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/emp/employees/${employeeId}`);
      alert("Employee deleted successfully!");
      fetchEmployees(); // Refresh the list
    } catch (err) {
      console.error(`Error deleting employee with ID ${employeeId}:`, err);
      alert("Failed to delete employee. Please try again.");
    }
  };

  // Navigate to the employee detail page
  const goToDetailPage = (employeeId) => {
    navigate(`/details/${employeeId}`);
  };

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Render loading state
  if (loading) {
    return <p>Loading employees...</p>;
  }

  // Render error state
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>Employee List</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>Add New Employee</h2>
        <form onSubmit={handleAddEmployee}>
          <input
            type="text"
            placeholder="First Name"
            value={newEmployee.first_name}
            onChange={(e) => setNewEmployee((prev) => ({ ...prev, first_name: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newEmployee.last_name}
            onChange={(e) => setNewEmployee((prev) => ({ ...prev, last_name: e.target.value }))}
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={(e) => setNewEmployee((prev) => ({ ...prev, email: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Position"
            value={newEmployee.position}
            onChange={(e) => setNewEmployee((prev) => ({ ...prev, position: e.target.value }))}
          />
          <input
            type="number"
            placeholder="Salary"
            value={newEmployee.salary}
            onChange={(e) => setNewEmployee((prev) => ({ ...prev, salary: e.target.value }))}
          />
          <input
            type="date"
            placeholder="Date of Joining"
            value={newEmployee.date_of_joining}
            onChange={(e) =>
              setNewEmployee((prev) => ({ ...prev, date_of_joining: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Department"
            value={newEmployee.department}
            onChange={(e) => setNewEmployee((prev) => ({ ...prev, department: e.target.value }))}
          />
          <button type="submit">Add Employee</button>
        </form>
      </div>
      {employees.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>
                  <button onClick={() => goToDetailPage(employee._id)}>Details</button>
                  <button onClick={() => deleteEmployee(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeTable;
