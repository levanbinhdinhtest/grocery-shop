import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewItem.css"; // Import CSS riêng

const ViewItem = () => {
  const [cart, setCart] = useState(null);
  const [productDetails, setProductDetails] = useState({}); // Lưu thông tin sản phẩm theo `productId`

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = localStorage.getItem("id"); // Lấy từ localStorage
        const response = await axios.get(
          `http://localhost:5000/api/cart/${userId}`
        );
        console.log(response.data.cart.cartId);
        localStorage.setItem("cartId", response.data.cart.cartId)
        setCart(response.data.cart);
        const productIds = response.data.cart.cartItems.map(
          (item) => item.productId
        );
        await fetchProductDetails(productIds);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    const fetchProductDetails = async (productIds) => {
      try {
        const details = {};
        for (const productId of productIds) {
          const response = await axios.get(
            `http://localhost:5000/api/product/${productId}`
          );
          details[productId] = response.data.product; // Lưu thông tin sản phẩm
        }
        setProductDetails(details);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };



    fetchCart();
  }, []);
  const handlePay = async ()=>{
    try {
      const userId = localStorage.getItem("id"); // Lấy từ localStorage
      const cartId = localStorage.getItem("cartId"); // Lấy từ localStorage
      const token = localStorage.getItem("token"); // Lấy từ localStorage
      await axios.post("http://localhost:5000/api/payment",{
        userId,
        cartId
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Payment successful!");
      window.location.reload(); // Reload trang sau khi thanh toán
    } catch (error) {
      console.error("Error paying:", error);
    }
}
  if (!cart) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      <ul className="cart-list">
        {cart.cartItems.map((item, index) => (
          <li className="cart-item" key={index}>
            <img
              className="product-image"
              src={productDetails[item.productId]?.urlimg || ""}
              alt={productDetails[item.productId]?.name || "Product"}
            />
            <div className="product-details">
              <p className="product-name">
                {productDetails[item.productId]?.name || "Loading..."}
              </p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <p>Total: ${item.totalPrice}</p>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="cart-total">Total Amount: ${cart.totalAmount}</h3>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn btn-success" onClick={() => handlePay()}  >Pay Now</button>
      </div>
    </div>
  );
};

export default ViewItem;
