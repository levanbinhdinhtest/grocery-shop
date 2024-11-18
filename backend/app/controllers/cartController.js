const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.createCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Kiểm tra nếu sản phẩm tồn tại
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const price = product.price;
        const totalPrice = price * quantity;

        // Tìm cart theo userId
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Tạo cart mới nếu chưa tồn tại
            cart = new Cart({
                userId,
                cartItems: [{ productId, quantity, price, totalPrice }],
                totalAmount: totalPrice,
            });
        } else {
            // Kiểm tra xem sản phẩm đã có trong cart chưa
            const existingItemIndex = cart.cartItems.findIndex(
                (item) => item.productId.toString() === productId
            );

            if (existingItemIndex >= 0) {
                // Cập nhật số lượng và giá nếu sản phẩm đã tồn tại
                cart.cartItems[existingItemIndex].quantity += quantity;
                cart.cartItems[existingItemIndex].totalPrice += totalPrice;
            } else {
                // Thêm sản phẩm mới vào cart
                cart.cartItems.push({ productId, quantity, price, totalPrice });
            }

            // Cập nhật tổng số tiền
            cart.totalAmount += totalPrice;
        }

        await cart.save();
        res.status(201).json({ message: "Cart updated successfully", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
};
exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        // Tìm giỏ hàng của người dùng
        // Tìm cart theo userId
        let cart = await Cart.findOne({ userId });

        // const nameProduct = await cart.populate("cartItems.productId", "name");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({
            message: "Cart fetched successfully",
            cart: {
                userId: cart.userId,
                cartItems: cart.cartItems.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                    totalPrice: item.totalPrice,
                })),
                totalAmount: cart.totalAmount,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
}
