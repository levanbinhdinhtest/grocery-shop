const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./connectdb');
// Connect to the database
connectDB();

const roleSchema = new mongoose.Schema({
    name: String,
    description: String
});
const Role = mongoose.model('Role', roleSchema);
Role.create([
    { name: "admin", description: "Administrator with full access" },
    { name: "employee", description: "Employee with limited access" },
    { name: "client", description: "client with limited access to browsing" },

]);

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: String
});
const User = mongoose.model('User', userSchema);
User.create([
    { username: "lethanh", password: "hashedPassword1", email: "lethanh@example.com", role: "admin" },
    { username: "hongphuoc", password: "hashedPassword2", email: "hongphuoc@example.com", role: "employee" },
    { username: "minhquan", password: "hashedPassword3", email: "minhquan@example.com", role: "employee" },
    { username: "nguyentuan", password: "hashedPassword4", email: "nguyentuan@example.com", role: "employee" },
    { username: "huynhtan", password: "hashedPassword5", email: "huynhtan@example.com", role: "employee" },
    { username: "phamthanh", password: "hashedPassword6", email: "phamthanh@example.com", role: "client" },
    { username: "tranbinh", password: "hashedPassword7", email: "tranbinh@example.com", role: "client" },
    { username: "dovan", password: "hashedPassword8", email: "dovan@example.com", role: "client" },
    { username: "maianh", password: "hashedPassword9", email: "maianh@example.com", role: "client" },
    { username: "ngocdung", password: "hashedPassword10", email: "ngocdung@example.com", role: "client" }
]);


const categorySchema = new mongoose.Schema({
    name: String,
    description: String
});
const ProductCategory = mongoose.model('ProductCategory', categorySchema);
ProductCategory.create([
    { name: "Beverages", description: "Drinks, soft drinks, juices" },
    { name: "Snacks", description: "Chips, cookies, biscuits" },
    { name: "Dairy", description: "Milk, cheese, yogurt" },
    { name: "Fruits", description: "Fresh fruits and vegetables" },
    { name: "Bakery", description: "Breads, cakes, pastries" },
    { name: "Meat", description: "Fresh meat and poultry" },
    { name: "Seafood", description: "Fresh seafood and fish" },
    { name: "Frozen", description: "Frozen foods and desserts" },
    { name: "Canned", description: "Canned foods and preserves" },
    { name: "Household", description: "Household cleaning products" }
]);


const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    stock: Number,
    sold: Number,
    description: String
});
const Product = mongoose.model('Product', productSchema);
Product.create([
    { name: "Coca Cola", category: "Beverages", price: 10, stock: 100, sold: 50, description: "Carbonated soft drink" },
    { name: "Pepsi", category: "Beverages", price: 10, stock: 80, sold: 30, description: "Popular cola drink" },
    { name: "Oreo Cookies", category: "Snacks", price: 5, stock: 200, sold: 120, description: "Chocolate sandwich cookies" },
    { name: "Lays Chips", category: "Snacks", price: 3, stock: 150, sold: 100, description: "Crispy potato chips" },
    { name: "Cheddar Cheese", category: "Dairy", price: 8, stock: 60, sold: 20, description: "Block of cheddar cheese" },
    { name: "Apples", category: "Fruits", price: 2, stock: 500, sold: 300, description: "Fresh red apples" },
    { name: "Whole Wheat Bread", category: "Bakery", price: 4, stock: 40, sold: 15, description: "Healthy whole wheat bread" },
    { name: "Chicken Breast", category: "Meat", price: 6, stock: 70, sold: 40, description: "Fresh chicken breast" },
    { name: "Salmon Fillet", category: "Seafood", price: 12, stock: 30, sold: 10, description: "Fresh salmon fillet" },
    { name: "Frozen Pizza", category: "Frozen", price: 8, stock: 90, sold: 35, description: "Frozen pepperoni pizza" }
]);

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cartItems: [],
    totalAmount: Number,
});

const Cart = mongoose.model('Cart', cartSchema);

// Dữ liệu mẫu cho collection Cart
Cart.create([
    {
        userId: "672ecbf103c655deee528129", // Thay thế bằng ObjectId hợp lệ của người dùng
        cartItems: [
            { productId: "672ecbf103c655deee528139", quantity: 2, price: 8, totalPrice: 16 },
            { productId: "672ecbf103c655deee528137", quantity: 1, price: 5, totalPrice: 5 },
        ],
        totalAmount: 21,
    },
    {
        userId: "672ecbf103c655deee52812a", // Thay thế bằng ObjectId hợp lệ của người dùng
        cartItems: [
            { productId: "672ecbf103c655deee52813b", quantity: 3, price: 4, totalPrice: 12 },
            { productId: "672ecbf103c655deee52813d", quantity: 2, price: 12, totalPrice: 24 },
        ],
        totalAmount: 36,
    },
]);


const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    amount: Number,
    paymentMethod: String, // e.g., "Credit Card", "PayPal", "Cash"
    status: String,        // e.g., "Pending", "Completed", "Failed"
    paymentDate: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);

// Dữ liệu mẫu cho collection Payment
Payment.create([
    {
        userId: "672ecbf103c655deee52812a", // Thay thế bằng ObjectId hợp lệ của người dùng
        cartId: "672edbd9801f17238616b55f", // Thay thế bằng ObjectId hợp lệ của giỏ hàng
        amount: 25,
        paymentMethod: "Credit Card",
        status: "Completed",
    },
    {
        userId: "672ecbf103c655deee528129", // Thay thế bằng ObjectId hợp lệ của người dùng
        cartId: "672edbd9801f17238616b55e", // Thay thế bằng ObjectId hợp lệ của giỏ hàng
        amount: 25,
        paymentMethod: "PayPal",
        status: "Pending",
    }
]);




 
