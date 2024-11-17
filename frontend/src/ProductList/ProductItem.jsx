import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductItem = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data.products); // Assuming the API returns an array of products
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Handler function for product click
  const handleProductClick = (id) => {
    console.log("Product ID:", id);
  };

  return (
    <div>
      {/* Popular Products Start */}
      <section className="my-lg-14 my-8">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-6">
              <div className="section-head text-center mt-8">
                <h3 className="h3style" data-title="Popular Products">
                  Popular Products
                </h3>
                <div className="wt-separator bg-primarys"></div>
                <div className="wt-separator2 bg-primarys"></div>
              </div>
            </div>
          </div>
          <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3">
            {products.map((product) => (
              <div key={product.id} className="col fade-zoom">
                <div
                  className="card card-product"
                  onClick={() => handleProductClick(product._id)} // Gắn sự kiện click
                  style={{ cursor: "pointer" }} // Tùy chọn: Thêm con trỏ để biểu thị có thể click
                >
                  <div className="card-body">
                    <div className="text-center position-relative">
                      <div className="position-absolute top-0 start-0">
                        {product.sold ? (
                          <span className="badge bg-danger">Sale</span>
                        ) : null}
                      </div>
                      <Link to="#!">
                        <img
                          src={product.urlimg || "/default-image.jpg"} // Use a default image if urlimg is missing
                          alt={product.name}
                          className="mb-3 img-fluid"
                        />
                      </Link>
                      <div className="card-product-action">
                        <Link to="#!" className="btn-action" title="Quick View">
                          <i className="bi bi-eye" />
                        </Link>
                        <Link to="#!" className="btn-action" title="Wishlist">
                          <i className="bi bi-heart" />
                        </Link>
                        <Link to="#!" className="btn-action" title="Compare">
                          <i className="bi bi-arrow-left-right" />
                        </Link>
                      </div>
                    </div>
                    <div className="text-small mb-1">
                      <Link
                        to="#!"
                        className="text-decoration-none text-muted"
                      >
                        <small>{product.category}</small>
                      </Link>
                    </div>
                    <h2 className="fs-6">
                      <Link
                        to="#!"
                        className="text-inherit text-decoration-none"
                      >
                        {product.name}
                      </Link>
                    </h2>
                    <div>
                      <small className="text-warning">
                        {/* Star rating icons (hardcoded for now) */}
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-half" />
                      </small>{" "}
                      <span className="text-muted small">4.5(149)</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div>
                        <span className="text-dark">${product.price}</span>{" "}
                        {product.stock > 0 && (
                          <span className="text-muted">
                            In Stock: {product.stock}
                          </span>
                        )}
                      </div>
                      <div>
                        <Link to="#!" className="btn btn-primary btn-sm">
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
        </div>
      </section>
    </div>
  );
};

export default ProductItem;
