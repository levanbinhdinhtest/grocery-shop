import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    stock:"",
    description: "",
    urlimg: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sản phẩm chi tiết
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/product/${id}`)
      .then((response) => {
        setProductData(response.data.product);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Error fetching product data");
        setIsLoading(false);
      });
  }, [id]);

  // Xử lý khi thay đổi các trường thông tin
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Xử lý lưu thông tin sản phẩm
  const handleSave = () => {
    axios
      .put(`http://localhost:5000/api/products/${id}`, productData)
      .then((response) => {
        alert("Product updated successfully!");
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Error updating product");
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Update Product</h2>
      <div className="row">
        <div className="col-md-4">
          <img
            src={productData.urlimg}
            alt={productData.name}
            className="img-fluid rounded"
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
                value={productData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                className="form-control"
                id="category"
                name="category"
                value={productData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="Meat">Meat</option>
                <option value="Seafood">Seafood</option>
                <option value="Frozen">Frozen</option>
                <option value="Household">Household</option>
                <option value="Snacks">Snacks</option>
                <option value="Fruits">Fruits</option>
                <option value="Canned">Canned</option>
                <option value="Beverages">Beverages</option>
                <option value="Dairy">Dairy</option>
                <option value="Bakery">Bakery</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                id="stock"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={productData.description}
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

export default UpdateProduct;
