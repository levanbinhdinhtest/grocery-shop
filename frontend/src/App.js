// react
import React from "react";
// css
import "./App.css";
// browserrouter
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Components
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import AdminSidebar from "./Component/AdminSidebar";

import Product from "./Component/Product/Product";
import CreateProduct from "./Component/Product/CreateProduct";
import UpdateProduct from "./Component/Product/UpdateProduct";
import User from "./Component/User/User";
import CreateUser from "./Component/User/CreateUser";
import UpdateUser from "./Component/User/UpdateUser";

// pages
import Home from "./pages/Home";
// About pages
import AboutUs from "./pages/About/AboutUs";
// Shop pages
import Shop from "./pages/Shop/Shop";

// Store pages
import StoreList from "./pages/store/StoreList";
import SingleShop from "./pages/store/SingleShop";
// Account pages
import MyAccountSignIn from "./pages/Accounts/MyAccountSignIn";
import MyAccountSignUp from "./pages/Accounts/MyAccountSignUp";
import MyAccountView from "./pages/Accounts/MyAccountView";
import ViewItem from "./ProductList/ViewItem";
import { Provider } from "react-redux";
import store from "./store/store";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/Grocery-react/" element={<Home />} />
          {/* Shop pages */}
          <Route path="/Shop" element={<Shop />} />

          {/* Store pages */}
          <Route path="/StoreList" element={<StoreList />} />
          <Route path="/SingleShop" element={<SingleShop />} />
          {/* Accounts pages */}
          <Route path="/MyAccountSignIn" element={<MyAccountSignIn />} />
          <Route path="/MyAccountSignUp" element={<MyAccountSignUp />} />
          <Route path="/MyAccountView" element={<MyAccountView />} />
          {/* About pages */}
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ViewItem" element={<ViewItem />} />
          <Route
            path="/admin/*"
            element={
              <div style={{ display: "flex", height: "100vh" }}>
                <AdminSidebar/>
                <Routes>
                  <Route path="products" element={<Product />} />
                  <Route path="products/create" element={<CreateProduct />} />
                  <Route path="products/update/:id" element={<UpdateProduct />} />
                  <Route path="users" element={<User />} />
                  <Route path="users/create" element={<CreateUser />} />
                  <Route path="users/update/:id" element={<UpdateUser />} />
                </Routes>
              </div>
            }
          />
          
        </Routes>
        <Footer />
        <Routes>
         
        
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
