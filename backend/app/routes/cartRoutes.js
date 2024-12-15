const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
// Định nghĩa route GET để lấy danh sách sản phẩm
router.post('/cart/add', cartController.createCart);
router.get('/cart/:userId', cartController.getCart);
router.delete('/cart/:productId', cartController.deleteItemCart);
module.exports = router;