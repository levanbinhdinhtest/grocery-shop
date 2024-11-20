import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.header}>Admin Panel</h3>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link to="/admin/products" style={styles.link}>
            Quản lý sản phẩm
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/admin/users" style={styles.link}>
            Quản lý người dùng
          </Link>
        </li>
      </ul>
    </div>
  );
};

// Styles
const styles = {
  sidebar: {
    width: "250px",
    padding: "20px",
    backgroundColor: "#2c3e50", // Màu nền tối
    height: "100vh",
    color: "#ecf0f1", // Màu chữ sáng
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", // Hiệu ứng đổ bóng
  },
  header: {
    fontSize: "20px",
    marginBottom: "20px",
    textAlign: "center",
    borderBottom: "1px solid #ecf0f1",
    paddingBottom: "10px",
    color:"white"
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: "15px",
  },
  link: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: "16px",
    padding: "10px 15px",
    display: "block",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    backgroundColor:"green"
  },
  linkHover: {
    backgroundColor: "green", // Màu nền khi hover
  },
};

export default AdminSidebar;
