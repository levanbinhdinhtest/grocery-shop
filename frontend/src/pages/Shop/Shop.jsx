import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from 'react-loader-spinner'
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";

import ScrollToTop from "../ScrollToTop";

function Dropdown() {
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const [products, setProducts] = useState([]);

// Fetch products from API
useEffect(() => {
  axios.get('http://localhost:5000/api/products')
    .then(response => {
      setProducts(response.data.products);
    })
    .catch(error => {
      console.error("Error fetching products:", error);
    });
}, []);

  const toggleDropdown = (index) => {
    if (openDropdowns.includes(index)) {
      setOpenDropdowns(openDropdowns.filter((item) => item !== index));
    } else {
      setOpenDropdowns([...openDropdowns, index]);
    }
  };
    // Handler function for product click
    const handleProductClick = async (id) => {
      const token = localStorage.getItem("token"); // Token người dùng
      const userId = localStorage.getItem("id"); // ID người dùng
  
      try {
        const response = await axios.post(
          "http://localhost:5000/api/cart/add",
          {
            userId,
            productId: id,
            quantity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        alert("Product added to cart!");
        console.log(response.data);
      } catch (error) {
        console.error("Error adding product to cart", error.response?.data || error.message);
      }
    };

     // loading
     const [loaderStatus, setLoaderStatus] = useState(true);
     useEffect(() => {
       setTimeout(() => {
         setLoaderStatus(false);
       }, 1500);
     }, []);
   
  return (
    <div>
    {loaderStatus ? (
      <div className="loader-container">
        {/* <PulseLoader loading={loaderStatus} size={50} color="#0aad0a" /> */}
        <MagnifyingGlass
visible={true}
height="100"
width="100"
ariaLabel="magnifying-glass-loading"
wrapperStyle={{}}
wrapperclassName="magnifying-glass-wrapper"
glassColor="#c0efff"
color="#0aad0a"
/>
      </div>
    ) : (
      <>
       <>
            <ScrollToTop/>
            </>
    <div className="container ">
      

      <div className="row">
        {/* Vertical Dropdowns Column */}
        {/* Cards Column */}
        <div className="col-lg-9 col-md-9">
          {/* card */}
          <div className="card mb-4 bg-light border-0 mt-2">
            {/* card body */}
            <div className=" card-body p-9">
              <h1 className="mb-0">All Products</h1>
            </div>
          </div>
          {/* list icon */}
          <div className="d-md-flex justify-content-between align-items-center">
            <div>
              <p className="mb-3 mb-md-0">
                {" "}
                <span className="text-dark">{products.length} </span> Products found{" "}
              </p>
            </div>
            {/* icon */}
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/ShopListCol" className="text-muted me-3">
                <i className="bi bi-list-ul" />
              </Link>
              <Link to="/ShopGridCol3" className=" me-3 active">
                <i className="bi bi-grid" />
              </Link>
              <Link to="/Shop" className="me-3 text-muted">
                <i className="bi bi-grid-3x3-gap" />
              </Link>
              <div className="me-2">
                {/* select option */}
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Show: 50</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>
              </div>
              <div>
                {/* select option */}
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Sort by: Featured</option>
                  <option value="Low to High">Price: Low to High</option>
                  <option value="High to Low"> Price: High to Low</option>
                  <option value="Release Date"> Release Date</option>
                  <option value="Avg. Rating"> Avg. Rating</option>
                </select>
              </div>
            </div>
          </div>
          {/* row */}
          <div className="row g-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2">
            {/* col */}
            {products.map((product) => (
        <div key={product.id} className="col">
          {/* card */}
          <div className="card card-product">
            <div className="card-body">
              {/* badge */}
              {product.discount && (
                <div className="text-center position-relative">
                  <div className="position-absolute top-0 start-0">
                    <span className="badge bg-danger">Sale</span>
                  </div>
                </div>
              )}
              <Link to="#!">
                {/* img */}
                <img
                  src={product.urlimg || '/default-image.jpg'}
                  alt={product.name}
                  className="mb-3 img-fluid"
                />
              </Link>
              {/* action btn */}
              <div className="card-product-action">
                <Link to="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                  <i className="bi bi-eye" title="Quick View" />
                </Link>
                <Link to="shop-wishlist.html" className="btn-action">
                  <i className="bi bi-heart" title="Wishlist" />
                </Link>
                <Link to="#!" className="btn-action">
                  <i className="bi bi-arrow-left-right" title="Compare" />
                </Link>
              </div>

              {/* heading */}
              <div className="text-small mb-1">
                <Link to="#!" className="text-decoration-none text-muted">
                  <small>{product.category}</small>
                </Link>
              </div>
              <h2 className="fs-6">
                <Link to="#!" className="text-inherit text-decoration-none">
                  {product.name}
                </Link>
              </h2>

              {/* rating */}
              <div>
                <small className="text-warning">
                  {[...Array(5)].map((_, index) => (
                    <i key={index} className={`bi ${index < Math.floor(product.rating) ? "bi-star-fill" : "bi-star-half"}`} />
                  ))}
                </small>{" "}
                <span className="text-muted small">{product.rating} ({product.reviews})</span>
              </div>

              {/* price */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <span className="text-dark">${product.price}</span>{" "}
                  {product.originalPrice && (
                    <span className="text-decoration-line-through text-muted">${product.originalPrice}</span>
                  )}
                </div>
                {/* btn */}
                <div>
                  <Link to="#!" className="btn btn-primary btn-sm" onClick={() => handleProductClick(product._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-plus"
                    >
                      <line x1={12} y1={5} x2={12} y2={19} />
                      <line x1={5} y1={12} x2={19} y2={12} />
                    </svg>{" "}
                    Add
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
          </div>
          <div className="row mt-8">
            <div className="col">
              {/* nav */}
              <nav>
                <ul className="pagination">
                  <li className="page-item disabled">
                    <Link
                      className="page-link  mx-1 rounded-3 "
                      to="#"
                      aria-label="Previous"
                    >
                      <i className="fa fa-chevron-left" />
                    </Link>
                  </li>
                  <li className="page-item ">
                    <Link className="page-link  mx-1 rounded-3 active" to="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link mx-1 rounded-3 text-body" to="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link mx-1 rounded-3 text-body" to="#">
                      ...
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link mx-1 rounded-3 text-body" to="#">
                      12
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link
                      className="page-link mx-1 rounded-3 text-body"
                      to="#"
                      aria-label="Next"
                    >
                      <i className="fa fa-chevron-right" />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
)}
</div>
  );
}

const dropdownData = [
  {
    title: "Dairy, Bread & Eggs",
    items: [
      "Milk",
      "Milk Drinks",
      "Curd & Yogurt",
      "Eggs",
      "Bread",
      "Buns & Bakery",
      "Butter & More",
      "Cheese",
      "Paneer & Tofu",
      "Cream & Whitener",
      "Condensed Milk",
      "Vegan Drinks",
    ],
  },
  {
    title: "Snacks & Munchies",
    items: [
      "Chips & Crisps",
      "Nachos",
      "Popcorn",
      "Bhujia & Mixtures",
      "Namkeen Snacks",
      "Healthy Snacks",
      "Cakes & Rolls",
      "Energy Bars",
      "Papad & Fryums",
      "Rusks & Wafers",
    ],
  },
  {
    title: "Fruits & Vegetables",
    items: [
      "Fresh Vegetables",
      "Herbs & Seasonings",
      "Fresh Fruits",
      "Organic Fruits & Vegetables",
      "Cuts & Sprouts",
      "Exotic Fruits & Veggies",
      "Flower Bouquets, Bunches",
    ],
  },
  {
    title: "Cold Drinks & Juices" ,
    items: [
      "Soft Drinks",
      "Fruit Juices",
      "Coldpress",
      "Energy Drinks",
      "Water & Ice Cubes",
      "Soda & Mixers",
      "Concentrates & Syrups",
      "Detox & Energy Drinks",
      "Juice Collection",
    ],
  },
];


export default Dropdown;
