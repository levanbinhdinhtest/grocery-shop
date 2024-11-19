const Payment = require('../models/Payment');
const Cart = require('../models/Cart');

const createPayment = async (req, res) => {
    try {
        const { userId, cartId} = req.body;

        // Kiểm tra cartId hợp lệ và có tồn tại không
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        // Tạo một thanh toán mới
        const newPayment = new Payment({
            userId,
            cartId,
            amount: cart.totalAmount, // Lấy tổng tiền từ giỏ hàng
        });

        // Lưu vào cơ sở dữ liệu
        const savedPayment = await newPayment.save();

        res.status(201).json({ message: 'Payment created successfully.', payment: savedPayment });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { createPayment };
