const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Định nghĩa route GET để lấy danh sách sản phẩm
router.get('/products', productController.getAllProduct);
// Định nghĩa route POST để tạo sản phẩm
router.post('/products', productController.createProduct);
// Định nghĩa route DELETE để xóa sản phẩm
router.delete('/products/:id', productController.deleteProduct);
// Định nghĩa route PUT để update sản phẩm
router.put('/products/:id', productController.updateProduct);
// Định nghĩa route GET để lấy sản phẩm theo id
router.get('/product/:id', productController.getProductById);

module.exports = router;
