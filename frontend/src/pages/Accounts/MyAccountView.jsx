import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MyAccountView = () => {
  const { id } = useParams(); // Lấy `id` từ URL
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    urlImg: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dữ liệu người dùng
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/user/${id}`)
      .then((response) => {
        console.log(response);
        setUserData(response.data.user);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Error fetching user data");
        setIsLoading(false);
      });
  }, [id]);

  // Xử lý khi thay đổi các trường thông tin
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Xử lý lưu thông tin
  const handleSave = () => {
    axios
      .put(`http://localhost:5000/api/users/${id}`, userData)
      .then((response) => {
        alert("User information updated successfully!");
      })
      .catch((error) => {
        alert("Error updating user information");
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">User Profile</h2>
      <div className="row">
        <div className="col-md-4">
          <img
            src={userData.urlimg}
            alt={userData.name}
            className="img-fluid rounded-circle"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-8">
          <form>
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

export default MyAccountView;
