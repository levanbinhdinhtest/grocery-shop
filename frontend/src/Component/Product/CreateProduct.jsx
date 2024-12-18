import React, { useState } from "react";
import axios from "axios";

function CreateProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [urlimg, setUrlimg] = useState("");
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
    if (!name) errors.name = "Tên sản phẩm không được để trống.";
    if (!category) errors.category = "Vui lòng chọn loại sản phẩm.";
    if (!price || isNaN(price))
      errors.price = "Giá sản phẩm phải là số hợp lệ.";
    if (!stock || isNaN(stock)) errors.stock = "Số lượng phải là số hợp lệ.";
    if (!description) errors.description = "Mô tả không được để trống.";

    setValidationMsg(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const payload = {
        name,
        category,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        description,
        urlimg,
      };

      const response = await axios.post(
        "http://localhost:5000/api/products",
        payload
      );

      if (response.status === 201 || response.status === 200) {
        setSuccessMsg("Bạn đã thêm sản phẩm thành công!");
        setValidationMsg({});
        resetForm();
      }
    } catch (error) {
      setValidationMsg({
        api: "Đã xảy ra lỗi khi thêm sản phẩm. Vui lòng thử lại.",
      });
      setSuccessMsg("Lỗi khi tạo sản phẩm",error.response?.data);
      console.error(error.response?.data);
    }
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setDescription("");
    setUrlimg("");
  };

  return (
    <div className="page-wrapper container-fluid">
      <div className="">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Create Product</h4>
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
                    <label htmlFor="name">Tên Sản Phẩm</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <p className="form-text text-danger">
                      {validationMsg.name}
                    </p>
                  </div>
                  <div className="form-group w-50">
                    <label htmlFor="price">Giá Sản Phẩm</label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                    <p className="form-text text-danger">
                      {validationMsg.price}
                    </p>
                  </div>
                  <div className="form-group w-50">
                    <label htmlFor="stock">Số lượng</label>
                    <input
                      type="text"
                      className="form-control"
                      id="stock"
                      name="stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                    <p className="form-text text-danger">
                      {validationMsg.stock}
                    </p>
                  </div>
                  {/* <div className="form-group w-50">
                    <label htmlFor="solde">Phần trăm giảm giá</label>
                    <input
                      type="text"
                      className="form-control"
                      id="solde"
                      name="solde"
                      value={sold}
                      onChange={(e) => setSold(e.target.value)}
                      required
                    />
                    <p className="form-text text-danger">{validationMsg.solde}</p>
                  </div> */}
                  <div className="form-group w-50">
                    <label htmlFor="description">Mô tả</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                    <p className="form-text text-danger">
                      {validationMsg.description}
                    </p>
                  </div>
                  <div className="form-group w-50">
                    <label htmlFor="category">Loại sản phẩm</label>
                    <select
                      name="category"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-control"
                      required
                    >
                      <option value="">Chọn loại</option>
                      <option value="Meat">Meat</option>
                      <option value="Seafood">Seafood</option>
                      <option value="Frozen">Frozen</option>
                      <option value="Household">Frozen</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Canned">Canned</option>
                      <option value="Beverages">Beverages</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Bakery">Bakery</option>
                    </select>
                    <p className="form-text text-danger">
                      {validationMsg.category}
                    </p>
                  </div>
                  <div className="form-group w-50">
                    <label htmlFor="description">Chọn ảnh</label>
                    <input
                      type="file"
                      onChange={handleImageChange} 
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Tạo Sản Phẩm
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

export default CreateProduct;
