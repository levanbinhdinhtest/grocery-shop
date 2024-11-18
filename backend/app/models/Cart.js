const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Liên kết với ObjectId của User
    ref: "users", // Nếu bạn có collection `User`
    required: true,
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, // Liên kết với ObjectId của Product
        ref: "products", // Nếu bạn có collection `Product`
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity cannot be less than 1"],
      },
      price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"],
      },
      totalPrice: {
        type: Number,
        required: true,
        min: [0, "Total price cannot be negative"],
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: [0, "Total amount cannot be negative"],
  },
}, {
  timestamps: true, // Tự động thêm `createdAt` và `updatedAt`
});

module.exports = mongoose.model("Cart", cartSchema);
