import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    name: "",
    address: "",
    phone: "",
    urlimg: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/user/${id}`)
      .then((response) => {
        setUserData(response.data.user);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Error fetching user data");
        setIsLoading(false);
      });
  }, [id]);

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle saving user data
  const handleSave = () => {
    axios
      .put(`http://localhost:5000/api/users/${id}`, userData)
      .then((response) => {
        alert("User updated successfully!");
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Error updating user");
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Update User</h2>
      <div className="row">
        <div className="col-md-4">
          <img
            src={userData.urlimg}
            alt={userData.name}
            className="img-fluid rounded"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-8">
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={userData.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                className="form-control"
                id="role"
                name="role"
                value={userData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="employee">employee</option>
                <option value="client">client</option>
              </select>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
