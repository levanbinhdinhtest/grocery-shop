// react 
import React from "react";
// css
import "./App.css";
// browserrouter 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Components
import Header from './Component/Header';
import Footer from "./Component/Footer";

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

import { Provider } from "react-redux";
import store from "./store/store";
const App = () => {
  return (
    
    <Provider store={store}>
      <Router>
        <Header/>
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
          <Route path="/MyAccountView/:id" element={<MyAccountView />} />
          {/* About pages */}
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
        <Footer/>
      </Router>
    </Provider>
  );
};

export default App;
