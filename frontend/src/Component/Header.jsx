import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../features/auth/authSlice";
import Grocerylogo from "../images/Grocerylogo.png";
import { Button } from "bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  // Lấy trạng thái `isLoggedIn` từ Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = localStorage.getItem("role");
  console.log(role);
  const idUser = localStorage.getItem("id");
  console.log(idUser);
  // Khởi tạo `dispatch`
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Sử dụng useNavigate
  const handleLogout = async () => {
    dispatch(logout()); // Gọi action logout để cập nhật Redux state
    localStorage.removeItem("id");
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");
    console.log(token);
    // Gửi yêu cầu logout đến API
    axios
      .post(
        "http://localhost:5000/api/logout",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        // Xóa token khỏi localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        // Cập nhật state Redux
        dispatch(logout());
        navigate("/MyAccountSignIn"); // Điều hướng đến trang login
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/Grocery-react/">
            <img
              src={Grocerylogo}
              style={{ width: 200, marginBottom: 10, marginLeft: "-15px" }}
              alt="eCommerce HTML Template"
            />
          </Link>

          <div className="collapse navbar-collapse" id="mobile_nav">
            <ul className="navbar-nav navbar-light">
              {/* Ẩn Home khi role là employee */}
              {role !== "employee" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/Grocery-react/">
                    Home
                  </Link>
                </li>
              )}
              {/* Ẩn About khi role là employee */}
              {role !== "employee" && (
                <li className="nav-item dmenu dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/AboutUs"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    About
                  </Link>
                </li>
              )}

              {/* Ẩn mục Shop khi role là employee */}
              {role !== "employee" && (
                <li className="nav-item dmenu">
                  <Link className="nav-link dropdown-toggle" to="/Shop">
                    Shop
                  </Link>
                </li>
              )}

              <li className="nav-item dmenu dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Account
                </Link>
                <div
                  className="dropdown-menu sm-menu"
                  aria-labelledby="navbarDropdown"
                >
                  {isLoggedIn ? (
                    <>
                      {role !== "employee" && (
                        <Link className="nav-link dropdown-item" to="/ViewItem">
                          Cart
                        </Link>
                      )}
                      <Link
                        className="nav-link dropdown-item"
                        to="/MyAccountView"
                      >
                        Profile
                      </Link>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link className="dropdown-item" to="/MyAccountSignIn">
                        Sign in
                      </Link>
                      <Link className="dropdown-item" to="/MyAccountSignUp">
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              </li>
            </ul>

            {/* Thanh tìm kiếm */}
            <form className="form-inline ml-auto">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
