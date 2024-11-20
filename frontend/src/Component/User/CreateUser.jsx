import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [urlimg, setUrlimg] = useState("");
  const [role, setRole] = useState("");
  const [validationMsg, setValidationMsg] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUrlimg(URL.createObjectURL(file)); // Lưu URL tạm thời
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Validate fields
    const errors = {};
    if (!username) errors.username = "Tên người dùng không được để trống.";
    if (!password) errors.password = "Mật khẩu không được để trống.";
    if (!email) errors.email = "Email không được để trống.";
    if (!name) errors.name = "Tên không được để trống.";
    if (!address) errors.address = "Địa chỉ không được để trống.";
    if (!phone || isNaN(phone)) errors.phone = "Số điện thoại phải là số hợp lệ.";
    if (!role) errors.role = "Vui lòng chọn vai trò người dùng.";

    setValidationMsg(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const payload = {
        username,
        password,
        email,
        name,
        address,
        phone,
        urlimg,
        role,
      };

      const response = await axios.post("http://localhost:5000/api/users", payload);

      if (response.status === 201 || response.status === 200) {
        setSuccessMsg("Bạn đã thêm người dùng thành công!");
        setValidationMsg({});
        resetForm();
      }
    } catch (error) {
      setValidationMsg({
        api: "Đã xảy ra lỗi khi thêm người dùng. Vui lòng thử lại.",
      });
      console.error(error);
    }
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setName("");
    setAddress("");
    setPhone("");
    setUrlimg("");
    setRole("");
  };

  return (
    <div className="page-wrapper container-fluid">
      <div className="">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Create User</h4>
                {successMsg && (
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    {successMsg}
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                      onClick={() => setSuccessMsg("")}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                )}

                <form onSubmit={handleCreate}>
                  <div className="form-group w-50">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <p className="form-text text-danger">{validationMsg.username}</p>
                  </div>

                  <div className="form-group w-50">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <p className="form-text text-danger">{validationMsg.password}</p>
                  </div>

                  <div className="form-group w-50">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <p className="form-text text-danger">{validationMsg.email}</p>
                  </div>

                  <div className="form-group w-50">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <p className="form-text text-danger">{validationMsg.name}</p>
                  </div>

                  <div className="form-group w-50">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                    <p className="form-text text-danger">{validationMsg.address}</p>
                  </div>

                  <div className="form-group w-50">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <p className="form-text text-danger">{validationMsg.phone}</p>
                  </div>

                  <div className="form-group w-50">
                    <label htmlFor="role">Role</label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-control"
                      required
                    >
                      <option value="">Choose role</option>
                      <option value="employee">employee</option>
                      <option value="client">client</option>
                    </select>
                    <p className="form-text text-danger">{validationMsg.role}</p>
                  </div>

                  <div className="form-group w-50">
                    <label htmlFor="urlimg">Avatar</label>
                    <input type="file" onChange={handleImageChange} />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Tạo Người Dùng
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
