import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [newEmployee, setNewEmployee] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: '',
    });

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/emp/employees`);
            setEmployees(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching employees:', err);
            setError('Failed to fetch employees' + err);
            setLoading(false);
        }
    };

    const handleAddEmployee = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/emp/employees`, newEmployee, {
                headers: { 'Content-Type': 'application/json' },
            });
            alert(response.data); 
            fetchEmployees(); 
            setNewEmployee({
                first_name: '',
                last_name: '',
                email: '',
                position: '',
                salary: '',
                date_of_joining: '',
                department: '',
            }); 
        } catch (err) {
            console.error('Error creating employee:', err);
            alert('Failed to create employee. Please try again.');
        }
    };

    const deleteEmployee = async (employeeId) => {
      try {
          const response = await axios.delete(`http://localhost:3000/api/v1/emp/employees/${employeeId}`);
          if (response.status === 204) {
              console.log(`Employee with ID ${employeeId} successfully deleted.`);
          }
      } catch (err) {
          console.error(`Error deleting employee with ID ${employeeId}:`, err);
          alert('Failed to delete employee. Please try again.');
      }
  };

    useEffect(() => {
        fetchEmployees();
    }, []);

    if (loading) {
        return <p>Loading employees...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h1>Employee List</h1>
            <div style={{ marginBottom: '20px' }}>
                <h2>Add New Employee</h2>
                <form>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={newEmployee.first_name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, first_name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={newEmployee.last_name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, last_name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Position"
                        value={newEmployee.position}
                        onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Salary"
                        value={newEmployee.salary}
                        onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                    />
                    <input
                        type="date"
                        placeholder="Date of Joining"
                        value={newEmployee.date_of_joining}
                        onChange={(e) => setNewEmployee({ ...newEmployee, date_of_joining: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        value={newEmployee.department}
                        onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                    />
                    <button type="button" onClick={handleAddEmployee}>
                        Add Employee
                    </button>
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
                                    {/* Future functionality: Edit/Delete buttons */}
                                    <button onClick={() => alert('Edit clicked!') }>Edit</button>
                                    <button onClick={() => deleteEmployee(employee._id) }>Delete</button>
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
