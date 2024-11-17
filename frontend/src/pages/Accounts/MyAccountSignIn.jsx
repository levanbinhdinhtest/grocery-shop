import React, { useState } from "react";
import signinimage from '../../images/signin-g.svg';
import { Link, useNavigate } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import { login, logout } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const MyAccountSignIn = () => {
  localStorage.removeItem("token");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 // Khởi tạo `dispatch`
 const dispatch = useDispatch();
  const handleSignIn = (e) => {
    e.preventDefault();
    setError(null);
  
    axios
      .post("http://localhost:5000/api/login", {
        username,
        password,
      })
      .then((response) => {
        const { token, role,id } = response.data;
        // Lưu token vào localStorage và điều hướng dựa trên vai trò
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        console.log(token);
        dispatch(login());
        if (role === "employee") {
          navigate("/Shop");
        } else if (role === "client") {
          navigate("/Grocery-react/");
        } else {
          throw new Error("Unauthorized role");
        }
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Invalid username or password");
      });
  };
  return (
    <div>
      <ScrollToTop />
      <section className="my-lg-14 my-8">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
              <img src={signinimage} alt="freshcart" className="img-fluid" />
            </div>
            <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
              <div className="mb-lg-9 mb-5">
                <h1 className="mb-1 h2 fw-bold">Sign in to FreshCart</h1>
                <p>Welcome back to FreshCart! Enter your username to get started.</p>
              </div>
              <form onSubmit={handleSignIn}>
                <div className="row g-3">
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      id="inputUsername"
                      placeholder="Username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                      </label>
                    </div>
                    <div>
                      Forgot password? <Link to="/MyAccountForgetPassword">Reset it</Link>
                    </div>
                  </div>
                  {error && <div className="text-danger">{error}</div>}
                  <div className="col-12 d-grid">
                    <button type="submit" className="btn btn-primary">
                      Sign In
                    </button>
                  </div>
                  <div>
                    Don’t have an account? <Link to="/MyAccountSignUp"> Sign Up</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyAccountSignIn;
