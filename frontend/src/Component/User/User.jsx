import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function User() {
    const [users, setUsers] = useState([]);

    // Fetch users from API
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users")
            .then((response) => {
                setUsers(response.data.users); // Assuming the API returns an array of users
                console.log(response);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    // Handle user deletion
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/api/users/${id}`)
            .then((response) => {
                console.log(response);
                alert("User was deleted successfully");
                // Remove user from the state without reloading
                setUsers(users.filter((user) => user._id !== id));
                window.location.reload(); // Tải lại trang
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            });
    };

    return (
        <div className="page-wrapper" style={{ width: "100%" }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Users</h4>

                                <Link to="/admin/users/create" className="btn btn-primary my-3">New Create</Link>

                                <div className="table-responsive" style={{ overflow: 'scroll', height: '650px', width: "100%" }}>
                                    <table className="table table-striped table-bordered no-wrap">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Username</th>
                                                <th>Password</th>
                                                <th>Email</th>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Address</th>
                                                <th>Phone</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {users && users.map((user, index) => (
                                                <tr key={index}>
                                                    <td>{user._id}</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.password}</td>
                                                    <td>{user.email}</td>
                                                    <td><img src={user.urlimg} alt={user.name} style={{ width: '70px' }} /></td>
                                                    <td>{user.name}</td>
                                                    <td>{user.address}</td>
                                                    <td>{user.phone}</td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <Link to={`/admin/users/update/${user._id}`} className="btn btn-success mr-1">Update</Link>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger"
                                                                style={{ cursor: 'pointer', color: 'white' }}
                                                                onClick={() => handleDelete(user._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
