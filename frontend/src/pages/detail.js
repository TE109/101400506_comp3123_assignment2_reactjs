import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to capture URL params

const EmployeeDetails = () => {
    const { eid } = useParams(); // Capture 'eid' from the URL
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newEmployee, setNewEmployee] = useState({
        salary: '',
        position: '',
    });

    // Fetch employee details
    const fetchEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/emp/employees/${eid}`);
            setEmployee(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching employee:', err);
            setError(`Failed to fetch employee: ${err.message}`);
            setLoading(false);
        }
    };

    // Edit employee details
    const editEmployee = async () => {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/v1/emp/employees/${eid}`,
                newEmployee
            );
            alert('Employee details updated successfully.');
            setEmployee({ ...employee, ...newEmployee }); // Update the local state
            setNewEmployee({ salary: '', position: '' }); // Reset the form
        } catch (err) {
            console.error('Error updating employee:', err);
            alert(`Failed to update employee: ${err.message}`);
        }
    };

    // Trigger fetch on mount and when 'eid' changes
    useEffect(() => {
        fetchEmployee();
    }, [eid]);

    // Loading state
    if (loading) {
        return <p>Loading employee details...</p>;
    }

    // Error state
    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    // No employee found
    if (!employee) {
        return <p>No employee found.</p>;
    }

    // Render employee details
    return (
        <div>
            <h1>Employee Details</h1>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Date of Joining</th>
                        <th>Department</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{employee._id}</td>
                        <td>{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.position}</td>
                        <td>{employee.salary}</td>
                        <td>{employee.date_of_joining}</td>
                        <td>{employee.department}</td>
                        <td>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault(); // Prevent default form submission
                                    editEmployee();
                                }}
                            >
                                <input
                                    type="number"
                                    placeholder="New Salary"
                                    value={newEmployee.salary}
                                    onChange={(e) =>
                                        setNewEmployee((prev) => ({
                                            ...prev,
                                            salary: e.target.value,
                                        }))
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="New Position"
                                    value={newEmployee.position}
                                    onChange={(e) =>
                                        setNewEmployee((prev) => ({
                                            ...prev,
                                            position: e.target.value,
                                        }))
                                    }
                                />
                                <button type="submit">Update</button>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeDetails;
